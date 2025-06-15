import { QuestionCard } from "../../../../base/knowledge_question_card";
import { InfoCard } from "../../../../card/info_card";
import { WarningCard } from "../../../../card/warning_card";
import { SuccessCard } from "../../../../card/success_card";
import { SecondaryCard } from "../../../../card/secondary_card";
import { ExpandableCode } from "../../../../base/expandable_code";

interface Props {
    id: string;
}

export function FrontCSSFlexbox({ id }: Props) {
    return (
        <QuestionCard
            question={{
                id,
                title: "CSS Flexbox 弹性布局",
                category: "CSS",
                content: "CSS Flexbox 弹性布局的核心概念、常用属性以及实际应用场景？",
                tags: ["CSS", "Flexbox", "弹性布局", "布局", "前端"]
            }}
        >
            <div className="space-y-6">
                <SuccessCard title="核心解答">
                    <p>Flexbox 是一种<strong>一维布局模型</strong>，旨在为容器中的项目提供更为高效和可预测的布局方式。它使得项目可以在主轴或交叉轴上灵活地对齐、分布空间，极大地简化了复杂布局的实现，尤其在构建<strong>响应式设计</strong>方面表现出色。</p>
                </SuccessCard>

                <SecondaryCard title="容器属性 (Flex Container Properties)">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold"><code>display: flex</code> / <code>display: inline-flex</code></h4>
                            <p>将元素定义为 Flex 容器。<code>flex</code> 使容器表现为块级元素，<code>inline-flex</code> 使容器表现为行内元素。</p>
                            <ExpandableCode language="css" maxHeight={80}>
{`.container {
    display: flex; /* 或者 inline-flex */
}`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h4 className="font-semibold"><code>flex-direction</code></h4>
                            <p>定义主轴的方向，即项目排列的方向。</p>
                            <ul className="list-disc pl-5">
                                <li><code>row</code> (默认): 主轴为水平方向，起点在左端。</li>
                                <li><code>row-reverse</code>: 主轴为水平方向，起点在右端。</li>
                                <li><code>column</code>: 主轴为垂直方向，起点在上沿。</li>
                                <li><code>column-reverse</code>: 主轴为垂直方向，起点在下沿。</li>
                            </ul>
                            <ExpandableCode language="css" maxHeight={120}>
{`.container {
    flex-direction: row; /* row | row-reverse | column | column-reverse */
}`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h4 className="font-semibold"><code>flex-wrap</code></h4>
                            <p>定义当项目在一条轴线上排不下时如何换行。</p>
                            <ul className="list-disc pl-5">
                                <li><code>nowrap</code> (默认): 不换行，项目可能会溢出容器。</li>
                                <li><code>wrap</code>: 换行，第一行在上方。</li>
                                <li><code>wrap-reverse</code>: 换行，第一行在下方。</li>
                            </ul>
                            <ExpandableCode language="css" maxHeight={100}>
{`.container {
    flex-wrap: nowrap; /* nowrap | wrap | wrap-reverse */
}`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h4 className="font-semibold"><code>flex-flow</code></h4>
                            <p><code>flex-direction</code> 和 <code>flex-wrap</code> 的简写形式。</p>
                            <ExpandableCode language="css" maxHeight={80}>
{`.container {
    flex-flow: row nowrap; /* <flex-direction> <flex-wrap> */
}`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h4 className="font-semibold"><code>justify-content</code></h4>
                            <p>定义项目在主轴上的对齐方式。</p>
                            <ul className="list-disc pl-5">
                                <li><code>flex-start</code> (默认): 左对齐（或上对齐）。</li>
                                <li><code>flex-end</code>: 右对齐（或下对齐）。</li>
                                <li><code>center</code>: 居中对齐。</li>
                                <li><code>space-between</code>: 两端对齐，项目之间的间隔都相等。</li>
                                <li><code>space-around</code>: 每个项目两侧的间隔相等。项目之间的间隔比项目与边框的间隔大一倍。</li>
                                <li><code>space-evenly</code>: 项目之间以及项目与边框之间的间隔完全相等。</li>
                            </ul>
                            <ExpandableCode language="css" maxHeight={120}>
{`.container {
    justify-content: flex-start; /* flex-start | flex-end | center | space-between | space-around | space-evenly */
}`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h4 className="font-semibold"><code>align-items</code></h4>
                            <p>定义项目在交叉轴上的对齐方式。</p>
                            <ul className="list-disc pl-5">
                                <li><code>stretch</code> (默认): 如果项目未设置高度或设为auto，将占满整个容器的高度。</li>
                                <li><code>flex-start</code>: 交叉轴的起点对齐。</li>
                                <li><code>flex-end</code>: 交叉轴的终点对齐。</li>
                                <li><code>center</code>: 交叉轴的中点对齐。</li>
                                <li><code>baseline</code>: 项目的第一行文字的基线对齐。</li>
                            </ul>
                            <ExpandableCode language="css" maxHeight={120}>
{`.container {
    align-items: stretch; /* stretch | flex-start | flex-end | center | baseline */
}`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h4 className="font-semibold"><code>align-content</code></h4>
                            <p>定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。</p>
                             <ul className="list-disc pl-5">
                                <li><code>flex-start</code>: 与交叉轴的起点对齐。</li>
                                <li><code>flex-end</code>: 与交叉轴的终点对齐。</li>
                                <li><code>center</code>: 与交叉轴的中点对齐。</li>
                                <li><code>space-between</code>: 与交叉轴两端对齐，轴线之间的间隔平均分布。</li>
                                <li><code>space-around</code>: 每根轴线两侧的间隔都相等。</li>
                                <li><code>stretch</code> (默认): 轴线占满整个交叉轴。</li>
                            </ul>
                            <ExpandableCode language="css" maxHeight={120}>
{`.container {
    align-content: stretch; /* flex-start | flex-end | center | space-between | space-around | stretch */
}`}
                            </ExpandableCode>
                        </div>
                    </div>
                </SecondaryCard>

                <SecondaryCard title="项目属性 (Flex Item Properties)">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold"><code>order</code></h4>
                            <p>定义项目的排列顺序。数值越小，排列越靠前，默认为0。</p>
                            <ExpandableCode language="css" maxHeight={80}>
{`.item {
    order: 0; /* <integer> */
}`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h4 className="font-semibold"><code>flex-grow</code></h4>
                            <p>定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。</p>
                            <ExpandableCode language="css" maxHeight={80}>
{`.item {
    flex-grow: 0; /* <number> */
}`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h4 className="font-semibold"><code>flex-shrink</code></h4>
                            <p>定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。</p>
                            <ExpandableCode language="css" maxHeight={80}>
{`.item {
    flex-shrink: 1; /* <number> */
}`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h4 className="font-semibold"><code>flex-basis</code></h4>
                            <p>定义了在分配多余空间之前，项目占据的主轴空间。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为<code>auto</code>，即项目的本来大小。</p>
                            <ExpandableCode language="css" maxHeight={80}>
{`.item {
    flex-basis: auto; /* <length> | auto */
}`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h4 className="font-semibold"><code>flex</code></h4>
                            <p><code>flex-grow</code>, <code>flex-shrink</code> 和 <code>flex-basis</code>的简写，默认值为<code>0 1 auto</code>。后两个属性可选。</p>
                            <ExpandableCode language="css" maxHeight={100}>
{`.item {
    flex: 0 1 auto; /* <flex-grow> <flex-shrink> <flex-basis> */
    /* common values: auto (1 1 auto), none (0 0 auto), <positive-number> (positive-number 1 0%) */
}`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h4 className="font-semibold"><code>align-self</code></h4>
                            <p>允许单个项目有与其他项目不一样的对齐方式，可覆盖<code>align-items</code>属性。默认值为<code>auto</code>，表示继承父元素的<code>align-items</code>属性，如果没有父元素，则等同于<code>stretch</code>。</p>
                            <ExpandableCode language="css" maxHeight={100}>
{`.item {
    align-self: auto; /* auto | flex-start | flex-end | center | baseline | stretch */
}`}
                            </ExpandableCode>
                        </div>
                    </div>
                </SecondaryCard>

                <InfoCard title="常见用例">
                    <div className="space-y-4">
                        <div>
                            <h5 className="font-semibold">1. 垂直居中</h5>
                            <p>将一个元素在其父容器中垂直居中。</p>
                            <ExpandableCode language="html" maxHeight={180}>
{`<div class="parent-container-center">
    <div class="child-item">居中内容</div>
</div>

<style>
.parent-container-center {
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 (可选) */
    height: 200px; /* 需要容器有高度 */
    background-color: #f0f0f0;
}
.child-item {
    padding: 20px;
    background-color: #3498db;
    color: white;
}
</style>`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h5 className="font-semibold">2. 等高布局</h5>
                            <p>使同一行内的项目具有相同的高度，无论其内容多少。</p>
                            <ExpandableCode language="html" maxHeight={200}>
{`<div class="equal-height-container">
    <div class="column">短内容</div>
    <div class="column">这是比较长的内容，会使得这一列变高。</div>
    <div class="column">中等长度内容。</div>
</div>

<style>
.equal-height-container {
    display: flex;
    border: 1px solid #ccc;
}
.column {
    flex: 1; /* 等分宽度 */
    padding: 1em;
    border-right: 1px solid #eee;
    /* align-items: stretch (默认) 使得项目高度一致 */
}
.column:last-child {
    border-right: none;
}
</style>`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h5 className="font-semibold">3. 导航栏</h5>
                            <p>创建响应式的导航栏，项目可以平均分布或靠边对齐。</p>
                            <ExpandableCode language="html" maxHeight={200}>
{`<nav class="flex-nav">
    <a href="#" class="nav-item logo">Logo</a>
    <a href="#" class="nav-item">首页</a>
    <a href="#" class="nav-item">产品</a>
    <a href="#" class="nav-item">关于我们</a>
    <a href="#" class="nav-item push-right">登录</a>
</nav>

<style>
.flex-nav {
    display: flex;
    background-color: #333;
    padding: 0 10px;
    align-items: center; /* 垂直居中导航项 */
}
.nav-item {
    color: white;
    padding: 15px 20px;
    text-decoration: none;
}
.nav-item:hover {
    background-color: #555;
}
.logo {
    font-weight: bold;
    font-size: 1.2em;
}
.push-right {
    margin-left: auto; /* 将此项推到最右边 */
}
</style>`}
                            </ExpandableCode>
                        </div>
                         <div>
                            <h5 className="font-semibold">4. 卡片布局</h5>
                            <p>使用 Flexbox 创建灵活的卡片网格布局。</p>
                            <ExpandableCode language="html" maxHeight={250}>
{`<div class="card-container">
    <div class="card">卡片1</div>
    <div class="card">卡片2 内容多一点</div>
    <div class="card">卡片3</div>
    <div class="card">卡片4</div>
    <div class="card">卡片5</div>
</div>

<style>
.card-container {
    display: flex;
    flex-wrap: wrap; /* 允许卡片换行 */
    gap: 16px; /* 项目之间的间距 */
    padding: 16px;
    background-color: #f9f9f9;
}
.card {
    flex: 1 1 200px; /* flex-grow, flex-shrink, flex-basis (最小宽度200px) */
    background-color: white;
    border: 1px solid #ddd;
    padding: 20px;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
    /* 为了美观，可以添加 min-height 或让内容决定高度 */
}
</style>`}
                            </ExpandableCode>
                        </div>
                    </div>
                </InfoCard>

                <WarningCard title="注意事项与兼容性">
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>浏览器兼容性：</strong>现代浏览器对 Flexbox 支持良好。对于非常老的浏览器 (如 IE9 及以下)，Flexbox 不被支持。IE10 和 IE11 支持旧版本的 Flexbox 规范，可能需要特定的前缀 (<code>-ms-</code>)，但主流开发已基本不考虑。</li>
                        <li><strong><code>gap</code> 属性：</strong><code>gap</code>, <code>row-gap</code>, <code>column-gap</code> 用于控制项目之间的间距，非常方便。早期它主要用于 Grid 布局，但现在已广泛支持 Flexbox。检查目标浏览器的兼容性，如果需要支持旧版浏览器，可能仍需使用 margin。</li>
                        <li><strong>Flex 项目的百分比高度：</strong>当 Flex 项目的父容器没有固定高度时，其百分比高度可能不会如预期工作。确保 Flex 容器自身的高度是确定的。</li>
                        <li><strong><code>flex-basis</code> 与 <code>width</code>/<code>height</code>：</strong>当 <code>flex-direction</code> 是 <code>row</code> 时，<code>flex-basis</code> 控制宽度；当是 <code>column</code> 时，控制高度。它与 <code>width</code> 或 <code>height</code> 属性同时存在时，<code>flex-basis</code> 优先级更高。</li>
                        <li><strong>隐式最小尺寸：</strong>Flex 项目默认不会收缩到其最小内容尺寸以下 (<code>min-width: auto</code> 或 <code>min-height: auto</code>)。有时需要设置 <code>min-width: 0</code> 或 <code>min-height: 0</code> 来允许项目完全收缩。</li>
                        <li><strong>性能：</strong>过度复杂的 Flexbox 嵌套可能会影响渲染性能，尤其是在大型应用中。尽量保持布局结构简洁。</li>
                    </ul>
                </WarningCard>
            </div>
        </QuestionCard>
    );
}