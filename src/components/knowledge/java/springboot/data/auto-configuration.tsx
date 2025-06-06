import { QuestionCard } from "../../../../base/knowledge_question_card"
import ReactECharts from 'echarts-for-react';

/**
 * SpringBoot 自动配置原理
 */
export function SpringBootAutoConfiguration({ id }: { id: string }) {
    // 自动配置流程图
    const autoConfigFlowOption = {
        title: {
            text: 'SpringBoot 自动配置流程',
            left: 'center',
            textStyle: {
                fontSize: 16,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}'
        },
        series: [
            {
                name: '自动配置流程',
                type: 'funnel',
                left: '10%',
                top: 60,
                bottom: 60,
                width: '80%',
                min: 0,
                max: 100,
                minSize: '30%',
                maxSize: '100%',
                sort: 'descending',
                gap: 2,
                label: {
                    show: true,
                    position: 'inside',
                    formatter: '{b}',
                    fontSize: 12,
                    color: '#fff'
                },
                labelLine: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                },
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1
                },
                emphasis: {
                    label: {
                        fontSize: 14
                    }
                },
                data: [
                    { value: 100, name: '@SpringBootApplication', itemStyle: { color: '#3b82f6' } },
                    { value: 85, name: '@EnableAutoConfiguration', itemStyle: { color: '#06b6d4' } },
                    { value: 70, name: 'AutoConfigurationImportSelector', itemStyle: { color: '#10b981' } },
                    { value: 55, name: '加载配置类列表', itemStyle: { color: '#f59e0b' } },
                    { value: 40, name: '@Conditional 条件判断', itemStyle: { color: '#ef4444' } },
                    { value: 25, name: '注入满足条件的Bean', itemStyle: { color: '#8b5cf6' } }
                ]
            }
        ]
    };

    // 条件注解统计图
    const conditionalAnnotationsOption = {
        title: {
            text: '常用条件注解分类',
            left: 'center',
            textStyle: {
                fontSize: 14,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}个 ({d}%)'
        },
        series: [
            {
                name: '条件注解',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '12',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 8, name: 'Class相关', itemStyle: { color: '#3b82f6' } },
                    { value: 6, name: 'Bean相关', itemStyle: { color: '#10b981' } },
                    { value: 4, name: 'Property相关', itemStyle: { color: '#f59e0b' } },
                    { value: 3, name: 'Resource相关', itemStyle: { color: '#ef4444' } },
                    { value: 2, name: 'Web相关', itemStyle: { color: '#8b5cf6' } }
                ]
            }
        ]
    };

    return (
        <QuestionCard key={id} question={{
            id,
            title: "请解释SpringBoot的自动配置原理",
            category: "SpringBoot",
            content: "详细说明SpringBoot自动配置的工作机制、核心组件和实现原理。",
            tags: ["自动配置", "@EnableAutoConfiguration", "条件注解", "原理"]
        }}>
            <div className="space-y-6">
                {/* 核心概念 */}
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">自动配置核心思想</h4>
                    <p className="text-blue-700">
                        SpringBoot自动配置是通过 <code className="bg-blue-200 px-1 rounded">@EnableAutoConfiguration</code> 注解
                        （包含在 <code className="bg-blue-200 px-1 rounded">@SpringBootApplication</code> 中）实现的。
                        它会根据classpath中的jar包、类和properties来自动配置beans，大大减少了手动配置的工作量。
                    </p>
                </div>

                {/* 自动配置流程图 */}
                <div className="chart-container">
                    <ReactECharts 
                        option={autoConfigFlowOption}
                        style={{ height: '400px', width: '100%' }}
                    />
                </div>

                {/* 详细步骤说明 */}
                <div>
                    <h4 className="font-semibold text-gray-800 mb-4">🔄 自动配置详细流程</h4>
                    <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                            <div className="flex-1">
                                <h5 className="font-semibold text-gray-800">@SpringBootApplication 启动</h5>
                                <p className="text-gray-600 text-sm mt-1">
                                    应用启动时，<code className="bg-gray-200 px-1 rounded">@SpringBootApplication</code> 
                                    复合注解包含了 <code className="bg-gray-200 px-1 rounded">@EnableAutoConfiguration</code>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                            <div className="flex-1">
                                <h5 className="font-semibold text-gray-800">@EnableAutoConfiguration 激活</h5>
                                <p className="text-gray-600 text-sm mt-1">
                                    通过 <code className="bg-gray-200 px-1 rounded">@Import(AutoConfigurationImportSelector.class)</code> 
                                    导入选择器类
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                            <div className="flex-1">
                                <h5 className="font-semibold text-gray-800">加载配置类候选列表</h5>
                                <p className="text-gray-600 text-sm mt-1">
                                    <code className="bg-gray-200 px-1 rounded">AutoConfigurationImportSelector</code> 
                                    读取 <code className="bg-gray-200 px-1 rounded">META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports</code> 
                                    (SpringBoot 2.7+) 或 <code className="bg-gray-200 px-1 rounded">META-INF/spring.factories</code> (旧版本)
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                            <div className="flex-1">
                                <h5 className="font-semibold text-gray-800">条件评估过滤</h5>
                                <p className="text-gray-600 text-sm mt-1">
                                    使用各种 <code className="bg-gray-200 px-1 rounded">@ConditionalOn...</code> 
                                    注解判断当前环境是否满足自动配置条件
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                            <div className="flex-1">
                                <h5 className="font-semibold text-gray-800">实例化配置类</h5>
                                <p className="text-gray-600 text-sm mt-1">
                                    满足条件的自动配置类被实例化，其中的 <code className="bg-gray-200 px-1 rounded">@Bean</code> 
                                    方法被执行，相关Bean注入到Spring容器
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">6</div>
                            <div className="flex-1">
                                <h5 className="font-semibold text-gray-800">完成自动配置</h5>
                                <p className="text-gray-600 text-sm mt-1">
                                    所有符合条件的Bean被成功注册到Spring容器中，应用启动完成
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 条件注解详解 */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-3">📋 常用条件注解</h4>
                        <div className="space-y-3">
                            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <h5 className="font-medium text-blue-800 text-sm">Class 相关</h5>
                                <ul className="text-blue-700 text-xs space-y-1 mt-1">
                                    <li><code>@ConditionalOnClass</code> - 类路径存在指定类</li>
                                    <li><code>@ConditionalOnMissingClass</code> - 类路径不存在指定类</li>
                                </ul>
                            </div>

                            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                <h5 className="font-medium text-green-800 text-sm">Bean 相关</h5>
                                <ul className="text-green-700 text-xs space-y-1 mt-1">
                                    <li><code>@ConditionalOnBean</code> - 容器中存在指定Bean</li>
                                    <li><code>@ConditionalOnMissingBean</code> - 容器中不存在指定Bean</li>
                                    <li><code>@ConditionalOnSingleCandidate</code> - 容器中只有一个候选Bean</li>
                                </ul>
                            </div>

                            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                                <h5 className="font-medium text-amber-800 text-sm">Property 相关</h5>
                                <ul className="text-amber-700 text-xs space-y-1 mt-1">
                                    <li><code>@ConditionalOnProperty</code> - 指定属性有指定值</li>
                                </ul>
                            </div>

                            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                                <h5 className="font-medium text-red-800 text-sm">Resource 相关</h5>
                                <ul className="text-red-700 text-xs space-y-1 mt-1">
                                    <li><code>@ConditionalOnResource</code> - 类路径存在指定资源</li>
                                </ul>
                            </div>

                            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                                <h5 className="font-medium text-purple-800 text-sm">Web 相关</h5>
                                <ul className="text-purple-700 text-xs space-y-1 mt-1">
                                    <li><code>@ConditionalOnWebApplication</code> - Web应用环境</li>
                                    <li><code>@ConditionalOnNotWebApplication</code> - 非Web应用环境</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-800 mb-3">📊 条件注解分布</h4>
                        <div className="chart-container">
                            <ReactECharts 
                                option={conditionalAnnotationsOption}
                                style={{ height: '300px', width: '100%' }}
                            />
                        </div>
                    </div>
                </div>

                {/* 自动配置示例 */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-3">💡 自动配置示例：DataSource</h4>
                    <div className="bg-gray-800 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                        <pre>{`@Configuration
@ConditionalOnClass({DataSource.class, EmbeddedDatabaseType.class})
@ConditionalOnMissingBean(type = "javax.sql.DataSource")
@EnableConfigurationProperties(DataSourceProperties.class)
@Import({DataSourcePoolMetadataProvidersConfiguration.class})
public class DataSourceAutoConfiguration {

    @Configuration
    @Conditional(EmbeddedDatabaseCondition.class)
    @ConditionalOnMissingBean
    @Import(EmbeddedDataSourceConfiguration.class)
    protected static class EmbeddedDatabaseConfiguration { }

    @Configuration
    @ConditionalOnProperty(name = "spring.datasource.type")
    protected static class Generic {
        @Bean
        @ConditionalOnMissingBean
        public DataSource dataSource(DataSourceProperties properties) {
            return DataSourceBuilder.create()
                .driverClassName(properties.determineDriverClassName())
                .url(properties.determineUrl())
                .username(properties.determineUsername())
                .password(properties.determinePassword())
                .build();
        }
    }
}`}</pre>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">
                        这个配置类只有在classpath中存在DataSource类、容器中没有DataSource Bean时才会生效，
                        并会根据配置文件中的属性自动创建数据源。
                    </p>
                </div>

                {/* 自定义Starter */}
                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <h4 className="font-semibold text-indigo-800 mb-3">🛠️ 如何创建自定义Starter</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <h5 className="font-medium text-indigo-700 mb-2">1. 创建自动配置类</h5>
                            <ul className="space-y-1 text-indigo-600 text-xs">
                                <li>• 使用 <code>@Configuration</code> 注解</li>
                                <li>• 添加适当的 <code>@ConditionalOn...</code> 注解</li>
                                <li>• 定义需要自动注入的Bean</li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-medium text-indigo-700 mb-2">2. 配置文件注册</h5>
                            <ul className="space-y-1 text-indigo-600 text-xs">
                                <li>• 在 <code>META-INF/spring/</code> 目录下</li>
                                <li>• 创建 <code>org.springframework.boot.autoconfigure.AutoConfiguration.imports</code></li>
                                <li>• 添加自动配置类的全限定名</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 常见易错点 */}
                <div className="p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
                    <h4 className="font-semibold text-amber-800 mb-2">⚠️ 易错点与深究</h4>
                    <ul className="text-amber-700 text-sm space-y-2">
                        <li>
                            <strong>误解：</strong> 不清楚 <code>@ConditionalOn...</code> 条件注解的具体作用和种类
                            <br />
                            <strong>正解：</strong> 这些注解是自动配置的核心，决定了配置类是否生效
                        </li>
                        <li>
                            <strong>误解：</strong> 对 <code>spring.factories</code> 或新版 <code>AutoConfiguration.imports</code> 机制不了解
                            <br />
                            <strong>正解：</strong> 这是SpringBoot发现和加载自动配置类的关键机制
                        </li>
                        <li>
                            <strong>误解：</strong> 认为自动配置会自动生效所有配置
                            <br />
                            <strong>正解：</strong> 只有满足条件注解要求的配置才会生效，这是一个智能的条件化过程
                        </li>
                    </ul>
                </div>
            </div>
        </QuestionCard>
    )
} 