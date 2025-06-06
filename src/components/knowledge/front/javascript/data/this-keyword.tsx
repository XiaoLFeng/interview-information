import { QuestionCard } from "../../../../base/knowledge_question_card"
import { ExpandableCode } from "../../../../base/expandable_code"
import { InfoCard } from "../../../../card/info_card"
import { WarningCard } from "../../../../card/warning_card"
import { SuccessCard } from "../../../../card/success_card"

/**
 * # this关键字的绑定规则
 */
export function FrontJavaScriptThisKeyword({ id }: { id: string }) {
    return (
        <QuestionCard question={{
            id,
            title: "this关键字的绑定规则",
            category: "this绑定",
            content: "深入理解 JavaScript 中 this 关键字的四种绑定规则：默认绑定、隐式绑定、显式绑定和 new 绑定，以及箭头函数中 this 的特殊行为。",
            tags: ["this", "绑定规则", "call", "apply", "bind", "箭头函数"]
        }}>
            <div className="space-y-6">
                {/* 四种绑定规则 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoCard title="默认绑定">
                        <div className="space-y-2 text-sm">
                            <p><strong>场景：</strong>独立函数调用</p>
                            <p><strong>严格模式：</strong>this 为 undefined</p>
                            <p><strong>非严格模式：</strong>this 为全局对象</p>
                            <div className="badge badge-info">优先级最低</div>
                        </div>
                    </InfoCard>

                    <WarningCard title="隐式绑定">
                        <div className="space-y-2 text-sm">
                            <p><strong>场景：</strong>对象方法调用</p>
                            <p><strong>规则：</strong>this 指向调用对象</p>
                            <p><strong>陷阱：</strong>容易丢失绑定</p>
                            <div className="badge badge-warning">常见误区</div>
                        </div>
                    </WarningCard>

                    <SuccessCard title="显式绑定">
                        <div className="space-y-2 text-sm">
                            <p><strong>方法：</strong>call、apply、bind</p>
                            <p><strong>特点：</strong>明确指定 this</p>
                            <p><strong>优势：</strong>可控性强</p>
                            <div className="badge badge-success">推荐使用</div>
                        </div>
                    </SuccessCard>

                    <InfoCard title="new 绑定">
                        <div className="space-y-2 text-sm">
                            <p><strong>场景：</strong>构造函数调用</p>
                            <p><strong>过程：</strong>创建新对象并绑定</p>
                            <p><strong>返回：</strong>新创建的对象</p>
                            <div className="badge badge-info">优先级最高</div>
                        </div>
                    </InfoCard>
                </div>

                {/* 默认绑定示例 */}
                <InfoCard title="1. 默认绑定">
                    <ExpandableCode language="javascript">
{`// 默认绑定 - 独立函数调用
function foo() {
  console.log(this); // 严格模式: undefined, 非严格模式: window/global
}

foo(); // 独立调用

// 严格模式下的行为
"use strict";
function strictFoo() {
  console.log(this); // undefined
}

strictFoo();

// 嵌套函数中的默认绑定
var obj = {
  name: "对象",
  test: function() {
    console.log(this.name); // "对象" (隐式绑定)
    
    function inner() {
      console.log(this.name); // undefined (默认绑定)
    }
    inner();
  }
};

obj.test();`}
                    </ExpandableCode>
                </InfoCard>

                {/* 隐式绑定示例 */}
                <WarningCard title="2. 隐式绑定及其陷阱">
                    <ExpandableCode language="javascript">
{`var obj = {
  name: "对象",
  greet: function() {
    console.log("Hello, " + this.name);
  }
};

// 隐式绑定
obj.greet(); // "Hello, 对象"

// 陷阱1：赋值丢失绑定
var greet = obj.greet;
greet(); // "Hello, undefined" (默认绑定)

// 陷阱2：参数传递丢失绑定
function executeFunction(fn) {
  fn(); // 独立调用，默认绑定
}

executeFunction(obj.greet); // "Hello, undefined"

// 陷阱3：setTimeout丢失绑定
setTimeout(obj.greet, 1000); // "Hello, undefined"

// 解决方案：使用箭头函数或bind
setTimeout(() => obj.greet(), 1000); // "Hello, 对象"
setTimeout(obj.greet.bind(obj), 1000); // "Hello, 对象"`}
                    </ExpandableCode>
                </WarningCard>

                {/* 显式绑定示例 */}
                <SuccessCard title="3. 显式绑定 (call, apply, bind)">
                    <ExpandableCode language="javascript">
{`function greet(greeting, punctuation) {
  console.log(greeting + ", " + this.name + punctuation);
}

var person = { name: "Alice" };

// call: 立即调用，参数逐个传递
greet.call(person, "Hello", "!"); // "Hello, Alice!"

// apply: 立即调用，参数数组传递
greet.apply(person, ["Hi", "?"]); // "Hi, Alice?"

// bind: 返回新函数，预设this和参数
var boundGreet = greet.bind(person, "Hey");
boundGreet("~"); // "Hey, Alice~"

// 硬绑定 - bind的内部实现原理
Function.prototype.myBind = function(context, ...args1) {
  var fn = this;
  return function(...args2) {
    return fn.apply(context, args1.concat(args2));
  };
};

var myBoundGreet = greet.myBind(person, "Custom");
myBoundGreet("!!!"); // "Custom, Alice!!!"`}
                    </ExpandableCode>
                </SuccessCard>

                {/* new绑定示例 */}
                <InfoCard title="4. new 绑定">
                    <ExpandableCode language="javascript">
{`// 构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function() {
    console.log("Hello, I'm " + this.name);
  };
}

// new 绑定的过程：
// 1. 创建新对象
// 2. 新对象链接到构造函数的prototype
// 3. 构造函数的this绑定到新对象
// 4. 返回新对象（除非构造函数返回其他对象）

var alice = new Person("Alice", 25);
alice.greet(); // "Hello, I'm Alice"

// new 绑定的优先级最高
function Foo(name) {
  this.name = name;
}

var obj = {};
var bar = Foo.bind(obj);
bar("绑定的名字");
console.log(obj.name); // "绑定的名字"

var baz = new bar("new的名字");
console.log(obj.name); // "绑定的名字" (没变)
console.log(baz.name); // "new的名字" (new绑定优先)`}
                    </ExpandableCode>
                </InfoCard>

                {/* 箭头函数 */}
                <SuccessCard title="箭头函数中的 this">
                    <ExpandableCode language="javascript">
{`// 箭头函数不绑定this，继承外层作用域的this
var obj = {
  name: "对象",
  
  // 普通函数
  normalMethod: function() {
    console.log("normal:", this.name); // "对象"
    
    // 内部普通函数 - 丢失this绑定
    function inner() {
      console.log("inner normal:", this.name); // undefined
    }
    inner();
    
    // 内部箭头函数 - 继承外层this
    var arrowInner = () => {
      console.log("inner arrow:", this.name); // "对象"
    };
    arrowInner();
  },
  
  // 箭头函数方法 - 继承全局this
  arrowMethod: () => {
    console.log("arrow method:", this.name); // undefined (继承全局)
  }
};

obj.normalMethod();
obj.arrowMethod();

// 箭头函数的this无法改变
var arrowFunc = () => {
  console.log(this.name);
};

var context = { name: "上下文" };
arrowFunc.call(context); // this仍然是定义时的上下文，不是context`}
                    </ExpandableCode>
                </SuccessCard>

                {/* 优先级规则 */}
                <InfoCard title="this 绑定优先级">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-base-200 rounded">
                            <span>new 绑定</span>
                            <span className="badge badge-error">优先级 1 (最高)</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-base-200 rounded">
                            <span>显式绑定 (call/apply/bind)</span>
                            <span className="badge badge-warning">优先级 2</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-base-200 rounded">
                            <span>隐式绑定 (对象方法)</span>
                            <span className="badge badge-info">优先级 3</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-base-200 rounded">
                            <span>默认绑定 (独立调用)</span>
                            <span className="badge badge-ghost">优先级 4 (最低)</span>
                        </div>
                        
                        <ExpandableCode language="javascript">
{`// 优先级测试
function Foo(name) {
  this.name = name;
}

var obj = { name: "对象" };

// 显式绑定 vs 隐式绑定
obj.foo = Foo;
obj.foo("隐式"); // 隐式绑定
obj.foo.call({}, "显式"); // 显式绑定优先

// new绑定 vs 显式绑定
var bound = Foo.bind(obj);
var instance = new bound("new绑定"); // new绑定优先
console.log(instance.name); // "new绑定"`}
                        </ExpandableCode>
                    </div>
                </InfoCard>
            </div>
        </QuestionCard>
    );
} 