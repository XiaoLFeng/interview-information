import { QuestionCard } from "../../../../base/knowledge_question_card"
import ReactECharts from 'echarts-for-react';
import { WarningCard } from "../../../../card/warning_card";

/**
 * # Java集合框架
 * 
 * @returns 
 */
export function JavaBasicsCollections({ id }: { id: string }) {
    const collectionPerformanceOption = {
        title: {
            text: 'Java集合类性能对比',
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
            formatter: function(params: Array<{name: string, marker: string, seriesName: string, value: number}>) {
                let result = params[0].name + '<br/>';
                params.forEach((param) => {
                    const complexityMap: Record<string, string> = {
                        '100': 'O(1)',
                        '50': 'O(log n)',
                        '20': 'O(n)',
                        '10': 'O(n²)'
                    };
                    result += param.marker + param.seriesName + ': ' + (complexityMap[param.value.toString()] || param.value) + '<br/>';
                });
                return result;
            }
        },
        legend: {
            data: ['ArrayList', 'LinkedList', 'HashMap', 'TreeMap'],
            top: 30
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['随机访问', '顺序插入', '随机插入', '查找操作']
        },
        yAxis: {
            type: 'value',
            name: '性能评分',
            max: 100,
            axisLabel: {
                formatter: function(value: number) {
                    const complexityMap: Record<number, string> = {
                        100: 'O(1)',
                        50: 'O(log n)',
                        20: 'O(n)',
                        10: 'O(n²)'
                    };
                    return complexityMap[value] || value.toString();
                }
            }
        },
        series: [
            {
                name: 'ArrayList',
                type: 'bar',
                data: [100, 50, 20, 20],
                itemStyle: {
                    color: '#ff6b6b'
                }
            },
            {
                name: 'LinkedList',
                type: 'bar',
                data: [20, 100, 100, 20],
                itemStyle: {
                    color: '#4ecdc4'
                }
            },
            {
                name: 'HashMap',
                type: 'bar',
                data: [100, 100, 100, 100],
                itemStyle: {
                    color: '#45b7d1'
                }
            },
            {
                name: 'TreeMap',
                type: 'bar',
                data: [50, 50, 50, 50],
                itemStyle: {
                    color: '#96ceb4'
                }
            }
        ]
    };

    return (
        <QuestionCard key={id} question={{
            id,
            title: "Java集合框架：核心接口、实现类、特性对比",
            category: "集合框架",
            content: "请说明Java集合框架的核心接口和主要实现类，以及它们的特性对比。",
            tags: ["集合框架", "List", "Set", "Map", "Queue"]
        }}>
            <div className="space-y-4">
                <p><strong>核心接口：</strong><strong>Collection</strong> (根接口) → <strong>List</strong>, <strong>Set</strong>, <strong>Queue</strong>。以及 <strong>Map</strong> (独立接口)。</p>
                
                <div>
                    <p><strong>List (有序，可重复):</strong></p>
                    <ul className="ml-4 space-y-1 text-sm">
                        <li><strong>ArrayList</strong>: 底层动态数组。查询快(O(1))，增删慢(O(n))。线程不安全。</li>
                        <li><strong>LinkedList</strong>: 底层双向链表。查询慢(O(n))，增删快(O(1))。线程不安全。也实现<strong>Deque</strong>。</li>
                        <li><strong>Vector</strong>: 底层动态数组。线程安全 (方法<strong>synchronized</strong>)，效率低。基本被<strong>ArrayList</strong>+并发工具替代。</li>
                    </ul>
                </div>

                <div>
                    <p><strong>Set (元素唯一):</strong></p>
                    <ul className="ml-4 space-y-1 text-sm">
                        <li><strong>HashSet</strong>: 底层<strong>HashMap</strong> (key存元素, value存固定对象)。无序。线程不安全。</li>
                        <li><strong>LinkedHashSet</strong>: 继承<strong>HashSet</strong>，底层<strong>LinkedHashMap</strong>。有序 (按插入顺序)。线程不安全。</li>
                        <li><strong>TreeSet</strong>: 底层红黑树。有序 (自然排序或比较器排序)。线程不安全。</li>
                    </ul>
                </div>

                <div>
                    <p><strong>Map (键值对，Key唯一):</strong></p>
                    <ul className="ml-4 space-y-1 text-sm">
                        <li><strong>HashMap</strong> (JDK1.8+): 底层数组+链表/红黑树。无序。线程不安全。允许null键和null值。</li>
                        <li><strong>LinkedHashMap</strong>: 继承<strong>HashMap</strong>，额外维护双向链表记录插入顺序或访问顺序。</li>
                        <li><strong>TreeMap</strong>: 底层红黑树。Key有序。</li>
                        <li><strong>ConcurrentHashMap</strong> (JDK1.8+): 线程安全且高效。采用CAS+<strong>synchronized</strong>锁住哈希桶的头结点。</li>
                    </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <ReactECharts option={collectionPerformanceOption} style={{ height: '350px' }} />
                </div>

                <WarningCard title="易错点与深究">
                    <ul className="text-sm space-y-1">
                        <li><strong>HashMap</strong>的哈希函数、冲突解决、扩容机制细节。</li>
                        <li><strong>ConcurrentHashMap</strong>在JDK1.7和1.8+的实现差异。</li>
                        <li><strong>fail-fast</strong> 与 <strong>fail-safe</strong> 机制 (如<strong>ArrayList</strong> vs <strong>CopyOnWriteArrayList</strong>)。</li>
                    </ul>
                </WarningCard>
            </div>
        </QuestionCard>
    )
} 