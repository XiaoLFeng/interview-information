import { QuestionCard } from "../../../../base/knowledge_question_card"
import ReactECharts from 'echarts-for-react';
import { WarningCard } from "../../../../card/warning_card";

/**
 * Redis 性能特性分析
 */
export function RedisPerformance({ id }: { id: string }) {
    // Redis性能优势雷达图
    const performanceRadarOption = {
        title: {
            text: 'Redis 性能特性分析',
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
                { name: '内存操作', max: 10 },
                { name: '单线程模型', max: 10 },
                { name: 'I/O多路复用', max: 10 },
                { name: '数据结构优化', max: 10 },
                { name: 'C语言实现', max: 10 },
                { name: '网络协议优化', max: 10 }
            ],
            radius: 80,
            splitNumber: 5,
            shape: 'polygon',
            splitArea: {
                areaStyle: {
                    color: [
                        'rgba(220, 38, 127, 0.1)',
                        'rgba(220, 38, 127, 0.2)',
                        'rgba(220, 38, 127, 0.3)',
                        'rgba(220, 38, 127, 0.4)',
                        'rgba(220, 38, 127, 0.5)'
                    ].reverse()
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(220, 38, 127, 0.5)'
                }
            }
        },
        series: [{
            type: 'radar',
            data: [{
                value: [10, 9, 9, 9, 8, 8],
                name: 'Redis',
                areaStyle: {
                    color: 'rgba(220, 38, 127, 0.3)'
                },
                lineStyle: {
                    color: '#dc267f',
                    width: 2
                },
                itemStyle: {
                    color: '#dc267f'
                }
            }]
        }]
    };

    // 内存vs磁盘性能对比
    const memoryVsDiskOption = {
        title: {
            text: '内存 vs 磁盘 性能对比',
            left: 'center',
            textStyle: {
                fontSize: 14,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function(params: any) {
                const dataIndex = params[0].dataIndex;
                const operations = ['顺序读取', '随机读取', '顺序写入', '随机写入'];
                const values = params[0].value;
                return `${operations[dataIndex]}<br/>速度: ${values} 操作/秒`;
            }
        },
        legend: {
            data: ['内存', '磁盘'],
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
            data: ['顺序读取', '随机读取', '顺序写入', '随机写入']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} ops/s'
            }
        },
        series: [
            {
                name: '内存',
                type: 'bar',
                data: [1000000, 800000, 900000, 700000],
                itemStyle: {
                    color: '#dc267f'
                }
            },
            {
                name: '磁盘',
                type: 'bar',
                data: [100000, 5000, 80000, 3000],
                itemStyle: {
                    color: '#3b82f6'
                }
            }
        ]
    };

    return (
        <QuestionCard key={id} question={{
            id,
            title: "Redis为什么这么快？",
            category: "Redis",
            content: "请分析Redis高性能的核心原因，包括内存操作、单线程模型、I/O多路复用等方面。",
            tags: ["Redis", "性能", "内存", "单线程", "I/O多路复用"]
        }}>
            <div className="space-y-6">
                {/* 基本概念 */}
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Redis 高性能核心</h4>
                    <p className="text-red-700">
                        Redis 能够达到每秒数十万到上百万次操作的高性能，主要得益于纯内存操作、
                        单线程模型避免锁竞争、高效的I/O多路复用、优化的数据结构以及C语言的高效实现。
                    </p>
                </div>

                {/* 性能特性雷达图 */}
                <div className="chart-container">
                    <ReactECharts 
                        option={performanceRadarOption}
                        style={{ height: '350px', width: '100%' }}
                    />
                </div>

                {/* 详细分析 */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <h5 className="font-semibold text-purple-800 mb-2">🚀 纯内存操作</h5>
                            <p className="text-purple-700 text-sm mb-2">
                                所有数据存储在内存中，避免了磁盘I/O的延迟。内存访问速度比磁盘快几个数量级。
                            </p>
                            <ul className="text-purple-600 text-xs space-y-1">
                                <li>• 内存访问：纳秒级（ns）</li>
                                <li>• 磁盘访问：毫秒级（ms）</li>
                                <li>• 速度差距：约100万倍</li>
                            </ul>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <h5 className="font-semibold text-blue-800 mb-2">🧵 单线程模型</h5>
                            <p className="text-blue-700 text-sm mb-2">
                                避免了多线程上下文切换和锁竞争的开销。Redis 6.0后引入多线程主要用于I/O处理。
                            </p>
                            <ul className="text-blue-600 text-xs space-y-1">
                                <li>• 无锁竞争，无上下文切换</li>
                                <li>• 命令原子性执行</li>
                                <li>• 简化内存模型</li>
                            </ul>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <h5 className="font-semibold text-green-800 mb-2">⚡ I/O多路复用</h5>
                            <p className="text-green-700 text-sm mb-2">
                                采用epoll（Linux）/kqueue（macOS）等高效的事件处理机制，一个线程处理大量连接。
                            </p>
                            <ul className="text-green-600 text-xs space-y-1">
                                <li>• 非阻塞I/O</li>
                                <li>• 事件驱动</li>
                                <li>• 高并发连接支持</li>
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                            <h5 className="font-semibold text-orange-800 mb-2">🏗️ 高效数据结构</h5>
                            <p className="text-orange-700 text-sm mb-2">
                                针对不同场景优化的数据结构，如SDS字符串、跳表、压缩列表等。
                            </p>
                            <ul className="text-orange-600 text-xs space-y-1">
                                <li>• SDS：简单动态字符串</li>
                                <li>• 跳表：有序集合的底层实现</li>
                                <li>• 压缩列表：节省内存</li>
                            </ul>
                        </div>

                        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                            <h5 className="font-semibold text-indigo-800 mb-2">⚙️ C语言实现</h5>
                            <p className="text-indigo-700 text-sm mb-2">
                                接近操作系统底层，执行效率高，内存管理精确。
                            </p>
                            <ul className="text-indigo-600 text-xs space-y-1">
                                <li>• 底层优化</li>
                                <li>• 精确内存控制</li>
                                <li>• 高效算法实现</li>
                            </ul>
                        </div>

                        <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                            <h5 className="font-semibold text-teal-800 mb-2">🌐 协议优化</h5>
                            <p className="text-teal-700 text-sm mb-2">
                                RESP协议简单高效，减少网络传输开销。
                            </p>
                            <ul className="text-teal-600 text-xs space-y-1">
                                <li>• 简单的文本协议</li>
                                <li>• 易于解析</li>
                                <li>• 低网络开销</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 性能对比图 */}
                <div>
                    <h4 className="font-semibold text-gray-800 mb-4">📊 内存 vs 磁盘性能对比</h4>
                    <div className="chart-container">
                        <ReactECharts 
                            option={memoryVsDiskOption}
                            style={{ height: '300px', width: '100%' }}
                        />
                    </div>
                </div>

                {/* 单线程模型详解 */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-3">🧵 单线程模型深度解析</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <h5 className="font-medium text-gray-700 mb-2">Redis 6.0 前</h5>
                            <div className="bg-gray-100 p-3 rounded text-sm">
                                <ul className="space-y-1 text-gray-600">
                                    <li>• 完全单线程处理</li>
                                    <li>• 网络I/O和命令执行都在主线程</li>
                                    <li>• 简单但可能成为瓶颈</li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h5 className="font-medium text-gray-700 mb-2">Redis 6.0 后</h5>
                            <div className="bg-blue-100 p-3 rounded text-sm">
                                <ul className="space-y-1 text-blue-600">
                                    <li>• 多线程处理网络I/O</li>
                                    <li>• 命令执行仍然单线程</li>
                                    <li>• 提高网络I/O处理能力</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 p-3 bg-yellow-50 rounded border border-yellow-200">
                        <p className="text-yellow-800 text-sm">
                            <strong>注意：</strong> Redis的"单线程"主要指命令执行是单线程的，
                            这保证了数据的一致性和简化了并发控制，但并不意味着Redis只有一个线程。
                        </p>
                    </div>
                </div>

                {/* I/O多路复用详解 */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-3">⚡ I/O多路复用技术</h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                            <h5 className="font-medium text-blue-700 mb-2">Linux - epoll</h5>
                            <ul className="space-y-1 text-blue-600 text-xs">
                                <li>• 高效的事件通知机制</li>
                                <li>• 支持边缘触发和水平触发</li>
                                <li>• 适合高并发场景</li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-medium text-blue-700 mb-2">macOS - kqueue</h5>
                            <ul className="space-y-1 text-blue-600 text-xs">
                                <li>• BSD系统的事件机制</li>
                                <li>• 支持多种事件类型</li>
                                <li>• 高性能事件处理</li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-medium text-blue-700 mb-2">Windows - select</h5>
                            <ul className="space-y-1 text-blue-600 text-xs">
                                <li>• 传统的多路复用机制</li>
                                <li>• 性能相对较低</li>
                                <li>• 连接数有限制</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 常见易错点 */}
                <WarningCard title="易错点与深究">
                    <ul className="text-sm space-y-1">
                        <li>
                            <strong>误解：</strong> 认为Redis是多线程执行命令
                            <br />
                            <strong>正解：</strong> Redis核心命令执行是单线程的，6.0后的多线程主要用于I/O处理
                        </li>
                        <li>
                            <strong>误解：</strong> 不了解I/O多路复用的具体模型
                            <br />
                            <strong>正解：</strong> 需要理解epoll、kqueue等底层实现机制
                        </li>
                        <li>
                            <strong>误解：</strong> 认为单线程就是性能瓶颈
                            <br />
                            <strong>正解：</strong> 对于内存操作，单线程避免了锁竞争，反而提高了效率
                        </li>
                        <li>
                            <strong>误解：</strong> 不清楚内存和磁盘的性能差距
                            <br />
                            <strong>正解：</strong> 内存访问比磁盘访问快几个数量级，这是Redis快的根本原因
                        </li>
                    </ul>
                </WarningCard>
            </div>
        </QuestionCard>
    )
} 