---
date: 2023-08-26
tag:
- AI
- Daily
---

# 都什么年代了，还在用传统方式写代码？
## 前言
还在把 AI 当作搜索引擎的替代品，有问题才问 AI，没问题就在那边吭哧吭哧地撸代码？如果是这样，那你真的 OUT了！现在正经人谁还自己一行行地写代码啊，都是 AI 生成的代码——没有 AI 我不写（手动滑稽）。

本文将搁置争议，秉持实用主义，讨论在 AI 可以辅助我们编码的情况下，应采取什么样的实践，从而利用好工具，提高工作效率。

本文将分享 AI 时代的编程新实践，教你如何从一个 "Ctrl + C"、 "Ctrl + V" 工程师，变成一个  "Tab + Enter" 工程师🤣。
## 开发流程
软件的一般研发流程为：

1. 需求分析
2. 程序设计
3. 代码编写
4. 软件测试
5. 部署上线

我们在这里主要关心步骤2~4，因为与 AI 结合得比较紧密。虽然需求分析也可以借助 AI，但不是本文的重点，故不做讨论。
## 程序设计
经过需求分析、逻辑梳理后，在编写实际代码前，需要进行程序设计。

此环节的产物是设计文档，是什么类型的设计文档不重要，重要的是伪代码的输出。

虽然《Code Complete》早就推荐过伪代码的实践，但对此人们容易有一个误区：认为写伪代码花的时间，已经够把实际代码写好了。但 AIGC 时代，此问题可以轻松破解：AI 写代码的速度肯定比人快，因此，只要能找到方法能让 AI 生成符合需求的代码，就值得花时间去研究。而伪代码，就是让 AI 快速生成符合期望的实际代码的最好方式。

为什么这么说呢？因为想要让 AIGC 符合期望，恰当的 Prompt 必不可少。但如何写好这个 Prompt，需要提供多少上下文，才能让 AI 更好地理解我们的意图，这是需要技巧、需要调试的。而经过精心设计的伪代码，本身已经提供了足够的上下文，且意图足够聚焦，减轻了对 Prompt 的要求，又提高了 AIGC 的成功率。 

我们来看一下伪代码示例：
```javascript
plainText = JSON.stringify(data)
digest = hash(plainText) // 防篡改
secret = Symmetric.getKey()  
cipherText = encryptText(data, secret) // 防内容泄密


pair = Asymmetric.getPair()
cipherSecret = encryptKey(secret, pair.getPrivateKey()) // 防密钥泄露

return {
    digest,  
    cipherText, 
    cipherSecret,
    pair.getPublicKey(),
}
```
上述代码主要表达的内容是：

1. 对初始数据进行加密
2. 返回加密后的相关内容
3. 涉及到了一系列的算法

对于伪代码的编写，有如以建议：

1. 不要纠结类型，不要局限于某一种编程语言的语法，不用试图写能编译通过的代码——这只会限制了你的表达
2. 命名一定要准确，符合领域术语，这一点很关键。这一点可以通过查找资料、看书、问 AI 来实现。千万不要只是生硬地汉译英，不专业的表达会妨碍 AI 的理解 
## 代码编写
代码编写分为以下几步：

1. 把伪代码转换成目标语言可执行的代码
2. 根据项目情况，对生成的代码进行改造
3. 利用 AI 编码辅助工具编写剩余的代码

### 生成真实代码
让 AI 生成代码的 prompt 很简单，示例如下：
```
please transform the following pseudo code into practical Java code ```
your code```
```
根据实际情况，把 Java 替换成 Node.js/Python/Go 即可。

使用 chatGPT 结果截图：
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1689239437556-36a14986-6114-44e1-b07c-c38a288874db.png)

完整代码如下：
```java
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.*;

public class EncryptionExample {

    public static void main(String[] args) throws Exception {
        // Prepare the license data
        LicenseData licenseData = new LicenseData();
        licenseData.setLicenseId("123");
        licenseData.setLicenseType("Standard");

        // Convert the license data to JSON string
        ObjectMapper objectMapper = new ObjectMapper();
        String plainText = objectMapper.writeValueAsString(licenseData);

        // Hash the plain text
        String digest = hash(plainText);

        // Generate a symmetric key
        SecretKey secretKey = generateSymmetricKey();

        // Encrypt the license data with the symmetric key
        byte[] cipherText = encryptText(plainText, secretKey);

        // Generate an asymmetric key pair
        KeyPair keyPair = generateAsymmetricKeyPair();

        // Encrypt the symmetric key with the private key
        byte[] cipherSecret = encryptKey(secretKey.getEncoded(), keyPair.getPrivate());

        // Print the results
        System.out.println("Plain Text: " + plainText);
        System.out.println("Digest: " + digest);
        System.out.println("Cipher Text: " + new String(cipherText));
        System.out.println("Cipher Secret: " + new String(cipherSecret));
    }

    public static String hash(String input) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(input.getBytes());
        return bytesToHex(hash);
    }

    public static SecretKey generateSymmetricKey() throws NoSuchAlgorithmException {
        KeyGenerator keyGenerator = KeyGenerator.getInstance("AES");
        keyGenerator.init(128);
        return keyGenerator.generateKey();
    }

    public static byte[] encryptText(String data, SecretKey key) throws Exception {
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, key);
        return cipher.doFinal(data.getBytes());
    }

    public static byte[] encryptKey(byte[] secret, PrivateKey privateKey) throws Exception {
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.ENCRYPT_MODE, privateKey);
        return cipher.doFinal(secret);
    }

    public static KeyPair generateAsymmetricKeyPair() throws NoSuchAlgorithmException {
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
        keyPairGenerator.initialize(2048);
        return keyPairGenerator.generateKeyPair();
    }

    public static String bytesToHex(byte[] bytes) {
        StringBuilder result = new StringBuilder();
        for (byte b : bytes) {
            result.append(String.format("%02x", b));
        }
        return result.toString();
    }

    public static class LicenseData {
        private String licenseId;
        private String licenseType;

        public String getLicenseId() {
            return licenseId;
        }

        public void setLicenseId(String licenseId) {
            this.licenseId = licenseId;
        }

        public String getLicenseType() {
            return licenseType;
        }

        public void setLicenseType(String licenseType) {
            this.licenseType = licenseType;
        }
    }
}
```
把上述代码 copy 下来，放到工程中，根据需要改造即可。 

这里特别要说下，强烈推荐使用原版 AI，而不是寻找平替，同样的 prompt，下图是某一中文平替输出的结果：
只生成了函数声明，没有生成函数实现。二者对比，未免相形见绌。
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1688721631064-514593cc-21d3-4851-8f41-71e776658295.png)

### 辅助编程工具
改造的过程中，少不了 AI pair programming tools。对此，我推荐使用 Amazon 的 CodeWhisperer，原因很简单，跟 GitHub Copilot 相比，它是免费的😃。

CodeWhisperer 的安装可以看文末的安装教程，我们先来看一下它是怎么辅助我们编码的。

第一种方式是最简单的，那就是什么都不管，等待智能提示即可，就好像 IDEA 原来的提示一样，只不过更智能。

下图示例中，要把原来的中文异常提示，修改成英文，而我只输入了两个字符 `IM`， 就得到了智能提示，补全了完整的英文字符串！
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1689230327179-e9bf9c63-7081-41ca-8720-840f0f7f7c77.png)
可以注意到，上图的智能建议一共有 5 条，相应的快捷键为：

1. 方向键 ->，查看下一条提示
2. 方向键 <-，查看上一条提示
3. Tab，采用该提示
4. Esc，拒绝提示

我们再来看第二种 CodeWhisperer 的使用方式，编写注释，获得编码建议。
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1689301926714-26dc940a-9762-4b3b-ab3d-f59cff96d54d.gif#averageHue=%23436733&clientId=u2b1600a8-64be-4&from=paste&height=720&id=u7ba54448&originHeight=720&originWidth=1280&originalType=binary&ratio=1&rotation=0&showTitle=false&size=663291&status=done&style=none&taskId=ufeb3c36e-8e32-419e-bbe3-8acd6f88063&title=&width=1280)
最后一种就是编写一个空函数，让 CodeWhisperer 根据函数名去猜测函数的实现，这种情况需要足够的上下文，才能得到令人满意的结果。
## 软件测试
AI 生成的内容，并不是完全可信任的，因此，单元测试的重要性变得尤为突出。

对上述代码编写测试代码后，实际上并不能一次通过，因为前面 AI 生成的代码参数有误。

此时需要一边执行单测，一边根据结果与 AI 进行交互：
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1689240199090-8daed9cd-273d-406d-9f20-60ba66732436.png)

经过修改，最终测试用例通过👏！
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1689240017776-4f52a685-d749-4af3-8061-94c4befe3e8b.png)
## 总结 
本文通过案例，展示了 AI 如何结合软件研发的流程，提升我们的编程效率的。

其中，个人认为最重要的是编写伪代码与进行单元测试。有趣的是，这两样实践在 AIGC 时代之前，就已经被认为是最佳实践。这给我们启示：某些方法论、实践经得起时间的考验，技术更新迭代，它们历久弥新。

对于AI编程的到底应该怎么看，其实 GitHub Copilot 的产品标语已经很好地概括了：Your AI pair programmer。在结队编程里，由两个人一起来进行编程活动。一个是 Navigator，负责指导、审查，另一个 Driver，负责具体的代码编写。AI 的出现，其实是取代了 Driver 的角色，而另一个充当 Navigator 角色的人，仍然是不可或缺的。

最后，AI 是否能进一步渗透我们的工作流，还有待探索。此文作引抛砖引玉之用，期待大家的后续分享。
 
## 附：CodeWhisperer 安装
下载 2023 年的 IDEA，打开 Plugins Marketplace，找到 AWS Toolkit
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1688371554642-c3105125-ac08-4d22-8da5-c6cec8b898fa.png)

安装完成、重启 IDEA 后，点击左下角，按下图所示操作：
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1688371684736-b48a0257-1aa1-442f-b998-05aa79bf0863.png)

![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1688371750789-6aabc4d0-512e-44bc-9c12-13d02c9f8527.png)

如果第一次使用，就点击 1 处进行注册，如果已经有账号了，就点击 2 处使用自己的账号登录。
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1688371861568-6da13369-3074-4f4e-86e6-0a2c8738b30c.png)
注册、登录、授权成功后，出现如图所示页面，即可使用 CodeWhisperer。
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1688371897998-369e984e-f5b8-4c4b-bc56-897015092549.png)


