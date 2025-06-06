import { 
    FrontJavaScriptNullUndefinedUndeclared,
    FrontJavaScriptEqualityComparison,
    FrontJavaScriptVarLetConst,
    FrontJavaScriptThisKeyword,
    FrontJavaScriptClosures
} from "../../../../components/knowledge/front/javascript";

/**
 * # JavaScript 核心概念
 * 掌握 JavaScript 语言核心概念和高频面试知识点
 */
export function JavaScriptFundamentals() {

    return (
        <div className="container mx-auto max-w-6xl">
            {/* 页面标题 */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-primary mb-3">JavaScript 核心概念</h1>
                <p className="text-base-content/70">
                    掌握 JavaScript 语言核心概念和高频面试知识点
                </p>
            </div>

            {/* 题目列表 */}
            <div className="space-y-6">
                <FrontJavaScriptNullUndefinedUndeclared id="js-fundamentals-1" />
                <FrontJavaScriptEqualityComparison id="js-fundamentals-2" />
                <FrontJavaScriptVarLetConst id="js-fundamentals-3" />
                <FrontJavaScriptThisKeyword id="js-fundamentals-4" />
                <FrontJavaScriptClosures id="js-fundamentals-5" />
            </div>
        </div>
    );
} 