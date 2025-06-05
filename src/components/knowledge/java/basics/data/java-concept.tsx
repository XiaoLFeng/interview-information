import { QuestionCard } from "../../../../base/knowledge_question_card"

/**
 * # 什么是 Java
 * Java 是一种面向对象的编程语言，具有跨平台性、安全性、多线程等特点。
 * 
 * @returns 
 */
export function JavaBasicsWhatIsJava({ id }: { id: string }) {
    return (
        <QuestionCard key={id} question={{
            id,
            title: "什么是 Java？",
            category: "Java 基础",
            content: "请解释 Java 的基本概念，以及 Java 的特点。",
            tags: ["Java", "基础概念", "特点"]
        }}>
            <div className="space-y-2 grid">
                <span>Java 是一种面向对象的编程语言，具有跨平台性、安全性、多线程等特点。</span>
                <span>Java 的三大特点：</span>
                <span>1. 跨平台性：Java 可以在不同的操作系统上运行，只需要安装 JVM（Java 虚拟机）</span>
                <span>2. 安全性：Java 提供了强大的安全机制，可以防止恶意代码的执行</span>
                <span>3. 多线程：Java 支持多线程编程，可以提高程序的性能</span>
            </div>
        </QuestionCard>
    )
} 