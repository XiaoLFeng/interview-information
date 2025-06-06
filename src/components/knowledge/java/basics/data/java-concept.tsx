import { QuestionCard } from "../../../../base/knowledge_question_card"
import { InfoCard } from "../../../../card/info_card"
import { PrimaryCard } from "../../../../card/primary_card"
import { WarningCard } from "../../../../card/warning_card"

/**
 * # Java语言核心
 * 特性 + 生态 + 应用场景
 */
export function JavaBasicsWhatIsJava({ id }: { id: string }) {
    return (
        <QuestionCard key={id} question={{
            id,
            title: "什么是 Java？",
            category: "Java 基础",
            content: "请解释 Java 的基本概念、核心特点以及在企业级开发中的地位。",
            tags: ["Java", "基础概念", "特点", "JVM"]
        }}>
            <div className="space-y-6">
                {/* Java定义 */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">📚 Java 基本概念</h4>
                    <p className="text-blue-700">
                        Java 是一种面向对象的高级编程语言，由 Sun Microsystems（现Oracle）于1995年发布。
                        Java 遵循<strong>"一次编写，到处运行"（WORA）</strong>的设计理念，
                        通过 Java 虚拟机（JVM）实现跨平台特性。
                    </p>
                </div>

                {/* 核心特性 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <PrimaryCard title="🌐 跨平台性">
                        <div className="space-y-2 text-sm">
                            <p><strong>原理：</strong>源码→字节码→JVM执行</p>
                            <p><strong>优势：</strong>一次编写，到处运行</p>
                            <p><strong>实现：</strong>不同系统安装对应JVM</p>
                            <div className="badge badge-success">核心竞争力</div>
                        </div>
                    </PrimaryCard>

                    <PrimaryCard title="🏗️ 面向对象">
                        <div className="space-y-2 text-sm">
                            <p><strong>支持：</strong>封装、继承、多态</p>
                            <p><strong>特点：</strong>一切皆对象设计</p>
                            <p><strong>好处：</strong>代码复用、可维护性</p>
                            <div className="badge badge-info">设计理念</div>
                        </div>
                    </PrimaryCard>

                    <PrimaryCard title="🔒 安全性">
                        <div className="space-y-2 text-sm">
                            <p><strong>机制：</strong>类加载器、字节码验证</p>
                            <p><strong>特点：</strong>自动内存管理</p>
                            <p><strong>避免：</strong>指针操作安全隐患</p>
                            <div className="badge badge-warning">企业级要求</div>
                        </div>
                    </PrimaryCard>

                    <PrimaryCard title="🧵 多线程">
                        <div className="space-y-2 text-sm">
                            <p><strong>内置：</strong>Thread类、同步机制</p>
                            <p><strong>工具：</strong>并发包(j.u.c)</p>
                            <p><strong>支持：</strong>高并发编程</p>
                            <div className="badge badge-success">并发友好</div>
                        </div>
                    </PrimaryCard>

                    <PrimaryCard title="⚡ 高性能">
                        <div className="space-y-2 text-sm">
                            <p><strong>优化：</strong>JIT编译器</p>
                            <p><strong>管理：</strong>自动垃圾回收</p>
                            <p><strong>技术：</strong>HotSpot虚拟机</p>
                            <div className="badge badge-success">运行时优化</div>
                        </div>
                    </PrimaryCard>

                    <PrimaryCard title="🌟 生态丰富">
                        <div className="space-y-2 text-sm">
                            <p><strong>社区：</strong>庞大开源社区</p>
                            <p><strong>框架：</strong>Spring、Hibernate等</p>
                            <p><strong>工具：</strong>Maven、Gradle等</p>
                            <div className="badge badge-info">生态完善</div>
                        </div>
                    </PrimaryCard>
                </div>

                {/* Java生态系统 */}
                <InfoCard title="Java 生态系统">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-red-50 p-3 rounded border border-red-200">
                            <h5 className="font-semibold text-red-800 mb-2">🔧 核心组件</h5>
                            <ul className="space-y-1 text-red-700">
                                <li>• <strong>JDK:</strong> Java开发工具包</li>
                                <li>• <strong>JRE:</strong> Java运行环境</li>
                                <li>• <strong>JVM:</strong> Java虚拟机</li>
                                <li>• <strong>关系:</strong> JDK ⊃ JRE ⊃ JVM</li>
                            </ul>
                        </div>
                        
                        <div className="bg-green-50 p-3 rounded border border-green-200">
                            <h5 className="font-semibold text-green-800 mb-2">🏗️ 主流框架</h5>
                            <ul className="space-y-1 text-green-700">
                                <li>• <strong>Spring:</strong> 企业级应用框架</li>
                                <li>• <strong>Spring Boot:</strong> 快速开发脚手架</li>
                                <li>• <strong>Hibernate/MyBatis:</strong> ORM框架</li>
                                <li>• <strong>Apache Commons:</strong> 工具类库</li>
                            </ul>
                        </div>
                        
                        <div className="bg-blue-50 p-3 rounded border border-blue-200">
                            <h5 className="font-semibold text-blue-800 mb-2">🛠️ 构建工具</h5>
                            <ul className="space-y-1 text-blue-700">
                                <li>• <strong>Maven:</strong> 项目管理和构建</li>
                                <li>• <strong>Gradle:</strong> 现代化构建工具</li>
                                <li>• <strong>Ant:</strong> 传统构建工具</li>
                                <li>• <strong>IDE:</strong> IntelliJ IDEA、Eclipse</li>
                            </ul>
                        </div>
                    </div>
                </InfoCard>

                {/* 应用场景 */}
                <InfoCard title="主要应用场景">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-3">
                            <div className="bg-purple-50 p-3 rounded border border-purple-200">
                                <h5 className="font-semibold text-purple-800">🏢 企业级应用开发</h5>
                                <ul className="text-purple-700 mt-1 space-y-1">
                                    <li>• 大型分布式系统</li>
                                    <li>• 微服务架构</li>
                                    <li>• 企业管理系统(ERP、CRM)</li>
                                    <li>• 银行、保险等金融系统</li>
                                </ul>
                            </div>
                            
                            <div className="bg-orange-50 p-3 rounded border border-orange-200">
                                <h5 className="font-semibold text-orange-800">🌐 Web应用开发</h5>
                                <ul className="text-orange-700 mt-1 space-y-1">
                                    <li>• 基于Spring的Web应用</li>
                                    <li>• RESTful API服务</li>
                                    <li>• 电商平台后端</li>
                                    <li>• 内容管理系统</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="space-y-3">
                            <div className="bg-teal-50 p-3 rounded border border-teal-200">
                                <h5 className="font-semibold text-teal-800">📱 移动开发</h5>
                                <ul className="text-teal-700 mt-1 space-y-1">
                                    <li>• Android应用开发</li>
                                    <li>• 移动端后台服务</li>
                                    <li>• 跨平台解决方案</li>
                                    <li>• 移动游戏开发</li>
                                </ul>
                            </div>
                            
                            <div className="bg-indigo-50 p-3 rounded border border-indigo-200">
                                <h5 className="font-semibold text-indigo-800">🔄 其他领域</h5>
                                <ul className="text-indigo-700 mt-1 space-y-1">
                                    <li>• 大数据处理(Hadoop、Spark)</li>
                                    <li>• 科学计算和分析</li>
                                    <li>• 桌面应用开发(Swing、JavaFX)</li>
                                    <li>• 嵌入式系统开发</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </InfoCard>

                <WarningCard title="核心易错点">
                    <div className="space-y-3 text-sm">
                        <div>
                            <h5 className="font-semibold text-error">❌ JDK、JRE、JVM关系混淆</h5>
                            <div className="bg-base-200 p-3 rounded mt-2">
                                <p><strong>JVM:</strong> Java虚拟机，执行字节码的运行时环境</p>
                                <p><strong>JRE:</strong> Java运行环境 = JVM + 核心类库</p>
                                <p><strong>JDK:</strong> Java开发工具包 = JRE + 开发工具(javac等)</p>
                            </div>
                        </div>
                        
                        <div>
                            <h5 className="font-semibold text-error">❌ 跨平台理解误区</h5>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>认为Java程序可以直接在任意平台运行（需要JVM）</li>
                                <li>不理解字节码的作用和意义</li>
                                <li>混淆源码跨平台和运行时跨平台</li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-semibold text-error">❌ Java版本特性不清楚</h5>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>不了解LTS版本的重要性(8、11、17、21)</li>
                                <li>新特性掌握滞后(Lambda、Stream、模块化等)</li>
                                <li>版本选择困难症</li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-semibold text-error">❌ 性能认知偏差</h5>
                            <p className="ml-2">认为Java性能一定比C/C++差，实际上JIT编译优化使得Java在某些场景下性能接近甚至超过原生代码</p>
                        </div>
                    </div>
                </WarningCard>
            </div>
        </QuestionCard>
    )
} 