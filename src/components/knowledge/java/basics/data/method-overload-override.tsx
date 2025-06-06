import { QuestionCard } from "../../../../base/knowledge_question_card"
import { PrimaryCard } from "../../../../card/primary_card"
import { SecondaryCard } from "../../../../card/secondary_card"
import { InfoCard } from "../../../../card/info_card"
import { WarningCard } from "../../../../card/warning_card"
import { SuccessCard } from "../../../../card/success_card"
import { ExpandableCode } from "../../../../base/expandable_code"

/**
 * # 方法重载 vs 方法重写详解
 * 深入分析 Java 中最容易混淆的两个概念：方法重载(Overloading)和方法重写(Overriding)
 */
export function JavaBasicsMethodOverloadOverride({ id }: { id: string }) {
    return (
        <QuestionCard question={{
            id,
            title: "方法重载(Overloading) vs 方法重写(Overriding)",
            category: "面向对象",
            content: "什么是方法重载(Overloading)与方法重写(Overriding)？它们有什么区别？",
            tags: ["方法重载", "方法重写", "多态", "编译时绑定", "运行时绑定"]
        }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 概念对比 */}
                <PrimaryCard title="🔄 方法重载 (Overloading)">
                    <div className="space-y-3">
                        <p><strong>定义：</strong>在同一个类中，方法名相同但参数列表不同</p>
                        <p><strong>编译时确定：</strong>静态多态性，编译器根据参数类型和数量选择调用哪个方法</p>
                        <p><strong>关键词：</strong>Same Class, Different Parameters</p>
                    </div>
                </PrimaryCard>

                <SecondaryCard title="🎯 方法重写 (Overriding)">
                    <div className="space-y-3">
                        <p><strong>定义：</strong>子类重新定义父类中的方法，实现不同的功能</p>
                        <p><strong>运行时确定：</strong>动态多态性，JVM根据对象实际类型决定调用哪个方法</p>
                        <p><strong>关键词：</strong>Inheritance, Same Signature</p>
                    </div>
                </SecondaryCard>
            </div>

            {/* 方法重载详解 */}
            <div className="mt-6">
                <InfoCard title="方法重载详解与规则">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-base-content">重载规则：</h4>
                        <ul className="list-disc list-inside space-y-2 text-sm">
                            <li><strong>必须改变参数列表</strong>（数量、类型、顺序）</li>
                            <li><strong>可以改变返回类型</strong>（但不能仅仅改变返回类型）</li>
                            <li><strong>可以改变访问修饰符</strong></li>
                            <li><strong>可以声明新的或更广的检查异常</strong></li>
                        </ul>
                        
                        <h4 className="font-semibold text-base-content mt-4">代码示例：</h4>
                        <ExpandableCode language="java">
{`public class Calculator {
    // 重载方法 - 不同参数数量
    public int add(int a, int b) {
        return a + b;
    }
    
    public int add(int a, int b, int c) {
        return a + b + c;
    }
    
    // 重载方法 - 不同参数类型
    public double add(double a, double b) {
        return a + b;
    }
    
    // 重载方法 - 不同参数顺序
    public String add(String str, int num) {
        return str + num;
    }
    
    public String add(int num, String str) {
        return num + str;
    }
}`}
                        </ExpandableCode>
                    </div>
                </InfoCard>
            </div>

            {/* 方法重写详解 */}
            <div className="mt-6">
                <InfoCard title="方法重写详解与规则">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-base-content">重写规则：</h4>
                        <ul className="list-disc list-inside space-y-2 text-sm">
                            <li><strong>参数列表必须完全相同</strong></li>
                            <li><strong>返回类型必须相同或者是协变返回类型</strong></li>
                            <li><strong>访问修饰符不能比父类更严格</strong></li>
                            <li><strong>不能声明更广泛的检查异常</strong></li>
                            <li><strong>final、static、private方法不能被重写</strong></li>
                        </ul>
                        
                        <h4 className="font-semibold text-base-content mt-4">代码示例：</h4>
                        <ExpandableCode language="java">
{`// 父类
public class Animal {
    public void makeSound() {
        System.out.println("Animal makes a sound");
    }
    
    public Animal getAnimal() {
        return new Animal();
    }
}

// 子类
public class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Dog barks");
    }
    
    // 协变返回类型
    @Override
    public Dog getAnimal() {
        return new Dog();
    }
}

// 使用示例
public class TestPolymorphism {
    public static void main(String[] args) {
        Animal animal = new Dog(); // 多态
        animal.makeSound(); // 输出: Dog barks (运行时决定)
    }
}`}
                        </ExpandableCode>
                    </div>
                </InfoCard>
            </div>

            {/* 详细对比表格 */}
            <div className="mt-6">
                <div className="bg-base-100 rounded-lg p-4 shadow-sm border border-base-300">
                    <h3 className="text-lg font-semibold text-base-content mb-4">📊 详细对比表</h3>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>特性</th>
                                    <th>方法重载 (Overloading)</th>
                                    <th>方法重写 (Overriding)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-semibold">定义位置</td>
                                    <td>同一个类中</td>
                                    <td>子类中重新定义父类方法</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">参数列表</td>
                                    <td><span className="badge badge-success">必须不同</span></td>
                                    <td><span className="badge badge-error">必须相同</span></td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">返回类型</td>
                                    <td>可以不同</td>
                                    <td>必须相同或协变</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">访问修饰符</td>
                                    <td>可以不同</td>
                                    <td>不能更严格</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">异常处理</td>
                                    <td>可以声明新异常</td>
                                    <td>不能声明更广泛的检查异常</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">绑定时机</td>
                                    <td><span className="badge badge-primary">编译时绑定（静态）</span></td>
                                    <td><span className="badge badge-secondary">运行时绑定（动态）</span></td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">多态性</td>
                                    <td>编译时多态</td>
                                    <td>运行时多态</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">@Override注解</td>
                                    <td>不适用</td>
                                    <td><span className="badge badge-info">推荐使用</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* 易错点与陷阱 */}
            <div className="mt-6">
                <WarningCard title="常见易错点与陷阱">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-warning-content mb-2">1. 重载中的自动类型转换陷阱</h4>
                            <ExpandableCode language="java">
{`public class TrickExample {
    public void test(int i) { System.out.println("int: " + i); }
    public void test(Integer i) { System.out.println("Integer: " + i); }
    public void test(Object o) { System.out.println("Object: " + o); }
    
    public static void main(String[] args) {
        TrickExample example = new TrickExample();
        example.test(1);        // 输出: int: 1
        example.test((Integer)1); // 输出: Integer: 1
        example.test(null);     // 编译错误！模糊调用
    }
}`}
                            </ExpandableCode>
                        </div>
                        
                        <div>
                            <h4 className="font-semibold text-warning-content mb-2">2. 重写中的访问修饰符陷阱</h4>
                            <ExpandableCode language="java">
{`public class Parent {
    protected void method() { }
}

public class Child extends Parent {
    // ❌ 编译错误：不能降低可见性
    // private void method() { }
    
    // ✅ 正确：可以提高可见性
    public void method() { }
}`}
                            </ExpandableCode>
                        </div>
                        
                        <div>
                            <h4 className="font-semibold text-warning-content mb-2">3. 静态方法的"重写"陷阱</h4>
                            <ExpandableCode language="java">
{`public class Parent {
    public static void staticMethod() {
        System.out.println("Parent static");
    }
}

public class Child extends Parent {
    // 这不是重写，而是隐藏(hiding)
    public static void staticMethod() {
        System.out.println("Child static");
    }
}

// 测试
Parent p = new Child();
p.staticMethod(); // 输出: Parent static (编译时决定)`}
                            </ExpandableCode>
                        </div>
                    </div>
                </WarningCard>
            </div>

            {/* 最佳实践 */}
            <div className="mt-6">
                <SuccessCard title="最佳实践建议">
                    <div className="space-y-3">
                        <h4 className="font-semibold text-success-content">方法重载：</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>参数名称要有意义，便于理解</li>
                            <li>避免过多的重载方法，可考虑使用建造者模式</li>
                            <li>注意自动装箱/拆箱对重载选择的影响</li>
                        </ul>
                        
                        <h4 className="font-semibold text-success-content mt-4">方法重写：</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>始终使用@Override注解，帮助编译器检查</li>
                            <li>重写equals()时必须同时重写hashCode()</li>
                            <li>重写toString()提供有意义的字符串表示</li>
                            <li>注意协变返回类型的使用场景</li>
                        </ul>
                    </div>
                </SuccessCard>
            </div>
        </QuestionCard>
    )
} 