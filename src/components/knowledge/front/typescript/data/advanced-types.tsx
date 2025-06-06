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
 * 高级类型系统
 * 
 * 面试问题：联合类型、交叉类型、条件类型、映射类型的区别和应用场景？如何解决复杂的类型推导问题？
 * 
 * 核心解答：高级类型是 TypeScript 的核心特性：联合类型表示"或"关系，交叉类型表示"与"关系，条件类型实现类型分支逻辑，映射类型用于类型转换。掌握这四种类型是高级 TS 开发的基础。
 * 
 * 四种高级类型对比：
 * 
 * 联合类型 (Union Types)：表示"或"的关系
 */
export function FrontTypeScriptAdvancedTypes({ id }: Props) {
    return (
        <QuestionCard
            question={{
                id,
                title: "高级类型系统",
                category: "高级类型",
                content: "面试问题：联合类型、交叉类型、条件类型、映射类型的区别和应用场景？如何解决复杂的类型推导问题？",
                tags: ["TypeScript", "高级类型", "面试", "联合类型", "条件类型", "映射类型"]
            }}
        >
            <div className="space-y-6">
                <SuccessCard title="核心解答">
                    <p>高级类型是 TypeScript 的核心特性：<strong>联合类型</strong>表示"或"关系，<strong>交叉类型</strong>表示"与"关系，<strong>条件类型</strong>实现类型分支逻辑，<strong>映射类型</strong>用于类型转换。掌握这四种类型是高级 TS 开发的基础。</p>
                </SuccessCard>

                <SecondaryCard title="📝 四种高级类型对比">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-semibold mb-2">联合类型 (Union Types)</h4>
                            <ExpandableCode language="typescript" maxHeight={120}>
{`// 表示"或"的关系
type Status = "loading" | "success" | "error";

function handleResponse(status: Status) {
    if (status === "success") {
        // 类型收窄为 "success"
    }
}`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2">交叉类型 (Intersection)</h4>
                            <ExpandableCode language="typescript" maxHeight={120}>
{`// 表示"与"的关系，合并所有属性
interface User { name: string; }
interface Admin { role: string; }

type AdminUser = User & Admin;
// { name: string; role: string; }`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2">条件类型 (Conditional)</h4>
                            <ExpandableCode language="typescript" maxHeight={120}>
{`// 根据条件选择类型
type ApiResponse<T> = T extends string 
    ? { message: T } 
    : { data: T };

type StringResponse = ApiResponse<string>;
// { message: string }`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2">映射类型 (Mapped)</h4>
                            <ExpandableCode language="typescript" maxHeight={120}>
{`// 转换已有类型的属性
type Partial<T> = {
    [P in keyof T]?: T[P];
};

type PartialUser = Partial<User>;
// { name?: string; }`}
                            </ExpandableCode>
                        </div>
                    </div>
                </SecondaryCard>

                <InfoCard title="为什么需要高级类型">
                    <ul className="list-disc pl-4 space-y-2">
                        <li><strong>业务逻辑映射：</strong>联合类型完美表达状态机、枚举等业务概念</li>
                        <li><strong>类型安全的组合：</strong>交叉类型实现 Mixin 模式，避免多继承问题</li>
                        <li><strong>智能类型推导：</strong>条件类型让 TypeScript 能根据输入自动推导输出类型</li>
                        <li><strong>代码复用：</strong>映射类型避免重复定义相似的类型结构</li>
                    </ul>
                </InfoCard>

                <WarningCard title="面试常考易错点">
                    <div className="space-y-4">
                        <div>
                            <h5 className="font-semibold">1. 联合类型的类型收窄理解错误</h5>
                            <ExpandableCode language="typescript" maxHeight={150}>
{`// ❌ 错误理解：直接访问联合类型的属性
function printId(id: string | number) {
    console.log(id.toUpperCase()); // 报错！number 没有这个方法
}

// ✅ 正确做法：使用类型保护
function printId(id: string | number) {
    if (typeof id === "string") {
        console.log(id.toUpperCase()); // ✅ 此时 id 确定是 string
    } else {
        console.log(id.toFixed(2));    // ✅ 此时 id 确定是 number
    }
}`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">2. 交叉类型属性冲突的处理</h5>
                            <ExpandableCode language="typescript" maxHeight={120}>
{`// ❌ 属性类型冲突
interface A { prop: string; }
interface B { prop: number; }

type C = A & B; // prop 的类型是 string & number = never

// ✅ 正确设计：避免同名属性冲突
interface A { name: string; }
interface B { age: number; }`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">3. 条件类型的分布特性理解不够</h5>
                            <ExpandableCode language="typescript" maxHeight={120}>
{`// 条件类型遇到联合类型会分布计算
type ToArray<T> = T extends any ? T[] : never;

// 面试陷阱：这个结果是什么？
type Result = ToArray<string | number>;
// 答案：string[] | number[]  （不是 (string | number)[]）

// 阻止分布：用 [] 包装
type ToArray<T> = [T] extends [any] ? T[] : never;`}
                            </ExpandableCode>
                        </div>
                    </div>
                </WarningCard>

                <SecondaryCard title="💡 面试高分技巧">
                    <div className="space-y-4">
                        <div>
                            <h5 className="font-semibold">实现内置工具类型</h5>
                            <ExpandableCode language="typescript" maxHeight={180}>
{`// 面试常问：手写 Pick 和 Omit
type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
};

type MyOmit<T, K extends keyof T> = {
    [P in keyof T as P extends K ? never : P]: T[P];
};

// 使用示例
interface User { name: string; age: number; email: string; }
type UserName = MyPick<User, "name">;        // { name: string }
type UserProfile = MyOmit<User, "email">;    // { name: string; age: number }`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">复杂场景的类型推导</h5>
                            <ExpandableCode language="typescript" maxHeight={150}>
{`// 函数重载的智能推导
function api(method: "GET"): Promise<string>;
function api(method: "POST", data: object): Promise<number>;
function api(method: string, data?: object) {
    // 实现逻辑
}

// TypeScript 能根据参数自动推导返回类型
const result1 = api("GET");        // Promise<string>
const result2 = api("POST", {});   // Promise<number>`}
                            </ExpandableCode>
                        </div>
                    </div>
                </SecondaryCard>

                <InfoCard title="面试追问点">
                    <ul className="list-disc pl-4 space-y-2">
                        <li><strong>性能考虑：</strong>复杂的条件类型和映射类型会影响编译速度</li>
                        <li><strong>可读性平衡：</strong>不要为了炫技而过度使用高级类型</li>
                        <li><strong>实际应用：</strong>能举出在实际项目中使用高级类型解决问题的例子</li>
                        <li><strong>类型体操：</strong>了解社区中的类型体操题目和解法思路</li>
                    </ul>
                </InfoCard>
            </div>
        </QuestionCard>
    );
} 