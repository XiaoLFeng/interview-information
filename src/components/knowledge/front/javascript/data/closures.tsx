import { QuestionCard } from "../../../../base/knowledge_question_card"
import { ExpandableCode } from "../../../../base/expandable_code"
import { InfoCard } from "../../../../card/info_card"
import { WarningCard } from "../../../../card/warning_card"
import { SuccessCard } from "../../../../card/success_card"
import { SecondaryCard } from "../../../../card/secondary_card"

/**
 * # JavaScript 闭包机制详解
 */
export function FrontJavaScriptClosures({ id }: { id: string }) {
    return (
        <QuestionCard question={{
            id,
            title: "闭包：概念、应用与内存管理",
            category: "闭包机制",
            content: "面试问题：什么是闭包？闭包的应用场景有哪些？如何避免闭包导致的内存泄漏？",
            tags: ["闭包", "词法作用域", "内存管理", "模块模式", "柯里化", "面试"]
        }}>
            <div className="space-y-6">
                <SuccessCard title="核心解答">
                    <p><strong>闭包</strong> 是函数能够访问其<strong>词法作用域</strong>中变量的特性，即使外部函数已执行完毕。形成条件：内部函数引用外部变量。用途：数据封装、模块模式、函数工厂、事件处理。注意内存管理。</p>
                </SuccessCard>

                <SecondaryCard title="🎯 闭包的本质理解">
                    <div className="mb-4">
                        <h5 className="font-semibold mb-2">词法作用域 + 函数是一等公民 = 闭包</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="border border-info/20 rounded p-3">
                                <h6 className="font-semibold text-info">词法作用域</h6>
                                <p>函数定义时确定作用域链，而非执行时</p>
                            </div>
                            <div className="border border-success/20 rounded p-3">
                                <h6 className="font-semibold text-success">一等公民</h6>
                                <p>函数可以作为值传递、返回、赋值</p>
                            </div>
                        </div>
                    </div>

                    <ExpandableCode language="javascript" maxHeight={150}>
{`// 闭包的形成过程
function createClosure(x) {
    // 1. 外部函数的执行上下文
    const outerVar = x;
    
    // 2. 内部函数定义时，捕获外部变量
    function innerFunction(y) {
        return outerVar + y;  // 引用外部变量，形成闭包
    }
    
    // 3. 返回内部函数（带着外部变量的引用）
    return innerFunction;
}

// 4. 外部函数执行完毕，但变量仍被闭包保持
const closure = createClosure(10);
console.log(closure(5));  // 15

// 每次调用 createClosure 都创建新的词法环境
const closure2 = createClosure(20);
console.log(closure2(5)); // 25
console.log(closure(5));  // 15 (独立环境)`}
                    </ExpandableCode>
                </SecondaryCard>

                <WarningCard title="面试经典陷阱">
                    <div className="space-y-4">
                        <div>
                            <h5 className="font-semibold">1. 循环中的闭包问题（必考）</h5>
                            <ExpandableCode language="javascript" maxHeight={180}>
{`// 经典错误：为什么都输出 3？
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i);  // 输出: 3, 3, 3
    }, 100);
}

// 原因分析：
// 1. var 是函数作用域，循环结束后 i = 3
// 2. setTimeout 的回调函数形成闭包，引用同一个 i
// 3. 异步执行时，i 已经是 3

// 解决方案1：使用 let（块级作用域）
for (let i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i);  // 输出: 0, 1, 2
    }, 100);
}

// 解决方案2：立即执行函数（IIFE）
for (var i = 0; i < 3; i++) {
    (function(j) {
        setTimeout(function() {
            console.log(j);  // 输出: 0, 1, 2
        }, 100);
    })(i);
}

// 解决方案3：函数工厂
function createLogger(index) {
    return function() {
        console.log(index);
    };
}

for (var i = 0; i < 3; i++) {
    setTimeout(createLogger(i), 100);  // 输出: 0, 1, 2
}`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">2. this 在闭包中的表现</h5>
                            <ExpandableCode language="javascript" maxHeight={150}>
{`const obj = {
    name: "对象",
    
    method1: function() {
        console.log(this.name);  // "对象"
        
        // 普通函数：this 丢失
        function inner() {
            console.log(this.name);  // undefined
        }
        inner();
        
        // 解决方案1：保存 this
        const self = this;
        function innerWithSelf() {
            console.log(self.name);  // "对象"
        }
        innerWithSelf();
        
        // 解决方案2：箭头函数
        const innerArrow = () => {
            console.log(this.name);  // "对象"
        };
        innerArrow();
    }
};

// 面试追问：为什么箭头函数没有 this 绑定？
// 答：箭头函数继承外层作用域的 this，这本质上也是闭包的应用`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">3. 闭包与变量共享</h5>
                            <ExpandableCode language="javascript" maxHeight={120}>
{`function createFunctions() {
    const result = [];
    
    // 错误方式：共享变量
    for (var i = 0; i < 3; i++) {
        result[i] = function() {
            return i;  // 所有函数都引用同一个 i
        };
    }
    
    return result;
}

const fns = createFunctions();
console.log(fns[0]());  // 3 (不是0)
console.log(fns[1]());  // 3 (不是1)
console.log(fns[2]());  // 3 (不是2)

// 正确方式：创建独立作用域
function createFunctionsCorrect() {
    const result = [];
    
    for (let i = 0; i < 3; i++) {  // 使用 let
        result[i] = function() {
            return i;  // 每个函数都有独立的 i
        };
    }
    
    return result;
}`}
                            </ExpandableCode>
                        </div>
                    </div>
                </WarningCard>

                <SecondaryCard title="💼 实际应用场景">
                    <div className="space-y-4">
                        <div>
                            <h5 className="font-semibold">1. 模块模式（数据封装）</h5>
                            <ExpandableCode language="javascript" maxHeight={180}>
{`// 经典模块模式：私有变量 + 公共接口
const Counter = (function() {
    // 私有变量，外部无法访问
    let count = 0;
    const listeners = [];
    
    // 私有方法
    function notify(newValue) {
        listeners.forEach(listener => listener(newValue));
    }
    
    // 返回公共接口
    return {
        increment() {
            count++;
            notify(count);
            return count;
        },
        
        decrement() {
            count--;
            notify(count);
            return count;
        },
        
        getValue() {
            return count;
        },
        
        addListener(callback) {
            listeners.push(callback);
        },
        
        reset() {
            count = 0;
            notify(count);
        }
    };
})();

// 使用
Counter.addListener(value => console.log(\`计数器: \${value}\`));
Counter.increment();  // 计数器: 1
Counter.increment();  // 计数器: 2
console.log(Counter.count);  // undefined (私有变量)`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">2. 函数柯里化</h5>
                            <ExpandableCode language="javascript" maxHeight={150}>
{`// 柯里化：将多参数函数转换为一系列单参数函数
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

// 示例函数
function add(a, b, c) {
    return a + b + c;
}

const curriedAdd = curry(add);

// 多种调用方式
console.log(curriedAdd(1)(2)(3));       // 6
console.log(curriedAdd(1, 2)(3));       // 6
console.log(curriedAdd(1)(2, 3));       // 6

// 实际应用：创建专用函数
const add10 = curriedAdd(10);
const add10and5 = add10(5);
console.log(add10and5(3));               // 18`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">3. 防抖和节流</h5>
                            <ExpandableCode language="javascript" maxHeight={150}>
{`// 防抖：延迟执行，重复调用会重置延迟
function debounce(func, delay) {
    let timeoutId;
    
    return function(...args) {
        // 清除之前的定时器
        clearTimeout(timeoutId);
        
        // 设置新的定时器
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// 节流：限制执行频率
function throttle(func, limit) {
    let inThrottle;
    
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 应用示例
const debouncedSearch = debounce(searchFunction, 300);
const throttledScroll = throttle(handleScroll, 100);

// 输入框搜索防抖
input.addEventListener('input', debouncedSearch);
// 滚动节流
window.addEventListener('scroll', throttledScroll);`}
                            </ExpandableCode>
                        </div>
                    </div>
                </SecondaryCard>

                <WarningCard title="内存管理与性能">
                    <div className="space-y-4">
                        <div>
                            <h5 className="font-semibold">闭包可能导致的内存泄漏</h5>
                            <ExpandableCode language="javascript" maxHeight={150}>
{`// 内存泄漏示例：循环引用
function createHandler() {
    const element = document.getElementById('button');
    const data = new Array(1000000).fill('large data');
    
    // 问题：element 和闭包相互引用
    element.onclick = function() {
        console.log(data.length);  // 闭包引用 data
        // element 也被闭包引用（通过外部变量）
    };
    
    // 即使 createHandler 执行完，data 也不会被回收
}

// 解决方案1：断开引用
function createHandlerFixed1() {
    const element = document.getElementById('button');
    const data = new Array(1000000).fill('large data');
    
    element.onclick = function() {
        console.log(data.length);
    };
    
    return function cleanup() {
        element.onclick = null;  // 断开引用
        element = null;
        data = null;
    };
}

// 解决方案2：WeakMap
const elementData = new WeakMap();
function createHandlerFixed2() {
    const element = document.getElementById('button');
    const data = new Array(1000000).fill('large data');
    
    elementData.set(element, data);
    
    element.onclick = function() {
        const data = elementData.get(element);
        console.log(data.length);
    };
}`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">性能优化建议</h5>
                            <ul className="list-disc pl-4 space-y-1 text-sm">
                                <li>避免在循环中创建闭包，考虑提取到外部</li>
                                <li>及时清理不需要的闭包引用</li>
                                <li>使用 WeakMap、WeakSet 避免内存泄漏</li>
                                <li>监控内存使用情况，特别是长时间运行的应用</li>
                            </ul>
                        </div>
                    </div>
                </WarningCard>

                <InfoCard title="面试高分答题策略">
                    <ul className="list-disc pl-4 space-y-2">
                        <li><strong>概念解释：</strong>从词法作用域角度解释闭包本质</li>
                        <li><strong>经典问题：</strong>必须掌握循环+setTimeout的闭包陷阱</li>
                        <li><strong>实际应用：</strong>模块模式、柯里化、防抖节流等常见场景</li>
                        <li><strong>性能考虑：</strong>理解内存泄漏风险和解决方案</li>
                        <li><strong>深入理解：</strong>能解释执行上下文、作用域链的关系</li>
                        <li><strong>代码能力：</strong>能手写 curry、debounce、throttle 函数</li>
                    </ul>
                </InfoCard>
            </div>
        </QuestionCard>
    );
} 