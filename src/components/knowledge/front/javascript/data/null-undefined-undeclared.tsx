import { QuestionCard } from "../../../../base/knowledge_question_card"
import { ExpandableCode } from "../../../../base/expandable_code"
import { SuccessCard } from "../../../../card/success_card"
import { InfoCard } from "../../../../card/info_card"
import { WarningCard } from "../../../../card/warning_card"
import { SecondaryCard } from "../../../../card/secondary_card"

/**
 * # null vs. undefined vs. 未声明变量
 */
export function FrontJavaScriptNullUndefinedUndeclared({ id }: { id: string }) {
    return (
        <QuestionCard question={{
            id,
            title: "null vs. undefined vs. 未声明变量",
            category: "变量与类型",
            content: "面试问题：null 和 undefined 的区别？typeof null 为什么返回 'object'？如何安全检查未声明变量？",
            tags: ["null", "undefined", "面试", "类型检查", "typeof"]
        }}>
            <div className="space-y-6">
                <SuccessCard title="核心解答">
                    <p><strong>undefined</strong> 表示变量已声明但未赋值；<strong>null</strong> 表示故意设置的空值；<strong>未声明变量</strong> 会抛出 ReferenceError。<code>typeof null</code> 返回 'object' 是 JavaScript 的历史 bug。</p>
                </SuccessCard>

                <SecondaryCard title="📝 三者本质区别">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="border border-info/20 rounded-lg p-3">
                            <h4 className="font-semibold text-info mb-2">undefined</h4>
                            <ul className="text-sm space-y-1">
                                <li>• 系统默认值</li>
                                <li>• 未初始化变量</li>
                                <li>• 函数无返回值</li>
                                <li>• 对象不存在的属性</li>
                            </ul>
                        </div>
                        <div className="border border-warning/20 rounded-lg p-3">
                            <h4 className="font-semibold text-warning mb-2">null</h4>
                            <ul className="text-sm space-y-1">
                                <li>• 开发者主动设置</li>
                                <li>• 表示"空对象指针"</li>
                                <li>• 清除对象引用</li>
                                <li>• API 返回空值</li>
                            </ul>
                        </div>
                        <div className="border border-error/20 rounded-lg p-3">
                            <h4 className="font-semibold text-error mb-2">未声明</h4>
                            <ul className="text-sm space-y-1">
                                <li>• 变量不存在</li>
                                <li>• 抛出 ReferenceError</li>
                                <li>• typeof 返回 'undefined'</li>
                                <li>• 需要 try-catch 检测</li>
                            </ul>
                        </div>
                    </div>

                    <ExpandableCode language="javascript" maxHeight={180}>
{`// 1. undefined - 系统默认
let a;                    // undefined
let obj = {};            
console.log(obj.prop);    // undefined
function fn() {}         
console.log(fn());        // undefined

// 2. null - 开发者主动
let data = null;          // 主动设置为空
let user = getUser();     
if (!user) user = null;   // 显式清空

// 3. 未声明 - 变量不存在
console.log(undeclaredVar); // ReferenceError
typeof undeclaredVar;     // "undefined" (不报错)`}
                    </ExpandableCode>
                </SecondaryCard>

                <WarningCard title="面试常考陷阱">
                    <div className="space-y-4">
                        <div>
                            <h5 className="font-semibold">1. typeof null 的历史 Bug</h5>
                            <ExpandableCode language="javascript" maxHeight={120}>
{`// 面试高频：为什么 typeof null === 'object'？
console.log(typeof null);        // "object" ❌
console.log(null instanceof Object); // false

// 历史原因：JavaScript 早期版本的 bug
// null 的类型标签是 0，而对象的类型标签也是 0
// 正确判断：
console.log(null === null);      // true ✅`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">2. 相等性比较的陷阱</h5>
                            <ExpandableCode language="javascript" maxHeight={120}>
{`// 面试陷阱：宽松相等 vs 严格相等
console.log(null == undefined);   // true  (类型转换)
console.log(null === undefined);  // false (不同类型)

// 为什么 null == undefined？
// ECMAScript 规范特殊规定，它们互相宽松相等

// 实际开发建议：
if (value == null) {              // 同时检查 null 和 undefined
    // value 是 null 或 undefined
}`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">3. 对象属性访问的细节</h5>
                            <ExpandableCode language="javascript" maxHeight={150}>
{`const obj = { a: null, b: undefined };

// 面试细节：属性存在性检查
console.log('a' in obj);           // true  (null 属性存在)
console.log('b' in obj);           // true  (undefined 属性存在)
console.log('c' in obj);           // false (属性不存在)

console.log(obj.hasOwnProperty('a')); // true
console.log(obj.hasOwnProperty('c')); // false

// JSON 序列化的区别
JSON.stringify(obj);               // {"a":null}  (undefined被忽略)`}
                            </ExpandableCode>
                        </div>
                    </div>
                </WarningCard>

                <SecondaryCard title="💡 面试实战技巧">
                    <div className="space-y-4">
                        <div>
                            <h5 className="font-semibold">安全的变量检查方法</h5>
                            <ExpandableCode language="javascript" maxHeight={180}>
{`// 1. 检查变量是否为 null 或 undefined
function isNullish(value) {
    return value == null;  // 同时检查 null 和 undefined
}

// 2. 安全检查未声明的全局变量
function safeGlobalCheck(varName) {
    return typeof window !== 'undefined' && varName in window;
}

// 3. 空值合并运算符 (ES2020)
const config = userConfig ?? defaultConfig;  // 只有 null/undefined 才使用默认值

// 4. 可选链运算符 (ES2020)  
const userName = user?.profile?.name;  // 安全访问嵌套属性

// 5. 函数参数默认值处理
function greet(name = "Guest") {
    // 注意：只有 undefined 会使用默认值，null 不会
    return \`Hello, \${name}!\`;
}
greet(null);      // "Hello, null!"
greet(undefined); // "Hello, Guest!"`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">实际开发场景应用</h5>
                            <ExpandableCode language="javascript" maxHeight={150}>
{`// API 数据处理
function processApiData(response) {
    // null: 服务器返回的空值
    if (response.data === null) {
        return { error: 'No data available' };
    }
    
    // undefined: 可选字段未提供
    const metadata = response.metadata ?? {};
    
    return {
        data: response.data,
        metadata,
        timestamp: response.timestamp || Date.now()
    };
}

// 清理对象引用，防止内存泄漏
function cleanup() {
    this.cache = null;        // 显式清空，帮助垃圾回收
    this.listeners = null;    // 清除事件监听器引用
}`}
                            </ExpandableCode>
                        </div>
                    </div>
                </SecondaryCard>

                <InfoCard title="面试加分回答">
                    <ul className="list-disc pl-4 space-y-2">
                        <li><strong>设计哲学：</strong>null 是有意为之的空值，undefined 是系统的"意外"</li>
                        <li><strong>内存管理：</strong>使用 null 清除对象引用有助于垃圾回收</li>
                        <li><strong>API 设计：</strong>返回 null 表示查询无结果，undefined 表示字段不存在</li>
                        <li><strong>现代语法：</strong>熟悉空值合并（??）和可选链（?.）运算符的使用</li>
                    </ul>
                </InfoCard>
            </div>
        </QuestionCard>
    );
} 