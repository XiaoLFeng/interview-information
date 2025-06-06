import { 
    FrontTypeScriptBasicTypes,
    FrontTypeScriptAdvancedTypes,
    FrontTypeScriptGenerics,
    FrontTypeScriptUtilityTypes,
    FrontTypeScriptModules
} from "../../../../components/knowledge/front/typescript";

/**
 * # TypeScript 核心概念
 * 掌握 TypeScript 类型系统和高频面试知识点
 */
export function TypeScriptFundamentals() {

    return (
        <div className="container mx-auto max-w-6xl">
            {/* 页面标题 */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-primary mb-3">TypeScript 核心概念</h1>
                <p className="text-base-content/70">
                    掌握 TypeScript 类型系统和高频面试知识点
                </p>
            </div>

            {/* 题目列表 */}
            <div className="space-y-6">
                <FrontTypeScriptBasicTypes id="ts-fundamentals-1" />
                <FrontTypeScriptAdvancedTypes id="ts-fundamentals-2" />
                <FrontTypeScriptGenerics id="ts-fundamentals-3" />
                <FrontTypeScriptUtilityTypes id="ts-fundamentals-4" />
                <FrontTypeScriptModules id="ts-fundamentals-5" />
            </div>
        </div>
    );
} 