import { 
    FrontCSSSelectors,
    FrontCSSLayoutBasics,
    FrontCSSFlexbox,
    FrontCSSGrid,
    FrontCSSResponsive
} from "../../../../components/knowledge/front/css";

/**
 * # CSS 核心概念
 * 掌握 CSS 样式设计和布局技术
 */
export function CSSFundamentals() {

    return (
        <div className="container mx-auto max-w-6xl">
            {/* 页面标题 */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-primary mb-3">CSS 核心概念</h1>
                <p className="text-base-content/70">
                    掌握 CSS 样式设计和布局技术
                </p>
            </div>

            {/* 题目列表 */}
            <div className="space-y-6">
                <FrontCSSSelectors id="css-fundamentals-1" />
                <FrontCSSLayoutBasics id="css-fundamentals-2" />
                <FrontCSSFlexbox id="css-fundamentals-3" />
                <FrontCSSGrid id="css-fundamentals-4" />
                <FrontCSSResponsive id="css-fundamentals-5" />
            </div>
        </div>
    );
} 