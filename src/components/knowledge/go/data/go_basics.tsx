import { QuestionCard } from "../../../../base/knowledge_question_card";
import { InfoCard } from "../../../../card/info_card";
import { WarningCard } from "../../../../card/warning_card";
import { SuccessCard } from "../../../../card/success_card";
import { SecondaryCard } from "../../../../card/secondary_card";
import { ExpandableCode } from "../../../../base/expandable_code";

interface Props {
    id: string;
}

export function GoBasics({ id }: Props) {
    return (
        <QuestionCard
            question={{
                id,
                title: "Go 语言基础",
                category: "Go",
                content: "Go 语言的基础语法、数据类型、控制流程以及核心概念是什么？",
                tags: ["Go", "Golang", "基础语法", "数据类型", "控制流程"]
            }}
        >
            <div className="space-y-6">
                <SuccessCard title="核心概要">
                    <p>Go 语言（或称 Golang）是由 Google 设计的一门开源编程语言。它的设计目标是<strong>简洁、高效、易于构建并发程序以及拥有强大的工具链</strong>。Go 语言特别适合于网络服务、分布式系统、命令行工具等场景的开发。</p>
                </SuccessCard>

                <SecondaryCard title="基本语法与声明">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold">包 (Packages)</h4>
                            <p>每个 Go 程序都由包构成。程序从 <code>main</code> 包开始运行。</p>
                            <ExpandableCode language="go" maxHeight={100}>
{`package main

import "fmt" // 导入 fmt 包，用于格式化 I/O

// main 函数是程序的入口
func main() {
    fmt.Println("Hello, Go!")
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold">变量 (Variables)</h4>
                            <p>使用 <code>var</code> 关键字声明变量。也可以使用 <code>:=</code> 进行短变量声明（只能在函数内部）。</p>
                            <ExpandableCode language="go" maxHeight={150}>
{`package main

import "fmt"

func main() {
    var name string = "Go Developer" // 显式声明类型
    var version = 1.18             // 类型推断
    website := "golang.org"        // 短变量声明

    fmt.Println(name, "version", version, "website:", website)

    var ( // 批量声明
        a int
        b bool
    )
    a = 10
    b = true
    fmt.Println(a, b)
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold">常量 (Constants)</h4>
                            <p>使用 <code>const</code> 关键字声明常量。常量的值在编译时确定。</p>
                            <ExpandableCode language="go" maxHeight={100}>
{`package main

import "fmt"

const Pi = 3.14159
const (
    StatusOK = 200
    StatusNotFound = 404
)

func main() {
    fmt.Println("Pi:", Pi)
    fmt.Println("Status OK:", StatusOK)
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold">函数 (Functions)</h4>
                            <p>使用 <code>func</code> 关键字声明函数。可以有多个返回值。</p>
                            <ExpandableCode language="go" maxHeight={120}>
{`package main

import "fmt"

// add 函数接收两个 int 参数，返回一个 int
func add(x int, y int) int {
    return x + y
}

// swap 函数返回两个 string
func swap(x, y string) (string, string) {
    return y, x
}

func main() {
    fmt.Println("add(42, 13) =", add(42, 13))
    a, b := swap("hello", "world")
    fmt.Println(a, b) // "world hello"
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold">注释 (Comments)</h4>
                            <p>单行注释以 <code>//</code> 开头，多行注释以 <code>/* ... */</code> 包裹。</p>
                            <ExpandableCode language="go" maxHeight={80}>
{`// 这是单行注释

/*
这是
多行注释
*/`}
                            </ExpandableCode>
                        </div>
                    </div>
                </SecondaryCard>

                <SecondaryCard title="数据类型">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold">基本类型</h4>
                            <ul className="list-disc pl-5">
                                <li><strong>布尔型:</strong> <code>bool</code> (<code>true</code>, <code>false</code>)</li>
                                <li><strong>字符串:</strong> <code>string</code> (UTF-8 编码)</li>
                                <li><strong>数值类型:</strong>
                                    <ul className="list-disc pl-5">
                                        <li>整数: <code>int</code>, <code>int8</code>, <code>int16</code>, <code>int32</code>, <code>int64</code>, <code>uint</code>, <code>uint8</code> (<code>byte</code>), <code>uint16</code>, <code>uint32</code>, <code>uint64</code>, <code>uintptr</code></li>
                                        <li>浮点数: <code>float32</code>, <code>float64</code></li>
                                        <li>复数: <code>complex64</code>, <code>complex128</code></li>
                                        <li><code>rune</code>: <code>int32</code> 的别名，表示一个 Unicode 码点</li>
                                        <li><code>byte</code>: <code>uint8</code> 的别名</li>
                                    </ul>
                                </li>
                            </ul>
                            <ExpandableCode language="go" maxHeight={100}>
{`var isActive bool = true
var message string = "你好, 世界"
var count int = -100
var price float64 = 99.99
var char rune = '世' // 注意是单引号
var b byte = 'a'`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold">复合类型</h4>
                            <ul className="list-disc pl-5">
                                <li><strong>数组 (Array):</strong> 固定长度的同类型元素序列。<code>[n]T</code></li>
                                <li><strong>切片 (Slice):</strong> 动态长度的同类型元素序列，是对数组的引用。<code>[]T</code></li>
                                <li><strong>映射 (Map):</strong>键值对的无序集合。<code>map[K]V</code></li>
                                <li><strong>结构体 (Struct):</strong>将不同类型的字段组合在一起。<code>struct { ... }</code></li>
                            </ul>
                            <ExpandableCode language="go" maxHeight={200}>
{`// 数组
var arr [3]int = [3]int{1, 2, 3}

// 切片
var s []int = []int{1, 2, 3, 4, 5}
s = append(s, 6) // 添加元素

// 映射
m := make(map[string]int)
m["one"] = 1
m["two"] = 2

// 结构体
type Person struct {
    Name string
    Age  int
}
p := Person{Name: "Alice", Age: 30}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold">指针 (Pointers)</h4>
                            <p>存储变量的内存地址。使用 <code>*</code> 定义指针类型，<code>&</code> 获取地址，<code>*</code> 解引用。</p>
                             <ExpandableCode language="go" maxHeight={100}>
{`package main
import "fmt"
func main() { fmt.Println("Test") }`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold">类型转换 (Type Conversion)</h4>
                            <p>Go 语言中没有隐式类型转换，需要显式转换。格式：<code>T(v)</code> 将值 <code>v</code> 转换为类型 <code>T</code>。</p>
                            <ExpandableCode language="go" maxHeight={80}>
{`var i int = 42
var f float64 = float64(i)
var u uint = uint(f)
// var b byte = byte(i) // 如果 i 超出 byte 范围，可能会截断`}
                            </ExpandableCode>
                        </div>
                    </div>
                </SecondaryCard>

                <SecondaryCard title="控制流程">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold"><code>if/else</code></h4>
                            <p>条件语句。条件表达式不需要括号，但执行体必须有大括号。</p>
                            <ExpandableCode language="go" maxHeight={120}>
{`x := 10
if x > 5 {
    fmt.Println("x is greater than 5")
} else if x < 5 {
    fmt.Println("x is less than 5")
} else {
    fmt.Println("x is 5")
}

// if 语句可以包含一个简短的初始化语句
if y := calculate(); y > 100 {
    fmt.Println("y is greater than 100")
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold"><code>for</code></h4>
                            <p>Go 只有一种循环结构：<code>for</code> 循环。支持多种形式。</p>
                            <ExpandableCode language="go" maxHeight={180}>
{`// 1. 基本的 for 循环 (类似 C 的 for)
for i := 0; i < 5; i++ {
    fmt.Println(i)
}

// 2. 条件循环 (类似 C 的 while)
sum := 1
for sum < 1000 {
    sum += sum
}

// 3. 无限循环 (需要 break 或 return)
// for {
//     // ...
// }

// 4. for...range 遍历 (用于数组、切片、字符串、映射、通道)
nums := []int{1, 2, 3}
for index, value := range nums {
    fmt.Printf("index: %d, value: %d\\n", index, value)
}

m := map[string]string{"a": "apple", "b": "banana"}
for key, value := range m {
    fmt.Printf("%s -> %s\\n", key, value)
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold"><code>switch</code></h4>
                            <p>多路条件选择。Go 的 <code>switch</code> 更灵活，<code>case</code> 默认有 <code>break</code>。可以使用 <code>fallthrough</code> 强制执行下一个 <code>case</code>。</p>
                            <ExpandableCode language="go" maxHeight={150}>
{`day := "Sunday"
switch day {
case "Monday", "Tuesday", "Wednesday", "Thursday", "Friday":
    fmt.Println("Weekday")
case "Saturday", "Sunday":
    fmt.Println("Weekend")
default:
    fmt.Println("Invalid day")
}

// switch true (无表达式的 switch，可替代 if/else if 链)
score := 85
switch {
case score >= 90:
    fmt.Println("A")
case score >= 80:
    fmt.Println("B")
default:
    fmt.Println("C")
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold"><code>defer</code></h4>
                            <p><code>defer</code> 语句会将其后面跟随的函数调用推迟到外层函数执行完毕（即将返回）之前执行。常用于资源释放、解锁等操作。</p>
                            <ExpandableCode language="go" maxHeight={100}>
{`func cleanup() {
    fmt.Println("Cleaning up...")
}

func process() {
    defer cleanup() // cleanup 会在 process 返回前执行
    fmt.Println("Processing...")
    // return
} // cleanup 在这里执行`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold"><code>panic</code> 和 <code>recover</code></h4>
                            <p><code>panic</code> 用于产生运行时恐慌，中断正常流程。<code>recover</code> 用于捕获 <code>panic</code>，仅在 <code>defer</code> 函数中有效。</p>
                            <ExpandableCode language="go" maxHeight={120}>
{`func mayPanic() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recovered from panic:", r)
        }
    }() // 立即执行的匿名函数

    fmt.Println("Before panic")
    panic("something went wrong")
    // fmt.Println("After panic") // 不会执行
}

func main() {
    mayPanic()
    fmt.Println("Program continues after panic recovery")
}`}
                            </ExpandableCode>
                        </div>
                    </div>
                </SecondaryCard>

                <InfoCard title="关键特性">
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>静态类型 (Static Typing):</strong> 变量类型在编译时确定，有助于早期发现错误。</li>
                        <li><strong>垃圾回收 (Garbage Collection):</strong> 自动管理内存，简化开发。</li>
                        <li><strong>无类 (No Classes):</strong> Go 使用结构体 (<code>struct</code>) 和方法 (<code>method</code>) 来实现面向对象的特性，但没有传统意义上的类和继承。</li>
                        <li><strong>接口 (Interfaces):</strong> Go 的接口是隐式实现的。任何类型只要实现了接口中定义的所有方法，就被认为实现了该接口，无需显式声明。</li>
                        <li><strong>并发 (Concurrency):</strong> Go 通过 goroutine 和 channel 提供了强大的并发支持，易于编写高并发程序。</li>
                        <li><strong>强大的标准库 (Rich Standard Library):</strong> 提供了大量内置包，覆盖网络、I/O、加密、文本处理等。</li>
                        <li><strong>快速编译 (Fast Compilation):</strong> Go 的编译速度非常快，提升开发效率。</li>
                        <li><strong>工具链 (Tooling):</strong> 提供了统一的工具集，如 <code>go fmt</code> (格式化), <code>go test</code> (测试), <code>go build</code> (构建) 等。</li>
                    </ul>
                </InfoCard>
            </div>
        </QuestionCard>
    );
}
