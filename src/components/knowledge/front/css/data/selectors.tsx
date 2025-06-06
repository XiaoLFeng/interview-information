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
 * # CSS 选择器系统
 * 
 * 面试问题：CSS 选择器优先级如何计算？如何解决样式覆盖问题？:nth-child 和 :nth-of-type 的区别？
 * 
 * 核心解答：CSS 选择器优先级按特异性值计算，格式为 (内联样式, ID, 类/属性/伪类, 元素/伪元素)。数值越大优先级越高。<code>!important</code> 具有最高优先级但应谨慎使用。
 */
export function FrontCSSSelectors({ id }: Props) {
    return (
        <QuestionCard
            question={{
                id,
                title: "选择器系统",
                category: "选择器",
                content: "面试问题：CSS 选择器优先级如何计算？如何解决样式覆盖问题？:nth-child 和 :nth-of-type 的区别？",
                tags: ["CSS", "选择器", "面试", "优先级", "伪类选择器"]
            }}
        >
            <div className="space-y-6">
                <SuccessCard title="核心解答">
                    <p>CSS 选择器优先级按<strong>特异性值</strong>计算，格式为 (内联样式, ID, 类/属性/伪类, 元素/伪元素)。数值越大优先级越高。<code>!important</code> 具有最高优先级但应谨慎使用。</p>
                </SuccessCard>

                <InfoCard title="为什么需要优先级系统">
                    <ul className="list-disc pl-4 space-y-2">
                        <li><strong>样式冲突解决：</strong>多个规则匹配同一元素时决定应用哪个</li>
                        <li><strong>设计灵活性：</strong>允许通用样式被特定样式覆盖</li>
                        <li><strong>继承控制：</strong>更精确的选择器可以覆盖继承的样式</li>
                        <li><strong>组件化支持：</strong>避免全局样式意外影响组件</li>
                    </ul>
                </InfoCard>

                <SecondaryCard title="📝 选择器优先级计算">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold mb-2">1. 优先级权重系统</h4>
                            <div className="overflow-x-auto">
                                <table className="table table-zebra w-full text-sm">
                                    <thead>
                                        <tr className="text-base-content">
                                            <th>选择器类型</th>
                                            <th>权重</th>
                                            <th>示例</th>
                                            <th>计算方式</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>内联样式</td>
                                            <td className="font-mono text-accent">1,0,0,0</td>
                                            <td><code>style="color: red"</code></td>
                                            <td>直接在HTML元素上</td>
                                        </tr>
                                        <tr>
                                            <td>ID选择器</td>
                                            <td className="font-mono text-accent">0,1,0,0</td>
                                            <td><code>#header</code></td>
                                            <td>每个ID +100</td>
                                        </tr>
                                        <tr>
                                            <td>类/属性/伪类</td>
                                            <td className="font-mono text-accent">0,0,1,0</td>
                                            <td><code>.nav, [type], :hover</code></td>
                                            <td>每个 +10</td>
                                        </tr>
                                        <tr>
                                            <td>元素/伪元素</td>
                                            <td className="font-mono text-accent">0,0,0,1</td>
                                            <td><code>div, ::before</code></td>
                                            <td>每个 +1</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2">2. 实际计算示例</h4>
                            <ExpandableCode language="css" maxHeight={180}>
{`/* 具体选择器权重计算 */
div p                    /* (0,0,0,2) = 2 */
.nav p                   /* (0,0,1,1) = 11 */
.nav .item               /* (0,0,2,0) = 20 */
#header .nav             /* (0,1,1,0) = 110 */
#header .nav .item       /* (0,1,2,0) = 120 */
ul li:first-child        /* (0,0,1,2) = 12 */
[type="text"]:focus      /* (0,0,2,0) = 20 */

/* 面试重点：同一权重值，后出现的覆盖前面的 */
.btn { color: red; }     /* 假设这个后定义 */
.button { color: blue; } /* 这个先定义 */
/* 如果同时匹配，元素最终是红色 */`}
                            </ExpandableCode>
                        </div>
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

                <WarningCard title="面试常考难点">
                    <div className="space-y-4">
                        <div>
                            <h5 className="font-semibold">1. :nth-child vs :nth-of-type 的区别</h5>
                            <ExpandableCode language="html" maxHeight={200}>
{`<!-- HTML 结构 -->
<div>
    <h2>标题1</h2>
    <p>段落1</p>    <!-- 第2个子元素，第1个p元素 -->
    <p>段落2</p>    <!-- 第3个子元素，第2个p元素 -->
    <span>文本</span>
    <p>段落3</p>    <!-- 第5个子元素，第3个p元素 -->
</div>

<style>
/* nth-child: 按所有子元素的位置计算 */
p:nth-child(2) { color: red; }     /* 选中"段落1" */
p:nth-child(3) { color: blue; }    /* 选中"段落2" */

/* nth-of-type: 按同类型元素的位置计算 */
p:nth-of-type(1) { font-weight: bold; }  /* 选中"段落1" */
p:nth-of-type(2) { font-style: italic; } /* 选中"段落2" */
p:nth-of-type(3) { text-decoration: underline; } /* 选中"段落3" */
</style>

<!-- 面试陷阱：p:nth-child(4) 选不中任何p元素，因为第4个子元素是span -->`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">2. 属性选择器的高级用法</h5>
                            <ExpandableCode language="css" maxHeight={180}>
{`/* 面试常问：各种属性选择器的区别 */
[class]                  /* 有class属性的元素 */
[class="nav"]            /* class等于"nav" */
[class~="active"]        /* class包含"active"单词(空格分隔) */
[class|="en"]            /* class等于"en"或"en-"开头 */
[class^="btn"]           /* class以"btn"开头 */
[class$="large"]         /* class以"large"结尾 */
[class*="center"]        /* class包含"center"子串 */

/* 实际应用场景 */
[data-status="loading"] { opacity: 0.5; }
[href^="https://"]::after { content: " 🔗"; }
[href$=".pdf"]::before { content: "📄 "; }
input[type="email"]:invalid { border-color: red; }`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">3. 解决优先级冲突的策略</h5>
                            <ExpandableCode language="css" maxHeight={180}>
{`/* ❌ 错误方式：滥用 !important */
.button { 
    color: red !important; 
}

/* ✅ 正确方式1：提高选择器特异性 */
.theme-dark .button {
    color: #fff;
}

/* ✅ 正确方式2：使用CSS变量 */
.button {
    color: var(--button-color, #333);
}
.theme-dark {
    --button-color: #fff;
}

/* ✅ 正确方式3：模块化CSS */
.nav__button {  /* BEM命名法 */
    color: #007acc;
}`}
                            </ExpandableCode>
                        </div>
                    </div>
                </WarningCard>

                <InfoCard title="面试加分点">
                    <ul className="list-disc pl-4 space-y-2">
                        <li><strong>性能考虑：</strong>避免深层嵌套选择器，影响CSS解析性能</li>
                        <li><strong>维护性：</strong>使用BEM、CSS Modules等方法避免选择器冲突</li>
                        <li><strong>可访问性：</strong>合理使用 :focus、:focus-visible 等伪类</li>
                        <li><strong>新特性：</strong>了解 :is()、:where()、:has() 等现代选择器</li>
                    </ul>
                </InfoCard>
            </div>
        </QuestionCard>
    );
} 