import { QuestionCard } from "../../../../base/knowledge_question_card"
import { PrimaryCard } from "../../../../card/primary_card"
import { SecondaryCard } from "../../../../card/secondary_card"
import { InfoCard } from "../../../../card/info_card"
import { WarningCard } from "../../../../card/warning_card"
import { SuccessCard } from "../../../../card/success_card"
import { ExpandableCode } from "../../../../base/expandable_code"

/**
 * # 接口(Interface) vs 抽象类(Abstract Class)详解
 * 深入分析 Java 中接口与抽象类的设计差异和使用场景
 */
export function JavaBasicsInterfaceAbstract({ id }: { id: string }) {
    return (
        <QuestionCard question={{
            id,
            title: "接口(Interface) vs 抽象类(Abstract Class)",
            category: "面向对象",
            content: "接口和抽象类有什么区别？在什么场景下使用接口，什么场景下使用抽象类？",
            tags: ["接口", "抽象类", "多继承", "设计模式", "JDK8新特性"]
        }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 概念对比 */}
                <PrimaryCard title="🔌 接口 (Interface)">
                    <div className="space-y-3">
                        <p><strong>设计理念：</strong>定义"做什么"的契约规范</p>
                        <p><strong>核心特征：</strong>完全抽象，多继承，契约导向</p>
                        <p><strong>关键词：</strong>Contract, Can-Do, Multiple Inheritance</p>
                    </div>
                </PrimaryCard>

                <SecondaryCard title="🏗️ 抽象类 (Abstract Class)">
                    <div className="space-y-3">
                        <p><strong>设计理念：</strong>定义"是什么"的共同基础</p>
                        <p><strong>核心特征：</strong>部分实现，单继承，模板导向</p>
                        <p><strong>关键词：</strong>Template, Is-A, Single Inheritance</p>
                    </div>
                </SecondaryCard>
            </div>

            {/* 接口详解 */}
            <div className="mt-6">
                <InfoCard title="接口特性详解">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-base-content">JDK 8之前的传统接口：</h4>
                        <ExpandableCode language="java">
{`// 传统接口示例
public interface Drawable {
    // 常量：public static final (隐式)
    String DEFAULT_COLOR = "BLACK";
    int MAX_SIZE = 1000;
    
    // 抽象方法：public abstract (隐式)
    void draw();
    void resize(int width, int height);
    boolean isVisible();
}`}
                        </ExpandableCode>

                        <h4 className="font-semibold text-base-content mt-4">JDK 8+ 现代接口特性：</h4>
                        <ExpandableCode language="java">
{`public interface ModernDrawable {
    // 1. 默认方法 (default methods)
    default void setColor(String color) {
        System.out.println("Setting color to: " + color);
    }
    
    // 2. 静态方法 (static methods)
    static Drawable createDefault() {
        return new SimpleDrawable();
    }
    
    // 3. 私有方法 (JDK 9+)
    private void logOperation(String operation) {
        System.out.println("Operation: " + operation);
    }
    
    // 4. 抽象方法
    void draw();
    
    // 5. 默认方法调用私有方法
    default void drawWithLog() {
        logOperation("draw");
        draw();
    }
}`}
                        </ExpandableCode>
                    </div>
                </InfoCard>
            </div>

            {/* 抽象类详解 */}
            <div className="mt-6">
                <InfoCard title="抽象类特性详解">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-base-content">抽象类示例：</h4>
                        <ExpandableCode language="java">
{`public abstract class Shape {
    // 1. 实例变量
    protected String color;
    protected int x, y;
    
    // 2. 构造方法
    public Shape(String color, int x, int y) {
        this.color = color;
        this.x = x;
        this.y = y;
    }
    
    // 3. 具体方法
    public void move(int deltaX, int deltaY) {
        this.x += deltaX;
        this.y += deltaY;
        System.out.println("Shape moved to (" + x + ", " + y + ")");
    }
    
    // 4. 抽象方法 - 子类必须实现
    public abstract double getArea();
    public abstract void draw();
    
    // 5. 模板方法模式
    public final void render() {
        System.out.println("Preparing to render...");
        draw();
        System.out.println("Rendering completed.");
    }
    
    // 6. 访问器方法
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
}`}
                        </ExpandableCode>
                    </div>
                </InfoCard>
            </div>

            {/* 详细对比表格 */}
            <div className="mt-6">
                <div className="bg-base-100 rounded-lg p-4 shadow-sm border border-base-300">
                    <h3 className="text-lg font-semibold text-base-content mb-4">📊 详细特性对比</h3>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>特性</th>
                                    <th>接口 (Interface)</th>
                                    <th>抽象类 (Abstract Class)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-semibold">继承性</td>
                                    <td><span className="badge badge-success">支持多继承</span></td>
                                    <td><span className="badge badge-error">只支持单继承</span></td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">成员变量</td>
                                    <td>只能是 public static final</td>
                                    <td>可以有任意修饰符的成员变量</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">构造方法</td>
                                    <td><span className="badge badge-error">不能有构造方法</span></td>
                                    <td><span className="badge badge-success">可以有构造方法</span></td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">方法实现</td>
                                    <td>default/static方法可有实现</td>
                                    <td>可以有具体实现的方法</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">访问修饰符</td>
                                    <td>方法默认 public</td>
                                    <td>可以是任意访问修饰符</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">设计目的</td>
                                    <td><span className="badge badge-primary">定义契约规范</span></td>
                                    <td><span className="badge badge-secondary">提供通用基础</span></td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">关键字</td>
                                    <td>interface + implements</td>
                                    <td>abstract + extends</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">实例化</td>
                                    <td>不能直接实例化</td>
                                    <td>不能直接实例化</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* 使用场景指南 */}
            <div className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <SuccessCard title="🎯 使用接口的场景">
                        <ul className="list-disc list-inside space-y-2 text-sm">
                            <li><strong>定义行为契约：</strong>如 Runnable, Comparable</li>
                            <li><strong>实现多重继承：</strong>一个类需要多种能力</li>
                            <li><strong>解耦设计：</strong>依赖倒置原则</li>
                            <li><strong>插件架构：</strong>定义扩展点</li>
                            <li><strong>回调机制：</strong>事件监听器</li>
                            <li><strong>策略模式：</strong>可替换的算法</li>
                        </ul>
                    </SuccessCard>

                    <InfoCard title="🏗️ 使用抽象类的场景">
                        <ul className="list-disc list-inside space-y-2 text-sm">
                            <li><strong>共享代码：</strong>多个相关类有公共实现</li>
                            <li><strong>模板方法：</strong>定义算法骨架</li>
                            <li><strong>逐步扩展：</strong>框架的增量开发</li>
                            <li><strong>状态管理：</strong>需要成员变量</li>
                            <li><strong>构造逻辑：</strong>需要初始化过程</li>
                            <li><strong>访问控制：</strong>protected 方法共享</li>
                        </ul>
                    </InfoCard>
                </div>
            </div>

            {/* 实际应用示例 */}
            <div className="mt-6">
                <InfoCard title="💼 实际应用示例对比">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-base-content">接口应用 - 策略模式：</h4>
                        <ExpandableCode language="java">
{`// 支付策略接口
public interface PaymentStrategy {
    boolean pay(double amount);
    
    // JDK 8+ 默认方法
    default void logTransaction(double amount) {
        System.out.println("Processing payment: $" + amount);
    }
}

// 具体实现
public class CreditCardPayment implements PaymentStrategy {
    public boolean pay(double amount) {
        // 信用卡支付逻辑
        return true;
    }
}

public class PayPalPayment implements PaymentStrategy {
    public boolean pay(double amount) {
        // PayPal支付逻辑
        return true;
    }
}`}
                        </ExpandableCode>

                        <h4 className="font-semibold text-base-content mt-4">抽象类应用 - 模板方法：</h4>
                        <ExpandableCode language="java">
{`// 数据处理抽象基类
public abstract class DataProcessor {
    // 模板方法 - 定义处理流程
    public final void process() {
        loadData();
        if (validate()) {
            transform();
            save();
        }
    }
    
    // 抽象方法 - 子类实现
    protected abstract void loadData();
    protected abstract void transform();
    
    // 默认实现 - 可被重写
    protected boolean validate() {
        return true;
    }
    
    // 具体方法 - 公共逻辑
    private void save() {
        System.out.println("Data saved successfully");
    }
}`}
                        </ExpandableCode>
                    </div>
                </InfoCard>
            </div>

            {/* 常见误区 */}
            <div className="mt-6">
                <WarningCard title="常见设计误区">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-warning-content mb-2">❌ 误区1：为了使用而使用</h4>
                            <p className="text-sm">不要为了体现"高级"而过度使用接口或抽象类，应该根据实际需求选择。</p>
                        </div>
                        
                        <div>
                            <h4 className="font-semibold text-warning-content mb-2">❌ 误区2：接口过于庞大</h4>
                            <p className="text-sm">违反接口隔离原则，一个接口包含过多不相关的方法。应该拆分为多个小接口。</p>
                        </div>
                        
                        <div>
                            <h4 className="font-semibold text-warning-content mb-2">❌ 误区3：抽象类层次过深</h4>
                            <p className="text-sm">继承层次过深会增加复杂性，建议继承层次不超过4层。</p>
                        </div>
                        
                        <div>
                            <h4 className="font-semibold text-warning-content mb-2">❌ 误区4：忽视组合优于继承</h4>
                            <p className="text-sm">过度使用继承而忽视组合，应该优先考虑组合关系。</p>
                        </div>
                    </div>
                </WarningCard>
            </div>

            {/* 最佳实践 */}
            <div className="mt-6">
                <SuccessCard title="最佳实践建议">
                    <div className="space-y-3">
                        <h4 className="font-semibold text-success-content">接口设计：</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>接口应该小而专一，遵循单一职责原则</li>
                            <li>合理使用默认方法，保持向后兼容性</li>
                            <li>接口名称应该体现能力，如 Runnable, Comparable</li>
                            <li>避免在接口中定义常量，使用枚举或常量类</li>
                        </ul>
                        
                        <h4 className="font-semibold text-success-content mt-4">抽象类设计：</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>提供有意义的默认实现，减少子类重复代码</li>
                            <li>使用模板方法模式定义算法骨架</li>
                            <li>合理使用 protected 修饰符供子类访问</li>
                            <li>构造方法应该初始化通用状态</li>
                        </ul>
                    </div>
                </SuccessCard>
            </div>
        </QuestionCard>
    )
} 