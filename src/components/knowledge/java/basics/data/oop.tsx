import { QuestionCard } from "../../../../base/knowledge_question_card"
import { WarningCard } from "../../../../card/warning_card"

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
export function JavaBasicsWhatIsOOP({ id }: { id: string }) {
    return (
        <QuestionCard key={id} question={{
            id,
            title: "什么是面向对象编程？",
            category: "面向对象",
            content: "请解释面向对象编程的基本概念，以及封装、继承、多态的含义。",
            tags: ["面向对象", "基础概念", "封装", "继承", "多态"]
        }}>
            <div className="space-y-2">
                <p><strong>封装 (Encapsulation)：</strong> 将对象的属性（数据）和行为（方法）结合为一个独立的整体，并对对象的内部细节进行隐藏，只暴露必要的接口供外部访问。优点：提高安全性、简化编程、易于维护。应用：将<strong>User</strong>实体的属性（如`id`, `name`, `password`）声明为<strong>private</strong>，通过公有的<strong>getter</strong>和<strong>setter</strong>方法访问，可以在<strong>setter</strong>中加入数据校验逻辑。</p>
                <p><strong>继承 (Inheritance)：</strong> 子类可以继承父类的属性和方法（非<strong>private</strong>的），实现代码复用，并可以在子类中扩展或重写父类的功能。优点：代码复用、层级清晰。缺点：高耦合，父类修改可能影响子类。应用：定义通用的<strong>BaseService</strong>处理公共业务逻辑，具体业务<strong>Service</strong>（如<strong>OrderService</strong>, <strong>ProductService</strong>）继承它。</p>
                <p><strong>多态 (Polymorphism)：</strong> 同一个接口或父类，在不同的子类实例下可以有不同的实现和行为。主要通过方法重写（<strong>Override</strong>）和接口实现来实现。前提：继承、重写、向上转型。应用：定义<strong>Shape</strong>接口有`draw()`方法，<strong>Circle</strong>和<strong>Square</strong>类分别实现，`Shape shape = new Circle(); shape.draw();` 调用的是<strong>Circle</strong>的`draw()`。</p>
                
                <WarningCard title="易错点与深究">
                    <ul className="text-sm space-y-1">
                        <li><strong>多态的动态绑定：</strong> 编译时看左边（父类/接口引用），运行时看右边（实际对象类型）。方法调用是在运行时确定具体执行哪个子类的方法。</li>
                        <li><strong>方法重写(<strong>Override</strong>) vs 方法重载(<strong>Overload</strong>)：</strong> 重写发生在子类和父类之间，方法签名必须相同；重载发生在同一个类中，方法名相同但参数列表不同。</li>
                        <li><strong>抽象类 vs 接口：</strong> 抽象类可以有构造方法和普通成员变量，单继承；接口表示"can-do"能力，多实现。</li>
                    </ul>
                </WarningCard>
            </div>
        </QuestionCard>
    )
} 