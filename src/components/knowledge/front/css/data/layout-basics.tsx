import { QuestionCard } from "../../../../base/knowledge_question_card";
import { InfoCard } from "../../../../card/info_card";
import { SuccessCard } from "../../../../card/success_card";
import { SecondaryCard } from "../../../../card/secondary_card";
import { ExpandableCode } from "../../../../base/expandable_code";

interface Props {
    id: string;
}

export function FrontCSSLayoutBasics({ id }: Props) {
    return (
        <QuestionCard
            question={{
                id,
                title: "CSS 基础布局概念",
                category: "CSS",
                content: "CSS 中的盒模型、定位、浮动以及层叠上下文等基础布局概念是什么？",
                tags: ["CSS", "布局", "盒模型", "定位", "浮动", "层叠上下文"]
            }}
        >
            <div className="space-y-6">
                <SuccessCard title="核心概要">
                    <p>在掌握现代 CSS 布局技术如 Flexbox 和 Grid 之前，理解一些基础的布局概念至关重要。这些概念包括盒模型、元素的定位方式、浮动机制以及层叠上下文等。它们是构成 CSS 布局的基石，影响着元素在页面上的显示、大小和相互作用。</p>
                </SuccessCard>

                <SecondaryCard title="盒模型 (Box Model)">
                    <p>CSS 盒模型描述了 HTML 元素如何被渲染成一个矩形盒子。这个盒子由四个区域组成：内容 (content)、内边距 (padding)、边框 (border) 和外边距 (margin)。</p>
                    <div className="text-center my-4">
                        <p className="font-mono">
                            +-------------------------------------+<br />
                            | Margin                              |<br />
                            |   +-------------------------------+ |<br />
                            |   | Border                          | |<br />
                            |   |   +-------------------------+ | |<br />
                            |   |   | Padding                 | | |<br />
                            |   |   |   +-------------------+ | | |<br />
                            |   |   |   | Content           | | | |<br />
                            |   |   |   +-------------------+ | | |<br />
                            |   |   +-------------------------+ | |<br />
                            |   +-------------------------------+ |<br />
                            +-------------------------------------+
                        </p>
                    </div>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Content:</strong> 盒子的内容区域，显示文本、图片等。由 <code>width</code> 和 <code>height</code> 属性定义。</li>
                        <li><strong>Padding:</strong> 内容区域与边框之间的空白区域。由 <code>padding-top</code>, <code>padding-right</code>, <code>padding-bottom</code>, <code>padding-left</code> 或简写属性 <code>padding</code> 控制。</li>
                        <li><strong>Border:</strong> 包围内边距和内容的边框。由 <code>border-width</code>, <code>border-style</code>, <code>border-color</code> 或简写属性 <code>border</code> 控制。</li>
                        <li><strong>Margin:</strong> 边框以外的空白区域，用于元素与其他元素之间的间距。由 <code>margin-top</code>, <code>margin-right</code>, <code>margin-bottom</code>, <code>margin-left</code> 或简写属性 <code>margin</code> 控制。外边距可以合并 (margin collapsing)。</li>
                    </ul>
                    <h4 className="font-semibold mt-3"><code>box-sizing</code></h4>
                    <p><code>box-sizing</code> 属性定义了 <code>width</code> 和 <code>height</code> 属性如何计算元素的实际宽度和高度。</p>
                    <ul className="list-disc pl-5">
                        <li><code>content-box</code> (默认): <code>width</code> 和 <code>height</code> 只包括内容区域的大小。Padding 和 Border 会额外增加元素的总尺寸。</li>
                        <li><code>border-box</code>: <code>width</code> 和 <code>height</code> 包括内容、内边距和边框。这通常使得布局更容易控制，因为元素的指定宽度/高度就是其视觉上的宽度/高度。</li>
                    </ul>
                    <ExpandableCode language="css" maxHeight={120}>
{`.element {
    width: 200px;
    height: 100px;
    padding: 10px;
    border: 5px solid black;
    margin: 15px;
    box-sizing: border-box; /* 推荐的做法 */
}
/*
如果 box-sizing: content-box;
实际宽度 = 200 (width) + 2*10 (padding) + 2*5 (border) = 230px
如果 box-sizing: border-box;
实际宽度 = 200px (width 包含了 padding 和 border)
*/`}
                    </ExpandableCode>
                </SecondaryCard>

                <SecondaryCard title="定位 (Positioning)">
                    <p><code>position</code> 属性用于指定元素的定位类型。配合 <code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code> 和 <code>z-index</code> 属性可以精确控制元素的位置。</p>
                    <div className="space-y-3">
                        <div>
                            <h5 className="font-semibold"><code>static</code></h5>
                            <p>默认值。元素按照正常的文档流排列，<code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code>, <code>z-index</code> 属性无效。</p>
                        </div>
                        <div>
                            <h5 className="font-semibold"><code>relative</code></h5>
                            <p>元素相对于其正常文档流位置进行定位，但其原始空间仍然保留。可以使用 <code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code> 调整位置。它会创建一个新的层叠上下文。</p>
                            <ExpandableCode language="css" maxHeight={80}>
{`.relative-item {
    position: relative;
    top: 10px;
    left: 20px;
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h5 className="font-semibold"><code>absolute</code></h5>
                            <p>元素相对于其最近的<strong>已定位的祖先元素</strong>（即 <code>position</code> 非 <code>static</code> 的祖先）进行定位。如果不存在已定位的祖先，则相对于初始包含块（通常是 <code>&lt;body&gt;</code>）。绝对定位的元素会脱离正常的文档流，不占据空间。它会创建一个新的层叠上下文。</p>
                            <ExpandableCode language="css" maxHeight={100}>
{`.container {
    position: relative; /* 为 absolute-item 提供定位上下文 */
}
.absolute-item {
    position: absolute;
    top: 0;
    right: 0;
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h5 className="font-semibold"><code>fixed</code></h5>
                            <p>元素相对于浏览器视口（viewport）进行定位，即使页面滚动，它也会固定在相同的位置。它会脱离正常的文档流，并创建一个新的层叠上下文。</p>
                            <ExpandableCode language="css" maxHeight={80}>
{`.fixed-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #333;
    color: white;
    z-index: 1000; /* 确保在顶层 */
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h5 className="font-semibold"><code>sticky</code></h5>
                            <p>粘性定位是相对定位和固定定位的混合。元素在跨越特定阈值前为相对定位，之后为固定定位。需要指定至少一个 <code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code>。它也会创建一个新的层叠上下文。</p>
                            <ExpandableCode language="css" maxHeight={80}>
{`.sticky-sidebar {
    position: sticky;
    top: 20px; /* 当滚动到距离视口顶部20px时变为固定 */
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h5 className="font-semibold"><code>z-index</code></h5>
                            <p><code>z-index</code> 属性指定了已定位元素（及其子元素）的堆叠顺序。具有较大 <code>z-index</code> 值的元素会覆盖较小值的元素。<code>z-index</code> 只在已定位元素（<code>position</code> 非 <code>static</code>）上有效，并且在同一层叠上下文中比较。</p>
                        </div>
                    </div>
                </SecondaryCard>

                <SecondaryCard title="浮动 (Floats)">
                    <p><code>float</code> 属性使元素脱离正常的文档流，并向左或向右移动，直到它的外边缘碰到包含块或另一个浮动框的边框为止。文本和内联元素会环绕浮动元素。</p>
                    <ul className="list-disc pl-5">
                        <li><code>float: left;</code>: 元素向左浮动。</li>
                        <li><code>float: right;</code>: 元素向右浮动。</li>
                        <li><code>float: none;</code> (默认): 元素不浮动。</li>
                    </ul>
                    <h4 className="font-semibold mt-3">清除浮动 (Clearing Floats)</h4>
                    <p>当容器内所有子元素都浮动时，容器的高度可能会塌陷为零。为了解决这个问题，需要清除浮动。<code>clear</code> 属性指定一个元素是否必须移动到浮动元素下方。</p>
                    <ul className="list-disc pl-5">
                        <li><code>clear: left;</code>: 清除左浮动。</li>
                        <li><code>clear: right;</code>: 清除右浮动。</li>
                        <li><code>clear: both;</code>: 清除左右两侧的浮动。</li>
                    </ul>
                    <p>历史上，“clearfix hack” 是一种常用的清除浮动的技术，通过在父容器上使用伪元素实现。现代布局中，可以通过设置父容器的 <code>overflow</code> (如 <code>overflow: auto</code> 或 <code>overflow: hidden</code>，不推荐) 或使用 Flexbox/Grid 容器来自然地包含浮动元素（尽管浮动在其内部的行为可能不是你想要的）。</p>
                    <h4 className="font-semibold mt-3">用途与现状</h4>
                    <p>浮动最初设计用于实现文本环绕图片的效果。虽然它曾被广泛用于页面整体布局，但由于其复杂性和副作用（如高度塌陷），现在更推荐使用 Flexbox 和 Grid 进行布局。浮动仍然适用于其原始目的，如文本环绕。</p>
                    <ExpandableCode language="css" maxHeight={150}>
{`.image-left {
    float: left;
    margin-right: 15px;
}
.text-content {
    /* 文本将环绕 .image-left */
}
.clearfix::after { /* 经典的 clearfix hack */
    content: "";
    display: table;
    clear: both;
}
.container-with-floats {
    /* 使用 clearfix hack */
    /* zoom: 1;  针对旧版IE的另一个hack */
}`}
                    </ExpandableCode>
                </SecondaryCard>

                <SecondaryCard title="层叠上下文 (Stacking Contexts)">
                    <p>层叠上下文是 HTML 元素的三维概念，其中元素在假想的 Z 轴上（垂直于屏幕）堆叠。当元素形成层叠上下文后，其后代元素的 <code>z-index</code> 值仅在该上下文中进行比较和排序。</p>
                    <h4 className="font-semibold mt-3">创建层叠上下文的条件 (部分列举):</h4>
                    <ul className="list-disc pl-5">
                        <li>文档的根元素 (<code>&lt;html&gt;</code>)。</li>
                        <li><code>position</code> 值为 <code>absolute</code> 或 <code>relative</code> 且 <code>z-index</code> 值不为 <code>auto</code> 的元素。</li>
                        <li><code>position</code> 值为 <code>fixed</code> 或 <code>sticky</code> 的元素。</li>
                        <li><code>opacity</code> 属性值小于 1 的元素。</li>
                        <li><code>transform</code>, <code>filter</code>, <code>perspective</code>, <code>clip-path</code>, <code>mask</code> 属性值不为 <code>none</code> 的元素。</li>
                        <li><code>flex</code> 容器的子项，且 <code>z-index</code> 值不为 <code>auto</code>。</li>
                        <li><code>grid</code> 容器的子项，且 <code>z-index</code> 值不为 <code>auto</code>。</li>
                    </ul>
                    <h4 className="font-semibold mt-3"><code>z-index</code> 的作用</h4>
                    <p><code>z-index</code> 决定了在同一层叠上下文中，元素如何堆叠。具有较高 <code>z-index</code> 的元素会显示在具有较低 <code>z-index</code> 的元素之上。如果两个元素的 <code>z-index</code> 相同，则它们按照在 HTML 中出现的顺序堆叠（后面的覆盖前面的）。</p>
                    <p>重要的是，不同层叠上下文之间的堆叠顺序由创建这些上下文的元素的 <code>z-index</code> (如果适用) 和它们在 DOM 中的顺序决定。子层叠上下文中的 <code>z-index</code> 值不能与父层叠上下文或兄弟层叠上下文中的 <code>z-index</code> 值直接比较。</p>
                    <ExpandableCode language="html" maxHeight={200}>
{`<!-- 示例 -->
<div style="position: relative; z-index: 1; background: lightblue; padding: 20px;">
  Div A (z-index: 1)
  <div style="position: absolute; top: 10px; left: 10px; z-index: 100; background: lightcoral; padding: 10px;">
    Div A1 (z-index: 100, 但在 Div A 的上下文中)
  </div>
</div>
<div style="position: relative; z-index: 2; background: lightgreen; padding: 20px; margin-top: -30px;">
  Div B (z-index: 2)
  <div style="position: absolute; top: 10px; left: 10px; z-index: 50; background: lightyellow; padding: 10px;">
    Div B1 (z-index: 50, 但在 Div B 的上下文中)
  </div>
</div>
<!-- Div B (和其子元素 B1) 会覆盖 Div A (和其子元素 A1)，因为 Div B 的 z-index 更高 -->
<!-- Div A1 的 z-index: 100 只在 Div A 内部有意义，不会使其覆盖 Div B -->`}
                    </ExpandableCode>
                </SecondaryCard>

                <InfoCard title="其他布局相关属性">
                    <div className="space-y-3">
                        <div>
                            <h5 className="font-semibold"><code>display</code> 属性</h5>
                            <p><code>display</code> 属性是 CSS 中最基本的属性之一，它定义了元素应生成的框的类型。</p>
                            <ul className="list-disc pl-5">
                                <li><code>block</code>: 元素生成一个块级框，前后带有换行符，占据其父容器的整个宽度（除非另有指定）。例如 <code>&lt;div&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;h1&gt;</code>。</li>
                                <li><code>inline</code>: 元素生成一个或多个行内框，不强制换行，宽度随内容而定。例如 <code>&lt;span&gt;</code>, <code>&lt;a&gt;</code>, <code>&lt;img&gt;</code>。<code>width</code> 和 <code>height</code> 属性对其无效。</li>
                                <li><code>inline-block</code>: 元素生成一个块级框，但整个框像行内框一样可以与其他行内内容排在一行。可以设置 <code>width</code>, <code>height</code>, <code>margin</code> (上下), <code>padding</code>。</li>
                                <li><code>none</code>: 元素不会被显示，并且不占据任何空间（如同它不存在于文档中一样）。</li>
                                <li>其他值如 <code>flex</code>, <code>grid</code>, <code>table</code> 等会创建特定的布局上下文。</li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-semibold"><code>overflow</code> 属性</h5>
                            <p><code>overflow</code> 属性指定当内容溢出一个元素的块级容器时如何处理。</p>
                            <ul className="list-disc pl-5">
                                <li><code>visible</code> (默认): 内容不会被修剪，会呈现在元素框之外。</li>
                                <li><code>hidden</code>: 内容会被修剪，并且其余内容不可见。</li>
                                <li><code>scroll</code>: 内容会被修剪，但浏览器会显示滚动条以便查看其余内容（无论内容是否实际溢出都会显示滚动条）。</li>
                                <li><code>auto</code>: 如果内容溢出，则浏览器会显示滚动条；否则，内容正常显示。</li>
                                <li><code>overflow-x</code> 和 <code>overflow-y</code> 可以分别控制水平和垂直方向的溢出。</li>
                            </ul>
                        </div>
                    </div>
                </InfoCard>
            </div>
        </QuestionCard>
    );
}