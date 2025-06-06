import { QuestionCard } from "../../../../base/knowledge_question_card"
import ReactECharts from 'echarts-for-react';
import { WarningCard } from "../../../../card/warning_card";

/**
 * # Java并发编程
 * 
 * @returns 
 */
export function JavaBasicsConcurrency({ id }: { id: string }) {
    const concurrencyComparisonOption = {
        title: {
            text: '并发控制机制对比',
            left: 'center',
            textStyle: {
                fontSize: 16,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            top: 50
        },
        series: [
            {
                name: '性能开销',
                type: 'pie',
                radius: '50%',
                center: ['60%', '50%'],
                data: [
                    { value: 35, name: 'synchronized', itemStyle: { color: '#ff6b6b' } },
                    { value: 10, name: 'volatile', itemStyle: { color: '#4ecdc4' } },
                    { value: 25, name: 'ReentrantLock', itemStyle: { color: '#45b7d1' } },
                    { value: 30, name: 'CAS操作', itemStyle: { color: '#96ceb4' } }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    const threadPoolOption = {
        title: {
            text: '线程池工作流程',
            left: 'center',
            textStyle: {
                fontSize: 16,
                fontWeight: 'bold'
            }
        },
        xAxis: {
            type: 'category',
            data: ['新任务到达', '核心线程处理', '队列缓存', '最大线程', '拒绝策略']
        },
        yAxis: {
            type: 'value',
            name: '处理量',
            max: 100
        },
        series: [
            {
                data: [100, 80, 60, 40, 20],
                type: 'line',
                smooth: true,
                itemStyle: {
                    color: '#ff6b6b'
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'rgba(255, 107, 107, 0.8)'
                        }, {
                            offset: 1, color: 'rgba(255, 107, 107, 0.1)'
                        }]
                    }
                }
            }
        ],
        tooltip: {
            trigger: 'axis'
        }
    };

    return (
        <QuestionCard key={id} question={{
            id,
            title: "Java并发编程：synchronized, volatile, ReentrantLock, AQS, 线程池",
            category: "并发编程",
            content: "请解释Java并发编程中的关键概念和机制。",
            tags: ["并发", "synchronized", "volatile", "线程池", "AQS"]
        }}>
            <div className="space-y-4">
                <p><strong>synchronized：</strong>JVM内置锁。可修饰方法或代码块。锁对象：普通同步方法锁当前实例；静态同步方法锁当前类<strong>Class</strong>对象；同步代码块锁指定对象。可重入。JDK1.6后有锁升级优化（偏向锁、轻量级锁、重量级锁）。</p>
                
                <p><strong>volatile：</strong>保证共享变量的<span className="text-red-600 font-semibold">可见性</span>（修改立即对其他线程可见）和<span className="text-red-600 font-semibold">禁止指令重排序</span>。不保证原子性。适用场景：状态标记、双重检查锁定（<strong>DCL</strong>）中的实例变量。</p>
                
                <p><strong>ReentrantLock：</strong>JDK层面可重入锁。功能比<strong>synchronized</strong>更强大：可中断等待、可尝试获取锁（<strong>tryLock</strong>）、可实现公平锁、可绑定多个<strong>Condition</strong>对象实现精确唤醒。</p>
                
                <p><strong>AQS (AbstractQueuedSynchronizer)：</strong>并发包核心组件，一个用于构建锁和同步器的框架。<strong>ReentrantLock</strong>, <strong>Semaphore</strong>, <strong>CountDownLatch</strong>等都基于AQS。核心思想：维护一个共享资源状态(state)和一个FIFO等待队列。通过CAS修改state，线程获取资源失败则入队等待。</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <ReactECharts option={concurrencyComparisonOption} style={{ height: '300px' }} />
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <ReactECharts option={threadPoolOption} style={{ height: '300px' }} />
                    </div>
                </div>

                <div>
                    <p><strong>线程池 (ThreadPoolExecutor)：</strong></p>
                    <ul className="ml-4 space-y-1 text-sm">
                        <li>核心参数：<strong>corePoolSize</strong>, <strong>maximumPoolSize</strong>, <strong>keepAliveTime</strong>, <strong>unit</strong>, <strong>workQueue</strong>, <strong>threadFactory</strong>, <strong>handler</strong> (拒绝策略)。</li>
                        <li>工作流程：新任务 → 核心线程 → 任务队列 → 最大线程 → 拒绝策略。</li>
                        <li><strong>Executors</strong>工具类创建线程池的弊端（如<strong>FixedThreadPool</strong>的任务队列可能无限大导致OOM）。推荐手动创建<strong>ThreadPoolExecutor</strong>。</li>
                    </ul>
                </div>

                <p><strong>ThreadLocal：</strong>为每个线程提供变量副本，实现线程间数据隔离。常用于存储用户身份信息、数据库连接等。注意：使用完后及时<strong>remove()</strong>防止内存泄漏（尤其在线程池场景）。</p>

                <WarningCard title="易错点与深究">
                    <ul className="text-sm space-y-1">
                        <li><strong>volatile</strong>不能保证原子性，常与CAS配合使用。</li>
                        <li><strong>ReentrantLock</strong>忘记在<strong>finally</strong>中<strong>unlock()</strong>。</li>
                        <li>线程池拒绝策略不清楚。</li>
                        <li><strong>AQS</strong>原理和<strong>CAS</strong>操作。</li>
                        <li>死锁的产生条件和避免方法。</li>
                    </ul>
                </WarningCard>
            </div>
        </QuestionCard>
    )
} 