import { QuestionCard } from "../../../../base/knowledge_question_card";
import { InfoCard } from "../../../../card/info_card";
import { WarningCard } from "../../../../card/warning_card";
import { SuccessCard } from "../../../../card/success_card";
import { SecondaryCard } from "../../../../card/secondary_card";
import { ExpandableCode } from "../../../../base/expandable_code";

interface Props {
    id: string;
}

export function GoWebDevelopment({ id }: Props) {
    return (
        <QuestionCard
            question={{
                id,
                title: "Go Web 开发",
                category: "Go",
                content: "如何使用 Go 语言进行 Web 开发？包括标准库 `net/http` 和常用框架如 Gin 或 Echo。",
                tags: ["Go", "Golang", "Web开发", "net/http", "Gin", "Echo", "API"]
            }}
        >
            <div className="space-y-6">
                <SuccessCard title="核心概要">
                    <p>Go 语言凭借其<strong>出色的性能、简洁的语法以及强大的并发处理能力</strong>，成为构建现代 Web 应用和 API 的热门选择。其<strong>强大的标准库 `net/http`</strong> 提供了构建 Web 服务的基础功能，而诸如 <strong>Gin、Echo 等流行框架</strong>则进一步简化了开发流程，提供了更高级的特性如路由、中间件和模板渲染等。</p>
                </SuccessCard>

                <SecondaryCard title="标准库 `net/http`">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold">创建简单 HTTP 服务器</h4>
                            <p>使用 <code>net/http</code> 包可以轻松启动一个 HTTP 服务器。</p>
                            <ExpandableCode language="go" maxHeight={150}>
{`package main

import (
    "fmt"
    "net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, Web with Go!")
}

func main() {
    http.HandleFunc("/hello", helloHandler) // 注册处理器函数
    fmt.Println("Starting server on :8080")
    err := http.ListenAndServe(":8080", nil) // nil 表示使用默认的 ServeMux
    if err != nil {
        fmt.Println("Error starting server:", err)
    }
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold">处理请求与响应</h4>
                            <p>处理器函数接收 <code>http.ResponseWriter</code> 和 <code>*http.Request</code> 两个参数。<code>ResponseWriter</code> 用于构建 HTTP 响应，<code>Request</code> 包含了 HTTP 请求的信息。</p>
                            <ExpandableCode language="go" maxHeight={120}>
{`func requestInfoHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Method: %s\\n", r.Method)
    fmt.Fprintf(w, "URL Path: %s\\n", r.URL.Path)
    fmt.Fprintf(w, "Host: %s\\n", r.Host)
    // ... 更多请求信息
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold">路由 (Routing)</h4>
                            <p><code>http.HandleFunc</code> 用于将 URL 路径映射到处理器函数。<code>http.ServeMux</code> 是 HTTP 请求路由器（也称为 multiplexer），可以创建自定义的路由器实例。</p>
                            <ExpandableCode language="go" maxHeight={150}>
{`package main

import (
    "fmt"
    "net/http"
)

func main() {
    mux := http.NewServeMux() // 创建新的 ServeMux
    mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprint(w, "Default Route")
    })
    mux.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprint(w, "Users Route")
    })

    fmt.Println("Starting server on :8081 with custom mux")
    http.ListenAndServe(":8081", mux) // 使用自定义 mux
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold">查询参数和表单数据</h4>
                            <p>通过 <code>r.URL.Query()</code> 获取查询参数，<code>r.ParseForm()</code> 和 <code>r.FormValue()</code> 或 <code>r.PostFormValue()</code> 获取表单数据。</p>
                            <ExpandableCode language="go" maxHeight={150}>
{`func queryHandler(w http.ResponseWriter, r *http.Request) {
    // /query?name=Alice&age=30
    name := r.URL.Query().Get("name")
    age := r.URL.Query().Get("age")
    fmt.Fprintf(w, "Name: %s, Age: %s", name, age)
}

func formHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method == http.MethodPost {
        r.ParseForm() // 解析 application/x-www-form-urlencoded 数据
        username := r.FormValue("username")
        // username := r.PostFormValue("username") // 等价
        fmt.Fprintf(w, "Username from form: %s", username)
        return
    }
    // 显示表单 (简单示例)
    w.Header().Set("Content-Type", "text/html")
    fmt.Fprint(w, "<form method='POST'><input name='username'/><button type='submit'>Submit</button></form>")
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold">提供静态文件</h4>
                            <p><code>http.FileServer</code> 和 <code>http.StripPrefix</code> 用于提供静态文件（如 CSS、JS、图片）。</p>
                            <ExpandableCode language="go" maxHeight={100}>
{`// 假设 ./static 目录下存放静态文件
fs := http.FileServer(http.Dir("./static/"))
// 访问 /static/style.css 会映射到 ./static/style.css
http.Handle("/static/", http.StripPrefix("/static/", fs))`}
                            </ExpandableCode>
                        </div>
                         <div>
                            <h4 className="font-semibold">中间件 (Middleware)</h4>
                            <p>中间件是一种包装处理器函数以添加额外功能（如日志、认证、CORS）的常用模式。它本质上是一个接收 <code>http.Handler</code> 并返回新的 <code>http.Handler</code> 的函数。</p>
                            <ExpandableCode language="go" maxHeight={150}>
{`func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        fmt.Printf("Request: %s %s\\n", r.Method, r.URL.Path)
        next.ServeHTTP(w, r) // 调用下一个处理器
        // 可以在这里记录响应信息
    })
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/hello", helloHandler)

    loggedMux := loggingMiddleware(mux) // 应用中间件

    http.ListenAndServe(":8080", loggedMux)
}`}
                            </ExpandableCode>
                        </div>
                    </div>
                </SecondaryCard>

                <SecondaryCard title="Web 框架简介 (Gin/Echo)">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold">为什么使用框架?</h4>
                            <p>虽然标准库 <code>net/http</code> 很强大，但对于更复杂的应用，Web 框架可以提供诸多便利：</p>
                            <ul className="list-disc pl-5">
                                <li><strong>高级路由:</strong> 参数化路由、路由组、更灵活的匹配规则。</li>
                                <li><strong>中间件管理:</strong> 更易于组合和管理中间件链。</li>
                                <li><strong>请求绑定与校验:</strong> 自动将请求数据（JSON, XML, Query等）绑定到结构体并进行校验。</li>
                                <li><strong>模板渲染:</strong> 集成模板引擎，方便动态生成 HTML。</li>
                                <li><strong>错误处理:</strong> 统一的错误处理机制。</li>
                                <li><strong>上下文管理:</strong> 通常提供一个上下文对象，在请求处理链中传递数据。</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold">Gin 框架</h4>
                            <p>Gin 是一个高性能的 HTTP Web 框架，以其类似 Martini 的 API 和出色的性能著称。</p>
                            <ExpandableCode language="go" maxHeight={120}>
{`package main

import (
    "net/http"
    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default() // Default() 包含了 Logger 和 Recovery 中间件
    r.GET("/ping", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{
            "message": "pong",
        })
    })
    r.Run(":8082") // 默认监听并在 0.0.0.0:8080 上启动服务
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold">Echo 框架</h4>
                            <p>Echo 是一个高性能、可扩展、极简的 Go Web 框架。它提供了强大的路由、中间件生态和灵活的模板渲染。</p>
                            <ExpandableCode language="go" maxHeight={120}>
{`package main

import (
    "net/http"
    "github.com/labstack/echo/v4"
)

func main() {
    e := echo.New()
    e.GET("/", func(c echo.Context) error {
        return c.String(http.StatusOK, "Hello, World from Echo!")
    })
    e.GET("/ping", func(c echo.Context) error {
        return c.JSON(http.StatusOK, map[string]string{"message": "pong"})
    })
    e.Logger.Fatal(e.Start(":8083"))
}`}
                            </ExpandableCode>
                        </div>
                        <p className="text-sm text-base-content/70">注意：上述仅为最简示例。Gin 和 Echo 都拥有丰富的功能集，详细使用方法会是独立的、更广泛的主题。</p>
                    </div>
                </SecondaryCard>

                <SecondaryCard title="构建 RESTful API">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold">REST 原则</h4>
                            <p>REST (Representational State Transfer) 是一种用于设计网络应用的架构风格。核心原则包括：</p>
                            <ul className="list-disc pl-5">
                                <li><strong>客户端-服务器架构:</strong> 清晰分离关注点。</li>
                                <li><strong>无状态 (Stateless):</strong> 每个来自客户端的请求都应包含所有必要信息，服务器不存储客户端状态。</li>
                                <li><strong>可缓存 (Cacheable):</strong> 响应应该可以被标记为可缓存或不可缓存。</li>
                                <li><strong>统一接口 (Uniform Interface):</strong> 使用标准 HTTP 方法 (GET, POST, PUT, DELETE, PATCH等)，通过 URI 标识资源。</li>
                                <li><strong>分层系统 (Layered System):</strong> 客户端通常不知道它是否与最终服务器或中间层通信。</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold">JSON 处理</h4>
                            <p>Go 的 <code>encoding/json</code> 包提供了对 JSON 的强大支持，包括序列化 (<code>json.Marshal</code>) 和反序列化 (<code>json.Unmarshal</code>)。</p>
                            <ExpandableCode language="go" maxHeight={180}>
{`package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

type User struct {
    ID   int    \`json:"id"\` // struct tag 控制 JSON 字段名
    Name string \`json:"name"\`
    Age  int    \`json:"age"\`
}

func getUserHandler(w http.ResponseWriter, r *http.Request) {
    user := User{ID: 1, Name: "Alice", Age: 30}
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(user) // 直接将 struct 编码为 JSON 并写入 ResponseWriter
}

func createUserHandler(w http.ResponseWriter, r *http.Request) {
    var user User
    // 从请求体解码 JSON 到 user struct
    err := json.NewDecoder(r.Body).Decode(&user)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
    fmt.Printf("Created user: %+v\\n", user)
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(user)
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold">API 路由结构</h4>
                            <p>设计清晰、一致的 API 路由结构非常重要。例如：</p>
                            <ul className="list-disc pl-5">
                                <li><code>GET /users</code> - 获取用户列表</li>
                                <li><code>POST /users</code> - 创建新用户</li>
                                <li><code>GET /users/{id}</code> - 获取特定 ID 的用户</li>
                                <li><code>PUT /users/{id}</code> - 更新特定 ID 的用户</li>
                                <li><code>DELETE /users/{id}</code> - 删除特定 ID 的用户</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold">请求校验与 HTTP 状态码</h4>
                            <p>对 API 输入进行校验至关重要。返回正确的 HTTP 状态码可以清晰地向客户端传达操作结果（如 <code>200 OK</code>, <code>201 Created</code>, <code>400 Bad Request</code>, <code>404 Not Found</code>, <code>500 Internal Server Error</code> 等）。</p>
                        </div>
                    </div>
                </SecondaryCard>

                <InfoCard title="模板与部署">
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong><code>html/template</code>:</strong> Go 标准库提供了 <code>html/template</code> 和 <code>text/template</code> 包用于服务器端渲染。<code>html/template</code> 更安全，能自动处理 HTML 转义，防止 XSS 攻击。</li>
                        <li><strong>部署 Go Web 应用:</strong>
                            <ul className="list-disc pl-5">
                                <li><strong>构建二进制文件:</strong> Go 可以交叉编译为单个静态链接的二进制可执行文件，不依赖外部库，部署非常方便。只需将编译好的文件复制到服务器并运行即可。</li>
                                <li><strong>Docker:</strong> 将 Go 应用打包到 Docker 容器中是现代部署的常用方法。可以创建一个非常小的 Docker 镜像，因为 Go 应用通常没有太多运行时依赖。</li>
                                <li><strong>配置管理:</strong> 可以通过环境变量、配置文件（JSON, YAML, TOML）或配置服务来管理应用配置。</li>
                                <li><strong>反向代理:</strong> 通常在 Go 应用前部署一个反向代理服务器（如 Nginx, Caddy）来处理 HTTPS、负载均衡、静态文件服务等。</li>
                            </ul>
                        </li>
                    </ul>
                </InfoCard>
            </div>
        </QuestionCard>
    );
}
