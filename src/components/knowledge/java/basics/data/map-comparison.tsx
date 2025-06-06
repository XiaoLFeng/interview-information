import { QuestionCard } from "../../../../base/knowledge_question_card"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { idea } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { PrimaryCard } from "../../../../card/primary_card"
import { SecondaryCard } from "../../../../card/secondary_card"
import { InfoCard } from "../../../../card/info_card"
import { WarningCard } from "../../../../card/warning_card"
import { SuccessCard } from "../../../../card/success_card"

/**
 * # HashMap vs Hashtable vs ConcurrentHashMap 详解
 * 深入分析 Java 中三种主要的 Map 实现及其演进历程
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 三者概览对比 */}
                <PrimaryCard title="🏃 HashMap">
                    <div className="space-y-3">
                        <p><strong>线程安全：</strong><span className="badge badge-error">非线程安全</span></p>
                        <p><strong>Null支持：</strong><span className="badge badge-success">允许null键值</span></p>
                        <p><strong>性能：</strong><span className="badge badge-success">高(无同步开销)</span></p>
                        <p><strong>引入版本：</strong>JDK 1.2</p>
                        <p><strong>使用场景：</strong>单线程或外部同步</p>
                    </div>
                </PrimaryCard>

                <SecondaryCard title="🐌 Hashtable">
                    <div className="space-y-3">
                        <p><strong>线程安全：</strong><span className="badge badge-warning">全方法同步</span></p>
                        <p><strong>Null支持：</strong><span className="badge badge-error">不允许null</span></p>
                        <p><strong>性能：</strong><span className="badge badge-error">低(同步开销大)</span></p>
                        <p><strong>引入版本：</strong>JDK 1.0</p>
                        <p><strong>使用场景：</strong>遗留代码兼容</p>
                    </div>
                </SecondaryCard>

                <InfoCard title="🚀 ConcurrentHashMap">
                    <div className="space-y-3">
                        <p><strong>线程安全：</strong><span className="badge badge-success">分段锁/CAS</span></p>
                        <p><strong>Null支持：</strong><span className="badge badge-error">不允许null</span></p>
                        <p><strong>性能：</strong><span className="badge badge-success">高并发优化</span></p>
                        <p><strong>引入版本：</strong>JDK 1.5</p>
                        <p><strong>使用场景：</strong>高并发读写环境</p>
                    </div>
                </InfoCard>
            </div>

            {/* 详细特性对比表 */}
            <div className="mt-6">
                <div className="bg-base-100 rounded-lg p-4 shadow-sm border border-base-300">
                    <h3 className="text-lg font-semibold text-base-content mb-4">📊 详细特性对比</h3>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
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
                                    <td className="font-semibold">线程安全机制</td>
                                    <td>非线程安全</td>
                                    <td>所有方法synchronized</td>
                                    <td>分段锁(JDK7)/CAS+synchronized(JDK8+)</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">Null键/值支持</td>
                                    <td>允许1个null键,多个null值</td>
                                    <td>不允许null键或值</td>
                                    <td>不允许null键或值</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">性能(单线程)</td>
                                    <td><span className="badge badge-success">高</span></td>
                                    <td><span className="badge badge-error">低(同步开销)</span></td>
                                    <td><span className="badge badge-info">较高</span></td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">性能(多线程)</td>
                                    <td>需外部同步,否则不安全</td>
                                    <td><span className="badge badge-error">低(争用严重)</span></td>
                                    <td><span className="badge badge-success">高(专为高并发设计)</span></td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">迭代器类型</td>
                                    <td>Iterator(快速失败)</td>
                                    <td>Enumeration(非快速失败)</td>
                                    <td>Iterator(弱一致性)</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">初始容量</td>
                                    <td>16</td>
                                    <td>11</td>
                                    <td>16</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">扩容策略</td>
                                    <td>容量 × 2</td>
                                    <td>容量 × 2 + 1</td>
                                    <td>容量 × 2</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* HashMap 详解 */}
            <div className="mt-6">
                <InfoCard title="HashMap 核心特性详解">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-base-content">核心特性：</h4>
                        <ul className="list-disc list-inside space-y-2 text-sm">
                            <li><strong>数据结构：</strong>数组 + 链表 + 红黑树(JDK8+)</li>
                            <li><strong>负载因子：</strong>默认0.75，平衡时间和空间</li>
                            <li><strong>扩容阈值：</strong>capacity × loadFactor</li>
                            <li><strong>树化阈值：</strong>链表长度 ≥ 8 且数组长度 ≥ 64</li>
                            <li><strong>哈希算法：</strong>扰动函数减少冲突</li>
                        </ul>

                        <h4 className="font-semibold text-base-content mt-4">基本使用示例：</h4>
                        <SyntaxHighlighter language="java" style={idea} className="rounded-lg">
{`// HashMap基本使用
Map<String, Integer> map = new HashMap<>();
map.put("apple", 5);
map.put("banana", 3);
map.put(null, 0); // 允许null键

// 指定初始容量和负载因子
Map<String, Integer> map2 = new HashMap<>(32, 0.75f);

// JDK 8+ 常用操作
map.putIfAbsent("orange", 2);
map.computeIfAbsent("grape", k -> k.length());
map.merge("apple", 2, Integer::sum);

// 遍历方式
map.forEach((key, value) -> 
    System.out.println(key + ": " + value));`}
                        </SyntaxHighlighter>
                    </div>
                </InfoCard>
            </div>

            {/* HashMap 线程安全问题 */}
            <div className="mt-6">
                <WarningCard title="HashMap 线程安全问题">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-warning-content mb-2">多线程环境下的问题：</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>数据丢失或不一致</li>
                            <li>死循环(JDK7扩容时)</li>
                            <li>ConcurrentModificationException</li>
                        </ul>

                        <h4 className="font-semibold text-warning-content mt-4 mb-2">解决方案：</h4>
                        <SyntaxHighlighter language="java" style={idea} className="rounded-lg">
{`// ❌ 多线程环境下的问题
Map<String, Integer> map = new HashMap<>();
// 并发修改可能导致数据丢失、死循环等问题

// ✅ 解决方案1: 外部同步
Map<String, Integer> syncMap = 
    Collections.synchronizedMap(new HashMap<>());

// ✅ 解决方案2: 使用ConcurrentHashMap
Map<String, Integer> concurrentMap = 
    new ConcurrentHashMap<>();

// ✅ 解决方案3: ThreadLocal
ThreadLocal<Map<String, Integer>> localMap = 
    ThreadLocal.withInitial(HashMap::new);

// ✅ 解决方案4: 使用锁
private final ReadWriteLock lock = new ReentrantReadWriteLock();
private final Map<String, Integer> map = new HashMap<>();

public Integer get(String key) {
    lock.readLock().lock();
    try {
        return map.get(key);
    } finally {
        lock.readLock().unlock();
    }
}`}
                        </SyntaxHighlighter>
                    </div>
                </WarningCard>
            </div>

            {/* ConcurrentHashMap 详解 */}
            <div className="mt-6">
                <InfoCard title="ConcurrentHashMap 并发优化详解">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-base-content">演进历程：</h4>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <h5 className="font-semibold text-info mb-2">JDK 1.7 - 分段锁</h5>
                                <SyntaxHighlighter language="java" style={idea} className="rounded-lg">
{`// JDK 1.7 分段锁机制
// 将数据分成多个Segment，每个Segment独立加锁
class ConcurrentHashMap<K,V> {
    final Segment<K,V>[] segments;
    
    static class Segment<K,V> extends ReentrantLock {
        volatile HashEntry<K,V>[] table;
        volatile int count;
        
        V put(K key, int hash, V value, boolean onlyIfAbsent) {
            lock(); // 只锁定当前段
            try {
                // 在当前段内进行操作
                return putInternal(key, hash, value, onlyIfAbsent);
            } finally {
                unlock();
            }
        }
    }
}`}
                                </SyntaxHighlighter>
                            </div>

                            <div>
                                <h5 className="font-semibold text-success mb-2">JDK 1.8+ - CAS + synchronized</h5>
                                <SyntaxHighlighter language="java" style={idea} className="rounded-lg">
{`// JDK 1.8+ 优化方案
// 使用Node数组 + CAS + synchronized

// 1. 无冲突时使用CAS
if (casTabAt(tab, i, null, new Node<K,V>(hash, key, value, null)))
    break; // 成功插入，无需加锁

// 2. 有冲突时synchronized锁定头节点
synchronized (f) {
    if (tabAt(tab, i) == f) {
        // 在synchronized块内进行链表或红黑树操作
        if (fh >= 0) {
            // 链表操作
        } else if (f instanceof TreeBin) {
            // 红黑树操作
        }
    }
}

// 3. size()方法优化 - 使用CounterCell
private transient volatile CounterCell[] counterCells;`}
                                </SyntaxHighlighter>
                            </div>
                        </div>

                        <h4 className="font-semibold text-base-content mt-4">关键优化点：</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li><strong>锁粒度细化：</strong>从Segment级别到Node级别</li>
                            <li><strong>CAS优化：</strong>无冲突情况下避免加锁</li>
                            <li><strong>红黑树：</strong>链表过长时转换为红黑树</li>
                            <li><strong>CounterCell：</strong>分布式计数，减少size()方法竞争</li>
                            <li><strong>弱一致性：</strong>迭代器不会抛出ConcurrentModificationException</li>
                        </ul>
                    </div>
                </InfoCard>
            </div>

            {/* Hashtable 历史问题 */}
            <div className="mt-6">
                <WarningCard title="Hashtable - 历史包袱与问题">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-warning-content mb-2">为什么不推荐使用：</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li><strong>性能差：</strong>方法级别的粗粒度同步，并发性能极差</li>
                            <li><strong>设计过时：</strong>继承自Dictionary类(已过时)</li>
                            <li><strong>命名不规范：</strong>不符合Java Bean规范</li>
                            <li><strong>功能受限：</strong>不允许null键值，限制了灵活性</li>
                        </ul>

                        <h4 className="font-semibold text-warning-content mt-4 mb-2">性能对比示例：</h4>
                        <SyntaxHighlighter language="java" style={idea} className="rounded-lg">
{`// 性能测试代码
public class MapPerformanceTest {
    public static void testConcurrentPerformance() {
        Map<Integer, String> hashtable = new Hashtable<>();
        Map<Integer, String> concurrentMap = new ConcurrentHashMap<>();
        
        // 10个线程并发写入
        ExecutorService executor = Executors.newFixedThreadPool(10);
        
        // Hashtable - 所有操作串行化
        long start1 = System.currentTimeMillis();
        for (int i = 0; i < 10; i++) {
            executor.submit(() -> {
                for (int j = 0; j < 10000; j++) {
                    hashtable.put(j, "value" + j); // 全局同步，性能差
                }
            });
        }
        // 等待完成...
        long time1 = System.currentTimeMillis() - start1;
        
        // ConcurrentHashMap - 高并发优化
        long start2 = System.currentTimeMillis();
        for (int i = 0; i < 10; i++) {
            executor.submit(() -> {
                for (int j = 0; j < 10000; j++) {
                    concurrentMap.put(j, "value" + j); // 细粒度锁，性能好
                }
            });
        }
        // 等待完成...
        long time2 = System.currentTimeMillis() - start2;
        
        // ConcurrentHashMap性能通常比Hashtable快3-5倍
    }
}`}
                        </SyntaxHighlighter>
                    </div>
                </WarningCard>
            </div>

            {/* 使用场景指南 */}
            <div className="mt-6">
                <SuccessCard title="使用场景选择指南">
                    <div className="space-y-3">
                        <h4 className="font-semibold text-success-content">HashMap - 单线程场景：</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>单线程应用或有外部同步机制</li>
                            <li>性能要求高，不需要线程安全</li>
                            <li>需要允许null键值的场景</li>
                            <li>简单的缓存或配置存储</li>
                        </ul>
                        
                        <h4 className="font-semibold text-success-content mt-4">ConcurrentHashMap - 高并发场景：</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>多线程高并发读写</li>
                            <li>Web应用的缓存层</li>
                            <li>共享配置或状态管理</li>
                            <li>需要高性能的线程安全Map</li>
                        </ul>
                        
                        <h4 className="font-semibold text-success-content mt-4">避免使用 Hashtable：</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>新项目中不推荐使用</li>
                            <li>如果必须使用，考虑用Collections.synchronizedMap(HashMap)替代</li>
                            <li>更好的选择：ConcurrentHashMap或外部同步的HashMap</li>
                        </ul>
                    </div>
                </SuccessCard>
            </div>

            {/* 最佳实践 */}
            <div className="mt-6">
                <InfoCard title="最佳实践建议">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-base-content">选择原则：</h4>
                        <div className="overflow-x-auto">
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <th>场景</th>
                                        <th>推荐选择</th>
                                        <th>理由</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>单线程</td>
                                        <td><span className="badge badge-success">HashMap</span></td>
                                        <td>性能最优，无同步开销</td>
                                    </tr>
                                    <tr>
                                        <td>多线程读多写少</td>
                                        <td><span className="badge badge-info">ConcurrentHashMap</span></td>
                                        <td>读操作无锁，写操作细粒度锁</td>
                                    </tr>
                                    <tr>
                                        <td>多线程频繁写</td>
                                        <td><span className="badge badge-info">ConcurrentHashMap</span></td>
                                        <td>专为高并发设计</td>
                                    </tr>
                                    <tr>
                                        <td>需要null键值</td>
                                        <td><span className="badge badge-success">HashMap + 外部同步</span></td>
                                        <td>ConcurrentHashMap不支持null</td>
                                    </tr>
                                    <tr>
                                        <td>遗留系统</td>
                                        <td><span className="badge badge-warning">谨慎保留Hashtable</span></td>
                                        <td>兼容性考虑，但建议迁移</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 className="font-semibold text-base-content mt-4">性能优化建议：</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>合理设置初始容量，避免频繁扩容</li>
                            <li>根据负载特征选择合适的负载因子</li>
                            <li>避免使用Object类型作为key，重写hashCode()和equals()</li>
                            <li>在高并发场景下，使用ConcurrentHashMap的原子操作方法</li>
                        </ul>
                    </div>
                </InfoCard>
            </div>
        </QuestionCard>
    )
} 