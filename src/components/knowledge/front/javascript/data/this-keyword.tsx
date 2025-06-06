import { QuestionCard } from "../../../../base/knowledge_question_card"
import { ExpandableCode } from "../../../../base/expandable_code"
import { InfoCard } from "../../../../card/info_card"
import { WarningCard } from "../../../../card/warning_card"
import { SuccessCard } from "../../../../card/success_card"
import { SecondaryCard } from "../../../../card/secondary_card"

/**
 * # JavaScript this 关键字绑定规则
 */
export function FrontJavaScriptThisKeyword({ id }: { id: string }) {
    return (
        <QuestionCard question={{
            id,
            title: "this 关键字绑定规则",
            category: "this绑定",
            content: "面试问题：this 的四种绑定规则是什么？箭头函数的 this 有什么特殊性？如何解决 this 丢失问题？",
            tags: ["this", "绑定规则", "箭头函数", "call", "apply", "bind", "面试"]
        }}>
            <div className="space-y-6">
                <SuccessCard title="核心解答">
                    <p>this 有四种绑定规则：<strong>默认绑定</strong>（独立调用）、<strong>隐式绑定</strong>（对象方法）、<strong>显式绑定</strong>（call/apply/bind）、<strong>new绑定</strong>（构造函数）。优先级：new &gt; 显式 &gt; 隐式 &gt; 默认。箭头函数没有自己的 this，继承外层作用域。</p>
                </SuccessCard>

                <SecondaryCard title="📊 四种绑定规则对比">
                    <div className="overflow-x-auto mb-4">
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th>绑定规则</th>
                                    <th>调用方式</th>
                                    <th>this 指向</th>
                                    <th>优先级</th>
                                    <th>常见问题</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>默认绑定</strong></td>
                                    <td>独立函数调用</td>
                                    <td>全局对象/undefined</td>
                                    <td className="text-base-content/60">4 (最低)</td>
                                    <td>严格模式差异</td>
                                </tr>
                                <tr>
                                    <td><strong>隐式绑定</strong></td>
                                    <td>对象方法调用</td>
                                    <td>调用对象</td>
                                    <td className="text-info">3</td>
                                    <td>容易丢失绑定</td>
                                </tr>
                                <tr>
                                    <td><strong>显式绑定</strong></td>
                                    <td>call/apply/bind</td>
                                    <td>指定对象</td>
                                    <td className="text-warning">2</td>
                                    <td>硬绑定理解</td>
                                </tr>
                                <tr>
                                    <td><strong>new绑定</strong></td>
                                    <td>构造函数调用</td>
                                    <td>新创建对象</td>
                                    <td className="text-error">1 (最高)</td>
                                    <td>返回值影响</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <ExpandableCode language="javascript" maxHeight={150}>
{`// 四种绑定规则快速识别
function identify() {
    return this.name;
}

// 1. 默认绑定：独立调用
identify();  // 全局对象的 name 或 undefined(严格模式)

// 2. 隐式绑定：对象调用
const obj = { name: "对象", identify };
obj.identify();  // "对象"

// 3. 显式绑定：强制指定
identify.call({ name: "显式" });  // "显式"

// 4. new绑定：构造函数
function Person(name) { this.name = name; }
new Person("构造").name;  // "构造"`}
                    </ExpandableCode>
                </SecondaryCard>

                <WarningCard title="面试高频陷阱">
                    <div className="space-y-4">
                        <div>
                            <h5 className="font-semibold">1. 隐式绑定丢失（必考）</h5>
                            <ExpandableCode language="javascript" maxHeight={180}>
{`const obj = {
    name: "对象",
    greet() {
        console.log(\`Hello, \${this.name}\`);
    }
};

// 正常的隐式绑定
obj.greet();  // "Hello, 对象"

// 陷阱1：赋值丢失绑定
const greet = obj.greet;
greet();  // "Hello, undefined" (默认绑定)

// 陷阱2：参数传递丢失绑定
function execute(fn) {
    fn();  // 独立调用，默认绑定
}
execute(obj.greet);  // "Hello, undefined"

// 陷阱3：回调函数丢失绑定
setTimeout(obj.greet, 100);  // "Hello, undefined"

// 解决方案
setTimeout(() => obj.greet(), 100);  // 箭头函数保持绑定
setTimeout(obj.greet.bind(obj), 100);  // 显式绑定`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">2. 箭头函数的 this 误区</h5>
                            <ExpandableCode language="javascript" maxHeight={180}>
{`const obj = {
    name: "对象",
    
    // 普通方法：this 正常绑定
    method1() {
        console.log(this.name);  // "对象"
        
        // 内部普通函数：this 丢失
        function inner() {
            console.log(this.name);  // undefined
        }
        inner();
        
        // 内部箭头函数：继承外层 this
        const arrowInner = () => {
            console.log(this.name);  // "对象"
        };
        arrowInner();
    },
    
    // 箭头函数作为方法：this 指向外层作用域（全局）
    method2: () => {
        console.log(this.name);  // undefined (不是 "对象")
    }
};

// 箭头函数的 this 无法改变
const arrow = () => console.log(this.name);
arrow.call({ name: "尝试改变" });  // 依然是外层作用域的 this`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">3. 构造函数返回值的影响</h5>
                            <ExpandableCode language="javascript" maxHeight={120}>
{`function Person(name) {
    this.name = name;
    
    // 返回原始值：被忽略，返回 this
    // return "ignored";
    
    // 返回对象：覆盖 this
    // return { age: 25 };
}

const p1 = new Person("Alice");
console.log(p1.name);  // "Alice" (正常)

function PersonWithReturn(name) {
    this.name = name;
    return { age: 25 };  // 返回对象覆盖 this
}

const p2 = new PersonWithReturn("Bob");
console.log(p2.name);  // undefined
console.log(p2.age);   // 25`}
                            </ExpandableCode>
                        </div>
                    </div>
                </WarningCard>

                <SecondaryCard title="🎯 call、apply、bind 深入理解">
                    <div className="space-y-4">
                        <div>
                            <h5 className="font-semibold">三者区别与应用场景</h5>
                            <ExpandableCode language="javascript" maxHeight={150}>
{`function greet(greeting, punctuation) {
    return \`\${greeting}, \${this.name}\${punctuation}\`;
}

const person = { name: "Alice" };

// call：立即调用，参数逐个传递
greet.call(person, "Hello", "!");  // "Hello, Alice!"

// apply：立即调用，参数数组传递（记忆：Array -> Apply）
greet.apply(person, ["Hi", "?"]);  // "Hi, Alice?"

// bind：返回新函数，预设 this 和参数
const boundGreet = greet.bind(person, "Hey");
boundGreet("~");  // "Hey, Alice~"

// 实际应用场景
Math.max.apply(null, [1, 2, 3]);  // 数组展开（ES6前）
[].slice.call(arguments);         // 类数组转数组（ES6前）
func.bind(this, param1);          // React 事件处理器绑定`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">手写 bind 的实现（高频面试题）</h5>
                            <ExpandableCode language="javascript" maxHeight={150}>
{`Function.prototype.myBind = function(context, ...args1) {
    if (typeof this !== 'function') {
        throw new TypeError('not a function');
    }
    
    const fn = this;
    
    function BoundFunction(...args2) {
        // 判断是否通过 new 调用
        if (new.target) {
            // new 调用：this 指向新创建的对象
            return fn.apply(this, args1.concat(args2));
        } else {
            // 普通调用：this 指向绑定的 context
            return fn.apply(context, args1.concat(args2));
        }
    }
    
    // 维护原型链
    if (fn.prototype) {
        BoundFunction.prototype = Object.create(fn.prototype);
    }
    
    return BoundFunction;
};

// 测试
function Test(name) {
    this.name = name;
}
const bound = Test.myBind({ name: "context" });
const instance = new bound("new调用");  // this 指向新对象`}
                            </ExpandableCode>
                        </div>
                    </div>
                </SecondaryCard>

                <SecondaryCard title="💡 实际开发应用">
                    <div className="space-y-4">
                        <div>
                            <h5 className="font-semibold">React 中的 this 处理</h5>
                            <ExpandableCode language="javascript" maxHeight={120}>
{`// Class 组件中的事件处理
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
        
        // 方法1：构造函数中绑定
        this.handleClick1 = this.handleClick1.bind(this);
    }
    
    handleClick1() {
        this.setState({ count: this.state.count + 1 });
    }
    
    // 方法2：箭头函数方法（推荐）
    handleClick2 = () => {
        this.setState({ count: this.state.count + 1 });
    }
    
    render() {
        return (
            <div>
                {/* 方法3：内联箭头函数（性能较差）*/}
                <button onClick={() => this.handleClick1()}>
                    Count: {this.state.count}
                </button>
            </div>
        );
    }
}`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">函数式编程中的应用</h5>
                            <ExpandableCode language="javascript" maxHeight={100}>
{`// 柯里化和偏函数应用
const multiply = (a, b) => a * b;
const double = multiply.bind(null, 2);
console.log(double(5));  // 10

// 事件处理器的通用绑定
const bindEvents = (element, events) => {
    Object.keys(events).forEach(event => {
        element.addEventListener(event, events[event].bind(element));
    });
};

// 模块化开发中的上下文保持
const api = {
    baseURL: 'https://api.example.com',
    request(endpoint) {
        return fetch(\`\${this.baseURL}\${endpoint}\`);
    }
};
const request = api.request.bind(api);  // 保持上下文`}
                            </ExpandableCode>
                        </div>
                    </div>
                </SecondaryCard>

                <InfoCard title="面试高分答题思路">
                    <ul className="list-disc pl-4 space-y-2">
                        <li><strong>规则记忆：</strong>按优先级记忆四种绑定规则，new &gt; 显式 &gt; 隐式 &gt; 默认</li>
                        <li><strong>陷阱识别：</strong>重点掌握隐式绑定丢失的各种场景</li>
                        <li><strong>箭头函数：</strong>强调继承而非绑定，无法改变 this</li>
                        <li><strong>手写能力：</strong>能够实现 bind 方法，理解硬绑定原理</li>
                        <li><strong>实际应用：</strong>结合 React、事件处理等实际场景</li>
                        <li><strong>性能考虑：</strong>了解不同绑定方式的性能影响</li>
                    </ul>
                </InfoCard>
            </div>
        </QuestionCard>
    );
} 