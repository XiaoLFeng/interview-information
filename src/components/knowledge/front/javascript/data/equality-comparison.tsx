import { QuestionCard } from "../../../../base/knowledge_question_card"
import { ExpandableCode } from "../../../../base/expandable_code"
import { SuccessCard } from "../../../../card/success_card"
import { InfoCard } from "../../../../card/info_card"
import { WarningCard } from "../../../../card/warning_card"
import { SecondaryCard } from "../../../../card/secondary_card"

/**
 * # JavaScript 相等性比较：== vs === vs Object.is
 */
export function FrontJavaScriptEqualityComparison({ id }: { id: string }) {
    return (
        <QuestionCard question={{
            id,
            title: "JavaScript 相等性比较：== vs === vs Object.is",
            category: "类型转换",
            content: "面试问题：为什么 [] == false 为 true？NaN === NaN 为什么是 false？什么情况下用 Object.is？",
            tags: ["==", "===", "Object.is", "类型转换", "面试", "NaN"]
        }}>
            <div className="space-y-6">
                <SuccessCard title="核心解答">
                    <p><strong>==</strong> 会进行类型转换再比较；<strong>===</strong> 严格比较类型和值；<strong>Object.is</strong> 解决 NaN 和 ±0 的特殊情况。推荐优先使用 <code>===</code>，特殊需求用 <code>Object.is</code>。</p>
                </SuccessCard>

                <SecondaryCard title="📊 三种比较方式详解">
                    <div className="overflow-x-auto mb-4">
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th>比较方式</th>
                                    <th>类型转换</th>
                                    <th>NaN 处理</th>
                                    <th>±0 处理</th>
                                    <th>性能</th>
                                    <th>推荐度</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code>==</code></td>
                                    <td className="text-warning">✅ 隐式转换</td>
                                    <td><code>false</code></td>
                                    <td><code>true</code></td>
                                    <td className="text-error">慢</td>
                                    <td>❌ 避免</td>
                                </tr>
                                <tr>
                                    <td><code>===</code></td>
                                    <td className="text-success">❌ 严格比较</td>
                                    <td><code>false</code></td>
                                    <td><code>true</code></td>
                                    <td className="text-success">快</td>
                                    <td>✅ 首选</td>
                                </tr>
                                <tr>
                                    <td><code>Object.is</code></td>
                                    <td className="text-success">❌ 严格比较</td>
                                    <td className="text-success"><code>true</code></td>
                                    <td className="text-info"><code>false</code></td>
                                    <td className="text-warning">中等</td>
                                    <td>⚡ 特殊场景</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <ExpandableCode language="javascript" maxHeight={150}>
{`// 三种比较方式的典型差异
console.log(null == undefined);    // true
console.log(null === undefined);   // false
console.log(Object.is(null, undefined)); // false

console.log(NaN == NaN);           // false
console.log(NaN === NaN);          // false
console.log(Object.is(NaN, NaN));  // true ✅

console.log(+0 == -0);             // true
console.log(+0 === -0);            // true
console.log(Object.is(+0, -0));    // false ✅`}
                    </ExpandableCode>
                </SecondaryCard>

                <WarningCard title="== 运算符的复杂转换规则">
                    <div className="space-y-4">
                        <div>
                            <h5 className="font-semibold">1. 类型转换优先级</h5>
                            <div className="text-sm mb-2">
                                <ol className="list-decimal pl-4 space-y-1">
                                    <li>如果类型相同，使用 === 比较</li>
                                    <li>null == undefined 特殊规定为 true</li>
                                    <li>数字和字符串：字符串转数字</li>
                                    <li>布尔值：先转数字再比较</li>
                                    <li>对象和原始值：对象调用 valueOf() 或 toString()</li>
                                </ol>
                            </div>
                            <ExpandableCode language="javascript" maxHeight={180}>
{`// 经典面试陷阱：[] == false 为什么是 true？
[] == false
// 1. false 转为数字：Number(false) = 0
// 2. [] 转为原始值：[].valueOf() = [] -> [].toString() = ""
// 3. "" 转为数字：Number("") = 0
// 4. 最终比较：0 == 0 = true

// 更多陷阱案例
console.log("0" == false);         // true: "0" -> 0, false -> 0
console.log("" == false);          // true: "" -> 0, false -> 0
console.log(" " == false);         // true: " " -> 0, false -> 0
console.log("false" == false);     // false: "false" -> NaN, false -> 0

// 对象比较陷阱
console.log([1] == 1);             // true: [1] -> "1" -> 1
console.log([1,2] == "1,2");       // true: [1,2] -> "1,2"`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">2. 最易错的比较场景</h5>
                            <ExpandableCode language="javascript" maxHeight={150}>
{`// 面试高频陷阱
console.log([] == ![]);            // true (![] = false, 然后 [] == false)
console.log({} == "[object Object]"); // true (对象转字符串)

// 避免使用 == 的原因
if (obj.value == true) {           // ❌ 容易出错
    // 可能意外匹配 1, "1", "true" 等
}

if (obj.value === true) {          // ✅ 明确意图
    // 只匹配布尔值 true
}

// 安全的空值检查
if (value == null) {               // ✅ 唯一推荐的 == 用法
    // 同时检查 null 和 undefined
}`}
                            </ExpandableCode>
                        </div>
                    </div>
                </WarningCard>

                <SecondaryCard title="🎯 为什么这样设计">
                    <div className="space-y-3">
                        <div>
                            <h5 className="font-semibold">== 的历史包袱</h5>
                            <p className="text-sm">JavaScript 早期为了方便动态类型转换，但规则过于复杂，现在被认为是设计失误</p>
                        </div>
                        <div>
                            <h5 className="font-semibold">=== 的引入</h5>
                            <p className="text-sm">为了提供明确的比较语义，避免意外的类型转换带来的 bug</p>
                        </div>
                        <div>
                            <h5 className="font-semibold">Object.is 的必要性</h5>
                            <p className="text-sm">解决 === 无法正确处理的边界情况：NaN 自相等和 ±0 的区分</p>
                        </div>
                    </div>
                </SecondaryCard>

                <SecondaryCard title="💡 实际应用场景">
                    <div className="space-y-4">
                        <div>
                            <h5 className="font-semibold">React.memo 和 Object.is</h5>
                            <ExpandableCode language="javascript" maxHeight={120}>
{`// React.memo 内部使用 Object.is 进行浅比较
function MyComponent({ count }) {
    return <div>{count}</div>;
}

// 当 count 从 NaN 变为 NaN 时，React.memo 不会重新渲染
// 因为 Object.is(NaN, NaN) === true
export default React.memo(MyComponent);

// 手动比较函数
function areEqual(prevProps, nextProps) {
    return Object.is(prevProps.value, nextProps.value);
}`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">数组查找和 NaN 处理</h5>
                            <ExpandableCode language="javascript" maxHeight={120}>
{`// Array.includes 使用 SameValueZero (类似 Object.is)
const arr = [1, 2, NaN, 4];
console.log(arr.includes(NaN));        // true ✅
console.log(arr.indexOf(NaN));         // -1 (indexOf 使用 ===)

// 安全的 NaN 检查
function isReallyNaN(value) {
    return Object.is(value, NaN);      // 或者 Number.isNaN(value)
}

// 精确的零值检查
function isPositiveZero(value) {
    return Object.is(value, +0);
}

function isNegativeZero(value) {
    return Object.is(value, -0);
}`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">状态管理中的值比较</h5>
                            <ExpandableCode language="javascript" maxHeight={100}>
{`// Redux 等状态库的比较逻辑
function shallowEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    
    if (keys1.length !== keys2.length) return false;
    
    for (let key of keys1) {
        if (!Object.is(obj1[key], obj2[key])) {
            return false;
        }
    }
    return true;
}`}
                            </ExpandableCode>
                        </div>
                    </div>
                </SecondaryCard>

                <InfoCard title="面试高分答题技巧">
                    <ul className="list-disc pl-4 space-y-2">
                        <li><strong>类型转换机制：</strong>详细解释 [] == false 的转换步骤</li>
                        <li><strong>性能考虑：</strong>=== 比 == 更快，因为不需要类型转换</li>
                        <li><strong>实际应用：</strong>提到 React、状态管理库中的使用</li>
                        <li><strong>最佳实践：</strong>ESLint 规则禁用 ==，除了 == null 检查</li>
                        <li><strong>边界情况：</strong>NaN 的特殊性和浮点数精度问题</li>
                        <li><strong>历史演进：</strong>从 JavaScript 设计缺陷到 ES6 的改进</li>
                    </ul>
                </InfoCard>
            </div>
        </QuestionCard>
    );
} 