import { QuestionCard } from "../../../../base/knowledge_question_card";
import { ExpandableCode } from "../../../../base/expandable_code";
import { SuccessCard } from "../../../../card/success_card";
import { InfoCard } from "../../../../card/info_card";
import { WarningCard } from "../../../../card/warning_card";
import { SecondaryCard } from "../../../../card/secondary_card";

interface Props {
    id: string;
}

export function FrontTypeScriptBasicTypes({ id }: Props) {
    return (
        <QuestionCard
            question={{
                id,
                title: "TypeScript 基本类型系统",
                category: "TypeScript",
                content: "TypeScript 的基本类型系统有哪些？原始类型、对象类型、数组类型、元组类型的使用场景和注意事项是什么？",
                tags: ["TypeScript", "类型系统", "原始类型", "对象类型", "数组", "元组"]
            }}
        >
            <div className="space-y-6">
                <SuccessCard title="核心要点">
                    <p>TypeScript 提供了丰富的类型系统，包括原始类型、对象类型、数组类型、元组类型等，通过静态类型检查提升代码质量和开发效率。</p>
                </SuccessCard>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoCard title="原始类型 (Primitive Types)">
                        <p>包括 number、string、boolean、null、undefined、symbol、bigint。TypeScript 严格区分这些类型，提供类型安全保障。</p>
                    </InfoCard>
                    <InfoCard title="对象类型 (Object Types)">
                        <p>通过接口 (interface) 或类型别名 (type alias) 定义复杂对象结构，支持可选属性、只读属性等特性。</p>
                    </InfoCard>
                </div>

                <SecondaryCard title="原始类型详解">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr className="text-base-content">
                                    <th>类型</th>
                                    <th>描述</th>
                                    <th>示例</th>
                                    <th>注意事项</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code className="text-accent">number</code></td>
                                    <td>数值类型</td>
                                    <td><code>42, 3.14, NaN, Infinity</code></td>
                                    <td>包含整数、浮点数、特殊值</td>
                                </tr>
                                <tr>
                                    <td><code className="text-accent">string</code></td>
                                    <td>字符串类型</td>
                                    <td><code>"hello", 'world', `template`</code></td>
                                    <td>支持模板字符串</td>
                                </tr>
                                <tr>
                                    <td><code className="text-accent">boolean</code></td>
                                    <td>布尔类型</td>
                                    <td><code>true, false</code></td>
                                    <td>严格的 true/false</td>
                                </tr>
                                <tr>
                                    <td><code className="text-accent">undefined</code></td>
                                    <td>未定义类型</td>
                                    <td><code>undefined</code></td>
                                    <td>未初始化变量的默认值</td>
                                </tr>
                                <tr>
                                    <td><code className="text-accent">null</code></td>
                                    <td>空值类型</td>
                                    <td><code>null</code></td>
                                    <td>表示空对象引用</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </SecondaryCard>

                <WarningCard title="类型注意事项">
                    <p>避免使用 any 类型，优先使用具体类型或 unknown；注意 null 和 undefined 的区别；使用严格模式 (strict: true) 获得最佳类型检查效果。</p>
                </WarningCard>

                <ExpandableCode 
                    language="typescript"
                    maxHeight={300}
                >
{`// 基本类型声明
let age: number = 25;
let name: string = "Alice";
let isActive: boolean = true;
let data: undefined = undefined;
let empty: null = null;

// 类型推断
let count = 10; // 推断为 number
let message = "Hello"; // 推断为 string

// 联合类型
let id: string | number = "123";
id = 456; // 有效

// 字面量类型
let status: "pending" | "success" | "error" = "pending";

// 类型断言
let userInput: unknown = "hello";
let strLength: number = (userInput as string).length;`}
                </ExpandableCode>

                <SecondaryCard title="数组与元组类型">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold mb-2">数组类型 (Array Types)</h4>
                            <p className="text-sm mb-3">表示相同类型元素的集合，支持两种语法形式。</p>
                        </div>
                        
                        <ExpandableCode 
                            language="typescript"
                            maxHeight={200}
                        >
{`// 数组声明方式
let numbers: number[] = [1, 2, 3, 4];
let names: Array<string> = ["Alice", "Bob"];

// 多维数组
let matrix: number[][] = [[1, 2], [3, 4]];

// 联合类型数组
let mixed: (string | number)[] = ["hello", 42, "world"];

// 只读数组
let readonlyNumbers: readonly number[] = [1, 2, 3];
// readonlyNumbers.push(4); // 错误：只读属性`}
                        </ExpandableCode>

                        <div>
                            <h4 className="font-semibold mb-2">元组类型 (Tuple Types)</h4>
                            <p className="text-sm mb-3">表示固定长度和类型的数组，每个位置的类型可以不同。</p>
                        </div>

                        <ExpandableCode 
                            language="typescript"
                            maxHeight={200}
                        >
{`// 基本元组
let point: [number, number] = [10, 20];
let user: [string, number, boolean] = ["Alice", 25, true];

// 具名元组
let person: [name: string, age: number] = ["Bob", 30];

// 可选元组元素
let optional: [string, number?] = ["hello"];

// 剩余元素
let rest: [string, ...number[]] = ["prefix", 1, 2, 3];

// 只读元组
let readonly: readonly [number, string] = [1, "hello"];`}
                        </ExpandableCode>
                    </div>
                </SecondaryCard>

                <WarningCard title="常见陷阱">
                    <ul className="list-disc pl-4 space-y-2">
                        <li><strong>类型推断过度宽泛：</strong>数组字面量可能被推断为更宽泛的联合类型</li>
                        <li><strong>元组长度检查：</strong>元组赋值时需要确保长度和类型完全匹配</li>
                        <li><strong>可选属性与 undefined：</strong>可选属性类型自动包含 undefined</li>
                        <li><strong>strictNullChecks：</strong>启用严格空检查时 null 和 undefined 不能赋值给其他类型</li>
                    </ul>
                </WarningCard>

                <SecondaryCard title="对象类型定义">
                    <ExpandableCode 
                        language="typescript"
                        maxHeight={300}
                    >
{`// 接口定义
interface User {
    readonly id: number;        // 只读属性
    name: string;
    age?: number;              // 可选属性
    [key: string]: any;        // 索引签名
}

// 类型别名
type Point = {
    x: number;
    y: number;
};

// 函数类型
interface Calculator {
    (a: number, b: number): number;
}

type MathOperation = (x: number, y: number) => number;

// 使用示例
const user: User = {
    id: 1,
    name: "Alice"
    // age 是可选的
};

const add: Calculator = (a, b) => a + b;`}
                    </ExpandableCode>
                </SecondaryCard>
            </div>
        </QuestionCard>
    );
} 