import { QuestionCard } from "../../../../base/knowledge_question_card"
import ReactECharts from 'echarts-for-react';
import { useState } from 'react';

/**
 * MySQL 事务隔离级别详解
 */
export function MySQLTransactionIsolation({ id }: { id: string }) {
    const [selectedLevel, setSelectedLevel] = useState<string>('repeatable-read');

    // 隔离级别数据
    const isolationLevels = {
        'read-uncommitted': { 
            name: '读未提交', 
            dirty: '可能 ❌', 
            nonRepeatable: '可能 ❌', 
            phantom: '可能 ❌',
            performance: 10,
            consistency: 2
        },
        'read-committed': { 
            name: '读已提交', 
            dirty: '不可能 ✅', 
            nonRepeatable: '可能 ❌', 
            phantom: '可能 ❌',
            performance: 8,
            consistency: 5
        },
        'repeatable-read': { 
            name: '可重复读', 
            dirty: '不可能 ✅', 
            nonRepeatable: '不可能 ✅', 
            phantom: '不可能 ✅ (InnoDB)',
            performance: 6,
            consistency: 8
        },
        'serializable': { 
            name: '可串行化', 
            dirty: '不可能 ✅', 
            nonRepeatable: '不可能 ✅', 
            phantom: '不可能 ✅',
            performance: 2,
            consistency: 10
        }
    };

    // 性能vs一致性对比图
    const performanceConsistencyOption = {
        title: {
            text: '事务隔离级别：并发性能 vs 数据一致性',
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
            },
            formatter: function(params: any) {
                const level = params[0].name;
                const performance = params[0].value;
                const consistency = params[1].value;
                return `${level}<br/>并发性能: ${performance === 10 ? '高' : performance >= 5 ? '中' : '低'}<br/>数据一致性: ${consistency === 10 ? '高' : consistency >= 5 ? '中' : '低'}`;
            }
        },
        legend: {
            data: ['并发性能', '数据一致性'],
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
            data: ['读未提交', '读已提交', '可重复读', '可串行化']
        },
        yAxis: {
            type: 'value',
            max: 12,
            axisLabel: {
                formatter: function(value: number) {
                    if(value === 10) return '高';
                    if(value === 5) return '中';
                    if(value === 0) return '低';
                    return '';
                }
            }
        },
        series: [
            {
                name: '并发性能',
                type: 'bar',
                data: [10, 8, 6, 2],
                itemStyle: {
                    color: '#3b82f6'
                },
                borderRadius: 4
            },
            {
                name: '数据一致性',
                type: 'bar',
                data: [2, 5, 8, 10],
                itemStyle: {
                    color: '#10b981'
                },
                borderRadius: 4
            }
        ]
    };

    // ACID特性饼图
    const acidOption = {
        title: {
            text: 'ACID 特性组成',
            left: 'center',
            textStyle: {
                fontSize: 14,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}% ({d}%)'
        },
        series: [
            {
                name: 'ACID特性',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: true,
                    position: 'outside',
                    formatter: '{b}\n{c}%'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '12',
                        fontWeight: 'bold'
                    }
                },
                data: [
                    { value: 25, name: 'Atomicity\n原子性', itemStyle: { color: '#3b82f6' } },
                    { value: 25, name: 'Consistency\n一致性', itemStyle: { color: '#10b981' } },
                    { value: 25, name: 'Isolation\n隔离性', itemStyle: { color: '#f59e0b' } },
                    { value: 25, name: 'Durability\n持久性', itemStyle: { color: '#ef4444' } }
                ]
            }
        ]
    };

    return (
        <QuestionCard key={id} question={{
            id,
            title: "什么是MySQL事务？ACID特性？事务隔离级别？",
            category: "MySQL",
            content: "请详细解释MySQL事务的概念、ACID特性以及四种事务隔离级别的区别和应用场景。",
            tags: ["MySQL", "事务", "ACID", "隔离级别", "并发控制"]
        }}>
            <div className="space-y-6">
                {/* 事务基本概念 */}
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">MySQL 事务基本概念</h4>
                    <p className="text-blue-700">
                        事务（Transaction）是一组原子性的SQL操作序列，这些操作要么全部成功执行，
                        要么全部失败回滚。事务是数据库保证数据一致性和完整性的重要机制。
                    </p>
                </div>

                {/* ACID特性详解 */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-4">🏛️ ACID 特性详解</h4>
                        <div className="space-y-3">
                            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <h5 className="font-semibold text-blue-800 text-sm">⚛️ 原子性 (Atomicity)</h5>
                                <p className="text-blue-700 text-xs mt-1">
                                    事务中的所有操作要么全部成功，要么全部失败回滚。
                                    通过 undo log 实现回滚机制。
                                </p>
                            </div>

                            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                <h5 className="font-semibold text-green-800 text-sm">🎯 一致性 (Consistency)</h5>
                                <p className="text-green-700 text-xs mt-1">
                                    事务执行前后，数据库从一个一致性状态转换到另一个一致性状态。
                                    一致性是目标，A、I、D是手段。
                                </p>
                            </div>

                            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                <h5 className="font-semibold text-yellow-800 text-sm">🔒 隔离性 (Isolation)</h5>
                                <p className="text-yellow-700 text-xs mt-1">
                                    并发执行的事务之间不能互相干扰。
                                    通过锁机制和MVCC实现不同的隔离级别。
                                </p>
                            </div>

                            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                                <h5 className="font-semibold text-red-800 text-sm">💾 持久性 (Durability)</h5>
                                <p className="text-red-700 text-xs mt-1">
                                    事务一旦提交，其结果就是永久性的。
                                    通过 redo log 保证崩溃恢复。
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-800 mb-4">📊 ACID 特性组成</h4>
                        <div className="chart-container">
                            <ReactECharts 
                                option={acidOption}
                                style={{ height: '300px', width: '100%' }}
                            />
                        </div>
                    </div>
                </div>

                {/* 隔离级别交互式演示 */}
                <div>
                    <h4 className="font-semibold text-gray-800 mb-4">🔐 事务隔离级别交互式演示</h4>
                    
                    {/* 隔离级别选择按钮 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {Object.entries(isolationLevels).map(([key, level]) => (
                            <button 
                                key={key}
                                onClick={() => setSelectedLevel(key)}
                                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                                    selectedLevel === key 
                                        ? 'bg-blue-500 text-white font-semibold' 
                                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                }`}
                            >
                                {level.name} {key === 'repeatable-read' ? '(默认)' : ''}
                            </button>
                        ))}
                    </div>

                    {/* 并发问题对照表 */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs text-center border-collapse border border-gray-300">
                            <thead className="bg-gray-200 text-gray-700">
                                <tr>
                                    <th className="p-2 border border-gray-300">当前隔离级别</th>
                                    <th className="p-2 border border-gray-300">脏读</th>
                                    <th className="p-2 border border-gray-300">不可重复读</th>
                                    <th className="p-2 border border-gray-300">幻读</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600">
                                <tr className="border border-gray-300">
                                    <td className="p-2 font-medium border border-gray-300 bg-blue-50">
                                        {isolationLevels[selectedLevel as keyof typeof isolationLevels].name}
                                    </td>
                                    <td className={`p-2 border border-gray-300 ${
                                        isolationLevels[selectedLevel as keyof typeof isolationLevels].dirty.includes('❌') 
                                            ? 'text-red-500 font-semibold bg-red-50' 
                                            : 'text-green-500 font-semibold bg-green-50'
                                    }`}>
                                        {isolationLevels[selectedLevel as keyof typeof isolationLevels].dirty}
                                    </td>
                                    <td className={`p-2 border border-gray-300 ${
                                        isolationLevels[selectedLevel as keyof typeof isolationLevels].nonRepeatable.includes('❌') 
                                            ? 'text-red-500 font-semibold bg-red-50' 
                                            : 'text-green-500 font-semibold bg-green-50'
                                    }`}>
                                        {isolationLevels[selectedLevel as keyof typeof isolationLevels].nonRepeatable}
                                    </td>
                                    <td className={`p-2 border border-gray-300 ${
                                        isolationLevels[selectedLevel as keyof typeof isolationLevels].phantom.includes('❌') 
                                            ? 'text-red-500 font-semibold bg-red-50' 
                                            : 'text-green-500 font-semibold bg-green-50'
                                    }`}>
                                        {isolationLevels[selectedLevel as keyof typeof isolationLevels].phantom}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 性能vs一致性对比图 */}
                <div>
                    <h4 className="font-semibold text-gray-800 mb-4">⚖️ 性能与一致性权衡</h4>
                    <div className="chart-container">
                        <ReactECharts 
                            option={performanceConsistencyOption}
                            style={{ height: '350px', width: '100%' }}
                        />
                    </div>
                </div>

                {/* 并发问题详解 */}
                <div>
                    <h4 className="font-semibold text-gray-800 mb-4">🚨 并发问题详解</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                            <h5 className="font-semibold text-red-800 mb-2">脏读 (Dirty Read)</h5>
                            <p className="text-red-700 text-sm mb-2">
                                一个事务读取到另一个事务未提交的数据。
                            </p>
                            <div className="bg-red-100 p-2 rounded text-xs">
                                <strong>场景：</strong><br/>
                                事务A修改数据但未提交 → 事务B读取到修改后的数据 → 事务A回滚 → 事务B读到的是"脏"数据
                            </div>
                        </div>

                        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                            <h5 className="font-semibold text-orange-800 mb-2">不可重复读 (Non-repeatable Read)</h5>
                            <p className="text-orange-700 text-sm mb-2">
                                一个事务内多次读取同一行数据，结果不一致。
                            </p>
                            <div className="bg-orange-100 p-2 rounded text-xs">
                                <strong>场景：</strong><br/>
                                事务A读取数据 → 事务B修改并提交同一行数据 → 事务A再次读取，发现数据变了
                            </div>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <h5 className="font-semibold text-purple-800 mb-2">幻读 (Phantom Read)</h5>
                            <p className="text-purple-700 text-sm mb-2">
                                一个事务内多次查询，发现记录数量发生变化。
                            </p>
                            <div className="bg-purple-100 p-2 rounded text-xs">
                                <strong>场景：</strong><br/>
                                事务A查询符合条件的记录 → 事务B插入新记录并提交 → 事务A再次查询，发现多了新记录
                            </div>
                        </div>
                    </div>
                </div>

                {/* InnoDB实现机制 */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-3">🔧 InnoDB 隔离级别实现机制</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <h5 className="font-medium text-gray-700 mb-2">MVCC (多版本并发控制)</h5>
                            <ul className="space-y-1 text-gray-600 text-xs">
                                <li>• 为每行数据维护多个版本</li>
                                <li>• 通过事务ID和回滚段实现</li>
                                <li>• 读不阻塞写，写不阻塞读</li>
                                <li>• 用于 READ COMMITTED 和 REPEATABLE READ</li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-medium text-gray-700 mb-2">锁机制</h5>
                            <ul className="space-y-1 text-gray-600 text-xs">
                                <li>• Record Lock：锁定单个行记录</li>
                                <li>• Gap Lock：锁定索引间隙</li>
                                <li>• Next-Key Lock：Record + Gap，解决幻读</li>
                                <li>• 用于 SERIALIZABLE 级别</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* MySQL默认设置 */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-3">⚙️ MySQL 默认设置</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <h5 className="font-medium text-blue-700 mb-2">InnoDB 默认</h5>
                            <ul className="space-y-1 text-blue-600 text-xs">
                                <li>• 默认隔离级别：REPEATABLE READ</li>
                                <li>• 通过Next-Key Lock解决幻读</li>
                                <li>• 自动提交：autocommit=1</li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-medium text-blue-700 mb-2">查看和设置命令</h5>
                            <div className="bg-blue-100 p-2 rounded text-xs font-mono">
                                <div>-- 查看当前隔离级别</div>
                                <div>SELECT @@transaction_isolation;</div>
                                <div className="mt-1">-- 设置隔离级别</div>
                                <div>SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 常见易错点 */}
                <div className="p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
                    <h4 className="font-semibold text-amber-800 mb-2">⚠️ 易错点与深究</h4>
                    <ul className="text-amber-700 text-sm space-y-2">
                        <li>
                            <strong>误解：</strong> 一致性(C)是事务的实现手段
                            <br />
                            <strong>正解：</strong> 一致性是目的，原子性、隔离性、持久性是实现一致性的手段
                        </li>
                        <li>
                            <strong>误解：</strong> 不可重复读和幻读是一回事
                            <br />
                            <strong>正解：</strong> 不可重复读侧重于数据修改，幻读侧重于数据增删
                        </li>
                        <li>
                            <strong>误解：</strong> 不清楚InnoDB如何解决幻读
                            <br />
                            <strong>正解：</strong> 通过Next-Key Lock（Record Lock + Gap Lock）锁定记录和间隙
                        </li>
                        <li>
                            <strong>误解：</strong> 认为隔离级别越高越好
                            <br />
                            <strong>正解：</strong> 需要在并发性能和数据一致性之间找平衡，根据业务需求选择
                        </li>
                    </ul>
                </div>
            </div>
        </QuestionCard>
    )
} 