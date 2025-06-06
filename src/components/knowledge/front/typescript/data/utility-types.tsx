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
 * 工具类型
 * 
 * 面试问题：常用工具类型的实现原理？如何手写 Pick、Omit、Partial？在什么场景下使用这些工具类型？
 * 
 * 核心解答：工具类型是 TypeScript 内置的类型操作符，基于映射类型和条件类型实现。核心工具类型：Partial（可选化）、Required（必需化）、Pick（选取）、Omit（排除）、Record（构造对象类型）。
 */
export function FrontTypeScriptUtilityTypes({ id }: Props) {
    return (
        <QuestionCard
            question={{
                id,
                title: "工具类型",
                category: "工具类型",
                content: "面试问题：常用工具类型的实现原理？如何手写 Pick、Omit、Partial？在什么场景下使用这些工具类型？",
                tags: ["TypeScript", "工具类型", "面试", "手写实现", "映射类型"]
            }}
        >
            <div className="space-y-6">
                <SuccessCard title="核心解答">
                    <p>工具类型是 TypeScript 内置的<strong>类型操作符</strong>，基于映射类型和条件类型实现。核心工具类型：<code>Partial</code>（可选化）、<code>Required</code>（必需化）、<code>Pick</code>（选取）、<code>Omit</code>（排除）、<code>Record</code>（构造对象类型）。</p>
                </SuccessCard>

                <SecondaryCard title="📝 核心工具类型手写实现">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold mb-2">1. Partial - 全部属性可选化</h4>
                            <ExpandableCode language="typescript" maxHeight={150}>
{`// 手写实现
type MyPartial<T> = {
    [P in keyof T]?: T[P];
};

// 使用场景：更新操作
interface User {
    id: number;
    name: string;
    email: string;
}

function updateUser(id: number, updates: Partial<User>) {
    // updates 的所有属性都是可选的
    // { id?: number; name?: string; email?: string; }
}

updateUser(1, { name: "Alice" }); // ✅ 只更新 name`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2">2. Pick - 选择指定属性</h4>
                            <ExpandableCode language="typescript" maxHeight={150}>
{`// 手写实现
type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
};

// 使用场景：创建 DTO（数据传输对象）
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

type UserProfile = Pick<User, 'id' | 'name' | 'email'>;
// { id: number; name: string; email: string; }

type LoginForm = Pick<User, 'email' | 'password'>;
// { email: string; password: string; }`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2">3. Omit - 排除指定属性</h4>
                            <ExpandableCode language="typescript" maxHeight={150}>
{`// 手写实现（利用 Pick 和 Exclude）
type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// 更直接的实现方式
type MyOmit2<T, K extends keyof T> = {
    [P in keyof T as P extends K ? never : P]: T[P];
};

// 使用场景：创建用户时排除自动生成的字段
type CreateUser = Omit<User, 'id' | 'createdAt'>;
// { name: string; email: string; password: string; }

function createUser(userData: CreateUser): User {
    return {
        ...userData,
        id: Math.random(),
        createdAt: new Date()
    };
}`}
                            </ExpandableCode>
                        </div>
                    </div>
                </SecondaryCard>

                <InfoCard title="为什么需要工具类型">
                    <ul className="list-disc pl-4 space-y-2">
                        <li><strong>减少重复：</strong>避免为相似的类型结构重复定义接口</li>
                        <li><strong>类型安全：</strong>基于已有类型派生，保持一致性和同步更新</li>
                        <li><strong>API 设计：</strong>创建更灵活的函数签名和组件 Props</li>
                        <li><strong>代码维护：</strong>源类型改变时，派生类型自动同步</li>
                    </ul>
                </InfoCard>

                <WarningCard title="面试易错点">
                    <div className="space-y-4">
                        <div>
                            <h5 className="font-semibold">1. Omit 的 K 约束理解错误</h5>
                            <ExpandableCode language="typescript" maxHeight={120}>
{`// ❌ 错误理解：K 必须是 T 的键
type Wrong<T, K extends keyof T> = Omit<T, K>;

// ✅ 正确理解：K 可以是任意字符串
type Correct<T, K extends keyof any> = Omit<T, K>;

// 这样可以安全地排除不存在的属性
type UserWithoutPassword = Omit<User, 'password' | 'nonExistentField'>;
// 不会报错，nonExistentField 被忽略`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">2. Record 的使用场景误解</h5>
                            <ExpandableCode language="typescript" maxHeight={150}>
{`// Record<K, T> 的实现原理
type MyRecord<K extends keyof any, T> = {
    [P in K]: T;
};

// ❌ 错误用法：用 Record 替代接口
type User = Record<string, any>; // 失去类型安全

// ✅ 正确用法：创建字典类型
type StatusMessages = Record<'loading' | 'success' | 'error', string>;
// { loading: string; success: string; error: string; }

type ApiEndpoints = Record<'users' | 'posts' | 'comments', string>;
// { users: string; posts: string; comments: string; }`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">3. 函数类型工具类型的复杂性</h5>
                            <ExpandableCode language="typescript" maxHeight={150}>
{`// 面试高频：手写 ReturnType
type MyReturnType<T extends (...args: any) => any> = 
    T extends (...args: any) => infer R ? R : any;

// 手写 Parameters
type MyParameters<T extends (...args: any) => any> = 
    T extends (...args: infer P) => any ? P : never;

function apiCall(id: number, options: { timeout: number }): Promise<string> {
    return Promise.resolve("data");
}

type ApiReturn = MyReturnType<typeof apiCall>;    // Promise<string>
type ApiParams = MyParameters<typeof apiCall>;    // [number, { timeout: number }]`}
                            </ExpandableCode>
                        </div>
                    </div>
                </WarningCard>

                <SecondaryCard title="💡 面试高分技巧">
                    <div className="space-y-4">
                        <div>
                            <h5 className="font-semibold">实现深度 Partial</h5>
                            <ExpandableCode language="typescript" maxHeight={180}>
{`// 面试挑战：实现递归的 DeepPartial
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface NestedUser {
    id: number;
    profile: {
        name: string;
        address: {
            street: string;
            city: string;
        };
    };
    preferences: {
        theme: string;
        notifications: boolean;
    };
}

type DeepPartialUser = DeepPartial<NestedUser>;
// 所有嵌套属性都变成可选的`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">组合工具类型解决复杂问题</h5>
                            <ExpandableCode language="typescript" maxHeight={150}>
{`// 实际项目场景：表单数据处理
interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeTerms: boolean;
}

// 创建用户时不需要确认密码和同意条款
type CreateUserData = Omit<FormData, 'confirmPassword' | 'agreeTerms'>;

// 更新用户时密码可选
type UpdateUserData = Partial<Pick<FormData, 'username' | 'email' | 'password'>>;

// 表单验证错误类型
type FormErrors = Partial<Record<keyof FormData, string>>;`}
                            </ExpandableCode>
                        </div>
                    </div>
                </SecondaryCard>

                <InfoCard title="面试追问点">
                    <ul className="list-disc pl-4 space-y-2">
                        <li><strong>性能影响：</strong>复杂工具类型会增加编译时间</li>
                        <li><strong>可读性：</strong>过度使用工具类型可能降低代码可读性</li>
                        <li><strong>实际应用：</strong>在 React、Vue 等框架中的使用场景</li>
                        <li><strong>扩展能力：</strong>如何基于现有工具类型创建自定义工具类型</li>
                    </ul>
                </InfoCard>
            </div>
        </QuestionCard>
    );
} 