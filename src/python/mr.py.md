---
date: 2023-06-05
tag:
- Git
- Python
---

[操作 Gitlab MR 的命令行工具](../git/use-command-line-tool-to-manage-gitlab-merge-request.md)的源码与测试代码。

<!-- more -->

## 源文件：main.py
```python
import re
import sys
import os
import requests
import json
import subprocess
from PyInquirer import prompt

def check_config(config):
  if not config:
    return "\nthe config file is empty"
  if not config.get('gitlab_url'):
    return "\nthe config is missing: gitlab_url "
  if not config.get('gitlab_token'):
    return f"\nthe config is missing: gitlab_token\nyou can get your token at this page: {config.get('gitlab_url')}/-/profile/personal_access_tokens"
  #if not config.get('gitlab_group'):
    #return "\nthe config is missing: gitlab_group "
  if not config.get('codebases'):
    return "\nthe config is missing: codebases"
  return 0

def load_config():
  path = f'{os.path.expanduser("~")}/.mr-config.json'
  try:
    with open(path, 'r') as f:
      config = json.load(f)
      check_result = check_config(config)
      if check_result != 0:
        print(with_red_color(check_result))
        sys.exit(1)
      return config
  except FileNotFoundError:
    print(with_red_color(f'config file was not found: {path}'))
    sys.exit(1)

def get_mr_url(api_prefix, project_id):
  return f'{api_prefix}/projects/{project_id}/merge_requests'

def get_params(project_name):
  params = {'search': project_name}
  return params

def get_project_id_by_name(api_prefix, headers, params, project_name):
  print('Getting project_id...\n')
  url = f'{api_prefix}/projects'
  response = requests.get(url, headers=headers, params=get_params(project_name))
  projects = response.json()
  match_projects = []

  if response.status_code == 200:
    for project in projects:
      if project_name == project['path']:
        match_projects.append({'id': project['id'], 'http_url_to_repo': project['http_url_to_repo']})
    if not match_projects:
      print(with_red_color('No project match! please check your settings or authorization\n'))
      print('Searched projects:\n')
      for project in projects:
        print(project['path'])
      sys.exit(1)

    if len(match_projects) == 1:
      project_id = match_projects[0]['id']
      return project_id

    # multiple matches
    questions = [{
      'type': 'list',
      'message': f"Choose project",
      'name': 'project',
      'choices': list(map(lambda x: {'name': x['http_url_to_repo']}, match_projects))
    }]
    answers = prompt(questions)
    repo_url = answers['project']

    for project in match_projects:
      if project['http_url_to_repo'] == repo_url:
        return project['id']

  else:
    print('Error:', response.status_code, response.text)
    sys.exit(1)

def is_conflict_branch(branch):
  """
  Returns True if the branch is of the form conflict/{source_branch}(to){target_branch}, False otherwise.

  Parameters:
  branch (str): The name of the branch to check.
  """
  prefix = "conflict/"
  suffix = "(to)"
  if branch.startswith(prefix) and suffix in branch:
    source_branch, target_branch = branch.split(suffix)
    if len(target_branch):
      return True
  return False

def get_target_branch(conflict_branch):
  suffix = "(to)"
  parts = conflict_branch.split(suffix)
  target_branch = parts[-1].strip()
  return target_branch
def create_merge_request(source_branch, target_branch, api_prefix, project_id, headers, remove_source_branch: bool):
  data = {'source_branch': source_branch, 'target_branch': f'{target_branch}',
          'title': source_branch, 'description': 'created by mr.py',
          'remove_source_branch': remove_source_branch
          }
  response = requests.post(get_mr_url(api_prefix, project_id), headers=headers, data=data)
  print(response)
  #response.raise_for_status()

  res = response.json()
  if 'web_url' in res:
    if res['changes_count'] is None:
      print(f'{source_branch} -> {target_branch}: will be ignored, because there is no change\n')
      print('Maybe you forget to push your commits or choose wrong branch\n')
      close_mr_url = f'{api_prefix}/projects/{project_id}/merge_requests/{res["iid"]}'
      requests.put(close_mr_url, headers=headers, data={'state_event': 'close'})
    else:
      print(f"{source_branch} -> {target_branch}: {res['web_url']}")
      return res['web_url']
  else:
    print(res)
    return res['message']

def create_merge_request_from_conflict_branch(current_branch, api_prefix, headers, params, project_name):
  print('Pushing current branch...')
  subprocess.check_output(f'git push origin {current_branch}', shell=True)
  print('Creating merge request...\n')
  target_branch = get_target_branch(current_branch)
  project_id = get_project_id_by_name(api_prefix, headers, params, project_name)
  return create_merge_request(current_branch, target_branch, api_prefix, project_id, headers, True)

def merge_gitlab_mr(api_prefix, headers, params, web_url):
    # Extracting project_id and mr_ii
    slices = web_url.strip().split('/-/merge_requests/')
    mr_iid = slices[1]
    project_name = slices[0].split('/')[-1]

    if not mr_iid:
      print(with_red_color('Invalid merge request URL'))
      sys.exit(1)

    project_id = get_project_id_by_name(api_prefix, headers, params, project_name)
    # Check if the merge request has conflicts
    mr_api_url = f"{get_mr_url(api_prefix, project_id)}/{mr_iid}"
    response = requests.get(mr_api_url, headers=headers)
    response.raise_for_status()
    mr = response.json()

    confirm_yes_or_exit(f'Confirm to merge {mr["source_branch"]} into {mr["target_branch"]}? (Y/N)\n')
    if mr['has_conflicts']:
        print(with_red_color(f'Merge request {mr_iid} has conflicts and cannot be merged \n'))
        confirm_yes_or_exit('Do you want to checkout a new branch to resolve conflicts? (Y/N)\n')

        #input('Make sure your git working directory is clean. type `Enter` to continue\n')
        sh_output = ''
        try:
          subprocess.check_output(f'git checkout --track origin/{mr["target_branch"]}', shell=True, stderr=subprocess.DEVNULL)
        # 本地分支可能已存在
        except subprocess.CalledProcessError:
          try:
            sh_output = subprocess.check_output(f'git checkout {mr["target_branch"]}', shell=True).decode().strip()
          # 可能就是切换分支有问题
          except subprocess.CalledProcessError:
            print(with_red_color(sh_output))
            sys.exit(1)

        print(f"Pulling from origin to branch {mr['target_branch']}\n")
        subprocess.check_output(f'git pull origin {mr["target_branch"]}', shell=True)

        print(f"Switching to conflict resolving branch\n")
        conflict_branch = f'conflict/{mr["source_branch"]}(to){mr["target_branch"]}'
        subprocess.check_output(f'git checkout -b {conflict_branch}', shell=True)
        print(f'Now to resolve conflicts, you just need to open your IDE or source control tool to\n`merge {mr["source_branch"]} into {conflict_branch}`')
    else:
      merge_api_url = f'{mr_api_url}/merge'
      response = requests.put(merge_api_url, headers=headers)

      # Check for errors
      response.raise_for_status()
      print(f'Merge request {mr_iid} merged successfully!')


def confirm_yes_or_exit(message):
  is_checkout = input(message)
  if is_checkout.upper() in ['N', 'NO']:
    print('You choose no, bye')
    sys.exit(0)


def with_red_color(text):
  CRED = '\033[91m'
  CEND = '\033[0m'
  return CRED + text + CEND

def with_green_color(text):
  CGREEN = '\033[32m'
  CEND = '\033[0m'
  return CGREEN + text + CEND

def get_source_branch_from_conflict_branch(current_branch):
  if not current_branch.startswith("conflict/"):
    raise ValueError("Invalid input string")

  match = re.search(r'conflict/(.*)\(to\)', current_branch)
  if match:
    return match.group(1)
  else:
    raise ValueError("Invalid input string")

if __name__ == '__main__':
  if len(sys.argv) > 1 and (sys.argv[1] == 'version' or sys.argv[1] == '-v'):
    print('version: 1.3.0\nlatest feature: remove local conflict branch after merge')
    sys.exit(0)

  commands = ['create', 'list', 'merge']
  if len(sys.argv) == 1 or sys.argv[1] not in commands:
    print('Available commands:\n')
    for index,command in enumerate(commands):
      print(f'{index}.{command}')
    sys.exit(0)

  config = load_config()
  gitlab_url = config.get('gitlab_url')
  private_token = config.get('gitlab_token')

  api_prefix = f'{gitlab_url}/api/v4'
  headers = {'PRIVATE-TOKEN': private_token}
  params = {}

  # command: list
  if len(sys.argv) > 1 and sys.argv[1] == 'list':
    list_mr_url = f'{api_prefix}/merge_requests?state=opened'
    response = requests.get(list_mr_url, headers=headers)
    if response.status_code == 200:
      mrs = response.json()
      print(f'You have {len(mrs)} unmerged merge requests: \n')

      for index, mr in enumerate(mrs):
        #emoji = '\u274c' if mr['has_conflicts'] else '\u2714'
        emoji = with_red_color('[conflict]') if mr['has_conflicts'] else with_green_color('[ok]')
        print(f"{index + 1}.{mr['source_branch']} -> {mr['target_branch']}: {mr['web_url']} {emoji}\n")
    sys.exit(0)

  # check dir
  sh_get_project_name = "git remote -v | head -n 1 | awk -F/ '{print $(NF)}' | cut -d . -f 1"
  project_name = subprocess.check_output(sh_get_project_name, shell=True).decode().strip()
  if not project_name:
    print(with_red_color('It is not in a gitlab project directory'))
    sys.exit(1)
  print('Current project_name: {}\n'.format(project_name))

  sh_get_current_branch = "git branch | grep \* | cut -d ' ' -f 2"
  current_branch = subprocess.check_output(sh_get_current_branch, shell=True).decode('utf-8').strip()

  # command: merge
  if sys.argv[1] == 'merge':
    # with web_url
    if len(sys.argv) > 2:
      merge_gitlab_mr(api_prefix, headers, params, sys.argv[2])
      sys.exit(0)

    if is_conflict_branch(current_branch):
      print('Conflict resolving branch detected.\nMerge request will be created and merged automatically\n')
      #TODO if it's already created,  ['Another open merge request already exists for this source branch: !17']
      web_url = create_merge_request_from_conflict_branch(current_branch, api_prefix, headers, params, project_name)
      merge_gitlab_mr(api_prefix, headers, params, web_url)
      confirm_yes_or_exit(f'Do you want to remove local branch: {current_branch}? (Y/N)\n')
      subprocess.check_output(f'git checkout {get_source_branch_from_conflict_branch(current_branch)}')
      subprocess.check_output(f'git branch -D {current_branch}')
      sys.exit(0)

  # command: create
  if len(sys.argv) > 1 and sys.argv[1] == 'create':
    if is_conflict_branch(current_branch):
      print('Conflict resolving branch detected.\nMerge request will be created automatically\n')
      create_merge_request_from_conflict_branch(current_branch, api_prefix, headers, params, project_name)
      sys.exit(0)

    source_branch = input(f"Input source branch name, type `Enter` to use current branch '{current_branch}':\n")
    need_push_before_create_mr = False
    if source_branch.strip() == '':
      source_branch = current_branch
      need_push_before_create_mr = True

    codebases = config.get('codebases')
    questions = [{
      'type': 'list',
      'message': f"Choose codebase that you want to merge into",
      'name': 'codebase',
      'choices': list(map(lambda x: {'name': x}, codebases))
    }]
    answers = prompt(questions)
    codebase = answers['codebase']

    questions = [{
      'type': 'checkbox',
      'message': f"Choose target branch",
      'name': 'target_branch',
      'choices': list(map(lambda x: {'name': x, 'checked': True}, codebases[codebase]))
    }]
    answers = prompt(questions)
    while len(answers['target_branch']) == 0:
      answers = prompt(questions)

    project_id = get_project_id_by_name(api_prefix, headers, params, project_name)
    if need_push_before_create_mr:
      # in case user forget to push commits
      subprocess.check_output(f'git push origin {current_branch}', shell=True)

    print('Creating merge requests...\n')
    for target_branch in answers['target_branch']:
      create_merge_request(source_branch, target_branch, api_prefix, project_id, headers, False)

```

## 测试文件：test/test_mr.py
```python
import pytest

from mr import check_config, with_red_color, with_green_color, is_conflict_branch, get_target_branch, get_source_branch_from_conflict_branch

def test_is_conflict_branch():
  assert is_conflict_branch("conflict/feature1(to)feature2") == True
  assert is_conflict_branch("conflict/hotfix(to)release") == True
  assert is_conflict_branch("conflict/bugfix") == False
  assert is_conflict_branch("feature1(to)feature2") == False
  assert is_conflict_branch("conflict/feature1(to)") == False
  assert is_conflict_branch("conflict/feature1tofeature2") == False

def test_get_source_branch_from_conflict_branch():
  assert get_source_branch_from_conflict_branch("conflict/feature1(to)feature2") == "feature1"
  with pytest.raises(ValueError):
    get_source_branch_from_conflict_branch("no-match")

def test_get_target_branch():
  assert get_target_branch("conflict/feature1(to)feature2") == "feature2"
  assert get_target_branch("conflict/hotfix(to)release") == "release"
  assert get_target_branch("conflict/bugfix(to)bugfix2") == "bugfix2"
  assert get_target_branch("conflict/feature1(to)feature2 ") == "feature2"
  assert get_target_branch("conflict/feature1(to)  feature2") == "feature2"
  assert get_target_branch("conflict/feature1 (to) feature2") == "feature2"
  assert get_target_branch("conflict/feature1(to)(to)feature2") == "feature2"

def test_print_color():
  print("\n")
  print(with_red_color("error"))
  print(with_green_color("ok"))

def test_check_config():
  assert check_config(None) != 0
  assert check_config({}) != 0
  assert check_config({'gitlab_url': ''}) != 0
  assert check_config({'gitlab_token': ''}) != 0

  no_token = check_config({'gitlab_url': 'url', 'gitlab_token': ''})
  print(no_token)
  assert no_token != 0
  assert check_config({'gitlab_url': 'url', 'gitlab_token': 'token'}) != 0

  config = {
    'gitlab_url': 'url',
    'gitlab_token': 'token',
    'gitlab_group': 'group',
    'codebases': {
      'default': ['dev', 'master']
    }
  }
  assert check_config(config) == 0

  #del config['gitlab_group']
  #assert check_config(config) != 0

  del config['codebases']['default']
  assert check_config(config) != 0

```
