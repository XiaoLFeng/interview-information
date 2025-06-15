import { QuestionCard } from "../../../../base/knowledge_question_card";
import { InfoCard } from "../../../../card/info_card";
import { WarningCard } from "../../../../card/warning_card";
import { SuccessCard } from "../../../../card/success_card";
import { SecondaryCard } from "../../../../card/secondary_card";
import { ExpandableCode } from "../../../../base/expandable_code";

interface Props {
    id: string;
}

export function FrontCSSGrid({ id }: Props) {
    return (
        <QuestionCard
            question={{
                id,
                title: "CSS Grid 网格布局",
                category: "CSS",
                content: "CSS Grid 网格布局的核心概念、常用属性以及它与 Flexbox 的区别？",
                tags: ["CSS", "Grid", "网格布局", "布局", "二维布局"]
            }}
        >
            <div className="space-y-6">
                <SuccessCard title="核心解答">
                    <p>CSS Grid 布局是一个<strong>二维网格布局系统</strong>，能够同时处理行和列。与主要用于一维布局的 Flexbox 不同，Grid 让你能够将页面分割成主要区域，或者定义元素在二维空间中的大小、位置和对齐方式。</p>
                    <p><strong>与 Flexbox 的关系/区别：</strong></p>
                    <ul className="list-disc pl-5">
                        <li><strong>维度：</strong>Grid 是二维的（行和列），Flexbox 是一维的（行或列）。</li>
                        <li><strong>设计目的：</strong>Grid 更侧重于页面级的整体布局结构，而 Flexbox 更擅长于在组件内部或局部区域对内容进行对齐和分布。</li>
                        <li><strong>内容优先 vs. 布局优先：</strong>Flexbox 通常是内容优先的，项目大小可以影响布局；Grid 通常是布局优先的，先定义网格结构，再将项目放入。</li>
                        <li><strong>结合使用：</strong>两者可以很好地结合使用。例如，使用 Grid 进行页面宏观布局，然后在 Grid 的单元格内使用 Flexbox 对齐其中的元素。</li>
                    </ul>
                </SuccessCard>

                <SecondaryCard title="核心概念 - Grid 容器属性">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold"><code>display: grid</code> / <code>display: inline-grid</code></h4>
                            <p>将元素定义为 Grid 容器。<code>grid</code> 使容器表现为块级元素，<code>inline-grid</code> 使容器表现为行内元素。</p>
                            <ExpandableCode language="css" maxHeight={80}>
{`.container {
    display: grid; /* 或者 inline-grid */
}`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h4 className="font-semibold"><code>grid-template-columns</code> / <code>grid-template-rows</code></h4>
                            <p>定义网格的列和行的大小和数量。可以使用各种单位：</p>
                            <ul className="list-disc pl-5">
                                <li>固定单位: <code>px</code>, <code>em</code></li>
                                <li>百分比: <code>%</code> (相对于容器大小)</li>
                                <li><code>fr</code> 单位: (fraction unit) 代表网格容器中可用空间的一等份。</li>
                                <li><code>repeat()</code> 函数: 重复创建轨道，如 <code>repeat(3, 1fr)</code> 表示三列，每列占一份。</li>
                                <li><code>minmax(min, max)</code>: 定义一个长度范围，表示轨道长度不能小于 min，不能大于 max。</li>
                                <li><code>auto</code>: 由浏览器决定轨道的尺寸，基于内容大小。</li>
                                <li><code>auto-fit</code> / <code>auto-fill</code>: 在 <code>repeat()</code> 中使用，用于创建尽可能多地适应容器的轨道。</li>
                            </ul>
                            <ExpandableCode language="css" maxHeight={200}>
{`.container {
    grid-template-columns: 100px 1fr 2fr; /* 三列：固定、1份、2份 */
    grid-template-rows: repeat(3, minmax(100px, auto)); /* 三行：最小100px，可自动增长 */
    /* grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); */ /* 响应式列 */
}`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h4 className="font-semibold"><code>grid-template-areas</code></h4>
                            <p>用于通过命名网格区域来定义网格结构。需要配合项目属性 <code>grid-area</code> 使用。</p>
                            <ExpandableCode language="css" maxHeight={150}>
{`.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
        "header header header"
        "sidebar main main"
        "footer footer footer";
}
.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h4 className="font-semibold">间距 (Gaps)</h4>
                            <p>定义网格线之间的间距（沟槽）。</p>
                            <ul className="list-disc pl-5">
                                <li><code>grid-column-gap</code>: 列间距 (旧)</li>
                                <li><code>grid-row-gap</code>: 行间距 (旧)</li>
                                <li><code>grid-gap</code>: <code>grid-row-gap</code> 和 <code>grid-column-gap</code> 的简写 (旧)</li>
                                <li><code>column-gap</code>: 列间距 (新标准)</li>
                                <li><code>row-gap</code>: 行间距 (新标准)</li>
                                <li><code>gap</code>: <code>row-gap</code> 和 <code>column-gap</code> 的简写 (新标准)</li>
                            </ul>
                            <ExpandableCode language="css" maxHeight={100}>
{`.container {
    gap: 20px 10px; /* row-gap: 20px, column-gap: 10px */
    /* grid-gap: 20px; (旧语法，行和列间距都为20px) */
}`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h4 className="font-semibold"><code>justify-items</code> / <code>align-items</code></h4>
                            <p>定义网格项目在其单元格内的对齐方式。</p>
                            <ul className="list-disc pl-5">
                                <li><code>justify-items</code>: 沿行轴（内联轴）对齐。值: <code>start</code>, <code>end</code>, <code>center</code>, <code>stretch</code> (默认)。</li>
                                <li><code>align-items</code>: 沿列轴（块轴）对齐。值: <code>start</code>, <code>end</code>, <code>center</code>, <code>stretch</code> (默认), <code>baseline</code>。</li>
                            </ul>
                            <ExpandableCode language="css" maxHeight={100}>
{`.container {
    justify-items: center;
    align-items: stretch;
}`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h4 className="font-semibold"><code>justify-content</code> / <code>align-content</code></h4>
                            <p>当网格的总大小小于其容器时，定义网格在容器内的对齐方式。</p>
                            <ul className="list-disc pl-5">
                                <li><code>justify-content</code>: 沿行轴对齐网格。值: <code>start</code>, <code>end</code>, <code>center</code>, <code>space-between</code>, <code>space-around</code>, <code>space-evenly</code>, <code>stretch</code>。</li>
                                <li><code>align-content</code>: 沿列轴对齐网格。值: <code>start</code>, <code>end</code>, <code>center</code>, <code>space-between</code>, <code>space-around</code>, <code>space-evenly</code>, <code>stretch</code>。</li>
                            </ul>
                            <ExpandableCode language="css" maxHeight={100}>
{`.container {
    /* 假设网格比容器小 */
    justify-content: center; /* 网格在容器中水平居中 */
    align-content: space-around; /* 网格的行在容器中垂直方向上均匀分布空间 */
}`}
                            </ExpandableCode>
                        </div>
                    </div>
                </SecondaryCard>

                <SecondaryCard title="核心概念 - Grid 项目属性">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold"><code>grid-column-start</code> / <code>grid-column-end</code> / <code>grid-row-start</code> / <code>grid-row-end</code></h4>
                            <p>定义网格项目在网格中的位置和跨度，通过指定网格线编号或名称。</p>
                            <ExpandableCode language="css" maxHeight={120}>
{`.item-a {
    grid-column-start: 2;
    grid-column-end: 4; /* 跨越第2和第3列 (不包括第4条线) */
    grid-row-start: 1;
    grid-row-end: 3;   /* 跨越第1和第2行 */
    /* grid-column-start: span 2; (另一种方式，从当前位置开始跨越2列) */
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold"><code>grid-column</code> / <code>grid-row</code></h4>
                            <p>分别是 <code>grid-column-start</code> / <code>grid-column-end</code> 和 <code>grid-row-start</code> / <code>grid-row-end</code> 的简写。</p>
                            <ExpandableCode language="css" maxHeight={100}>
{`.item-b {
    grid-column: 1 / 3; /* 等同于 grid-column-start: 1; grid-column-end: 3; */
    grid-row: 2 / span 2; /* 从第2行开始，跨越2行 */
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold"><code>grid-area</code></h4>
                            <p>用于给网格项目分配一个名称，以便在 <code>grid-template-areas</code> 中使用。也可以作为 <code>grid-row-start</code> / <code>grid-column-start</code> / <code>grid-row-end</code> / <code>grid-column-end</code> 的简写。</p>
                            <ExpandableCode language="css" maxHeight={100}>
{`/* 1. 配合 grid-template-areas */
.item-header {
    grid-area: header;
}
/* 2. 作为简写: row-start / column-start / row-end / column-end */
.item-c {
    grid-area: 1 / 2 / 3 / 4;
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold"><code>justify-self</code> / <code>align-self</code></h4>
                            <p>允许单个网格项目覆盖容器的 <code>justify-items</code> 和 <code>align-items</code> 设置，定义其自身在其单元格内的对齐方式。</p>
                            <ul className="list-disc pl-5">
                                <li><code>justify-self</code>: 沿行轴对齐。值: <code>start</code>, <code>end</code>, <code>center</code>, <code>stretch</code> (默认)。</li>
                                <li><code>align-self</code>: 沿列轴对齐。值: <code>start</code>, <code>end</code>, <code>center</code>, <code>stretch</code> (默认), <code>baseline</code>。</li>
                            </ul>
                            <ExpandableCode language="css" maxHeight={100}>
{`.item-d {
    justify-self: end;
    align-self: center;
}`}
                            </ExpandableCode>
                        </div>
                    </div>
                </SecondaryCard>

                <InfoCard title="Grid 与 Flexbox 结合">
                    <p>在许多实际场景中，Grid 和 Flexbox 可以协同工作，发挥各自的优势。一个常见的模式是用 Grid 构建页面的主要布局结构（如页眉、页脚、侧边栏、主内容区），然后在这些区域内部使用 Flexbox 来对齐和分布其中的具体内容项。</p>
                    <ExpandableCode language="html" maxHeight={250}>
{`<div class="page-container">
    <header class="page-header">Header</header>
    <nav class="page-nav">
        <!-- Flexbox for nav items -->
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Services</a>
    </nav>
    <main class="page-main">Main Content</main>
    <footer class="page-footer">Footer</footer>
</div>

<style>
.page-container {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
        "header header"
        "nav    main"
        "footer footer";
    min-height: 100vh;
    gap: 10px;
}
.page-header { grid-area: header; background: lightblue; padding: 1em; }
.page-nav {
    grid-area: nav; background: lightgreen; padding: 1em;
    /* Flexbox for internal alignment */
    display: flex;
    flex-direction: column; /* Align nav items vertically */
    gap: 10px;
}
.page-main { grid-area: main; background: lightyellow; padding: 1em; }
.page-footer { grid-area: footer; background: lightpink; padding: 1em; text-align: center; }
</style>`}
                    </ExpandableCode>
                </InfoCard>

                <WarningCard title="注意事项与浏览器兼容性">
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>浏览器兼容性：</strong>现代主流浏览器对 CSS Grid 布局支持良好（包括 Edge, Firefox, Chrome, Safari）。IE10 和 IE11 支持一个过时的、带 <code>-ms-</code> 前缀的 Grid 版本，与现代规范有很大差异，通常不建议为其做兼容。</li>
                        <li><strong>隐式网格 (Implicit Grid):</strong> 如果放置的项目超出了通过 <code>grid-template-columns/rows</code> 定义的显式网格范围，Grid 会自动创建隐式轨道来容纳这些项目。这些隐式轨道的大小可以通过 <code>grid-auto-rows</code> 和 <code>grid-auto-columns</code> 控制。</li>
                        <li><strong><code>fr</code> 单位与内容大小:</strong> <code>fr</code> 单位分配的是可用空间，它会优先考虑固定大小的轨道、内容大小（如果轨道为 <code>auto</code>）以及 <code>gap</code>。</li>
                        <li><strong>Subgrid (子网格):</strong> <code>subgrid</code> 是一个较新的 Grid 特性，允许嵌套的 Grid 容器参与其父 Grid 的轨道尺寸定义。这意味着子网格的行和/或列可以对齐到外部网格的轨道。目前浏览器支持正在逐步完善中，使用前需检查兼容性 (如 caniuse.com)。</li>
                        <li><strong>可访问性 (Accessibility):</strong> Grid 布局的强大之处在于可以将视觉顺序与 DOM 顺序分离。虽然这提供了灵活性，但也可能导致可访问性问题，因为屏幕阅读器等辅助技术通常依赖于 DOM 顺序。确保源文档结构具有逻辑性。</li>
                    </ul>
                </WarningCard>
            </div>
        </QuestionCard>
    );
}