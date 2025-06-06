import { QuestionCard } from "../../../../base/knowledge_question_card"
import { ExpandableCode } from "../../../../base/expandable_code"
import { InfoCard } from "../../../../card/info_card"
import { WarningCard } from "../../../../card/warning_card"
import { SuccessCard } from "../../../../card/success_card"

/**
 * # 作用域、提升与声明方式: var vs. let vs. const
 */
export function FrontJavaScriptVarLetConst({ id }: { id: string }) {
    return (
        <QuestionCard question={{
            id,
            title: "作用域、提升与声明方式: var vs. let vs. const",
            category: "作用域与提升",
            content: "详细解释 JavaScript 中 var、let、const 三种变量声明方式的区别，包括它们的作用域、提升行为、重复声明规则等。",
            tags: ["var", "let", "const", "作用域", "提升", "暂时性死区"]
        }}>
            <div className="space-y-6">
                {/* 三种声明方式对比 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <WarningCard title="var">
                        <div className="space-y-2 text-sm">
                            <p><strong>作用域：</strong>函数作用域</p>
                            <p><strong>提升：</strong>声明和初始化都提升</p>
                            <p><strong>重复声明：</strong>允许</p>
                            <p><strong>暂时性死区：</strong>无</p>
                            <div className="badge badge-error">ES5</div>
                        </div>
                    </WarningCard>

                    <SuccessCard title="let">
                        <div className="space-y-2 text-sm">
                            <p><strong>作用域：</strong>块级作用域</p>
                            <p><strong>提升：</strong>声明提升，无初始化</p>
                            <p><strong>重复声明：</strong>不允许</p>
                            <p><strong>暂时性死区：</strong>有</p>
                            <div className="badge badge-success">ES6</div>
                        </div>
                    </SuccessCard>

                    <InfoCard title="const">
                        <div className="space-y-2 text-sm">
                            <p><strong>作用域：</strong>块级作用域</p>
                            <p><strong>提升：</strong>声明提升，无初始化</p>
                            <p><strong>重复声明：</strong>不允许</p>
                            <p><strong>暂时性死区：</strong>有</p>
                            <div className="badge badge-info">常量</div>
                        </div>
                    </InfoCard>
                </div>

                {/* 作用域示例 */}
                <InfoCard title="作用域对比示例">
                    <ExpandableCode language="javascript">
{`// var: 函数作用域
function varExample() {
  if (true) {
    var x = 1;
  }
  console.log(x); // 1 (可以访问)
}

// let/const: 块级作用域
function letExample() {
  if (true) {
    let y = 1;
    const z = 1;
  }
  console.log(y); // ReferenceError: y is not defined
  console.log(z); // ReferenceError: z is not defined
}

// 经典循环问题
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 输出: 3, 3, 3
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 100); // 输出: 0, 1, 2
}`}
                    </ExpandableCode>
                </InfoCard>

                {/* 提升行为 */}
                <WarningCard title="提升行为 (Hoisting)">
                    <ExpandableCode language="javascript">
{`// var 提升 - 声明和初始化都提升
console.log(a); // undefined (不是 ReferenceError)
var a = 5;

// 等价于:
var a; // 声明提升到顶部，初始化为 undefined
console.log(a); // undefined
a = 5;

// let/const 提升 - 只有声明提升，但有暂时性死区
console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 10;

console.log(c); // ReferenceError: Cannot access 'c' before initialization
const c = 20;`}
                    </ExpandableCode>
                </WarningCard>

                {/* 重复声明 */}
                <InfoCard title="重复声明规则">
                    <ExpandableCode language="javascript">
{`// var 允许重复声明
var name = "Alice";
var name = "Bob"; // 不报错，覆盖之前的值
console.log(name); // "Bob"

// let/const 不允许重复声明
let age = 25;
let age = 30; // SyntaxError: Identifier 'age' has already been declared

const score = 100;
const score = 200; // SyntaxError: Identifier 'score' has already been declared`}
                    </ExpandableCode>
                </InfoCard>

                {/* const 特殊性 */}
                <SuccessCard title="const 的特殊性">
                    <div className="space-y-4">
                        <div>
                            <h5 className="font-semibold">✅ 必须声明时初始化</h5>
                            <ExpandableCode language="javascript">
{`const PI = 3.14159; // 正确
const E; // SyntaxError: Missing initializer in const declaration`}
                            </ExpandableCode>
                        </div>
                        
                        <div>
                            <h5 className="font-semibold">⚠️ 对象和数组可以修改内容</h5>
                            <ExpandableCode language="javascript">
{`const obj = { name: "Alice" };
obj.name = "Bob"; // 允许修改属性
obj.age = 25;     // 允许添加属性
// obj = {}; // TypeError: Assignment to constant variable.

const arr = [1, 2, 3];
arr.push(4);      // 允许修改数组内容
arr[0] = 0;       // 允许修改元素
// arr = []; // TypeError: Assignment to constant variable.`}
                            </ExpandableCode>
                        </div>
                    </div>
                </SuccessCard>

                {/* 暂时性死区 */}
                <WarningCard title="暂时性死区 (Temporal Dead Zone)">
                    <ExpandableCode language="javascript">
{`// 暂时性死区示例
console.log(typeof x); // "undefined"
console.log(typeof y); // ReferenceError: Cannot access 'y' before initialization

let y = 3;

// 函数参数的暂时性死区
function example(value = getValue()) {
  return value;
  
  function getValue() {
    return temp; // ReferenceError: Cannot access 'temp' before initialization
  }
  
  let temp = "Hello";
}`}
                    </ExpandableCode>
                </WarningCard>
            </div>
        </QuestionCard>
    );
} 