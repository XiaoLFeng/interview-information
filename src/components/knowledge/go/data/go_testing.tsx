import { QuestionCard } from "../../../base/knowledge_question_card";
import { InfoCard } from "../../../card/info_card";
import { SuccessCard } from "../../../card/success_card";
import { SecondaryCard } from "../../../card/secondary_card";
import { ExpandableCode } from "../../../base/expandable_code";

interface Props {
    id: string;
}

export function GoTesting({ id }: Props) {
    return (
        <QuestionCard
            question={{
                id,
                title: "Go 测试",
                category: "Go",
                content: "如何在 Go 语言中编写单元测试和基准测试？Go 的测试工具有哪些特性？",
                tags: ["Go", "Golang", "测试", "单元测试", "基准测试", "testing"]
            }}
        >
            <div className="space-y-6">
                <SuccessCard title="核心概要">
                    <p>测试是保证软件质量的关键环节。Go 语言内置了强大的测试支持，通过标准库中的 <code>testing</code> 包和命令行工具 <code>go test</code>，开发者可以方便地编写和执行单元测试、基准测试以及示例测试。Go 的测试哲学强调简洁、约定优于配置以及与源码的紧密集成。</p>
                </SuccessCard>

                <SecondaryCard title="单元测试 (Unit Tests)">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold">测试文件与函数签名</h4>
                            <p>单元测试代码位于与被测试源码文件同目录下的 <code>_test.go</code> 文件中。测试函数必须以 <code>Test</code> 开头，并接收一个 <code>*testing.T</code> 类型的参数。</p>
                            <ExpandableCode language="go" maxHeight={120}>
{`// mypackage/math.go
package mypackage

func Add(a, b int) int {
    return a + b
}

// mypackage/math_test.go
package mypackage

import "testing"

func TestAdd(t *testing.T) {
    // ... test logic ...
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold">测试报告与断言</h4>
                            <p><code>*testing.T</code> 提供了多种方法来报告测试状态：</p>
                            <ul className="list-disc pl-5">
                                <li><code>t.Log(...interface{})</code>: 记录信息（仅在测试失败或使用 <code>-v</code> 选项时显示）。</li>
                                <li><code>t.Error(...interface{})</code>: 报告测试失败，但继续执行当前测试函数。</li>
                                <li><code>t.Errorf(format string, ...interface{})</code>: 同 <code>t.Error</code>，但使用格式化字符串。</li>
                                <li><code>t.Fatal(...interface{})</code>: 报告测试失败，并立即停止当前测试函数的执行（后续代码不会运行）。</li>
                                <li><code>t.Fatalf(format string, ...interface{})</code>: 同 <code>t.Fatal</code>，但使用格式化字符串。</li>
                                <li><code>t.Fail()</code>: 将测试标记为失败，但继续执行。<code>t.Error</code> 和 <code>t.Fatal</code> 内部会调用它。</li>
                                <li><code>t.FailNow()</code>: 将测试标记为失败，并停止执行。<code>t.Fatal</code> 内部会调用它。</li>
                                <li><code>t.Skip(...interface{})</code>: 跳过当前测试。</li>
                            </ul>
                            <p>Go 标准库不直接提供断言库，通常通过简单的 <code>if</code> 条件判断。外部库如 <code>testify/assert</code> 或 <code>testify/require</code> 提供了更丰富的断言方法。</p>
                            <ExpandableCode language="go" maxHeight={150}>
{`func TestAdd(t *testing.T) {
    sum := Add(1, 2)
    expected := 3
    if sum != expected {
        t.Errorf("Add(1, 2) = %d; want %d", sum, expected)
    }

    // 使用 testify/assert (外部库示例)
    // import "github.com/stretchr/testify/assert"
    // assert.Equal(t, expected, sum, "they should be equal")
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold">表驱动测试 (Table-Driven Tests)</h4>
                            <p>对于需要测试多种输入和输出组合的函数，表驱动测试是一种常用的模式，可以使测试代码更清晰、易于维护。</p>
                            <ExpandableCode language="go" maxHeight={200}>
{`func TestAddTableDriven(t *testing.T) {
    var tests = []struct {
        a, b     int
        expected int
        name     string // 可选，用于 t.Run 子测试命名
    }{
        {1, 2, 3, "1+2=3"},
        {0, 0, 0, "0+0=0"},
        {-1, 1, 0, "-1+1=0"},
        {10, -5, 5, "10+(-5)=5"},
    }

    for _, tt := range tests {
        // 使用 t.Run 创建子测试，方便定位失败用例
        t.Run(tt.name, func(t *testing.T) {
            if sum := Add(tt.a, tt.b); sum != tt.expected {
                t.Errorf("Add(%d, %d) = %d; want %d", tt.a, tt.b, sum, tt.expected)
            }
        })
    }
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold">测试覆盖率</h4>
                            <p>使用 <code>go test -cover</code> 命令可以查看测试覆盖率。<code>go test -coverprofile=coverage.out</code> 生成覆盖率报告文件，然后可以使用 <code>go tool cover -html=coverage.out</code> 查看 HTML 格式的详细报告。</p>
                        </div>
                    </div>
                </SecondaryCard>

                <SecondaryCard title="基准测试 (Benchmark Tests)">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold">基准测试函数签名</h4>
                            <p>基准测试函数以 <code>Benchmark</code> 开头，并接收一个 <code>*testing.B</code> 类型的参数。</p>
                            <ExpandableCode language="go" maxHeight={100}>
{`// mypackage/math_test.go
package mypackage

import "testing"

func BenchmarkAdd(b *testing.B) {
    // ... benchmark logic ...
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold">使用 <code>b.N</code></h4>
                            <p>基准测试函数中的循环体应该执行 <code>b.N</code> 次。<code>b.N</code> 的值由测试框架动态调整，以确保测试运行足够长的时间来获得可靠的度量。</p>
                            <ExpandableCode language="go" maxHeight={100}>
{`func BenchmarkAdd(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Add(100, 200) // 要进行基准测试的代码
    }
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold">控制计时器</h4>
                            <p><code>b.ResetTimer()</code> 可以重置计时器，忽略之前的设置代码所花费的时间。<code>b.StartTimer()</code> 和 <code>b.StopTimer()</code> 可以用于在循环内外分别启动和停止计时，以排除不想计入基准测试时间的部分。</p>
                            <ExpandableCode language="go" maxHeight={120}>
{`func BenchmarkHeavySetup(b *testing.B) {
    // 模拟一些耗时的设置操作
    // time.Sleep(time.Second)
    b.ResetTimer() // 重置计时器，不包括设置时间
    for i := 0; i < b.N; i++ {
        Add(1, 2)
    }
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold">运行与结果解读</h4>
                            <p>使用 <code>go test -bench=.</code> 运行当前包下的所有基准测试。<code>-benchmem</code> 参数可以显示内存分配信息。</p>
                            <p>结果通常包括：测试名称、<code>b.N</code> 的值（迭代次数）、每次操作的平均时间 (ns/op)、每次操作的内存分配 (B/op)、每次操作的内存分配次数 (allocs/op)。</p>
                            <ExpandableCode language="text" maxHeight={80}>
{`$ go test -bench=. -benchmem
goos: linux
goarch: amd64
pkg: mypackage
BenchmarkAdd-8         1000000000           0.25 ns/op          0 B/op          0 allocs/op
PASS
ok      mypackage       0.300s`}
                            </ExpandableCode>
                        </div>
                    </div>
                </SecondaryCard>

                <SecondaryCard title="其他测试特性">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold">示例测试 (Example-based Tests)</h4>
                            <p>示例测试函数以 <code>Example</code> 开头。它们既作为文档（会显示在 GoDoc 中），也作为测试（如果输出与注释中的 <code>// Output:</code> 匹配）。</p>
                            <ExpandableCode language="go" maxHeight={120}>
{`package mypackage

import "fmt"

func ExampleAdd() {
    sum := Add(5, 10)
    fmt.Println(sum)
    // Output: 15
}

func ExampleAdd_negative() { // 可以为不同场景创建多个示例
    sum := Add(-1, -2)
    fmt.Println(sum)
    // Output: -3
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold">子测试 (Subtests)</h4>
                            <p>使用 <code>t.Run(name string, f func(t *testing.T))</code> 可以在一个测试函数内创建多个独立的子测试。这对于组织测试用例（如表驱动测试）和获取更细致的测试报告非常有用。</p>
                            <p>（见上方“表驱动测试”中的示例）</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">测试初始化与清理 (Setup and Teardown)</h4>
                            <p>可以使用 <code>TestMain(m *testing.M)</code> 函数来为整个包的测试执行全局的初始化和清理操作。它接收一个 <code>*testing.M</code> 参数，通过调用 <code>m.Run()</code> 来执行包内的所有测试。</p>
                            <ExpandableCode language="go" maxHeight={150}>
{`package mypackage

import (
    "fmt"
    "os"
    "testing"
)

func TestMain(m *testing.M) {
    fmt.Println("Setting up tests for the whole package...")
    // 进行设置操作，例如连接数据库、创建临时文件等

    exitCode := m.Run() // 执行包内所有测试

    fmt.Println("Tearing down tests for the whole package...")
    // 进行清理操作

    os.Exit(exitCode)
}`}
                            </ExpandableCode>
                            <p>对于单个测试函数的局部设置和清理，通常直接在测试函数内部或使用 <code>defer</code> 语句实现。</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">Mocking 与接口</h4>
                            <p>Go 的接口机制天然地为测试提供了便利。通过定义接口，可以轻松地为依赖项（如数据库、外部服务）创建 mock 实现，从而在测试中隔离被测单元。</p>
                        </div>
                    </div>
                </SecondaryCard>

                <InfoCard title="测试最佳实践">
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>为公共 API 编写测试:</strong> 优先测试包导出的函数和方法。</li>
                        <li><strong>追求良好的测试覆盖率:</strong> 但不要盲目追求 100%，关注关键逻辑和边界条件。</li>
                        <li><strong>保持测试独立:</strong> 测试用例之间不应有依赖关系或共享状态，以便可以独立运行或并行运行。</li>
                        <li><strong>确保测试快速:</strong> 缓慢的测试会降低开发效率。对于耗时的集成测试，可以考虑将其与单元测试分开。</li>
                        <li><strong>使用描述性的测试名称:</strong> 特别是子测试，清晰的名称有助于快速定位问题。</li>
                        <li><strong>测试边界条件和错误情况:</strong> 不仅仅测试正常路径，还要覆盖无效输入、错误处理等。</li>
                        <li><strong>定期运行测试:</strong> 将测试集成到 CI/CD 流程中，确保代码变更不会破坏现有功能。</li>
                    </ul>
                </InfoCard>
            </div>
        </QuestionCard>
    );
}
