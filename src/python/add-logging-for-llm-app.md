---
date: 2023-12-04
tag:
- Python
---
# 给LLM应用添加日志

## logging替代print
目前公司的LLM应用开发使用的是 Python 技术栈，观察源码，发现没有多少日志，纵使有，也是用的 print。

print 的作用，就相当于 Java 的 System.out.print，相当于 Node.js 的 console.log，一般只适合在本地调试，不适合作为日志输出的。

<!-- more -->

打包成 Docker 镜像时，Python 应用很可能看不到 [print 输出](https://stackoverflow.com/questions/29663459/why-doesnt-python-app-print-anything-when-run-in-a-detached-docker-container)。使用 pytest 执行测试用例时，[默认也是看不到 print](https://stackoverflow.com/questions/24617397/how-do-i-print-to-console-in-pytest) 输出的。再加上 print 太简陋了，输出没有时间，没有级别分类，建议还是弃用，改用专门的日志模块。

使用 Python 内置的日志模块 logging，直接 import 即可使用：
```python
import logging
logging.info("log")
```

如果要在 pytest 中显示日志，还要在项目根目录添加 pytest.ini 文件，补充如下内容：
```shell
[pytest]
log_cli = 1
log_cli_level = INFO
```
logging 模块完整的用法，可以[点击查看文章](https://betterstack.com/community/guides/logging/how-to-start-logging-with-python/)。
## 何时打印日志
为避免排查线上问题时，被迫吐槽：“怎么一点日志都没有！”建议平时养成打日志的习惯，方便应用的迭代与维护。

下面给出一些通用的打印日志的实践建议，与语言无关，可按需采纳。

1. 外部调用
2. 异常捕获
3. 提前返回
4. 复杂或特殊的if-else

### 外部调用
调用另一个应用的API，与中间件（如 redis, rocketmq）交互，都属于外部调用，最好调用前后都打印日志（当然，如果返回的数据量太大，酌情可以考虑省略打印部分返回信息）

示例：
```java
log.info("准备发送 mq");
MQRequest mqRequest = buildMQRequest(dto);
mqApi.sendMessage(mqRequest);
```

```java
public void sendMessage(MqRequest mqRequest){
    String destination = mqRequest.getTopic() + ":" + mqRequest.getTag();
    rocketMQTemplate.asyncSend(destination, JSONObject.toJSONString(mqRequest.getData()), new SendCallback() {
        @Override
        public void onSuccess(SendResult sendResult) {
            logger.info("发送成功, {}, 内容: {}",sendResult.toString(), JSONObject.toJSONString(mqRequest.getData()));
        }
        @Override
        public void onException(Throwable throwable) {
            logger.error("发送异常:",throwable);
            retry(mqRequest)
        }
    });
}
```
### 异常捕获
异常捕获后，一定要打印日志。实在想偷懒，直接打印堆栈信息都能授受。最忌讳的是，捕获了异常，然后什么都不做，直接把异常信息给“吃了”，这绝对是排查问题的恶手。

示例：
```java
  private void saveDataToHive() {
    log.info("累积{}条数据，开始存储！", cachedDataList.size());

    try {
      //省略执行写文件操作代码...
        
      log.info("存储成功！");
    } catch (IOException e) {
      logException(e, "保存数据时，把 CSV 文件内容写到 HDFS 上出错");
    } finally {
        //省略关闭流代码...
    }
  }

```
### 提前返回
如果函数有提前 return 的逻辑，最好返回前也打印日志，不然排查问题时，发现请求进来了，却什么日志也没有，容易让人一头雾水。

示例：
```java
public Payload<List<MenuTreeVO>> getMenuByAppId(@Valid Param param) {
    if (!checkoutSubscribe(param.getAppId())) {
        log.info("checkoutSubscribe: false, 因此返回空数组");
        return new Payload<>(Collections.emptyList());
    }
    log.info("checkoutSubscribe: true");
    
    return new Payload<>(menuResourceService.getAccountMenuList(param));
}

```
### 复杂或特殊的if-else
如何定义复杂，又如何定义特殊，这就见仁见智，需要个人在实践中去总结理解了。

一个常见的场景是，某段逻辑因为业务变化要加 if-else 进行特殊处理，你得在这个 if-else 前加上注释，解释其原因。那么这段逻辑就可以添加日志，日志内容就是你的注释内容，也即把注释改写成日志即可。

示例：
```java
if (SPECIAL_APP_CODE.equals(req.getAppCode())) {
  log.info("特殊应用，跳过从 plugin.json 读取配置的代码");
}
else {
  log.info("从 plugin.json 中读取配置...");
  confs = CommonUtils.readFromProperties(localPath, "");
}

```
```java
public void checkAndSetAppPlugins(DatasourceDO datasourceDO, SubApplicationDTO subApplicationDTO) {
    if (Boolean.TRUE.equals(datasourceDO.getIsUsePlugin())) {
        log.info("检查 {} 插件中...", subApplicationDTO.getAppCode());
        
        String datasourceType = datasourceDO.getType();
        Long datasourceTypeId = getTypeId(datasourceType.toLowerCase());
        
        if (Objects.isNull(datasourceTypeId)) {
            throw new ApplicationException(String.format("%s缺少%s的插件，请联系运营人员上传相应插件",
                    subApplicationDTO.getAppCode(), datasourceType));
        }
        log.info("完成检查, {} 存在 {} 插件...", subApplicationDTO.getAppCode(), datasourceType);

        setAppPlugins(driverPluginDOList); 
    }
    else {
        log.info("不需要检查插件");
    }
}
```
