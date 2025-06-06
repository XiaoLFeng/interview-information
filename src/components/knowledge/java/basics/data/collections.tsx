import { QuestionCard } from "../../../../base/knowledge_question_card"
import { WarningCard } from "../../../../card/warning_card"
import { InfoCard } from "../../../../card/info_card"
import { PrimaryCard } from "../../../../card/primary_card"

/**
 * # Java集合框架核心
 * Collection体系 + Map体系
 */
export function JavaBasicsCollections({ id }: { id: string }) {
    return (
        <QuestionCard key={id} question={{
            id,
            title: "Java集合框架：核心接口、实现类、特性对比",
            category: "集合框架",
            content: "请说明Java集合框架的核心接口和主要实现类，以及它们的特性对比。",
            tags: ["集合框架", "List", "Set", "Map", "Queue"]
        }}>
            <div className="space-y-6">
                {/* 集合框架结构 */}
                <InfoCard title="集合框架结构">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="bg-blue-50 p-3 rounded border border-blue-200">
                            <h5 className="font-semibold text-blue-800 mb-2">📦 Collection 体系</h5>
                            <ul className="space-y-1 text-blue-700">
                                <li>• <strong>List:</strong> 有序、可重复</li>
                                <li>• <strong>Set:</strong> 无序、不重复</li>
                                <li>• <strong>Queue:</strong> 队列结构</li>
                            </ul>
                        </div>
                        
                        <div className="bg-green-50 p-3 rounded border border-green-200">
                            <h5 className="font-semibold text-green-800 mb-2">🗂️ Map 体系</h5>
                            <ul className="space-y-1 text-green-700">
                                <li>• <strong>HashMap:</strong> 哈希表</li>
                                <li>• <strong>TreeMap:</strong> 红黑树</li>
                                <li>• <strong>LinkedHashMap:</strong> 有序HashMap</li>
                            </ul>
                        </div>
                    </div>
                </InfoCard>

                {/* List实现类对比 */}
                <InfoCard title="List 实现类对比">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full text-sm">
                            <thead>
                                <tr>
                                    <th>实现类</th>
                                    <th>底层结构</th>
                                    <th>查询</th>
                                    <th>增删</th>
                                    <th>线程安全</th>
                                    <th>适用场景</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-semibold">ArrayList</td>
                                    <td>动态数组</td>
                                    <td><span className="badge badge-success">O(1)</span></td>
                                    <td><span className="badge badge-error">O(n)</span></td>
                                    <td><span className="badge badge-error">否</span></td>
                                    <td>查询多，增删少</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">LinkedList</td>
                                    <td>双向链表</td>
                                    <td><span className="badge badge-error">O(n)</span></td>
                                    <td><span className="badge badge-success">O(1)</span></td>
                                    <td><span className="badge badge-error">否</span></td>
                                    <td>增删多，查询少</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">Vector</td>
                                    <td>动态数组</td>
                                    <td><span className="badge badge-success">O(1)</span></td>
                                    <td><span className="badge badge-error">O(n)</span></td>
                                    <td><span className="badge badge-success">是</span></td>
                                    <td>已过时，不推荐</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </InfoCard>

                {/* Map实现类对比 */}
                <InfoCard title="Map 实现类对比">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full text-sm">
                            <thead>
                                <tr>
                                    <th>实现类</th>
                                    <th>底层结构</th>
                                    <th>有序性</th>
                                    <th>线程安全</th>
                                    <th>null支持</th>
                                    <th>性能</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-semibold">HashMap</td>
                                    <td>数组+链表/红黑树</td>
                                    <td><span className="badge badge-error">无序</span></td>
                                    <td><span className="badge badge-error">否</span></td>
                                    <td><span className="badge badge-success">支持</span></td>
                                    <td><span className="badge badge-success">O(1)</span></td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">LinkedHashMap</td>
                                    <td>HashMap+双向链表</td>
                                    <td><span className="badge badge-success">插入/访问顺序</span></td>
                                    <td><span className="badge badge-error">否</span></td>
                                    <td><span className="badge badge-success">支持</span></td>
                                    <td><span className="badge badge-success">O(1)</span></td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">TreeMap</td>
                                    <td>红黑树</td>
                                    <td><span className="badge badge-success">自然/比较器排序</span></td>
                                    <td><span className="badge badge-error">否</span></td>
                                    <td><span className="badge badge-error">不支持</span></td>
                                    <td><span className="badge badge-warning">O(log n)</span></td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">ConcurrentHashMap</td>
                                    <td>分段锁/CAS</td>
                                    <td><span className="badge badge-error">无序</span></td>
                                    <td><span className="badge badge-success">是</span></td>
                                    <td><span className="badge badge-error">不支持</span></td>
                                    <td><span className="badge badge-success">O(1)</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </InfoCard>

                {/* Set实现类 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <PrimaryCard title="🔍 HashSet">
                        <div className="space-y-1 text-sm">
                            <p><strong>底层：</strong>HashMap</p>
                            <p><strong>特点：</strong>无序、去重</p>
                            <p><strong>性能：</strong>O(1)</p>
                        </div>
                    </PrimaryCard>

                    <PrimaryCard title="🔗 LinkedHashSet">
                        <div className="space-y-1 text-sm">
                            <p><strong>底层：</strong>LinkedHashMap</p>
                            <p><strong>特点：</strong>有序、去重</p>
                            <p><strong>性能：</strong>O(1)</p>
                        </div>
                    </PrimaryCard>

                    <PrimaryCard title="🌳 TreeSet">
                        <div className="space-y-1 text-sm">
                            <p><strong>底层：</strong>TreeMap</p>
                            <p><strong>特点：</strong>排序、去重</p>
                            <p><strong>性能：</strong>O(log n)</p>
                        </div>
                    </PrimaryCard>
                </div>

                <WarningCard title="核心易错点">
                    <div className="space-y-3 text-sm">
                        <div>
                            <h5 className="font-semibold text-error">❌ HashMap 底层误区</h5>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li><strong>JDK 1.8+：</strong>数组+链表+红黑树（链表长度≥8且数组长度≥64时转红黑树）</li>
                                <li><strong>扩容：</strong>负载因子0.75，容量翻倍，重新计算hash</li>
                                <li><strong>哈希冲突：</strong>链地址法，不是开放地址法</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h5 className="font-semibold text-error">❌ 线程安全性混淆</h5>
                            <div className="bg-base-200 p-3 rounded mt-2">
                                <p><strong>线程安全：</strong>Vector、Hashtable、ConcurrentHashMap</p>
                                <p><strong>线程不安全：</strong>ArrayList、HashMap、HashSet等</p>
                            </div>
                        </div>

                        <div>
                            <h5 className="font-semibold text-error">❌ fail-fast vs fail-safe</h5>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li><strong>fail-fast：</strong>ArrayList等，迭代时检测修改，抛ConcurrentModificationException</li>
                                <li><strong>fail-safe：</strong>ConcurrentHashMap等，迭代时复制或快照，不抛异常</li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-semibold text-error">❌ ArrayList vs LinkedList 选择</h5>
                            <p className="ml-2">不要盲目认为LinkedList增删就一定快，需要考虑：定位元素的时间 + 增删时间</p>
                        </div>
                    </div>
                </WarningCard>
            </div>
        </QuestionCard>
    )
} 