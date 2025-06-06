import { QuestionCard } from "../../../../base/knowledge_question_card";
import { ExpandableCode } from "../../../../base/expandable_code";
import { SuccessCard } from "../../../../card/success_card";
import { InfoCard } from "../../../../card/info_card";
import { WarningCard } from "../../../../card/warning_card";
import { SecondaryCard } from "../../../../card/secondary_card";

interface Props {
    id: string;
}

/**
 * 泛型系统
 * 
 * 面试问题：泛型的本质是什么？泛型约束的作用？如何设计一个类型安全且灵活的 API？
 * 
 * 核心解答：泛型是类型参数化，让代码在保持类型安全的同时具备复用性。本质是在编写时不确定类型，使用时确定类型。泛型约束通过 extends 限制类型范围，实现更精确的类型控制。
 */
export function FrontTypeScriptGenerics({ id }: Props) {
    return (
        <QuestionCard
            question={{
                id,
                title: "泛型系统",
                category: "泛型",
                content: "面试问题：泛型的本质是什么？泛型约束的作用？如何设计一个类型安全且灵活的 API？",
                tags: ["TypeScript", "泛型", "面试", "泛型约束", "类型安全"]
            }}
        >
            <div className="space-y-6">
                <SuccessCard title="核心解答">
                    <p>泛型是<strong>类型参数化</strong>的机制，让代码在保持类型安全的同时具备复用性。本质是在<strong>编写时不确定类型，使用时确定类型</strong>。泛型约束通过 <code>extends</code> 限制类型范围，实现更精确的类型控制。</p>
                </SuccessCard>

                <SecondaryCard title="📝 泛型核心概念">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold mb-2">1. 泛型函数 - 最基础的应用</h4>
                            <ExpandableCode language="typescript" maxHeight={150}>
{`// 问题：如何写一个类型安全的身份函数？
function identity<T>(arg: T): T {
    return arg;
}

// 使用时确定类型
const str = identity<string>("hello");    // 明确指定
const num = identity(42);                 // 类型推断
const arr = identity([1, 2, 3]);          // T 推断为 number[]

// 面试加分点：解释为什么不用 any
function badIdentity(arg: any): any {     // ❌ 丢失类型信息
    return arg;
}`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2">2. 泛型约束 - 类型安全的边界</h4>
                            <ExpandableCode language="typescript" maxHeight={150}>
{`// 约束：只接受有 length 属性的类型
interface Lengthwise {
    length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // 安全访问 length
    return arg;
}

logLength("hello");           // ✅ string 有 length
logLength([1, 2, 3]);         // ✅ array 有 length
// logLength(123);            // ❌ number 没有 length`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2">3. keyof 约束 - 对象属性安全访问</h4>
                            <ExpandableCode language="typescript" maxHeight={120}>
{`// 经典面试题：实现类型安全的属性获取
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const person = { name: "Alice", age: 30 };
const name = getProperty(person, "name");     // string
const age = getProperty(person, "age");       // number
// getProperty(person, "invalid");            // ❌ 编译报错`}
                            </ExpandableCode>
                        </div>
                    </div>
                </SecondaryCard>

                <InfoCard title="为什么需要泛型">
                    <ul className="list-disc pl-4 space-y-2">
                        <li><strong>代码复用：</strong>一套代码处理多种类型，避免重复编写相似函数</li>
                        <li><strong>类型安全：</strong>相比 any，泛型保持类型信息，编译时检查错误</li>
                        <li><strong>智能提示：</strong>IDE 能提供准确的代码补全和错误提示</li>
                        <li><strong>约束能力：</strong>通过泛型约束确保类型满足特定条件</li>
                    </ul>
                </InfoCard>

                <WarningCard title="面试常考陷阱">
                    <div className="space-y-4">
                        <div>
                            <h5 className="font-semibold">1. 泛型推断的边界情况</h5>
                            <ExpandableCode language="typescript" maxHeight={150}>
{`// ❌ 推断失败的情况
function merge(a: any, b: any) {
    return { ...a, ...b };
}

// ✅ 正确的泛型设计
function merge<T, U>(a: T, b: U): T & U {
    return { ...a, ...b };
}

const result = merge({ name: "Alice" }, { age: 30 });
// result 的类型是 { name: string } & { age: number }`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">2. 条件类型与泛型的结合</h5>
                            <ExpandableCode language="typescript" maxHeight={150}>
{`// 面试高频：根据输入类型返回不同结果
type ApiResponse<T> = T extends string 
    ? { message: T } 
    : { data: T; status: number };

function request<T>(input: T): ApiResponse<T> {
    // 实现细节...
    return {} as ApiResponse<T>;
}

const stringRes = request("error");        // { message: string }
const dataRes = request({ id: 1 });        // { data: { id: number }, status: number }`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">3. 泛型的协变与逆变</h5>
                            <ExpandableCode language="typescript" maxHeight={120}>
{`// 面试难点：函数参数的逆变性
interface Animal { name: string; }
interface Dog extends Animal { breed: string; }

// 函数参数是逆变的
type Handler<T> = (arg: T) => void;

let animalHandler: Handler<Animal>;
let dogHandler: Handler<Dog>;

animalHandler = dogHandler;  // ❌ 不安全
dogHandler = animalHandler;  // ✅ 安全`}
                            </ExpandableCode>
                        </div>
                    </div>
                </WarningCard>

                <SecondaryCard title="💡 面试实战技巧">
                    <div className="space-y-4">
                        <div>
                            <h5 className="font-semibold">设计一个类型安全的事件系统</h5>
                            <ExpandableCode language="typescript" maxHeight={200}>
{`// 面试项目：实现类型安全的 EventEmitter
interface EventMap {
    'user:login': { userId: string; timestamp: number };
    'user:logout': { userId: string };
    'data:update': { id: string; data: any };
}

class TypedEventEmitter<T extends Record<string, any>> {
    private listeners: { [K in keyof T]?: Array<(data: T[K]) => void> } = {};
    
    on<K extends keyof T>(event: K, callback: (data: T[K]) => void) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event]!.push(callback);
    }
    
    emit<K extends keyof T>(event: K, data: T[K]) {
        this.listeners[event]?.forEach(callback => callback(data));
    }
}

const emitter = new TypedEventEmitter<EventMap>();
emitter.on('user:login', (data) => {
    // data 自动推断为 { userId: string; timestamp: number }
    console.log(\`User \${data.userId} logged in\`);
});`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">泛型工具类型的实现原理</h5>
                            <ExpandableCode language="typescript" maxHeight={150}>
{`// 深入理解内置工具类型
type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];  // 映射类型 + 泛型约束
};

type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

type MyReturnType<T extends (...args: any) => any> = 
    T extends (...args: any) => infer R ? R : any;

// 面试技巧：能解释 infer 关键字的作用
type Parameters<T extends (...args: any) => any> = 
    T extends (...args: infer P) => any ? P : never;`}
                            </ExpandableCode>
                        </div>
                    </div>
                </SecondaryCard>

                <InfoCard title="面试加分答案">
                    <ul className="list-disc pl-4 space-y-2">
                        <li><strong>性能考虑：</strong>泛型在编译时处理，运行时无额外开销</li>
                        <li><strong>设计模式：</strong>泛型与装饰器、工厂模式的结合应用</li>
                        <li><strong>框架应用：</strong>React、Vue 中泛型的实际使用场景</li>
                        <li><strong>类型编程：</strong>理解 TypeScript 类型系统的图灵完备性</li>
                    </ul>
                </InfoCard>
            </div>
        </QuestionCard>
    );
} 