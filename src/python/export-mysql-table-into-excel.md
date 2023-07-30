---
date: 2023-03-05
tag: Python
---

# Python 导出 MySQL 库表信息到 Excel
## 需求
查询 MySQL 某个库的全部表的元信息，输出成 Excel，每一张表一个 sheet。

<!-- more -->

## 代码
```python
import mysql.connector
import xlsxwriter

# 根据实际修改下面的变量
host='127.0.0.1'
user='root'
password='password'
database = ''

def get_title_format(workbook):
  title_format = workbook.add_format({
    'bold': True,
    'bg_color': '#B4C7E7',
    'align': 'center',
    'valign': 'vcenter',
    'font_size': 12,
    'bottom': 1,
    'right': 1,
  })
  return title_format


def setup_first_sheet(workbook, worksheet):
  title_format = get_title_format(workbook)
  # 表头
  worksheet.write('A1', '表名', title_format)
  worksheet.write('B1', '表备注', title_format)

  # 设置列宽度
  worksheet.set_column(0, 1, 30)

  # 设置行高度
  worksheet.set_row(0, 24)


def setup_other_sheet(workbook, worksheet):
  title_format = get_title_format(workbook)
  # 表头
  worksheet.write('A1', '字段', title_format)
  worksheet.write('B1', '描述', title_format)
  worksheet.write('C1', '备注', title_format)
  worksheet.write('D1', '字段关联表', title_format)

  # 设置列宽度
  worksheet.set_column(0, 3, 30)
  worksheet.set_column(2, 2, 45)

  # 设置行高度
  worksheet.set_row(0, 24)


if __name__ == '__main__':
  workbook = xlsxwriter.Workbook('{}.xlsx'.format(database))

  cnx = mysql.connector.connect(user=user, password=password,
                                host=host,
                                database=database)
  # https://dev.mysql.com/doc/connector-python/en/connector-python-tutorial-cursorbuffered.html
  cursor_tables = cnx.cursor(buffered=True)
  cursor_columns = cnx.cursor(buffered=True)

  query_tables = '''
  SELECT
  t.TABLE_NAME, t.TABLE_COMMENT
  FROM
  INFORMATION_SCHEMA.TABLES t
  WHERE
  TABLE_SCHEMA = "{}"
  '''.format(database)

  cursor_tables.execute(query_tables)
  tables = []

  first_sheet = workbook.add_worksheet("表信息")
  setup_first_sheet(workbook, first_sheet)
  row = 1
  col = 0
  for (table_name, table_comment) in cursor_tables:
    # 存储起来，后续还要遍历
    tables.append({'table_name': table_name, 'table_comment': table_comment})

    # 添加超链接
    first_sheet.write_url('A{}'.format(row), 'internal:{}!A1'.format(table_name), string = table_name)
    first_sheet.write(row, col + 1, table_comment)
    row += 1


  for table in tables:
    query_columns = '''
    SELECT
    COLUMN_NAME, COLUMN_COMMENT 
    FROM
    INFORMATION_SCHEMA.`COLUMNS`
    WHERE
    TABLE_SCHEMA = "{}"
    AND TABLE_NAME = "{}"
    '''.format(database, table['table_name'])

    cursor_columns.execute(query_columns)

    print("generating table: {}, {}".format(table['table_name'], table['table_comment']))

    worksheet = workbook.add_worksheet('{}'.format(table['table_name']))
    setup_other_sheet(workbook, worksheet)

    row = 1
    col = 0
    for (col_name, col_comment) in cursor_columns:
      worksheet.write(row, col, col_name)
      worksheet.write(row, col + 1, col_comment)
      row += 1

    print("------")

  cnx.close()
  workbook.close()

```
## 其他细节
上述代码由于库的原因，只能生成新文件或覆盖文件，不能修改原有文件。
执行代码时必须关闭生成的文件，否则报错。
sheet的名字不能超过 31 个字符。
[RBG 转 Hex 工具](https://www.rapidtables.com/convert/color/rgb-to-hex.html)，给单元格、文字上颜色时会用到，因为 Excel 显示的是 RBG，但代码里是 Hex。
