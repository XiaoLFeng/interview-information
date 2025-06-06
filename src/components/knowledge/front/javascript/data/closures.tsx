import { QuestionCard } from "../../../../base/knowledge_question_card"
import { ExpandableCode } from "../../../../base/expandable_code"
import { InfoCard } from "../../../../card/info_card"
import { WarningCard } from "../../../../card/warning_card"
import { SuccessCard } from "../../../../card/success_card"

/**
 * # 闭包：概念、应用与内存管理
 */
export function FrontJavaScriptClosures({ id }: { id: string }) {
    return (
        <QuestionCard question={{
            id,
            title: "闭包：概念、应用与内存管理",
            category: "闭包机制",
            content: "深入理解 JavaScript 闭包的概念、形成条件、实际应用场景，以及闭包可能带来的内存泄漏问题和解决方案。",
            tags: ["闭包", "词法作用域", "内存管理", "模块模式", "柯里化"]
        }}>
            <div className="space-y-6">
                {/* 闭包核心概念 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoCard title="闭包定义">
                        <div className="space-y-2 text-sm">
                            <p><strong>概念：</strong>函数能够访问其词法作用域</p>
                            <p><strong>条件：</strong>内部函数引用外部变量</p>
                            <p><strong>特点：</strong>变量持久化保存</p>
                            <div className="badge badge-info">词法作用域</div>
                        </div>
                    </InfoCard>

                    <SuccessCard title="闭包用途">
                        <div className="space-y-2 text-sm">
                            <p><strong>数据封装：</strong>创建私有变量</p>
                            <p><strong>模块模式：</strong>创建独立模块</p>
                            <p><strong>函数工厂：</strong>动态创建函数</p>
                            <div className="badge badge-success">设计模式</div>
                        </div>
                    </SuccessCard>
                </div>

                {/* 基础闭包示例 */}
                <InfoCard title="闭包的基本形式">
                    <ExpandableCode language="javascript">
{`// 最简单的闭包示例
function outerFunction(x) {
  // 外部函数的变量
  var outerVariable = x;
  
  // 内部函数（闭包）
  function innerFunction(y) {
    // 内部函数访问外部函数的变量
    console.log(outerVariable + y);
  }
  
  return innerFunction;
}

// 创建闭包
var closure = outerFunction(10);
closure(5); // 15

// 即使外部函数执行完毕，闭包仍能访问outerVariable
var anotherClosure = outerFunction(20);
anotherClosure(5); // 25

// 每个闭包都有自己独立的词法环境
closure(5); // 15 (仍然是10+5)`}
                    </ExpandableCode>
                </InfoCard>

                {/* 计数器示例 */}
                <SuccessCard title="经典应用：计数器">
                    <ExpandableCode language="javascript">
{`// 使用闭包创建私有变量
function createCounter() {
  let count = 0; // 私有变量，外部无法直接访问
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1.increment()); // 1
console.log(counter1.increment()); // 2
console.log(counter2.increment()); // 1 (独立的计数器)

// 无法直接访问count
console.log(counter1.count); // undefined
// console.log(count); // ReferenceError

// 更高级的计数器
function createAdvancedCounter(initialValue = 0, step = 1) {
  let count = initialValue;
  
  return {
    next: () => count += step,
    prev: () => count -= step,
    reset: () => count = initialValue,
    value: () => count
  };
}`}
                    </ExpandableCode>
                </SuccessCard>

                {/* 模块模式 */}
                <InfoCard title="模块模式 (Module Pattern)">
                    <ExpandableCode language="javascript">
{`// IIFE + 闭包实现模块模式
const UserModule = (function() {
  // 私有变量和方法
  let users = [];
  let currentId = 1;
  
  function generateId() {
    return currentId++;
  }
  
  function validateUser(user) {
    return user && user.name && user.email;
  }
  
  // 公共API
  return {
    addUser: function(name, email) {
      if (validateUser({name, email})) {
        const user = {
          id: generateId(),
          name: name,
          email: email,
          createdAt: new Date()
        };
        users.push(user);
        return user;
      }
      throw new Error('Invalid user data');
    },
    
    getUser: function(id) {
      return users.find(user => user.id === id);
    },
    
    getAllUsers: function() {
      return [...users]; // 返回副本，防止外部修改
    },
    
    getUserCount: function() {
      return users.length;
    }
  };
})();

// 使用模块
UserModule.addUser("Alice", "alice@example.com");
UserModule.addUser("Bob", "bob@example.com");
console.log(UserModule.getAllUsers());
console.log(UserModule.getUserCount()); // 2

// 私有变量无法直接访问
// console.log(UserModule.users); // undefined`}
                    </ExpandableCode>
                </InfoCard>

                {/* 函数工厂 */}
                <SuccessCard title="函数工厂与柯里化">
                    <ExpandableCode language="javascript">
{`// 函数工厂 - 动态创建具有特定行为的函数
function createValidator(rules) {
  return function(value) {
    return rules.every(rule => rule(value));
  };
}

// 创建不同的验证器
const emailValidator = createValidator([
  value => typeof value === 'string',
  value => value.includes('@'),
  value => value.length > 5
]);

const passwordValidator = createValidator([
  value => typeof value === 'string',
  value => value.length >= 8,
  value => /[A-Z]/.test(value),
  value => /[0-9]/.test(value)
]);

console.log(emailValidator("test@example.com")); // true
console.log(passwordValidator("Password123")); // true

// 柯里化 (Currying)
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

// 原函数
function add(a, b, c) {
  return a + b + c;
}

// 柯里化后的函数
const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6

// 偏函数应用
const add5 = curriedAdd(5);
console.log(add5(2)(3)); // 10`}
                    </ExpandableCode>
                </SuccessCard>

                {/* 常见陷阱 */}
                <WarningCard title="常见陷阱与解决方案">
                    <div className="space-y-4">
                        <div>
                            <h5 className="font-semibold text-warning">❌ 循环中的闭包陷阱</h5>
                            <ExpandableCode language="javascript">
{`// 问题：所有闭包共享同一个变量
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // 输出 3, 3, 3
  }, 1000);
}

// 解决方案1：使用IIFE创建独立作用域
for (var i = 0; i < 3; i++) {
  (function(index) {
    setTimeout(function() {
      console.log(index); // 输出 0, 1, 2
    }, 1000);
  })(i);
}

// 解决方案2：使用let创建块级作用域
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // 输出 0, 1, 2
  }, 1000);
}

// 解决方案3：使用bind
for (var i = 0; i < 3; i++) {
  setTimeout(function(index) {
    console.log(index); // 输出 0, 1, 2
  }.bind(null, i), 1000);
}`}
                            </ExpandableCode>
                        </div>
                        
                        <div>
                            <h5 className="font-semibold text-warning">⚠️ 内存泄漏风险</h5>
                            <ExpandableCode language="javascript">
{`// 可能导致内存泄漏的闭包
function createHandler() {
  var largeData = new Array(1000000).fill('data'); // 大量数据
  
  return function() {
    // 即使不使用largeData，它也会被保留在内存中
    console.log('Handler called');
  };
}

// 解决方案：明确释放不需要的引用
function createHandlerFixed() {
  var largeData = new Array(1000000).fill('data');
  var importantData = largeData.slice(0, 10); // 只保留需要的数据
  
  largeData = null; // 手动释放大数据的引用
  
  return function() {
    console.log('Handler called', importantData.length);
  };
}

// DOM事件处理中的内存泄漏
function attachListener() {
  var element = document.getElementById('myButton');
  var largeObject = {
    data: new Array(1000000).fill('data')
  };
  
  element.onclick = function() {
    // largeObject会被保留，即使不再需要
    console.log('Button clicked');
  };
  
  // 解决方案：在适当时机清理
  return function cleanup() {
    element.onclick = null;
    largeObject = null;
  };
}`}
                            </ExpandableCode>
                        </div>
                    </div>
                </WarningCard>

                {/* 性能考虑 */}
                <InfoCard title="性能优化建议">
                    <div className="space-y-3">
                        <div>
                            <h5 className="font-semibold">📈 最佳实践</h5>
                            <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                                <li>避免在闭包中保留不必要的大对象引用</li>
                                <li>及时清理DOM事件监听器中的闭包</li>
                                <li>使用WeakMap和WeakSet避免循环引用</li>
                                <li>在不需要时手动设置变量为null</li>
                            </ul>
                        </div>
                        
                        <ExpandableCode language="javascript">
{`// 使用WeakMap避免内存泄漏
const elementData = new WeakMap();

function setElementData(element, data) {
  elementData.set(element, data);
}

function getElementData(element) {
  return elementData.get(element);
}

// 当element被垃圾回收时，WeakMap中的数据也会自动清理

// 优化的事件处理
class EventManager {
  constructor() {
    this.listeners = new WeakMap();
  }
  
  addListener(element, event, handler) {
    if (!this.listeners.has(element)) {
      this.listeners.set(element, new Map());
    }
    
    const elementListeners = this.listeners.get(element);
    elementListeners.set(event, handler);
    element.addEventListener(event, handler);
  }
  
  removeListener(element, event) {
    const elementListeners = this.listeners.get(element);
    if (elementListeners) {
      const handler = elementListeners.get(event);
      if (handler) {
        element.removeEventListener(event, handler);
        elementListeners.delete(event);
      }
    }
  }
}`}
                        </ExpandableCode>
                    </div>
                </InfoCard>
            </div>
        </QuestionCard>
    );
} 