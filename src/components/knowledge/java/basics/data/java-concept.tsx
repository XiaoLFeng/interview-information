import { QuestionCard } from "../../../../base/knowledge_question_card"
import ReactECharts from 'echarts-for-react';

/**
 * # 什么是 Java
 * Java 是一种面向对象的编程语言，具有跨平台性、安全性、多线程等特点。
 * 
 * @returns 
 */
export function JavaBasicsWhatIsJava({ id }: { id: string }) {
    // Java特性雷达图配置
    const javaFeaturesOption = {
        title: {
            text: 'Java核心特性评估',
            left: 'center',
            textStyle: {
                fontSize: 16,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        radar: {
            indicator: [
                { name: '跨平台性', max: 10 },
                { name: '面向对象', max: 10 },
                { name: '安全性', max: 10 },
                { name: '多线程', max: 10 },
                { name: '性能', max: 10 },
                { name: '生态系统', max: 10 }
            ],
            radius: 80,
            splitNumber: 5,
            shape: 'polygon',
            splitArea: {
                areaStyle: {
                    color: [
                        'rgba(114, 172, 209, 0.1)',
                        'rgba(114, 172, 209, 0.2)',
                        'rgba(114, 172, 209, 0.3)',
                        'rgba(114, 172, 209, 0.4)',
                        'rgba(114, 172, 209, 0.5)'
                    ].reverse()
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(114, 172, 209, 0.5)'
                }
            }
        },
        series: [{
            type: 'radar',
            data: [{
                value: [9, 10, 8, 9, 7, 10],
                name: 'Java',
                areaStyle: {
                    color: 'rgba(59, 130, 246, 0.3)'
                },
                lineStyle: {
                    color: '#3b82f6',
                    width: 2
                },
                itemStyle: {
                    color: '#3b82f6'
                }
            }]
        }]
    };

    return (
        <QuestionCard key={id} question={{
            id,
            title: "什么是 Java？",
            category: "Java 基础",
            content: "请解释 Java 的基本概念、核心特点以及在企业级开发中的地位。",
            tags: ["Java", "基础概念", "特点", "JVM"]
        }}>
            <div className="space-y-6">
                {/* 基本概念 */}
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Java 基本概念</h4>
                    <p className="text-blue-700">
                        Java 是一种面向对象的高级编程语言，由 Sun Microsystems（现Oracle）于1995年发布。
                        Java 遵循"一次编写，到处运行"（Write Once, Run Anywhere, WORA）的设计理念，
                        通过 Java 虚拟机（JVM）实现跨平台特性。
                    </p>
                </div>

                {/* Java核心特性图表 */}
                <div className="chart-container">
                    <ReactECharts 
                        option={javaFeaturesOption}
                        style={{ height: '350px', width: '100%' }}
                    />
                </div>

                {/* 核心特点详解 */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <h5 className="font-semibold text-green-800 mb-2">🌐 跨平台性</h5>
                            <p className="text-green-700 text-sm">
                                Java源码编译成字节码(.class)，在JVM上运行。
                                不同操作系统只需安装对应的JVM即可运行相同的Java程序。
                            </p>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <h5 className="font-semibold text-purple-800 mb-2">🏗️ 面向对象</h5>
                            <p className="text-purple-700 text-sm">
                                支持封装、继承、多态三大特性。一切皆对象的设计理念，
                                提供了良好的代码复用性和可维护性。
                            </p>
                        </div>

                        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                            <h5 className="font-semibold text-red-800 mb-2">🔒 安全性</h5>
                            <p className="text-red-700 text-sm">
                                提供类加载器、字节码验证器、安全管理器等多层安全机制。
                                自动内存管理避免了指针操作的安全隐患。
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                            <h5 className="font-semibold text-orange-800 mb-2">🧵 多线程</h5>
                            <p className="text-orange-700 text-sm">
                                内置多线程支持，提供Thread类、同步机制(synchronized)、
                                并发工具包(java.util.concurrent)等。
                            </p>
                        </div>

                        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                            <h5 className="font-semibold text-indigo-800 mb-2">⚡ 高性能</h5>
                            <p className="text-indigo-700 text-sm">
                                JIT编译器运行时优化、垃圾回收器自动内存管理、
                                HotSpot虚拟机等技术保证了较高的运行效率。
                            </p>
                        </div>

                        <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                            <h5 className="font-semibold text-teal-800 mb-2">🌟 生态丰富</h5>
                            <p className="text-teal-700 text-sm">
                                庞大的开源社区、丰富的第三方库、成熟的开发框架(Spring)、
                                完善的工具链(Maven/Gradle)。
                            </p>
                        </div>
                    </div>
                </div>

                {/* JVM 生态系统 */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-3">Java 生态系统</h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                            <h5 className="font-medium text-gray-700 mb-2">核心组件</h5>
                            <ul className="space-y-1 text-gray-600">
                                <li>• JDK (Java Development Kit)</li>
                                <li>• JRE (Java Runtime Environment)</li>
                                <li>• JVM (Java Virtual Machine)</li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-medium text-gray-700 mb-2">主流框架</h5>
                            <ul className="space-y-1 text-gray-600">
                                <li>• Spring / SpringBoot</li>
                                <li>• Hibernate / MyBatis</li>
                                <li>• Apache Commons</li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-medium text-gray-700 mb-2">构建工具</h5>
                            <ul className="space-y-1 text-gray-600">
                                <li>• Maven</li>
                                <li>• Gradle</li>
                                <li>• Ant</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 应用场景 */}
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 mb-2">🎯 主要应用场景</h4>
                    <div className="grid md:grid-cols-2 gap-3 text-yellow-700 text-sm">
                        <div>
                            <strong>企业级应用开发：</strong>
                            <p>大型分布式系统、微服务架构、企业管理系统</p>
                        </div>
                        <div>
                            <strong>Web开发：</strong>
                            <p>基于Spring框架的Web应用、RESTful API服务</p>
                        </div>
                        <div>
                            <strong>移动开发：</strong>
                            <p>Android应用开发（主要编程语言之一）</p>
                        </div>
                        <div>
                            <strong>大数据处理：</strong>
                            <p>Hadoop、Spark、Elasticsearch等大数据框架</p>
                        </div>
                    </div>
                </div>
            </div>
        </QuestionCard>
    )
} 