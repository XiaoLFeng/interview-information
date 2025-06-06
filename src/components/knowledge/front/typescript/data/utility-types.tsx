import { QuestionCard } from "../../../../base/knowledge_question_card";
import { ExpandableCode } from "../../../../base/expandable_code";
import { SuccessCard } from "../../../../card/success_card";
import { SecondaryCard } from "../../../../card/secondary_card";

interface Props {
    id: string;
}

export function FrontTypeScriptUtilityTypes({ id }: Props) {
    return (
        <QuestionCard
            question={{
                id,
                title: "TypeScript 工具类型",
                category: "TypeScript",
                content: "TypeScript 内置的工具类型有哪些？Partial、Required、Pick、Omit、Record 等常用工具类型的使用场景？",
                tags: ["TypeScript", "工具类型", "Partial", "Required", "Pick", "Omit", "Record"]
            }}
        >
            <div className="space-y-6">
                <SuccessCard title="核心要点">
                    <p>TypeScript 提供了丰富的内置工具类型，用于对现有类型进行转换和操作，大大提升了类型操作的便利性和代码的可维护性。</p>
                </SuccessCard>

                <SecondaryCard title="常用工具类型">
                    <ExpandableCode 
                        language="typescript"
                        maxHeight={300}
                    >
{`interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    isActive: boolean;
}

// Partial<T> - 所有属性变为可选
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; age?: number; isActive?: boolean; }

// Required<T> - 所有属性变为必需
type RequiredUser = Required<PartialUser>;
// { id: number; name: string; email: string; age: number; isActive: boolean; }

// Pick<T, K> - 选择指定属性
type UserSummary = Pick<User, 'id' | 'name'>;
// { id: number; name: string; }

// Omit<T, K> - 排除指定属性
type UserWithoutId = Omit<User, 'id'>;
// { name: string; email: string; age: number; isActive: boolean; }

// Record<K, T> - 创建对象类型
type UserRoles = Record<'admin' | 'user' | 'guest', boolean>;
// { admin: boolean; user: boolean; guest: boolean; }

// Readonly<T> - 所有属性变为只读
type ReadonlyUser = Readonly<User>;
// { readonly id: number; readonly name: string; ... }`}
                    </ExpandableCode>
                </SecondaryCard>

                <SecondaryCard title="高级工具类型">
                    <ExpandableCode 
                        language="typescript"
                        maxHeight={300}
                    >
{`// ReturnType<T> - 获取函数返回类型
function getUser(): User {
    return { id: 1, name: "Alice", email: "alice@example.com", age: 25, isActive: true };
}

type UserReturnType = ReturnType<typeof getUser>; // User

// Parameters<T> - 获取函数参数类型
function updateUser(id: number, data: Partial<User>): void {}

type UpdateUserParams = Parameters<typeof updateUser>; // [number, Partial<User>]

// ConstructorParameters<T> - 获取构造函数参数类型
class UserClass {
    constructor(name: string, age: number) {}
}

type UserConstructorParams = ConstructorParameters<typeof UserClass>; // [string, number]

// InstanceType<T> - 获取构造函数实例类型
type UserInstance = InstanceType<typeof UserClass>; // UserClass

// NonNullable<T> - 排除 null 和 undefined
type NonNullableString = NonNullable<string | null | undefined>; // string

// Extract<T, U> - 提取可赋值给 U 的类型
type StringOrNumber = Extract<string | number | boolean, string | number>; // string | number

// Exclude<T, U> - 排除可赋值给 U 的类型
type NotString = Exclude<string | number | boolean, string>; // number | boolean`}
                    </ExpandableCode>
                </SecondaryCard>
            </div>
        </QuestionCard>
    );
} 