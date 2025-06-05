import { JavaBasicsWhatIsJava, JavaBasicsWhatIsOOP } from "../../../../components/knowledge/java/data_basics";

/**
 * # Java 基础
 * 掌握 Java 基础语法、面向对象、异常处理等核心概念
 */
export function JavaBasics() {

    return (
        <div className="container mx-auto max-w-6xl">
            {/* 页面标题 */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-primary mb-3">Java 基础</h1>
                <p className="text-base-content/70">
                    掌握 Java 基础语法、面向对象、异常处理等核心概念
                </p>
            </div>

            {/* 题目列表 */}
            <div className="space-y-6">
                <JavaBasicsWhatIsOOP id="java-basics-1" />
                <JavaBasicsWhatIsJava id="java-basics-2" />
            </div>
        </div>
    );
} 