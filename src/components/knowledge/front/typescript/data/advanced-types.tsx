import { QuestionCard } from "../../../../base/knowledge_question_card";
import { ExpandableCode } from "../../../../base/expandable_code";
import { SuccessCard } from "../../../../card/success_card";
import { InfoCard } from "../../../../card/info_card";
import { WarningCard } from "../../../../card/warning_card";
import { SecondaryCard } from "../../../../card/secondary_card";

interface Props {
    id: string;
}

export function FrontTypeScriptAdvancedTypes({ id }: Props) {
    return (
        <QuestionCard
            question={{
                id,
                title: "TypeScript 高级类型系统",
                category: "TypeScript",
                content: "TypeScript 的高级类型有哪些？联合类型、交叉类型、条件类型、映射类型的使用场景和实现原理是什么？",
                tags: ["TypeScript", "高级类型", "联合类型", "交叉类型", "条件类型", "映射类型"]
            }}
        >
            <div className="space-y-6">
                <SuccessCard title="核心要点">
                    <p>TypeScript 高级类型系统包括联合类型、交叉类型、条件类型、映射类型等，提供了强大的类型操作和推导能力，是构建复杂类型系统的基础。</p>
                </SuccessCard>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoCard title="联合类型 (Union Types)">
                        <p>使用 | 操作符组合多个类型，表示值可以是其中任意一种类型。提供类型的"或"逻辑。</p>
                    </InfoCard>
                    <InfoCard title="交叉类型 (Intersection Types)">
                        <p>使用 & 操作符组合多个类型，表示值必须同时满足所有类型。提供类型的"与"逻辑。</p>
                    </InfoCard>
                </div>

                <SecondaryCard title="联合类型 (Union Types)">
                    <div className="space-y-4">
                        <p className="text-sm">联合类型允许一个值是几种类型之一，TypeScript 会推断出联合类型的共同成员。</p>
                        
                        <ExpandableCode 
                            language="typescript"
                            maxHeight={300}
                        >
{`// 基本联合类型
type StringOrNumber = string | number;
let value: StringOrNumber = "hello";
value = 42; // 有效

// 联合类型的类型保护
function printId(id: string | number) {
    if (typeof id === "string") {
        // 在这个分支中，id 被推断为 string
        console.log(id.toUpperCase());
    } else {
        // 在这个分支中，id 被推断为 number
        console.log(id.toFixed(2));
    }
}

// 字面量联合类型
type Theme = "light" | "dark" | "auto";
type Status = "pending" | "success" | "error";

function setTheme(theme: Theme) {
    // theme 只能是指定的三个值之一
}

// 判别联合类型
interface Loading {
    state: "loading";
}

interface Success {
    state: "success";
    data: any;
}

interface Error {
    state: "error";
    error: string;
}

type AsyncState = Loading | Success | Error;

function handleState(state: AsyncState) {
    switch (state.state) {
        case "loading":
            break;
        case "success":
            console.log(state.data);
            break;
        case "error":
            console.log(state.error);
            break;
    }
}`}
                        </ExpandableCode>
                    </div>
                </SecondaryCard>

                <SecondaryCard title="交叉类型 (Intersection Types)">
                    <div className="space-y-4">
                        <p className="text-sm">交叉类型将多个类型合并为一个类型，新类型包含所有类型的特性。</p>
                        
                        <ExpandableCode 
                            language="typescript"
                            maxHeight={300}
                        >
{`// 基本交叉类型
interface Person {
    name: string;
    age: number;
}

interface Worker {
    company: string;
    position: string;
}

type Employee = Person & Worker;

const employee: Employee = {
    name: "Alice",
    age: 30,
    company: "Tech Corp",
    position: "Developer"
    // 必须包含所有属性
};

// Mixin 模式
interface Timestamped {
    timestamp: Date;
}

interface Tagged {
    tag: string;
}

function taggedTimestamp<T>(obj: T): T & Timestamped & Tagged {
    return {
        ...obj,
        timestamp: new Date(),
        tag: "auto-generated"
    };
}`}
                        </ExpandableCode>
                    </div>
                </SecondaryCard>

                <SecondaryCard title="条件类型 (Conditional Types)">
                    <div className="space-y-4">
                        <p className="text-sm">条件类型根据类型关系选择不同的类型，语法类似三元运算符。</p>
                        
                        <ExpandableCode 
                            language="typescript"
                            maxHeight={300}
                        >
{`// 基本条件类型语法
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>;  // true
type Test2 = IsString<number>;  // false

// 条件类型的分布特性
type ToArray<T> = T extends any ? T[] : never;
type ArrayTypes = ToArray<string | number>; // string[] | number[]

// 提取函数返回类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

type FuncReturnType = ReturnType<() => string>; // string

// 复杂条件类型
type NonNullable<T> = T extends null | undefined ? never : T;

type CleanType = NonNullable<string | null | undefined>; // string

// 嵌套条件类型示例
type Flatten<T> = T extends (infer U)[] 
    ? U extends (infer V)[] 
        ? V[] 
        : U[] 
    : T[];`}
                        </ExpandableCode>
                    </div>
                </SecondaryCard>

                <SecondaryCard title="映射类型 (Mapped Types)">
                    <div className="space-y-4">
                        <p className="text-sm">映射类型可以基于旧类型创建新类型，通过遍历键来转换类型。</p>
                        
                        <ExpandableCode 
                            language="typescript"
                            maxHeight={300}
                        >
{`// 基本映射类型
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Partial<T> = {
    [P in keyof T]?: T[P];
};

interface User {
    id: number;
    name: string;
    email: string;
}

type ReadonlyUser = Readonly<User>;
type PartialUser = Partial<User>;

// 高级映射类型
type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};

type Keys = "option1" | "option2" | "option3";
type Flags = { [K in Keys]: boolean };

// 映射类型修饰符
type Required<T> = {
    [P in keyof T]-?: T[P];
};

type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};

// 条件映射类型
type NonFunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;`}
                        </ExpandableCode>
                    </div>
                </SecondaryCard>

                <WarningCard title="使用注意事项">
                    <ul className="list-disc pl-4 space-y-2">
                        <li><strong>联合类型收窄：</strong>使用类型保护进行类型收窄，避免访问不存在的属性</li>
                        <li><strong>交叉类型冲突：</strong>注意属性冲突时的类型推断结果</li>
                        <li><strong>条件类型复杂度：</strong>避免过度嵌套的条件类型，影响可读性</li>
                        <li><strong>映射类型性能：</strong>复杂的映射类型可能影响编译性能</li>
                    </ul>
                </WarningCard>
            </div>
        </QuestionCard>
    );
} 