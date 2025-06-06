import { QuestionCard } from "../../../../base/knowledge_question_card"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { PrimaryCard } from "../../../../card/primary_card"
import { InfoCard } from "../../../../card/info_card"
import { WarningCard } from "../../../../card/warning_card"

/**
 * # Map实现类对比
 * HashMap vs Hashtable vs ConcurrentHashMap
 */
export function JavaBasicsMapComparison({ id }: { id: string }) {
    return (
        <QuestionCard question={{
            id,
            title: "HashMap vs Hashtable vs ConcurrentHashMap",
            category: "集合框架",
            content: "详细比较HashMap、Hashtable和ConcurrentHashMap的区别、性能和使用场景。",
            tags: ["HashMap", "Hashtable", "ConcurrentHashMap", "线程安全", "性能对比"]
        }}>
            <div className="space-y-6">
                {/* 三者概览对比 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <PrimaryCard title="🏃 HashMap">
                        <div className="space-y-2 text-sm">
                            <p><strong>线程安全：</strong><span className="badge badge-error">否</span></p>
                            <p><strong>Null支持：</strong><span className="badge badge-success">支持</span></p>
                            <p><strong>性能：</strong><span className="badge badge-success">高</span></p>
                            <p><strong>版本：</strong>JDK 1.2+</p>
                            <div className="badge badge-info">单线程首选</div>
                        </div>
                    </PrimaryCard>

                    <PrimaryCard title="🐌 Hashtable">
                        <div className="space-y-2 text-sm">
                            <p><strong>线程安全：</strong><span className="badge badge-warning">synchronized</span></p>
                            <p><strong>Null支持：</strong><span className="badge badge-error">不支持</span></p>
                            <p><strong>性能：</strong><span className="badge badge-error">低</span></p>
                            <p><strong>版本：</strong>JDK 1.0+</p>
                            <div className="badge badge-warning">已过时</div>
                        </div>
                    </PrimaryCard>

                    <PrimaryCard title="⚡ ConcurrentHashMap">
                        <div className="space-y-2 text-sm">
                            <p><strong>线程安全：</strong><span className="badge badge-success">分段锁/CAS</span></p>
                            <p><strong>Null支持：</strong><span className="badge badge-error">不支持</span></p>
                            <p><strong>性能：</strong><span className="badge badge-success">高并发</span></p>
                            <p><strong>版本：</strong>JDK 1.5+</p>
                            <div className="badge badge-success">并发首选</div>
                        </div>
                    </PrimaryCard>
                </div>

                {/* 详细特性对比表 */}
                <InfoCard title="详细特性对比">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full text-sm">
                            <thead>
                                <tr>
                                    <th>特性</th>
                                    <th>HashMap</th>
                                    <th>Hashtable</th>
                                    <th>ConcurrentHashMap</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-semibold">线程安全</td>
                                    <td><span className="badge badge-error">否</span></td>
                                    <td><span className="badge badge-warning">方法级synchronized</span></td>
                                    <td><span className="badge badge-success">分段锁/CAS</span></td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">Null键值</td>
                                    <td>1个null键,多个null值</td>
                                    <td>不允许</td>
                                    <td>不允许</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">单线程性能</td>
                                    <td><span className="badge badge-success">最高</span></td>
                                    <td><span className="badge badge-error">低</span></td>
                                    <td><span className="badge badge-info">较高</span></td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">多线程性能</td>
                                    <td>需外部同步</td>
                                    <td><span className="badge badge-error">竞争激烈</span></td>
                                    <td><span className="badge badge-success">优秀</span></td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">初始容量</td>
                                    <td>16</td>
                                    <td>11</td>
                                    <td>16</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">扩容策略</td>
                                    <td>× 2</td>
                                    <td>× 2 + 1</td>
                                    <td>× 2</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </InfoCard>

                {/* HashMap 核心特性 */}
                <InfoCard title="HashMap 核心实现 (JDK 8+)">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="bg-blue-50 p-3 rounded border border-blue-200">
                                <h5 className="font-semibold text-blue-800 mb-2">🏗️ 数据结构</h5>
                                <ul className="space-y-1 text-blue-700">
                                    <li>• 数组 + 链表 + 红黑树</li>
                                    <li>• 负载因子：0.75</li>
                                    <li>• 树化阈值：链表长度≥8且数组≥64</li>
                                    <li>• 扰动函数减少哈希冲突</li>
                                </ul>
                            </div>
                            
                            <div className="bg-green-50 p-3 rounded border border-green-200">
                                <h5 className="font-semibold text-green-800 mb-2">⚡ 性能优化</h5>
                                <ul className="space-y-1 text-green-700">
                                    <li>• 红黑树替代长链表</li>
                                    <li>• 优化hash算法</li>
                                    <li>• 容量总是2的幂次</li>
                                    <li>• 尾插法避免死循环</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                            <h5 className="font-semibold mb-2">基本使用</h5>
                            <SyntaxHighlighter language="java" style={oneDark} className="text-xs">
{`// 基本操作
Map<String, Integer> map = new HashMap<>();
map.put("key", 1);
map.putIfAbsent("key2", 2);
map.computeIfAbsent("key3", k -> k.length());

// 遍历
map.forEach((k, v) -> System.out.println(k + ":" + v));`}
                            </SyntaxHighlighter>
                        </div>
                    </div>
                </InfoCard>

                {/* ConcurrentHashMap演进 */}
                <InfoCard title="ConcurrentHashMap 技术演进">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-orange-50 p-3 rounded border border-orange-200">
                            <h5 className="font-semibold text-orange-800 mb-2">📋 JDK 7: 分段锁</h5>
                            <ul className="space-y-1 text-orange-700 text-sm">
                                <li>• Segment数组 + HashEntry数组</li>
                                <li>• 每个Segment独立锁</li>
                                <li>• 默认16个Segment</li>
                                <li>• 读不加锁，写加锁</li>
                            </ul>
                        </div>
                        
                        <div className="bg-purple-50 p-3 rounded border border-purple-200">
                            <h5 className="font-semibold text-purple-800 mb-2">🚀 JDK 8+: CAS + synchronized</h5>
                            <ul className="space-y-1 text-purple-700 text-sm">
                                <li>• Node数组 + 链表/红黑树</li>
                                <li>• CAS + 头节点synchronized</li>
                                <li>• 取消Segment设计</li>
                                <li>• 更细粒度的锁控制</li>
                            </ul>
                        </div>
                    </div>
                </InfoCard>

                <WarningCard title="核心易错点">
                    <div className="space-y-3 text-sm">
                        <div>
                            <h5 className="font-semibold text-error">❌ HashMap线程安全误区</h5>
                            <div className="bg-base-200 p-3 rounded mt-2">
                                <p><strong>错误认知：</strong>HashMap在并发下只是性能差一点</p>
                                <p><strong>实际危害：</strong>数据丢失、死循环、数据不一致</p>
                                <SyntaxHighlighter language="java" style={oneDark} className="text-xs mt-2">
{`// ❌ 多线程使用HashMap
Map<String, String> map = new HashMap<>();
// 可能导致死循环、数据丢失

// ✅ 正确做法
Map<String, String> map = new ConcurrentHashMap<>();`}
                                </SyntaxHighlighter>
                            </div>
                        </div>
                        
                        <div>
                            <h5 className="font-semibold text-error">❌ ConcurrentHashMap null值误区</h5>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>ConcurrentHashMap不允许null键或null值</li>
                                <li>原因：无法区分是真的null还是key不存在</li>
                                <li>多线程环境下null值语义不明确</li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-semibold text-error">❌ 容量设置误区</h5>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>不设置初始容量，导致频繁扩容</li>
                                <li>初始容量设置为期望大小(应该设置为期望大小/0.75)</li>
                                <li>不理解负载因子对性能的影响</li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-semibold text-error">❌ 使用场景选择错误</h5>
                            <div className="bg-base-200 p-2 rounded mt-1">
                                <p><strong>单线程：</strong>选择HashMap</p>
                                <p><strong>多线程读多写少：</strong>选择ConcurrentHashMap</p>
                                <p><strong>强一致性要求：</strong>外部加锁或使用Collections.synchronizedMap</p>
                            </div>
                        </div>
                    </div>
                </WarningCard>
            </div>
        </QuestionCard>
    )
} 