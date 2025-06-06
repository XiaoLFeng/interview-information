import { QuestionCard } from "../../../../base/knowledge_question_card"
import ReactECharts from 'echarts-for-react';
import { WarningCard } from "../../../../card/warning_card";

/**
 * SpringBoot 简介与核心概念
 */
export function SpringBootIntro({ id }: { id: string }) {
    // SpringBoot vs Spring 对比图
    const comparisonOption = {
        title: {
            text: 'SpringBoot vs Spring 特性对比',
            left: 'center',
            textStyle: {
                fontSize: 16,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['Spring Framework', 'SpringBoot'],
            bottom: 10
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '15%',
            top: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['配置简化', '开发效率', '部署便利', '学习成本', '生态集成']
        },
        yAxis: {
            type: 'value',
            max: 10,
            axisLabel: {
                formatter: function(value: number) {
                    const labels = ['', '', '低', '', '中', '', '高', '', '', '', '极高'];
                    return labels[value] || '';
                }
            }
        },
        series: [
            {
                name: 'Spring Framework',
                type: 'bar',
                data: [3, 5, 4, 7, 8],
                itemStyle: {
                    color: '#22c55e'
                }
            },
            {
                name: 'SpringBoot',
                type: 'bar',
                data: [9, 9, 9, 3, 9],
                itemStyle: {
                    color: '#3b82f6'
                }
            }
        ]
    };

    return (
        <QuestionCard key={id} question={{
            id,
            title: "SpringBoot与Spring的主要区别是什么？SpringBoot有哪些优点？",
            category: "SpringBoot",
            content: "请解释SpringBoot的核心概念、与Spring Framework的区别以及主要优势。",
            tags: ["SpringBoot", "Spring", "自动配置", "微服务"]
        }}>
            <div className="space-y-6">
                {/* 基本概念 */}
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">SpringBoot 基本概念</h4>
                    <p className="text-blue-700">
                        SpringBoot 是构建在 Spring Framework 之上的脚手架，旨在简化 Spring 应用的创建和部署。
                        它通过自动配置、起步依赖等方式减少样板配置，实现"约定优于配置"的设计理念，
                        让开发者能够快速构建生产级别的 Spring 应用。
                    </p>
                </div>

                {/* 对比图表 */}
                <div className="chart-container">
                    <ReactECharts 
                        option={comparisonOption}
                        style={{ height: '350px', width: '100%' }}
                    />
                </div>

                {/* 主要区别 */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-3">🏗️ Spring Framework</h4>
                        <div className="space-y-3">
                            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                <h5 className="font-medium text-green-800">特点</h5>
                                <ul className="text-green-700 text-sm space-y-1 mt-1">
                                    <li>• 全面的基础设施支持</li>
                                    <li>• 核心：IoC 和 AOP</li>
                                    <li>• 需要较多 XML 或 Java Config</li>
                                    <li>• 灵活但配置复杂</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-800 mb-3">🚀 SpringBoot</h4>
                        <div className="space-y-3">
                            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <h5 className="font-medium text-blue-800">特点</h5>
                                <ul className="text-blue-700 text-sm space-y-1 mt-1">
                                    <li>• 基于 Spring 的快速开发脚手架</li>
                                    <li>• 自动配置和起步依赖</li>
                                    <li>• 约定优于配置</li>
                                    <li>• 内嵌容器，独立运行</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SpringBoot 优点详解 */}
                <div>
                    <h4 className="font-semibold text-gray-800 mb-4">SpringBoot 的主要优点</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <h5 className="font-semibold text-purple-800 mb-2">🏃‍♂️ 快速创建独立运行的Spring应用</h5>
                            <p className="text-purple-700 text-sm">
                                内嵌Servlet容器（Tomcat, Jetty, Undertow），无需部署WAR包到外部容器。
                                应用可以通过 <code className="bg-purple-200 px-1 rounded">java -jar</code> 直接运行。
                            </p>
                        </div>

                        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                            <h5 className="font-semibold text-indigo-800 mb-2">📦 简化Maven/Gradle配置</h5>
                            <p className="text-indigo-700 text-sm">
                                通过 Starters 管理依赖和版本，如 
                                <code className="bg-indigo-200 px-1 rounded">spring-boot-starter-web</code>
                                自动引入Web开发所需的所有依赖。
                            </p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <h5 className="font-semibold text-green-800 mb-2">⚙️ 自动配置 (Auto-configuration)</h5>
                            <p className="text-green-700 text-sm">
                                根据 classpath 和配置智能配置Bean。例如，classpath中有H2数据库依赖时，
                                自动配置内存数据库连接。
                            </p>
                        </div>

                        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                            <h5 className="font-semibold text-yellow-800 mb-2">🚫 无需XML配置</h5>
                            <p className="text-yellow-700 text-sm">
                                提倡注解和 Java Config，摆脱繁琐的XML配置文件。
                                使用 <code className="bg-yellow-200 px-1 rounded">@SpringBootApplication</code> 一个注解启动应用。
                            </p>
                        </div>

                        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                            <h5 className="font-semibold text-red-800 mb-2">🏭 提供生产就绪特性</h5>
                            <p className="text-red-700 text-sm">
                                Actuator提供监控、管理端点；外部化配置支持；
                                健康检查、指标收集等开箱即用。
                            </p>
                        </div>

                        <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                            <h5 className="font-semibold text-teal-800 mb-2">🔗 与Spring生态无缝集成</h5>
                            <p className="text-teal-700 text-sm">
                                完美继承Spring Framework的所有特性，同时简化了
                                Spring Security、Spring Data、Spring Cloud等的集成。
                            </p>
                        </div>
                    </div>
                </div>

                {/* 约定优于配置示例 */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-3">"约定优于配置" 示例</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <h5 className="font-medium text-gray-700 mb-2">目录结构约定</h5>
                            <ul className="space-y-1 text-gray-600 font-mono text-xs">
                                <li>src/main/java - Java源码</li>
                                <li>src/main/resources - 资源文件</li>
                                <li>src/main/resources/static - 静态资源</li>
                                <li>src/main/resources/templates - 模板文件</li>
                                <li>application.properties - 配置文件</li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-medium text-gray-700 mb-2">默认配置约定</h5>
                            <ul className="space-y-1 text-gray-600 text-xs">
                                <li>• 默认端口：8080</li>
                                <li>• 默认数据库连接池：HikariCP</li>
                                <li>• 默认JSON序列化：Jackson</li>
                                <li>• 默认日志框架：Logback</li>
                                <li>• 默认测试框架：JUnit 5</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 常见易错点 */}
                <WarningCard title="易错点与深究">
                    <ul className="text-sm space-y-1">
                        <li>
                            <strong>误解：</strong> 认为SpringBoot完全取代了Spring Framework
                            <br />
                            <strong>正解：</strong> SpringBoot是Spring的增强和简化，底层仍然是Spring Framework
                        </li>
                        <li>
                            <strong>误解：</strong> 对"约定优于配置"理解不深
                            <br />
                            <strong>正解：</strong> 提供合理的默认配置，减少显式配置，但仍可自定义覆盖
                        </li>
                        <li>
                            <strong>误解：</strong> 认为SpringBoot无法处理复杂场景
                            <br />
                            <strong>正解：</strong> SpringBoot支持所有Spring功能，同时提供了更好的开发体验
                        </li>
                    </ul>
                </WarningCard>
            </div>
        </QuestionCard>
    )
} 