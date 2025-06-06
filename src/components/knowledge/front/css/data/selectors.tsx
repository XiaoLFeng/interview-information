import { QuestionCard } from "../../../../base/knowledge_question_card";
import { ExpandableCode } from "../../../../base/expandable_code";
import { SuccessCard } from "../../../../card/success_card";
import { InfoCard } from "../../../../card/info_card";
import { WarningCard } from "../../../../card/warning_card";
import { SecondaryCard } from "../../../../card/secondary_card";

interface Props {
    id: string;
}

export function FrontCSSSelectors({ id }: Props) {
    return (
        <QuestionCard
            question={{
                id,
                title: "CSS 选择器系统",
                category: "CSS",
                content: "CSS 选择器的类型和优先级是怎样的？选择器权重如何计算？常用伪类和伪元素选择器有哪些？",
                tags: ["CSS", "选择器", "优先级", "伪类", "伪元素"]
            }}
        >
            <div className="space-y-6">
                <SuccessCard title="核心要点">
                    <p>CSS 选择器用于选择 HTML 元素并应用样式，包括基础选择器、组合选择器、伪类和伪元素等，理解选择器优先级对于样式控制至关重要。</p>
                </SuccessCard>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoCard title="选择器类型">
                        <p>包括元素选择器、类选择器、ID选择器、属性选择器、伪类选择器等多种类型。</p>
                    </InfoCard>
                    <InfoCard title="优先级规则">
                        <p>遵循特定的权重计算规则：内联样式 &gt; ID &gt; 类/属性/伪类 &gt; 元素/伪元素。</p>
                    </InfoCard>
                </div>

                <SecondaryCard title="基础选择器">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr className="text-base-content">
                                    <th>选择器类型</th>
                                    <th>语法</th>
                                    <th>示例</th>
                                    <th>权重</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>元素选择器</td>
                                    <td><code>element</code></td>
                                    <td><code>p, div, h1</code></td>
                                    <td>0,0,0,1</td>
                                </tr>
                                <tr>
                                    <td>类选择器</td>
                                    <td><code>.class</code></td>
                                    <td><code>.container, .btn</code></td>
                                    <td>0,0,1,0</td>
                                </tr>
                                <tr>
                                    <td>ID选择器</td>
                                    <td><code>#id</code></td>
                                    <td><code>#header, #main</code></td>
                                    <td>0,1,0,0</td>
                                </tr>
                                <tr>
                                    <td>通配符选择器</td>
                                    <td><code>*</code></td>
                                    <td><code>*</code></td>
                                    <td>0,0,0,0</td>
                                </tr>
                                <tr>
                                    <td>属性选择器</td>
                                    <td><code>[attr]</code></td>
                                    <td><code>[type="text"]</code></td>
                                    <td>0,0,1,0</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </SecondaryCard>

                <SecondaryCard title="组合选择器">
                    <ExpandableCode 
                        language="css"
                        maxHeight={300}
                    >
{`/* 后代选择器 */
.container p {
    color: blue;
}

/* 子元素选择器 */
.nav > li {
    display: inline-block;
}

/* 相邻兄弟选择器 */
h1 + p {
    margin-top: 0;
}

/* 通用兄弟选择器 */
h1 ~ p {
    color: gray;
}

/* 多类选择器 */
.btn.primary {
    background: blue;
}

/* 分组选择器 */
h1, h2, h3 {
    font-family: Arial, sans-serif;
}

/* 属性选择器变体 */
input[type="email"] { /* 精确匹配 */ }
[class^="btn-"] { /* 以指定值开头 */ }
[class$="-large"] { /* 以指定值结尾 */ }
[class*="center"] { /* 包含指定值 */ }`}
                    </ExpandableCode>
                </SecondaryCard>

                <SecondaryCard title="伪类选择器">
                    <ExpandableCode 
                        language="css"
                        maxHeight={300}
                    >
{`/* 链接状态 */
a:link { color: blue; }
a:visited { color: purple; }
a:hover { color: red; }
a:active { color: orange; }

/* 表单状态 */
input:focus { border-color: blue; }
input:disabled { opacity: 0.5; }
input:checked + label { font-weight: bold; }

/* 结构伪类 */
:first-child { margin-top: 0; }
:last-child { margin-bottom: 0; }
:nth-child(2n) { background: #f0f0f0; }
:nth-child(odd) { background: white; }
:nth-of-type(1) { font-size: 2em; }

/* 状态伪类 */
:empty { display: none; }
:not(.hidden) { display: block; }
:target { background: yellow; }

/* 用户行为 */
:hover { transform: scale(1.05); }
:focus-visible { outline: 2px solid blue; }`}
                    </ExpandableCode>
                </SecondaryCard>

                <SecondaryCard title="伪元素选择器">
                    <ExpandableCode 
                        language="css"
                        maxHeight={300}
                    >
{`/* 内容生成 */
.quote::before {
    content: """;
    font-size: 2em;
    color: #ccc;
}

.quote::after {
    content: """;
    font-size: 2em;
    color: #ccc;
}

/* 首字母和首行 */
p::first-letter {
    font-size: 2em;
    font-weight: bold;
    float: left;
}

p::first-line {
    font-weight: bold;
    color: #333;
}

/* 选中文本 */
::selection {
    background: #007acc;
    color: white;
}

/* 占位符文本 */
input::placeholder {
    color: #999;
    font-style: italic;
}

/* 列表标记 */
li::marker {
    color: #007acc;
    font-weight: bold;
}`}
                    </ExpandableCode>
                </SecondaryCard>

                <SecondaryCard title="优先级计算">
                    <div className="space-y-4">
                        <p className="text-sm">CSS 选择器优先级按照特殊性值计算，格式为 (内联样式, ID, 类/属性/伪类, 元素/伪元素)</p>
                        
                        <div className="overflow-x-auto">
                            <table className="table table-compact w-full">
                                <thead>
                                    <tr>
                                        <th>选择器</th>
                                        <th>特殊性值</th>
                                        <th>说明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>style=""</code></td>
                                        <td>1,0,0,0</td>
                                        <td>内联样式</td>
                                    </tr>
                                    <tr>
                                        <td><code>#nav</code></td>
                                        <td>0,1,0,0</td>
                                        <td>ID选择器</td>
                                    </tr>
                                    <tr>
                                        <td><code>.nav</code></td>
                                        <td>0,0,1,0</td>
                                        <td>类选择器</td>
                                    </tr>
                                    <tr>
                                        <td><code>ul</code></td>
                                        <td>0,0,0,1</td>
                                        <td>元素选择器</td>
                                    </tr>
                                    <tr>
                                        <td><code>#nav .item</code></td>
                                        <td>0,1,1,0</td>
                                        <td>组合选择器</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </SecondaryCard>

                <WarningCard title="选择器最佳实践">
                    <ul className="list-disc pl-4 space-y-2">
                        <li><strong>避免过度使用 ID：</strong>ID 选择器优先级过高，难以覆盖</li>
                        <li><strong>合理使用类选择器：</strong>类选择器具有良好的复用性和适中的优先级</li>
                        <li><strong>谨慎使用 !important：</strong>只在必要时使用，避免破坏正常的优先级规则</li>
                        <li><strong>保持选择器简洁：</strong>避免过深的嵌套选择器，影响性能和维护</li>
                    </ul>
                </WarningCard>
            </div>
        </QuestionCard>
    );
} 