import { QuestionCard } from "../../../../base/knowledge_question_card"
import { ExpandableCode } from "../../../../base/expandable_code"
import { InfoCard } from "../../../../card/info_card"
import { WarningCard } from "../../../../card/warning_card"
import { SuccessCard } from "../../../../card/success_card"
import { SecondaryCard } from "../../../../card/secondary_card"

/**
 * # var vs. let vs. const：作用域与提升
 */
export function FrontJavaScriptVarLetConst({ id }: { id: string }) {
    return (
        <QuestionCard question={{
            id,
            title: "var vs. let vs. const：作用域与提升",
            category: "作用域与提升",
            content: "面试问题：var、let、const 的区别？什么是提升和暂时性死区？for 循环中使用 var 的经典问题是什么？",
            tags: ["var", "let", "const", "作用域", "提升", "暂时性死区", "面试"]
        }}>
            <div className="space-y-6">
                <SuccessCard title="核心解答">
                    <p><strong>var</strong> 是函数作用域，存在提升；<strong>let/const</strong> 是块级作用域，有暂时性死区。<strong>const</strong> 声明后不可重新赋值，但对象内容可变。经典问题：for 循环中 var 的闭包陷阱。</p>
                </SuccessCard>

                <SecondaryCard title="📊 三者对比表">
                    <div className="overflow-x-auto">
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th>特性</th>
                                    <th className="text-warning">var</th>
                                    <th className="text-success">let</th>
                                    <th className="text-info">const</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>作用域</strong></td>
                                    <td>函数作用域</td>
                                    <td>块级作用域</td>
                                    <td>块级作用域</td>
                                </tr>
                                <tr>
                                    <td><strong>提升</strong></td>
                                    <td>声明+初始化提升</td>
                                    <td>仅声明提升</td>
                                    <td>仅声明提升</td>
                                </tr>
                                <tr>
                                    <td><strong>暂时性死区</strong></td>
                                    <td>❌</td>
                                    <td>✅</td>
                                    <td>✅</td>
                                </tr>
                                <tr>
                                    <td><strong>重复声明</strong></td>
                                    <td>✅ 允许</td>
                                    <td>❌ 不允许</td>
                                    <td>❌ 不允许</td>
                                </tr>
                                <tr>
                                    <td><strong>重新赋值</strong></td>
                                    <td>✅ 允许</td>
                                    <td>✅ 允许</td>
                                    <td>❌ 不允许</td>
                                </tr>
                                <tr>
                                    <td><strong>版本</strong></td>
                                    <td>ES5</td>
                                    <td>ES6</td>
                                    <td>ES6</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </SecondaryCard>

                <WarningCard title="面试经典陷阱">
                    <div className="space-y-4">
                        <div>
                            <h5 className="font-semibold">1. for 循环闭包问题（必考）</h5>
                            <ExpandableCode language="javascript" maxHeight={180}>
{`// 问题：为什么都打印 3？
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);  // 输出: 3, 3, 3
}

// 原因：var 是函数作用域，循环结束后 i = 3
// 解决方案1：使用 let（块级作用域）
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);  // 输出: 0, 1, 2
}

// 解决方案2：立即执行函数（ES5 时代）
for (var i = 0; i < 3; i++) {
    (function(j) {
        setTimeout(() => console.log(j), 100);  // 输出: 0, 1, 2
    })(i);
}`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">2. 提升机制的理解误区</h5>
                            <ExpandableCode language="javascript" maxHeight={150}>
{`// var 提升：声明和初始化都提升
console.log(a);  // undefined（不是 ReferenceError）
var a = 5;

// 等价于：
var a;           // 提升到顶部，初始化为 undefined
console.log(a);  // undefined
a = 5;

// let/const 提升：只有声明提升，存在暂时性死区
console.log(b);  // ReferenceError: Cannot access 'b' before initialization
let b = 10;

console.log(c);  // ReferenceError: Cannot access 'c' before initialization  
const c = 20;`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">3. 暂时性死区的边界情况</h5>
                            <ExpandableCode language="javascript" maxHeight={150}>
{`// 暂时性死区：从块级作用域开始到声明语句
function example() {
    console.log(typeof temp);  // "undefined"（全局 temp 不存在）
    
    if (true) {
        console.log(typeof temp);  // ReferenceError: 暂时性死区
        let temp = "hello";
    }
}

// 函数参数的暂时性死区
function fn(a = b, b = 2) {  // ReferenceError: Cannot access 'b' before initialization
    return a + b;
}`}
                            </ExpandableCode>
                        </div>
                    </div>
                </WarningCard>

                <SecondaryCard title="🎯 为什么这样设计">
                    <div className="space-y-4">
                        <div>
                            <h5 className="font-semibold">块级作用域的必要性</h5>
                            <p className="text-sm mb-2">避免变量污染，提供更精确的变量控制</p>
                            <ExpandableCode language="javascript" maxHeight={120}>
{`// 避免意外的变量泄漏
if (true) {
    var x = 1;    // 函数作用域，可能污染外层
    let y = 2;    // 块级作用域，不会泄漏
}
console.log(x);   // 1（意外可访问）
console.log(y);   // ReferenceError（按预期）`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">暂时性死区的意义</h5>
                            <p className="text-sm mb-2">防止在声明前使用变量，避免逻辑错误</p>
                            <ExpandableCode language="javascript" maxHeight={100}>
{`// 防止意外使用全局变量
let value = "global";
function test() {
    console.log(value);  // 本意访问全局，但因为下面有同名 let，报错
    let value = "local"; // 暂时性死区保护
}`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">const 的设计哲学</h5>
                            <p className="text-sm">不可变绑定，而非不可变值。引用不变，内容可变</p>
                        </div>
                    </div>
                </SecondaryCard>

                <SecondaryCard title="💡 面试实战技巧">
                    <div className="space-y-4">
                        <div>
                            <h5 className="font-semibold">const 的深入理解</h5>
                            <ExpandableCode language="javascript" maxHeight={150}>
{`// const 保证的是引用不变，而非值不变
const obj = { name: "Alice" };
obj.name = "Bob";           // ✅ 修改属性
obj.age = 25;               // ✅ 添加属性
// obj = {};                // ❌ 重新赋值

const arr = [1, 2, 3];
arr.push(4);                // ✅ 修改数组
arr[0] = 0;                 // ✅ 修改元素  
// arr = [];                // ❌ 重新赋值

// 如需真正的不可变，使用 Object.freeze()
const frozenObj = Object.freeze({ name: "Alice" });
frozenObj.name = "Bob";     // 静默失败（严格模式下报错）`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">实际开发最佳实践</h5>
                            <ExpandableCode language="javascript" maxHeight={120}>
{`// 1. 默认使用 const，需要重新赋值时使用 let
const config = { api: "/api" };     // 配置对象
let counter = 0;                    // 需要改变的计数器

// 2. 永远不要使用 var（除非兼容旧代码）
// var name = "old";  ❌
const name = "new"; // ✅

// 3. 循环中的最佳实践
for (const item of items) {         // 遍历时使用 const
    console.log(item);
}

for (let i = 0; i < 10; i++) {      // 计数器使用 let
    // ...
}`}
                            </ExpandableCode>
                        </div>
                    </div>
                </SecondaryCard>

                <InfoCard title="🔥 面试高分答题技巧">
                    <ul className="list-disc pl-4 space-y-2">
                        <li><strong>从历史演进回答：</strong>var 是 ES5 设计缺陷，let/const 是 ES6 的改进</li>
                        <li><strong>结合实际场景：</strong>提到 for 循环、模块化、React Hooks 等应用</li>
                        <li><strong>深入机制：</strong>解释提升的本质是编译时的变量声明处理</li>
                        <li><strong>最佳实践：</strong>const &gt; let &gt; var，能用 const 就用 const</li>
                        <li><strong>性能考虑：</strong>块级作用域有助于 V8 引擎优化</li>
                    </ul>
                </InfoCard>
            </div>
        </QuestionCard>
    );
} 