import { QuestionCard } from "../../../../base/knowledge_question_card"
import { WarningCard } from "../../../../card/warning_card"
import { InfoCard } from "../../../../card/info_card"
import { PrimaryCard } from "../../../../card/primary_card"

/**
 * # Java并发编程核心
 * 锁机制 + 线程池 + 并发工具
 */
export function JavaBasicsConcurrency({ id }: { id: string }) {
    return (
        <QuestionCard key={id} question={{
            id,
            title: "Java并发编程：synchronized, volatile, ReentrantLock, AQS, 线程池",
            category: "并发编程",
            content: "请解释Java并发编程中的关键概念和机制。",
            tags: ["并发", "synchronized", "volatile", "线程池", "AQS"]
        }}>
            <div className="space-y-6">
                {/* 核心锁机制对比 */}
                <InfoCard title="锁机制对比">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full text-sm">
                            <thead>
                                <tr>
                                    <th>锁类型</th>
                                    <th>层级</th>
                                    <th>可重入</th>
                                    <th>公平性</th>
                                    <th>中断响应</th>
                                    <th>性能</th>
                                    <th>适用场景</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-semibold">synchronized</td>
                                    <td>JVM内置</td>
                                    <td><span className="badge badge-success">是</span></td>
                                    <td><span className="badge badge-error">非公平</span></td>
                                    <td><span className="badge badge-error">不可</span></td>
                                    <td><span className="badge badge-warning">中等</span></td>
                                    <td>简单同步场景</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">ReentrantLock</td>
                                    <td>JDK实现</td>
                                    <td><span className="badge badge-success">是</span></td>
                                    <td><span className="badge badge-success">可选</span></td>
                                    <td><span className="badge badge-success">可</span></td>
                                    <td><span className="badge badge-success">高</span></td>
                                    <td>复杂同步需求</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">volatile</td>
                                    <td>JVM指令</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td><span className="badge badge-success">极高</span></td>
                                    <td>状态标记、可见性</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </InfoCard>

                {/* 三大核心概念 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <PrimaryCard title="🔒 synchronized">
                        <div className="space-y-2 text-sm">
                            <p><strong>特点：</strong>JVM内置，可重入</p>
                            <p><strong>锁对象：</strong></p>
                            <ul className="text-xs space-y-1 ml-2">
                                <li>• 实例方法 → this</li>
                                <li>• 静态方法 → Class对象</li>
                                <li>• 代码块 → 指定对象</li>
                            </ul>
                            <div className="badge badge-info">有锁升级优化</div>
                        </div>
                    </PrimaryCard>

                    <PrimaryCard title="⚡ volatile">
                        <div className="space-y-2 text-sm">
                            <p><strong>保证：</strong></p>
                            <ul className="text-xs space-y-1 ml-2">
                                <li>• <span className="text-success font-semibold">可见性</span></li>
                                <li>• <span className="text-success font-semibold">禁止重排序</span></li>
                                <li>• <span className="text-error font-semibold">不保证原子性</span></li>
                            </ul>
                            <div className="badge badge-warning">配合CAS使用</div>
                        </div>
                    </PrimaryCard>

                    <PrimaryCard title="🔧 ReentrantLock">
                        <div className="space-y-2 text-sm">
                            <p><strong>增强功能：</strong></p>
                            <ul className="text-xs space-y-1 ml-2">
                                <li>• tryLock() 尝试获取</li>
                                <li>• 可中断等待</li>
                                <li>• 公平锁选择</li>
                                <li>• 多个Condition</li>
                            </ul>
                            <div className="badge badge-error">必须手动释放</div>
                        </div>
                    </PrimaryCard>
                </div>

                {/* 线程池核心参数 */}
                <InfoCard title="线程池 ThreadPoolExecutor">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-3 rounded border border-blue-200">
                                <h5 className="font-semibold text-blue-800 mb-2">🔢 核心参数</h5>
                                <ul className="space-y-1 text-blue-700 text-sm">
                                    <li>• <strong>corePoolSize:</strong> 核心线程数</li>
                                    <li>• <strong>maximumPoolSize:</strong> 最大线程数</li>
                                    <li>• <strong>keepAliveTime:</strong> 空闲存活时间</li>
                                    <li>• <strong>workQueue:</strong> 任务队列</li>
                                    <li>• <strong>handler:</strong> 拒绝策略</li>
                                </ul>
                            </div>
                            
                            <div className="bg-green-50 p-3 rounded border border-green-200">
                                <h5 className="font-semibold text-green-800 mb-2">🔄 执行流程</h5>
                                <ol className="space-y-1 text-green-700 text-sm">
                                    <li>1. 核心线程处理</li>
                                    <li>2. 任务队列缓存</li>
                                    <li>3. 创建新线程(最大数内)</li>
                                    <li>4. 执行拒绝策略</li>
                                </ol>
                            </div>
                        </div>

                        <div className="bg-orange-50 p-3 rounded border border-orange-200">
                            <h5 className="font-semibold text-orange-800 mb-2">⚠️ 拒绝策略</h5>
                            <div className="grid grid-cols-2 gap-2 text-sm text-orange-700">
                                <div>• <strong>AbortPolicy:</strong> 抛异常(默认)</div>
                                <div>• <strong>CallerRunsPolicy:</strong> 调用者执行</div>
                                <div>• <strong>DiscardPolicy:</strong> 直接丢弃</div>
                                <div>• <strong>DiscardOldestPolicy:</strong> 丢弃最旧</div>
                            </div>
                        </div>
                    </div>
                </InfoCard>

                {/* AQS与并发工具 */}
                <InfoCard title="AQS与并发工具类">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <h5 className="font-semibold mb-2">🏗️ AQS (同步器框架)</h5>
                            <ul className="space-y-1">
                                <li>• 维护state状态和FIFO队列</li>
                                <li>• CAS修改状态，失败则入队</li>
                                <li>• ReentrantLock、Semaphore基于此</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h5 className="font-semibold mb-2">🧰 常用工具类</h5>
                            <ul className="space-y-1">
                                <li>• <strong>CountDownLatch:</strong> 倒计时器</li>
                                <li>• <strong>CyclicBarrier:</strong> 循环屏障</li>
                                <li>• <strong>Semaphore:</strong> 信号量</li>
                                <li>• <strong>ThreadLocal:</strong> 线程变量</li>
                            </ul>
                        </div>
                    </div>
                </InfoCard>

                <WarningCard title="核心易错点">
                    <div className="space-y-3 text-sm">
                        <div>
                            <h5 className="font-semibold text-error">❌ volatile 误区</h5>
                            <div className="bg-base-200 p-3 rounded mt-2">
                                <p><strong>错误认知：</strong>volatile能保证原子性</p>
                                <p><strong>正确理解：</strong>只保证可见性和禁止重排序，不保证原子性</p>
                                <code className="text-xs">i++ 操作需要 synchronized 或 AtomicInteger</code>
                            </div>
                        </div>
                        
                        <div>
                            <h5 className="font-semibold text-error">❌ ReentrantLock 使用陷阱</h5>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>忘记在finally中unlock()，导致死锁</li>
                                <li>lock()与unlock()不配对</li>
                                <li>在lock之前写业务代码，异常时无法释放锁</li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-semibold text-error">❌ 线程池使用误区</h5>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>使用Executors创建线程池（可能OOM）</li>
                                <li>不设置合理的队列大小</li>
                                <li>忘记shutdown()线程池</li>
                                <li>核心线程数设置不合理（CPU密集型vs IO密集型）</li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-semibold text-error">❌ ThreadLocal 内存泄漏</h5>
                            <p className="ml-2">使用完必须调用remove()，特别是在线程池环境中</p>
                        </div>
                    </div>
                </WarningCard>
            </div>
        </QuestionCard>
    )
} 