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
 * 基本类型系统
 * 
 * 面试问题：TypeScript 有哪些基本类型？类型推断的原理是什么？在实际开发中容易出现哪些类型错误？
 * 
 * 核心解答：TypeScript 提供 8 种基本类型：number、string、boolean、null、undefined、symbol、bigint、object。通过静态类型检查在编译时发现错误，支持类型推断减少手动标注。
 */
export function FrontTypeScriptBasicTypes({ id }: Props) {
    return (
        <QuestionCard
            question={{
                id,
                title: "基本类型系统",
                category: "基本类型",
                content: "面试问题：TypeScript 有哪些基本类型？类型推断的原理是什么？在实际开发中容易出现哪些类型错误？",
                tags: ["TypeScript", "类型系统", "面试", "类型推断", "易错点"]
            }}
        >
            <div className="space-y-6">
                <SuccessCard title="核心解答">
                    <p>TypeScript 提供 8 种基本类型：<code>number</code>、<code>string</code>、<code>boolean</code>、<code>null</code>、<code>undefined</code>、<code>symbol</code>、<code>bigint</code>、<code>object</code>。通过静态类型检查在编译时发现错误，支持类型推断减少手动标注。</p>
                </SuccessCard>

                <SecondaryCard title="📝 面试解答要点">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold mb-2">1. 基本类型分类</h4>
                            <ExpandableCode language="typescript" maxHeight={200}>
{`// 原始类型 (Primitive Types)
let age: number = 25;           // 数值
let name: string = "张三";       // 字符串  
let isActive: boolean = true;   // 布尔值
let empty: null = null;         // 空值
let notSet: undefined;          // 未定义

// 类型推断
let count = 42;        // 自动推断为 number
let message = "hello"; // 自动推断为 string`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2">2. 数组和元组类型</h4>
                            <ExpandableCode language="typescript" maxHeight={150}>
{`// 数组类型
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];

// 元组类型 - 固定长度和类型
let user: [string, number] = ["Alice", 25];
let point: [number, number] = [10, 20];`}
                            </ExpandableCode>
                        </div>
                    </div>
                </SecondaryCard>

                <InfoCard title="为什么这样设计">
                    <ul className="list-disc pl-4 space-y-2">
                        <li><strong>类型安全：</strong>编译时捕获类型错误，避免运行时崩溃</li>
                        <li><strong>开发效率：</strong>IDE 提供智能提示和自动完成</li>
                        <li><strong>代码可读性：</strong>类型注解即文档，增强代码可维护性</li>
                        <li><strong>重构安全：</strong>类型系统保证重构的正确性</li>
                    </ul>
                </InfoCard>

                <WarningCard title="常见易错点">
                    <div className="space-y-3">
                        <div>
                            <h5 className="font-semibold">1. null 和 undefined 混淆</h5>
                            <ExpandableCode language="typescript" maxHeight={120}>
{`// ❌ 错误认知
let value: string = null;        // 严格模式下报错
let data: number = undefined;    // 严格模式下报错

// ✅ 正确做法
let value: string | null = null;
let data: number | undefined = undefined;`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">2. 数组类型推断过宽</h5>
                            <ExpandableCode language="typescript" maxHeight={120}>
{`// ❌ 问题代码
let items = [1, "hello"];        // 推断为 (string | number)[]
items.push(true);                // 不会报错，但逻辑错误

// ✅ 明确类型
let items: number[] = [1, 2, 3]; // 严格限制为数字数组`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">3. 对象类型声明不完整</h5>
                            <ExpandableCode language="typescript" maxHeight={120}>
{`// ❌ 容易遗漏属性
interface User {
    name: string;
    // 忘记声明 age 属性
}

// ✅ 完整声明
interface User {
    name: string;
    age: number;
    email?: string; // 可选属性用 ? 标记
}`}
                            </ExpandableCode>
                        </div>
                    </div>
                </WarningCard>

                <SecondaryCard title="💡 面试加分点">
                    <div className="space-y-3">
                        <div>
                            <h5 className="font-semibold">类型断言的合理使用</h5>
                            <ExpandableCode language="typescript" maxHeight={100}>
{`// 类型断言 - 谨慎使用
let userInput: unknown = "hello";
let strLength = (userInput as string).length;

// 类型守卫 - 更安全的方式
if (typeof userInput === "string") {
    let strLength = userInput.length; // 自动类型收窄
}`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">联合类型的实际应用</h5>
                            <ExpandableCode language="typescript" maxHeight={100}>
{`// 实际业务场景
type Status = "loading" | "success" | "error";
type ID = string | number;

function handleStatus(status: Status) {
    // TypeScript 会检查所有可能的值
    switch (status) {
        case "loading": /* 处理加载状态 */ break;
        case "success": /* 处理成功状态 */ break;
        case "error": /* 处理错误状态 */ break;
    }
}`}
                            </ExpandableCode>
                        </div>
                    </div>
                </SecondaryCard>
            </div>
        </QuestionCard>
    );
} 