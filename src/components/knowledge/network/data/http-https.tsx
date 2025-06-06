import { QuestionCard } from "../../../base/knowledge_question_card"
import { ExpandableCode } from "../../../base/expandable_code"
import { InfoCard } from "../../../card/info_card"
import { WarningCard } from "../../../card/warning_card"
import { SuccessCard } from "../../../card/success_card"

/**
 * # HTTP vs HTTPS：安全性与性能对比
 */
export function NetworkHttpHttps({ id }: { id: string }) {
    return (
        <QuestionCard question={{
            id,
            title: "HTTP vs HTTPS：安全性与性能对比",
            category: "网络协议",
            content: "深入理解 HTTP 和 HTTPS 协议的区别，包括加密机制、证书验证、性能影响以及安全性考虑。",
            tags: ["HTTP", "HTTPS", "SSL/TLS", "证书", "加密"]
        }}>
            <div className="space-y-6">
                {/* 协议对比 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <WarningCard title="HTTP">
                        <div className="space-y-2 text-sm">
                            <p><strong>端口：</strong>80</p>
                            <p><strong>安全性：</strong>明文传输</p>
                            <p><strong>性能：</strong>连接快</p>
                            <p><strong>适用：</strong>非敏感数据</p>
                            <div className="badge badge-error">不安全</div>
                        </div>
                    </WarningCard>

                    <SuccessCard title="HTTPS">
                        <div className="space-y-2 text-sm">
                            <p><strong>端口：</strong>443</p>
                            <p><strong>安全性：</strong>SSL/TLS加密</p>
                            <p><strong>性能：</strong>握手开销</p>
                            <p><strong>适用：</strong>所有场景</p>
                            <div className="badge badge-success">安全</div>
                        </div>
                    </SuccessCard>
                </div>

                {/* HTTPS握手过程 */}
                <InfoCard title="HTTPS 握手过程">
                    <div className="space-y-4">
                        <div className="steps steps-vertical lg:steps-horizontal">
                            <div className="step step-primary">Client Hello</div>
                            <div className="step step-primary">Server Hello</div>
                            <div className="step step-primary">证书验证</div>
                            <div className="step step-primary">密钥交换</div>
                            <div className="step step-primary">加密通信</div>
                        </div>
                        
                        <ExpandableCode language="javascript">
{`// HTTPS握手过程详解
1. Client Hello
   - 客户端发送支持的加密套件
   - 随机数（Client Random）
   - 支持的TLS版本

2. Server Hello
   - 服务器选择加密套件
   - 随机数（Server Random）
   - 会话ID

3. 证书验证
   - 服务器发送SSL证书
   - 客户端验证证书有效性
   - 检查证书链和域名匹配

4. 密钥交换
   - 客户端生成预主密钥
   - 使用服务器公钥加密发送
   - 双方计算主密钥

5. 加密通信开始
   - 使用对称加密传输数据
   - 每个数据包都有MAC验证`}
                        </ExpandableCode>
                    </div>
                </InfoCard>

                {/* 加密机制 */}
                <SuccessCard title="SSL/TLS 加密机制">
                    <ExpandableCode language="javascript">
{`// TLS加密组合示例
TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384

解析：
- TLS: 协议版本
- ECDHE: 椭圆曲线迪菲-赫尔曼密钥交换
- RSA: 身份验证算法
- AES_256_GCM: 对称加密算法（256位AES-GCM模式）
- SHA384: 消息认证码算法

// 前端检查HTTPS状态
function checkHttpsStatus() {
  const protocol = window.location.protocol;
  const isSecure = protocol === 'https:';
  
  console.log('协议:', protocol);
  console.log('是否安全:', isSecure);
  
  // 检查混合内容
  if (isSecure) {
    // 所有资源都应该是HTTPS
    const resources = document.querySelectorAll('img, script, link');
    resources.forEach(resource => {
      const src = resource.src || resource.href;
      if (src && src.startsWith('http://')) {
        console.warn('混合内容警告:', src);
      }
    });
  }
  
  return isSecure;
}

// 检查证书信息（需要服务器支持）
fetch('/api/cert-info', {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
}).then(response => {
  console.log('证书信息:', response.headers);
});`}
                    </ExpandableCode>
                </SuccessCard>

                {/* 性能对比 */}
                <InfoCard title="性能影响分析">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full text-sm">
                            <thead>
                                <tr>
                                    <th>方面</th>
                                    <th>HTTP</th>
                                    <th>HTTPS</th>
                                    <th>优化建议</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>连接建立</td>
                                    <td>3次握手</td>
                                    <td>3次握手 + TLS握手</td>
                                    <td>HTTP/2, 连接复用</td>
                                </tr>
                                <tr>
                                    <td>数据传输</td>
                                    <td>直接传输</td>
                                    <td>加密/解密开销</td>
                                    <td>硬件加速, AES-NI</td>
                                </tr>
                                <tr>
                                    <td>CPU使用</td>
                                    <td>低</td>
                                    <td>中等</td>
                                    <td>现代CPU影响很小</td>
                                </tr>
                                <tr>
                                    <td>首次访问</td>
                                    <td>快</td>
                                    <td>慢200-500ms</td>
                                    <td>HSTS预加载</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </InfoCard>

                {/* 安全威胁 */}
                <WarningCard title="HTTP 安全威胁">
                    <div className="space-y-4">
                        <div>
                            <h5 className="font-semibold text-warning">🚨 中间人攻击 (MITM)</h5>
                            <p className="text-sm mt-1">攻击者可以拦截、修改HTTP通信内容</p>
                            <ExpandableCode language="javascript">
{`// HTTP请求容易被拦截
fetch('http://api.example.com/login', {
  method: 'POST',
  body: JSON.stringify({
    username: 'user',
    password: 'password123' // 明文传输，不安全！
  })
});

// HTTPS请求加密传输
fetch('https://api.example.com/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'user',
    password: 'password123' // 加密传输，安全
  })
});`}
                            </ExpandableCode>
                        </div>
                        
                        <div>
                            <h5 className="font-semibold text-warning">🔍 窃听攻击</h5>
                            <p className="text-sm mt-1">敏感信息（密码、令牌、个人数据）可被窃取</p>
                        </div>
                        
                        <div>
                            <h5 className="font-semibold text-warning">🔄 内容篡改</h5>
                            <p className="text-sm mt-1">网页内容可被恶意修改，注入恶意代码</p>
                        </div>
                    </div>
                </WarningCard>

                {/* 最佳实践 */}
                <SuccessCard title="HTTPS 实施最佳实践">
                    <div className="space-y-3">
                        <div>
                            <h5 className="font-semibold">🔐 强制HTTPS</h5>
                            <ExpandableCode language="javascript">
{`// 1. HTTP重定向到HTTPS
if (location.protocol !== 'https:') {
  location.replace('https:' + window.location.href.substring(window.location.protocol.length));
}

// 2. 设置HSTS头部（服务器端）
// Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

// 3. 使用CSP防止混合内容
// Content-Security-Policy: upgrade-insecure-requests

// 4. 检查所有外部资源
const secureResourceCheck = () => {
  const insecureResources = [];
  document.querySelectorAll('img, script, link, iframe').forEach(el => {
    const url = el.src || el.href;
    if (url && url.startsWith('http://')) {
      insecureResources.push(url);
    }
  });
  
  if (insecureResources.length > 0) {
    console.warn('发现不安全资源:', insecureResources);
  }
};`}
                            </ExpandableCode>
                        </div>
                        
                        <div>
                            <h5 className="font-semibold">📋 证书管理</h5>
                            <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                                <li>使用可信的CA颁发的证书</li>
                                <li>定期更新证书，避免过期</li>
                                <li>配置证书链，包含中间证书</li>
                                <li>启用OCSP装订提高性能</li>
                            </ul>
                        </div>
                    </div>
                </SuccessCard>

                {/* HTTP/2 与 HTTPS */}
                <InfoCard title="HTTP/2 与 HTTPS">
                    <div className="space-y-3">
                        <p className="text-sm">HTTP/2 在实践中几乎总是与HTTPS一起使用，带来额外的性能优势：</p>
                        <ul className="list-disc list-inside text-sm space-y-1">
                            <li><strong>多路复用：</strong>单个连接处理多个请求</li>
                            <li><strong>服务器推送：</strong>主动推送资源</li>
                            <li><strong>头部压缩：</strong>减少重复头部开销</li>
                            <li><strong>二进制协议：</strong>更高效的数据传输</li>
                        </ul>
                        
                        <ExpandableCode language="javascript">
{`// 检查HTTP/2支持
fetch('/api/data').then(response => {
  console.log('HTTP版本:', response.headers.get('http-version'));
  
  // 检查是否支持Server Push
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(reg => {
      console.log('Service Worker支持HTTP/2推送');
    });
  }
});

// 利用HTTP/2特性优化加载
const optimizedLoad = async () => {
  // 并行请求多个资源（HTTP/2多路复用）
  const [data1, data2, data3] = await Promise.all([
    fetch('/api/data1'),
    fetch('/api/data2'),
    fetch('/api/data3')
  ]);
  
  return {
    data1: await data1.json(),
    data2: await data2.json(),
    data3: await data3.json()
  };
};`}
                        </ExpandableCode>
                    </div>
                </InfoCard>
            </div>
        </QuestionCard>
    );
} 