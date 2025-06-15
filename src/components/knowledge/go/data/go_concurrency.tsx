import { QuestionCard } from "../../../base/knowledge_question_card";
import { InfoCard } from "../../../card/info_card";
import { SuccessCard } from "../../../card/success_card";
import { SecondaryCard } from "../../../card/secondary_card";
import { ExpandableCode } from "../../../base/expandable_code";

interface Props {
    id: string;
}

export function GoConcurrency({ id }: Props) {
    return (
        <QuestionCard
            question={{
                id,
                title: "Go 并发编程：Goroutines 与 Channels",
                category: "Go",
                content: "Go语言中 Goroutines 和 Channels 是如何工作的？它们如何实现高效并发？",
                tags: ["Go", "Golang", "并发", "Goroutines", "Channels", "CSP"]
            }}
        >
            <div className="space-y-6">
                <SuccessCard title="核心概要">
                    <p>Go 语言的并发模型基于<strong>通信顺序进程 (CSP, Communicating Sequential Processes)</strong>。它通过轻量级的 <strong>Goroutines</strong> 和用于它们之间通信的 <strong>Channels</strong> 来实现。Go 的核心理念是：<strong>“不要通过共享内存来通信；而是通过通信来共享内存。”</strong> 这使得编写高并发程序更为简单和安全。</p>
                </SuccessCard>

                <SecondaryCard title="Goroutines">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold">什么是 Goroutines?</h4>
                            <p>Goroutine 是 Go 语言中与其他函数或方法同时运行的函数或方法。可以认为 Goroutine 是轻量级的线程，由 Go 运行时管理。它们占用的内存非常小（几 KB），并且可以动态伸缩，使得可以轻松创建成千上万个 Goroutine。</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">启动 Goroutine</h4>
                            <p>使用 <code>go</code> 关键字在函数或方法调用前加上，即可启动一个新的 Goroutine。</p>
                            <ExpandableCode language="go" maxHeight={120}>
{`package main

import (
    "fmt"
    "time"
)

func say(s string) {
    for i := 0; i < 3; i++ {
        fmt.Println(s)
        time.Sleep(100 * time.Millisecond)
    }
}

func main() {
    go say("Hello") // 启动一个新的 Goroutine 执行 say("Hello")
    say("World")    // 当前 Goroutine 执行 say("World")
    // 注意：程序在 main Goroutine 结束后会立即退出，可能不会等待其他 Goroutine 执行完毕
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold"><code>sync.WaitGroup</code> 等待 Goroutines</h4>
                            <p>为了等待多个 Goroutine 完成，可以使用 <code>sync.WaitGroup</code>。它有三个方法：<code>Add(delta int)</code> 增加计数器，<code>Done()</code> 减少计数器，<code>Wait()</code> 阻塞直到计数器为零。</p>
                            <ExpandableCode language="go" maxHeight={180}>
{`package main

import (
    "fmt"
    "sync"
    "time"
)

func worker(id int, wg *sync.WaitGroup) {
    defer wg.Done() // 在函数返回时通知 WaitGroup 完成

    fmt.Printf("Worker %d starting\\n", id)
    time.Sleep(time.Second)
    fmt.Printf("Worker %d done\\n", id)
}

func main() {
    var wg sync.WaitGroup

    for i := 1; i <= 3; i++ {
        wg.Add(1) // 增加计数器
        go worker(i, &wg)
    }

    wg.Wait() // 等待所有 Goroutine 完成
    fmt.Println("All workers done")
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold">匿名函数 Goroutines</h4>
                            <p>可以直接使用匿名函数启动 Goroutine。</p>
                            <ExpandableCode language="go" maxHeight={100}>
{`package main

import (
    "fmt"
    "time"
)

func main() {
    go func(msg string) {
        fmt.Println(msg)
    }("Going") // 启动匿名函数 Goroutine 并传递参数

    time.Sleep(time.Second) // 等待 Goroutine 执行
    fmt.Println("Done")
}`}
                            </ExpandableCode>
                        </div>
                    </div>
                </SecondaryCard>

                <SecondaryCard title="Channels">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold">什么是 Channels?</h4>
                            <p>Channel 是用于 Goroutine 之间通信的管道。你可以把它想象成一个类型化的导管，通过它你可以发送和接收特定类型的值。操作符 <code>&lt;-</code> 用于发送或接收值。</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">创建、发送与接收</h4>
                            <p>使用 <code>make(chan val-type)</code> 创建 Channel。发送和接收操作在另一端准备好之前都会阻塞。</p>
                            <ExpandableCode language="go" maxHeight={150}>
{`package main

import "fmt"

func main() {
    messages := make(chan string) // 创建一个字符串类型的 Channel

    go func() {
        messages <- "ping" // 发送 "ping" 到 Channel
    }()

    msg := <-messages // 从 Channel 接收消息
    fmt.Println(msg)  // 输出 "ping"
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold">缓冲 Channels (Buffered Channels)</h4>
                            <p>默认情况下，Channel 是无缓冲的，意味着只有在对应的接收方准备好接收时，发送方才会发送成功。缓冲 Channel 允许在没有相应接收方的情况下，限制数量的值存储在 Channel 中。使用 <code>make(chan val-type, buffer-capacity)</code> 创建。</p>
                            <ExpandableCode language="go" maxHeight={100}>
{`package main

import "fmt"

func main() {
    // 创建一个可以缓冲2个字符串的 Channel
    messages := make(chan string, 2)

    messages <- "buffered"
    messages <- "channel"
    // messages <- "overflow" // 如果再发送一个会导致死锁，因为缓冲区已满且无接收者

    fmt.Println(<-messages)
    fmt.Println(<-messages)
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold">关闭 Channel 与 <code>for...range</code></h4>
                            <p>发送者可以 <code>close</code> 一个 Channel 来表示没有更多的值会被发送。接收者可以通过 <code>v, ok := &lt;-ch</code> 的第二个返回值 <code>ok</code> 来测试 Channel 是否已经关闭。<code>for i := range c</code> 循环会不断从 Channel 接收值，直到它被关闭。</p>
                            <ExpandableCode language="go" maxHeight={180}>
{`package main

import "fmt"

func main() {
    jobs := make(chan int, 5)
    done := make(chan bool)

    go func() {
        for {
            j, more := <-jobs // 'more' 为 false 表示 jobs 已关闭
            if more {
                fmt.Println("received job", j)
            } else {
                fmt.Println("received all jobs")
                done <- true
                return
            }
        }
    }()

    for j := 1; j <= 3; j++ {
        jobs <- j
        fmt.Println("sent job", j)
    }
    close(jobs) // 关闭 jobs Channel
    fmt.Println("sent all jobs")

    <-done // 等待 Goroutine 完成

    // 使用 for...range 遍历 Channel
    queue := make(chan string, 2)
    queue <- "one"
    queue <- "two"
    close(queue)

    for elem := range queue { // 会在 Channel 关闭后自动结束循环
        fmt.Println(elem)
    }
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold">定向 Channels (Directional Channels)</h4>
                            <p>当将 Channel 作为函数参数时，可以指定其方向（只发送或只接收）。这增加了程序的类型安全性。</p>
                            <ExpandableCode language="go" maxHeight={120}>
{`package main

import "fmt"

// ping 函数只能向 pings Channel 发送数据 (chan<- string)
func ping(pings chan<- string, msg string) {
    pings <- msg
}

// pong 函数只能从 pings Channel 接收数据 (<-chan string)
// 并向 pongs Channel 发送数据 (chan<- string)
func pong(pings <-chan string, pongs chan<- string) {
    msg := <-pings
    pongs <- msg
}

func main() {
    pings := make(chan string, 1)
    pongs := make(chan string, 1)
    ping(pings, "passed message")
    pong(pings, pongs)
    fmt.Println(<-pongs)
}`}
                            </ExpandableCode>
                        </div>
                    </div>
                </SecondaryCard>

                <SecondaryCard title="Select 语句">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold">目的与语法</h4>
                            <p><code>select</code> 语句让一个 Goroutine 可以等待多个通信操作。<code>select</code> 会阻塞，直到其某个 <code>case</code> 可以运行，然后它就会执行那个 <code>case</code>。如果多个 <code>case</code> 同时准备就绪，它会随机选择一个。</p>
                            <ExpandableCode language="go" maxHeight={200}>
{`package main

import (
    "fmt"
    "time"
)

func main() {
    c1 := make(chan string)
    c2 := make(chan string)

    go func() {
        time.Sleep(1 * time.Second)
        c1 <- "one"
    }()
    go func() {
        time.Sleep(2 * time.Second)
        c2 <- "two"
    }()

    for i := 0; i < 2; i++ { // 等待两个消息
        select {
        case msg1 := <-c1:
            fmt.Println("received", msg1)
        case msg2 := <-c2:
            fmt.Println("received", msg2)
        }
    }
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold">超时 (Timeout) 与默认 (Default)</h4>
                            <p><code>select</code> 的 <code>default</code> case 使得可以实现非阻塞的发送、接收，甚至是非阻塞的多路 <code>select</code>。<code>time.After</code> 可以在 <code>select</code> 中用于实现超时。</p>
                            <ExpandableCode language="go" maxHeight={180}>
{`package main

import (
    "fmt"
    "time"
)

func main() {
    ch := make(chan string, 1)

    // 非阻塞接收
    select {
    case msg := <-ch:
        fmt.Println("received message", msg)
    default:
        fmt.Println("no message received")
    }

    // 非阻塞发送
    msg := "hi"
    select {
    case ch <- msg:
        fmt.Println("sent message", msg)
    default:
        fmt.Println("no message sent (channel full or no receiver)")
    }

    // 带超时的 select
    c1 := make(chan string, 1)
    go func() {
        time.Sleep(2 * time.Second)
        c1 <- "result 1"
    }()

    select {
    case res := <-c1:
        fmt.Println(res)
    case <-time.After(1 * time.Second): // 1秒后超时
        fmt.Println("timeout 1")
    }
}`}
                            </ExpandableCode>
                        </div>
                    </div>
                </SecondaryCard>

                <InfoCard title="并发模式与最佳实践">
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Worker Pools:</strong> 使用一组 Goroutine 来处理任务队列，控制并发数量。</li>
                        <li><strong>Rate Limiting:</strong> 控制资源访问速率，例如每秒处理 N 个请求。</li>
                        <li><strong>Fan-in, Fan-out:</strong>
                            <ul className="list-disc pl-5">
                                <li><strong>Fan-out:</strong> 一个 Goroutine 将工作分发给多个 Goroutine 处理。</li>
                                <li><strong>Fan-in:</strong> 多个 Goroutine 的输出合并到一个 Channel 中。</li>
                            </ul>
                        </li>
                        <li><strong>避免死锁 (Deadlocks):</strong> 当 Goroutine 互相等待对方释放资源时发生。注意 Channel 操作的阻塞特性，确保有对应的发送/接收方，或使用缓冲/<code>select default</code>。</li>
                        <li><strong>竞争条件 (Race Conditions):</strong> 当多个 Goroutine 并发访问共享数据且至少有一个进行写操作时，可能发生竞争条件。Go 提供了 <code>go run -race</code> 或 <code>go test -race</code> 来检测竞争条件。</li>
                        <li><strong>使用 Context:</strong> 对于需要取消、超时或传递请求范围数据的操作，使用 <code>context.Context</code>。</li>
                        <li><strong>Channel 的所有权:</strong> 通常，创建 Channel 的 Goroutine 也是其所有者，负责关闭它。只应由发送方关闭 Channel，绝不能由接收方关闭。</li>
                    </ul>
                </InfoCard>
            </div>
        </QuestionCard>
    );
}
