---
date: 2023-09-05
tag:
- Java
- Daily
---

# Excel处理常用实践
## 基础知识
导入需要用到对象，MultipartFile。
```java
@PostMapping("/import")
public boolean importLicense(
      @RequestParam("file") MultipartFile file,
      @RequestParam("tenantId") @NotBlank String tenantId,
) {
  return true;
}
```

导出需要用到对象：HttpServletResponse。作为 Controller 的最后一个入参即可，框架会自动注入。
也可以从请求上下文获取：
```java
ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

HttpServletResponse response = servletRequestAttributes.getResponse();
```

同时注意设置响应头：
```java
@GetMapping("/exmport/{id}")
public void download(@PathVariable("id") Long id, HttpServletResponse response) {
      // 这是普通文本文件下载的响应头，excel 有更具体的设置，在文章后面
      response.setContentType("application/octet-stream");
      response.setHeader("Content-Disposition", "attachment;filename=license-" + license.getIdentifier());
    
      try (OutputStream outputStream = response.getOutputStream()) {
        outputStream.write(licenseEncryption.getDigest().getBytes());
        outputStream.write("\n".getBytes());
        outputStream.write(licenseEncryption.getCipherText().getBytes());
        outputStream.flush();
      }
    } catch (Exception e) {
      throw new ApplicationException("下载出错", e.getCause());
    }
}
```
## 应用框架
### 导出
EasyExcel 做 Excel 导出还是挺方便的。

先建立Java实体与Excel表格内容的映射：
```java
public class ExportDTO {
  @ExcelProperty("主账号")
  private String mainAccountName;

  @ExcelProperty("子账号")
  private String accountName;
}
```

然后收集数据，用下面的语句导出：
```java
String excelName = "my-excel";
response.setCharacterEncoding("UTF-8");
response.setContentType("application/vnd.ms-excel");
response.addHeader("Content-Disposition", "attachment;filename=" + excelName + ".xlsx");

// 关键就是实现 data 的逻辑
List<ExportDTO> data = new ArrayList<>();

EasyExcel.write(response.getOutputStream(), ExportDTO.class)
       .sheet(excelName)
       .registerWriteHandler(new LongestMatchColumnWidthStyleStrategy())
       .doWrite(data);
```
### 导入
EasyExcel 处理导入，体验就没那么丝滑了。

可以先看下示例代码：
```java
CsvListener csvListener = new CsvListener(csvService);

EasyExcel.read(file.getInputStream(), csvListener)
        .excelType(ExcelTypeEnum.CSV) // 如果是读取 excel，去掉这一行即可
        .sheet().doRead();
```

```java
public class CsvListener extends AnalysisEventListener<Map<Integer, String>> {
  /**
   * 每隔n条存储数据库，然后清理list ，方便内存回收
   */
  private static final int BATCH_COUNT = 1000;
  /**
   * 缓存的数据
   */
  private List<Map<Integer, String>> cachedDataList = ListUtils.newArrayListWithExpectedSize(BATCH_COUNT);

   
  @Override
  public void invokeHead(Map<Integer, ReadCellData<?>> headMap, AnalysisContext context){
   
  }

  /**
   * 每一条数据解析都会来调用
   */
  @Override
  public void invoke(Map<Integer, String> data , AnalysisContext context) {
    cachedDataList.add(data);
      
    // 达到BATCH_COUNT了，需要去存储一次数据库，防止数据几万条数据在内存，容易OOM
    if (cachedDataList.size() >= BATCH_COUNT) {
      saveData();
      // 存储完成清理 list
      cachedDataList = ListUtils.newArrayListWithExpectedSize(BATCH_COUNT);
    }
  }

  /**
   * 所有数据解析完成了 都会来调用
   */
  @Override
  public void doAfterAllAnalysed(AnalysisContext context) {
    // 这里也要保存数据，确保最后遗留的数据也存储到数据库
    saveData();
  }
}

```

设计思路是挺优雅的：事件驱动，把业务逻辑放入这个 Listener 里。

但实践起来就不太优雅了：

1. 无法利用 Spring 进行依赖管理，需要手动在构造器中注入业务对象。对于这一点，我表示很难受。我相信，当业务变得复杂，这个构造器要接收 9 个参数的时候，大部分人都会难受。
2. 需要维护横跨回调函数的“全局变量”。当业务复杂后，势必要引入更多的类成员变量，在 invoke/invokeHead/doAfterAllAnalysed 等回调函数中出现多次，对这几个回调函数而言，类成员变量就是全局变量。代码是可以实现，但个人不倾向于这种做法。另外，这也给我一种”梦回前端“的感觉，我对这种感觉不持有积极态度。

当然上面仅仅是吐槽，又不是不能用。业务不复杂的话，直接用起来就完事了。
## 常见问题与解决方案
### 浏览器下载
虽然说 GET 请求可以让浏览器直接下载文件，Postman 也验证过此方案，但很可能实际会让前端采取另一种实现方案：先进行 Ajax 请求，再利用返回的数据创建 Blob 对象，最后才下载。

为什么不直接让浏览器下载，而要前端转一层呢？大概率是因为鉴权问题——因为浏览器 GET 请求不能带上授权相关的请求头，小概率原因是想前端显示 loading 状态。

前端多转一层，很可能转出问题，排查起来，既要 debug 接口，又要 debug 前端代码，吃力不讨好。

对此，我推荐的实践是：请求 url 带上 token 信息，如 /download?token=xxx，让后端对于下载接口特殊处理，以更前端少做一次处理，直接让浏览器下载文件即可。

### 上传文件大小限制
导入本质是文件上传，服务端会生成临时文件，当文件过大时，需要修改相关设置。

以下是 Spring 的相关配置。
```shell
spring.servlet.multipart.max-file-size=1024MB
spring.servlet.multipart.max-request-size=1024MB
```

### 缺少字体
Excel 的导出需要字体文件。

缺少字体时，可能会报错：
```shell
java.lang.NullPointerException: null
at sun.awt.FontConfiguration.getVersion(FontConfiguration.java:1264)
```

为什么会缺少字体呢？一个经典的例子就是，使用了过于精简的基础镜像来打包应用，如使用 busybox 就会报错：
```shell
openjdk:8-jdk-bosybox
```

解决方案就是换一个更“丰满”一点的镜像。

但如果没有导出的内容没有格式要求，其实推荐优先使用 CSV。因为 CSV 不需要字体，而又与 Excel 兼容。
### 序列化失败
一般应用程序都会对请求参数进行日志打印，当处理文件时，可能会遇到以下错误：

```shell
com.alibaba.fastjson.JSONException: write javaBean error, fastjson version 1.2.68, 
class org.springframework.web.multipart.support.StandardMultipartHttpServletRequest$StandardMultipartFile, fieldName : file, write javaBean error, fastjson version 1.2.68, class org.springframework.web.multipart.MultipartFileResource, fieldName : resource
```

找到相应代码：
```java
private CreateOperationLogDTO getMethodTrilateralOperationLog(ProceedingJoinPoint joinPoint, RequestAttributes requestAttributes) {
    MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
    String[] parameterNames = methodSignature.getParameterNames();
    Object[] parameterValues = joinPoint.getArgs();
    
    Map<String, Object> parameters = new LinkedHashMap<>();
    for (int i = 0; i < parameterNames.length; i++) {
        parameters.put(parameterNames[i], parameterValues[i]);
    }
    
    Log log = new Log();
    log.setContentTo(JSON.toJSONString(parameters));
}
```

问题出在第 12 行，上传的文件 Multipart 对象被序列化时报错了。但这不应认为是 fastjson 问题——就算换也 Jackson，默认情况也是会报错的。

这里具体问题具体分析。笔者的场景，其实只是要打印参数，并不需要序列化文件对象，因此，通过跳过序列化 Multipart 对象解决此问题，示例代码如下：
```java
for (int i = 0; i < parameterNames.length; i++) {
    // 在 for 循环中添加如下一行
    if (parameterNames[i].equals("file")) continue;
    parameters.put(parameterNames[i], parameterValues[i]);
}
```

