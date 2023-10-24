---
date: 2023-10-24
tag:
- Java
- JavaScript
- Daily
---

# 避免密码明文传输
## 说明
密码加密是很常见的安全性需求，但由于涉及前后端，前后端分离的情况下，开发人员容易只关心自己熟悉的领域，最终导致“知道要加密，实际还是没明文”的情况发生。

本文分享实际可运行的前后端代码，以减轻大家实现密码密文传输的负担。

流程说明：前端加密，后端解密。

当然，数据库存储的肯定是密文。这里后端解密的意思是：需要使用密码的时候，如获取数据库的连接，由后端解密后使用。

<!-- more -->

## 前端代码
记得安装相应的 npm 模块。
```typescript
/*******************************
Description: aes加解密工具方法
********************************/
import AES from 'crypto-js/aes'
import Utf8 from 'crypto-js/enc-utf8'
import Base64 from 'crypto-js/enc-base64'
import { JSEncrypt } from 'jsencrypt'

const key = Utf8.parse('your-key')
const iv = Utf8.parse('your-initial-vector')

/**
 * @func aesEncrypt
 * @desc AES加密
 * @params {String} word 需要加密的字符串
 * @returns {String} 加密后转为Base64编码
 */
export function aesEncrypt(word: string) {
  const srcs = Utf8.parse(word)
  // 缺省模式：CryptoJS.mode.CBC；缺省padding: CryptoJS.pad.Pkcs7
  const encrypted = AES.encrypt(srcs, key, { iv })
  return Base64.stringify(encrypted.ciphertext)
}
/**
 * @func aesDecrypt
 * @desc AES解密
 * @params {String} word 需要解密的base64字符串
 * @returns {String} 解密后的字符串
 */
export function aesDecrypt(word: string) {
  const decrypt = AES.decrypt(word, key, { iv })
  return decrypt.toString(Utf8)
}

```
## 后端代码
maven:
```xml
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>4.5.16</version>
        </dependency>
        <dependency>
            <groupId>org.bouncycastle</groupId>
            <artifactId>bcprov-jdk16</artifactId>
            <version>1.46</version>
        </dependency>
```

源码：
```java
public class SecurityUtils {
    // 这两个变量的值应该与前端一致
    private static final String key = "your-key"; 
    private static final String ivStr = "your-initial-vector";


    public static String encryptOnAES(String content) {
      if(org.apache.commons.lang3.StringUtils.isBlank(content)){
        return "";
      }
      AES aes = new AES("CBC", "PKCS7Padding", key.getBytes(StandardCharsets.UTF_8), ivStr.getBytes(StandardCharsets.UTF_8));
        byte[] encrypt = aes.encrypt(content.getBytes(StandardCharsets.UTF_8));
        return Base64.getEncoder().encodeToString(encrypt);
    }

    public static String decryptOnAES(String content) {
        if(org.apache.commons.lang3.StringUtils.isBlank(content)){
          return "";
        }
        AES aes = new AES("CBC", "PKCS7Padding", key.getBytes(StandardCharsets.UTF_8), ivStr.getBytes(StandardCharsets.UTF_8));
        byte[] decode = Base64.getDecoder().decode(content);
        return aes.decryptStr(decode);
    }
}

```

单元测试：
```java
public class SecurityUtilsTest {
    @Test
    public void encryptAndDecrypt(){
        String plainText = "abcd1234";
        String encryptText = SecurityUtils.encryptOnAES(plainText);

        System.out.printf("encryptText: %s%n", encryptText);
        
        org.junit.Assert.assertEquals(plainText,SecurityUtils.decryptOnAES(encryptText));
    }
}

```
