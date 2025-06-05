import { QuestionCard } from "../../base/knowledge_question_card"

/**
 * # 什么是面向对象编程
 * 面向对象编程（OOP）是一种编程范式，将数据和操作数据的方法封装在对象中。
 * 三大特性：
 * 1. 封装：将数据和方法包装在类中，隐藏内部实现细节
 * 2. 继承：子类可以继承父类的属性和方法，实现代码复用
 * 3. 多态：同一个接口可以有多种不同的实现方式
 * 优势：代码复用性高、可维护性强、结构清晰
 * 
 * @returns 
 */
function JavaBasicsWhatIsOOP({ id }: { id: string }) {
    return (
        <QuestionCard key={id} question={{
            id,
            title: "什么是面向对象编程？",
            category: "面向对象",
            content: "请解释面向对象编程的基本概念，以及封装、继承、多态的含义。",
            tags: ["面向对象", "基础概念", "封装", "继承", "多态"]
        }}>
                <span>面向对象编程（OOP）是一种编程范式，将数据和操作数据的方法封装在对象中。</span>
                <span>三大特性：</span>
                <span>1. 封装：将数据和方法包装在类中，隐藏内部实现细节</span>
                <span>2. 继承：子类可以继承父类的属性和方法，实现代码复用</span>
                <span>3. 多态：同一个接口可以有多种不同的实现方式</span>
                <span>优势：代码复用性高、可维护性强、结构清晰</span>
        </QuestionCard>
    )
}

/**
 * # 什么是 Java
 * Java 是一种面向对象的编程语言，具有跨平台性、安全性、多线程等特点。
 * 
 * @returns 
 */
function JavaBasicsWhatIsJava({ id }: { id: string }) {
    return (
        <QuestionCard key={id} question={{
            id,
            title: "什么是 Java？",
            category: "Java 基础",
            content: "请解释 Java 的基本概念，以及 Java 的特点。",
            tags: ["Java", "基础概念", "特点"]
        }}>
            <span>Java 是一种面向对象的编程语言，具有跨平台性、安全性、多线程等特点。</span>
            <span>Java 的三大特点：</span>
            <span>1. 跨平台性：Java 可以在不同的操作系统上运行，只需要安装 JVM（Java 虚拟机）</span>
            <span>2. 安全性：Java 提供了强大的安全机制，可以防止恶意代码的执行</span>
            <span>3. 多线程：Java 支持多线程编程，可以提高程序的性能</span>
        </QuestionCard>
    )
}

export { JavaBasicsWhatIsOOP, JavaBasicsWhatIsJava }