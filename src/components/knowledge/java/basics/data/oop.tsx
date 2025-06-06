import { QuestionCard } from "../../../../base/knowledge_question_card"
import { WarningCard } from "../../../../card/warning_card"
import { InfoCard } from "../../../../card/info_card"
import { PrimaryCard } from "../../../../card/primary_card"

/**
 * # 面向对象编程(OOP)
 * 核心：将数据和操作数据的方法封装在对象中
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
            <div className="space-y-6">
                {/* 三大特性 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <PrimaryCard title="🔒 封装 (Encapsulation)">
                        <div className="space-y-2 text-sm">
                            <p><strong>核心：</strong>隐藏内部实现，提供公共接口</p>
                            <p><strong>实现：</strong>private属性 + public方法</p>
                            <p><strong>好处：</strong>安全性、可维护性</p>
                        </div>
                    </PrimaryCard>

                    <PrimaryCard title="🧬 继承 (Inheritance)">
                        <div className="space-y-2 text-sm">
                            <p><strong>核心：</strong>子类获得父类的属性和方法</p>
                            <p><strong>关键词：</strong>extends、super</p>
                            <p><strong>好处：</strong>代码复用、层次清晰</p>
                        </div>
                    </PrimaryCard>

                    <PrimaryCard title="🔄 多态 (Polymorphism)">
                        <div className="space-y-2 text-sm">
                            <p><strong>核心：</strong>同一接口，不同实现</p>
                            <p><strong>前提：</strong>继承 + 重写 + 向上转型</p>
                            <p><strong>体现：</strong>运行时确定具体方法</p>
                        </div>
                    </PrimaryCard>
                </div>

                {/* 对比表格 */}
                <InfoCard title="特性对比表">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full text-sm">
                            <thead>
                                <tr>
                                    <th>特性</th>
                                    <th>目的</th>
                                    <th>实现方式</th>
                                    <th>关键字</th>
                                    <th>易错点</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-semibold">封装</td>
                                    <td>隐藏细节，保护数据</td>
                                    <td>private + getter/setter</td>
                                    <td>private, protected, public</td>
                                    <td>忘记提供访问方法</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">继承</td>
                                    <td>代码复用，建立层次</td>
                                    <td>class B extends A</td>
                                    <td>extends, super</td>
                                    <td>理解super()调用时机</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">多态</td>
                                    <td>接口统一，实现多样</td>
                                    <td>方法重写 + 向上转型</td>
                                    <td>@Override</td>
                                    <td>编译时看左边，运行时看右边</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </InfoCard>

                <WarningCard title="核心易错点">
                    <div className="space-y-3 text-sm">
                        <div>
                            <h5 className="font-semibold text-error">❌ 多态的动态绑定误区</h5>
                            <div className="bg-base-200 p-2 rounded mt-1">
                                <code>Animal a = new Dog(); // 编译时看Animal，运行时执行Dog的方法</code>
                            </div>
                        </div>
                        
                        <div>
                            <h5 className="font-semibold text-error">❌ 重写 vs 重载混淆</h5>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li><strong>重写(Override)：</strong>子类重新实现父类方法，方法签名相同</li>
                                <li><strong>重载(Overload)：</strong>同类中方法名相同，参数不同</li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-semibold text-error">❌ 构造方法调用顺序</h5>
                            <p className="ml-2">继承中：先父类构造方法，后子类构造方法</p>
                        </div>
                    </div>
                </WarningCard>
            </div>
        </QuestionCard>
    )
} 