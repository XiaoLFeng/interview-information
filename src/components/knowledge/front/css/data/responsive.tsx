import { QuestionCard } from "../../../../base/knowledge_question_card";
import { InfoCard } from "../../../../card/info_card";
import { WarningCard } from "../../../../card/warning_card";
import { SuccessCard } from "../../../../card/success_card";
import { SecondaryCard } from "../../../../card/secondary_card";
import { ExpandableCode } from "../../../../base/expandable_code";

interface Props {
    id: string;
}

export function FrontCSSResponsive({ id }: Props) {
    return (
        <QuestionCard
            question={{
                id,
                title: "CSS 响应式设计",
                category: "CSS",
                content: "什么是响应式网页设计？实现响应式布局的核心技术有哪些，例如媒体查询、流式布局和弹性图片？",
                tags: ["CSS", "响应式设计", "媒体查询", "流式布局", "弹性图片", "RWD"]
            }}
        >
            <div className="space-y-6">
                <SuccessCard title="核心理念">
                    <p><strong>响应式网页设计 (Responsive Web Design, RWD)</strong> 的目标是使网站能够根据用户正在使用的设备特性（如屏幕尺寸、分辨率、方向等）自动调整其布局和内容，从而在各种设备（桌面电脑、平板电脑、智能手机）上都能提供<strong>最佳的查看和交互体验</strong>。</p>
                    <p>这个概念最初由 Ethan Marcotte 提出，其核心思想主要基于三个技术支柱：</p>
                    <ul className="list-disc pl-5">
                        <li><strong>流式网格 (Fluid Grids):</strong> 使用相对单位（如百分比）来定义网格布局，使其能够灵活适应不同屏幕宽度。</li>
                        <li><strong>弹性图片/媒体 (Flexible Images/Media):</strong> 使图片和媒体内容也能在不同尺寸的容器中自适应缩放。</li>
                        <li><strong>媒体查询 (Media Queries):</strong> CSS3 的一个模块，允许开发者根据设备的特定特性（如视口宽度）应用不同的样式规则。</li>
                    </ul>
                </SuccessCard>

                <SecondaryCard title="媒体查询 (Media Queries)">
                    <p>媒体查询是实现响应式设计的核心技术。它允许我们根据设备的特定条件（媒体特性）应用不同的 CSS 样式。</p>
                    <h4 className="font-semibold mt-3">基本语法</h4>
                    <p><code>@media [media-type] (media-feature-rule) { /* CSS 规则 */ }</code></p>
                    <ul className="list-disc pl-5">
                        <li><strong><code>@media</code>:</strong> 声明一个媒体查询块。</li>
                        <li><strong>媒体类型 (Media Types):</strong> 可选，指定设备类型。常见值：
                            <ul className="list-disc pl-5">
                                <li><code>all</code>: 适用于所有设备 (默认值)。</li>
                                <li><code>screen</code>: 适用于彩色电脑屏幕。</li>
                                <li><code>print</code>: 适用于打印预览模式或打印机。</li>
                                {/* <li><code>speech</code>: 适用于屏幕阅读器等。</li> */}
                            </ul>
                        </li>
                        <li><strong>媒体特性规则 (Media Feature Rules):</strong> 描述设备的具体特性，如 <code>min-width</code>, <code>max-width</code>, <code>min-height</code>, <code>max-height</code>, <code>orientation</code> (<code>portrait</code> | <code>landscape</code>), <code>aspect-ratio</code>, <code>resolution</code> 等。</li>
                        <li><strong>逻辑操作符:</strong>
                            <ul className="list-disc pl-5">
                                <li><code>and</code>: 连接多个媒体特性规则，必须都满足。</li>
                                <li><code>not</code>: 对整个媒体查询取反 (较少用)。</li>
                                <li><code>,</code> (逗号): 相当于 <code>or</code>，满足任一查询即可。</li>
                            </ul>
                        </li>
                    </ul>
                    <ExpandableCode language="css" maxHeight={180}>
{`/* 当视口宽度小于等于 600px 时应用 */
@media screen and (max-width: 600px) {
    body {
        font-size: 14px;
    }
    .sidebar {
        display: none;
    }
}

/* 当视口宽度在 601px 到 900px 之间时应用 */
@media (min-width: 601px) and (max-width: 900px) {
    .main-content {
        width: 70%;
    }
}

/* 针对打印样式 */
@media print {
    nav, footer { display: none; }
    body { color: black; background: white; }
}`}
                    </ExpandableCode>
                    <h4 className="font-semibold mt-3">Viewport Meta 标签</h4>
                    <p>为了确保在移动设备上正确缩放和渲染，需要在 HTML 的 <code>&lt;head&gt;</code> 中添加 viewport meta 标签：</p>
                    <ExpandableCode language="html" maxHeight={80}>
{`<meta name="viewport" content="width=device-width, initial-scale=1.0">`}
                    </ExpandableCode>
                    <ul className="list-disc pl-5 text-sm">
                        <li><code>width=device-width</code>: 设置视口的宽度等于设备的屏幕宽度。</li>
                        <li><code>initial-scale=1.0</code>: 设置初始缩放级别为 1。</li>
                    </ul>
                    <h4 className="font-semibold mt-3">常用断点 (Breakpoints) 示例</h4>
                    <p className="text-sm">断点是媒体查询中用于区分不同设备尺寸的阈值。选择合适的断点取决于具体设计和内容。以下是一些常见的参考值：</p>
                    <ul className="list-disc pl-5 text-sm">
                        <li><strong>小型设备 (手机):</strong> <code>max-width: 600px</code> 或 <code>max-width: 767px</code></li>
                        <li><strong>中型设备 (平板电脑):</strong> <code>min-width: 601px</code> and <code>max-width: 992px</code> (或类似范围)</li>
                        <li><strong>大型设备 (桌面):</strong> <code>min-width: 993px</code> (或类似范围)</li>
                    </ul>
                    <p className="text-sm">更推荐基于内容本身来确定断点，而不是针对特定设备。</p>
                </SecondaryCard>

                <SecondaryCard title="流式布局与弹性单位 (Fluid Layouts & Flexible Units)">
                    <p>流式布局是指网页元素的尺寸使用相对单位（如百分比）而不是固定单位（如像素），使得布局能够随视口大小变化而平滑地调整。</p>
                    <h4 className="font-semibold mt-3">百分比 (%)</h4>
                    <p>将元素的宽度、外边距、内边距等设置为百分比，使其相对于其父容器的相应尺寸进行缩放。</p>
                    <ExpandableCode language="css" maxHeight={100}>
{`.container {
    width: 100%;
}
.column {
    width: 50%; /* 占据父容器宽度的一半 */
    float: left; /* (传统方式，Flexbox/Grid 更佳) */
    padding: 2%;
}`}
                    </ExpandableCode>
                    <h4 className="font-semibold mt-3">相对单位</h4>
                    <ul className="list-disc pl-5">
                        <li><strong><code>em</code>:</strong> 相对于当前元素的字体大小。如果用于 <code>font-size</code>，则相对于父元素的字体大小。</li>
                        <li><strong><code>rem</code> (root em):</strong> 相对于根元素 (<code>&lt;html&gt;</code>) 的字体大小。这使得可以更容易地通过改变根字体大小来全局缩放元素。</li>
                        <li><strong><code>vw</code> (viewport width):</strong> 相对于视口宽度的 1%。<code>10vw</code> 等于视口宽度的 10%。</li>
                        <li><strong><code>vh</code> (viewport height):</strong> 相对于视口高度的 1%。</li>
                        <li><strong><code>vmin</code>:</strong> <code>vw</code> 和 <code>vh</code> 中较小的值。</li>
                        <li><strong><code>vmax</code>:</strong> <code>vw</code> 和 <code>vh</code> 中较大的值。</li>
                    </ul>
                    <p>使用这些单位可以创建真正流动的、可伸缩的布局和文本。</p>
                    <ExpandableCode language="css" maxHeight={120}>
{`html {
    font-size: 16px; /* rem 的基准 */
}
body {
    font-size: 1rem; /* 等于 16px */
}
h1 {
    font-size: 2.5rem; /* 2.5 * 16px = 40px */
    margin-bottom: 1em; /* 等于 h1 当前字体大小的 1 倍 */
}
.hero-banner {
    width: 100vw; /* 占满整个视口宽度 */
    height: 50vh; /* 占视口高度的一半 */
}`}
                    </ExpandableCode>
                </SecondaryCard>

                <SecondaryCard title="弹性图片与媒体 (Flexible Images & Media)">
                    <p>确保图片、视频和其他媒体内容能够在其容器内自适应缩放，防止溢出或显示不当。</p>
                    <h4 className="font-semibold mt-3">基本弹性图片</h4>
                    <p>最简单的方法是为图片设置 <code>max-width: 100%;</code> 和 <code>height: auto;</code>。这样图片最大不会超过其容器宽度，并且高度会按比例自动调整。</p>
                    <ExpandableCode language="css" maxHeight={80}>
{`img, video, iframe {
    max-width: 100%;
    height: auto;
}`}
                    </ExpandableCode>
                    <h4 className="font-semibold mt-3">使用 <code>&lt;picture&gt;</code> 元素或 <code>srcset</code> 属性</h4>
                    <p>为了在不同屏幕尺寸和分辨率下提供最优化的图片（例如，为高分屏提供更高清的图片，为小屏设备提供较小的图片以节省带宽），可以使用 <code>&lt;picture&gt;</code> 元素或 <code>&lt;img&gt;</code> 标签的 <code>srcset</code> 和 <code>sizes</code> 属性。</p>
                    <ExpandableCode language="html" maxHeight={200}>
{`<!-- 使用 <picture> 元素 -->
<picture>
  <source media="(min-width: 800px)" srcset="large-image.jpg">
  <source media="(min-width: 480px)" srcset="medium-image.jpg">
  <img src="small-image.jpg" alt="A responsive image">
</picture>

<!-- 使用 srcset 和 sizes 属性 -->
<img src="small.jpg"
     srcset="medium.jpg 1000w, large.jpg 2000w"
     sizes="(min-width: 60em) 25vw, (min-width: 40em) 50vw, 100vw"
     alt="Another responsive image">
`}
                    </ExpandableCode>
                    <h4 className="font-semibold mt-3">响应式视频/iframe (宽高比技巧)</h4>
                    <p>对于具有固定宽高比的嵌入式内容（如 YouTube 视频），可以利用 CSS 的 "padding-bottom hack" 来维持其宽高比，使其响应式缩放。</p>
                    <ExpandableCode language="html" maxHeight={180}>
{`<!-- HTML -->
<div class="video-container">
  <iframe src="https://www.youtube.com/embed/your-video-id"
          frameborder="0"
          allowfullscreen></iframe>
</div>

<!-- CSS -->
<style>
.video-container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio (9 / 16 = 0.5625) */
    height: 0;
    overflow: hidden;
}
.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>`}
                    </ExpandableCode>
                </SecondaryCard>

                <InfoCard title="响应式设计策略与模式">
                    <div className="space-y-3">
                        <div>
                            <h5 className="font-semibold">移动优先 (Mobile-First) vs. 桌面优先 (Desktop-First)</h5>
                            <ul className="list-disc pl-5">
                                <li><strong>移动优先:</strong> 首先为小型设备设计和开发核心功能和样式，然后使用媒体查询逐步增强大屏幕版本的体验。这种方法通常能带来更简洁、性能更好的移动体验。</li>
                                <li><strong>桌面优先:</strong> 首先为桌面大屏幕设计，然后通过媒体查询逐步删减或调整布局以适应小屏幕。这种方法在历史上更常见，但现在移动优先被认为是更佳实践。</li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-semibold">常见响应式布局模式</h5>
                            <p>有一些经过验证的模式可以帮助组织和调整不同屏幕尺寸下的内容：</p>
                            <ul className="list-disc pl-5">
                                <li><strong>Mostly Fluid (大部分流式):</strong> 主要依赖流式网格，在大屏幕上可能会有最大宽度限制。在小屏幕上，列可能会堆叠。</li>
                                <li><strong>Column Drop (列下沉):</strong> 当屏幕空间不足时，多列布局中的列会逐个下沉并堆叠。</li>
                                <li><strong>Layout Shifter (布局切换):</strong> 内容块在不同断点下会显著改变其排列方式和位置，而不仅仅是简单的堆叠。</li>
                                <li><strong>Off-Canvas (画布外导航):</strong> 对于复杂的导航菜单，在小屏幕上将其隐藏在屏幕外，通过点击按钮滑出。</li>
                                {/* <li><strong>Tiny Tweaks (微小调整):</strong> 针对特定断点对字体大小、边距、内边距等进行细微调整。</li> */}
                            </ul>
                            <p className="text-sm">选择哪种模式取决于具体的内容和设计需求。</p>
                        </div>
                        <div>
                            <h5 className="font-semibold">测试的重要性</h5>
                            <p>在多种真实设备和浏览器上测试响应式设计至关重要。浏览器开发工具中的设备模拟器是一个很好的起点，但不能完全替代真实设备测试，尤其是在交互和性能方面。</p>
                        </div>
                    </div>
                </InfoCard>
            </div>
        </QuestionCard>
    );
}