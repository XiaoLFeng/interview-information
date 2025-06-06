import { QuestionCard } from "../../../../base/knowledge_question_card"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { idea } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { PrimaryCard } from "../../../../card/primary_card"
import { SecondaryCard } from "../../../../card/secondary_card"
import { InfoCard } from "../../../../card/info_card"
import { WarningCard } from "../../../../card/warning_card"
import { SuccessCard } from "../../../../card/success_card"

/**
 * # 线程状态与进程线程区别详解
 * 深入分析 Java 线程生命周期和进程线程的本质区别
 */
export function JavaBasicsThreadProcess({ id }: { id: string }) {
    return (
        <QuestionCard question={{
            id,
            title: "线程状态与进程线程区别",
            category: "并发编程",
            content: "详细解释Java线程的生命周期状态，以及进程与线程的本质区别。",
            tags: ["线程状态", "生命周期", "进程", "线程", "并发编程"]
        }}>
            <div className="space-y-6">
                {/* Java线程状态概览 */}
                <PrimaryCard title="🔄 Java 线程状态详解">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-base-content">6种线程状态：</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
                                <h5 className="font-semibold text-primary mb-2">🆕 NEW</h5>
                                <p className="text-sm">线程对象已创建，但start()方法还未调用</p>
                            </div>
                            
                            <div className="bg-success/10 p-3 rounded-lg border border-success/20">
                                <h5 className="font-semibold text-success mb-2">🏃 RUNNABLE</h5>
                                <p className="text-sm">正在运行或等待CPU调度</p>
                            </div>
                            
                            <div className="bg-error/10 p-3 rounded-lg border border-error/20">
                                <h5 className="font-semibold text-error mb-2">🚫 BLOCKED</h5>
                                <p className="text-sm">等待监视器锁进入synchronized代码块</p>
                            </div>
                            
                            <div className="bg-warning/10 p-3 rounded-lg border border-warning/20">
                                <h5 className="font-semibold text-warning mb-2">⏳ WAITING</h5>
                                <p className="text-sm">无限期等待其他线程执行特定操作</p>
                            </div>
                            
                            <div className="bg-info/10 p-3 rounded-lg border border-info/20">
                                <h5 className="font-semibold text-info mb-2">⏰ TIMED_WAITING</h5>
                                <p className="text-sm">在指定时间内等待</p>
                            </div>
                            
                            <div className="bg-neutral/10 p-3 rounded-lg border border-neutral/20">
                                <h5 className="font-semibold text-neutral mb-2">💀 TERMINATED</h5>
                                <p className="text-sm">run()方法执行完毕或异常终止</p>
                            </div>
                        </div>

                        <h4 className="font-semibold text-base-content mt-6">线程状态转换示例：</h4>
                        <SyntaxHighlighter language="java" style={idea} className="rounded-lg">
{`public class ThreadStateDemo {
    public static void main(String[] args) throws InterruptedException {
        Object lock = new Object();
        
        Thread thread = new Thread(() -> {
            try {
                synchronized (lock) {
                    Thread.sleep(2000); // TIMED_WAITING
                    lock.wait(); // WAITING
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
        
        System.out.println("创建后: " + thread.getState()); // NEW
        
        thread.start();
        System.out.println("启动后: " + thread.getState()); // RUNNABLE
        
        Thread.sleep(100);
        System.out.println("运行中: " + thread.getState()); // TIMED_WAITING
        
        Thread.sleep(2000);
        System.out.println("等待中: " + thread.getState()); // WAITING
        
        synchronized (lock) {
            lock.notify();
        }
        
        thread.join();
        System.out.println("结束后: " + thread.getState()); // TERMINATED
    }
}`}
                        </SyntaxHighlighter>
                    </div>
                </PrimaryCard>

                {/* 状态转换详解 */}
                <InfoCard title="📊 线程状态转换详解">
                    <div className="space-y-4">
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <thead>
                                    <tr>
                                        <th>从状态</th>
                                        <th>到状态</th>
                                        <th>触发条件</th>
                                        <th>相关方法</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><span className="badge badge-primary">NEW</span></td>
                                        <td><span className="badge badge-success">RUNNABLE</span></td>
                                        <td>调用start()方法</td>
                                        <td><code>thread.start()</code></td>
                                    </tr>
                                    <tr>
                                        <td><span className="badge badge-success">RUNNABLE</span></td>
                                        <td><span className="badge badge-error">BLOCKED</span></td>
                                        <td>等待synchronized锁</td>
                                        <td><code>synchronized(obj)</code></td>
                                    </tr>
                                    <tr>
                                        <td><span className="badge badge-success">RUNNABLE</span></td>
                                        <td><span className="badge badge-warning">WAITING</span></td>
                                        <td>调用wait()、join()等</td>
                                        <td><code>obj.wait(), thread.join()</code></td>
                                    </tr>
                                    <tr>
                                        <td><span className="badge badge-success">RUNNABLE</span></td>
                                        <td><span className="badge badge-info">TIMED_WAITING</span></td>
                                        <td>调用sleep()、wait(timeout)等</td>
                                        <td><code>Thread.sleep(ms), obj.wait(ms)</code></td>
                                    </tr>
                                    <tr>
                                        <td><span className="badge badge-error">BLOCKED</span></td>
                                        <td><span className="badge badge-success">RUNNABLE</span></td>
                                        <td>获得synchronized锁</td>
                                        <td>锁被释放</td>
                                    </tr>
                                    <tr>
                                        <td><span className="badge badge-warning">WAITING</span></td>
                                        <td><span className="badge badge-success">RUNNABLE</span></td>
                                        <td>被notify()唤醒或join的线程结束</td>
                                        <td><code>obj.notify(), obj.notifyAll()</code></td>
                                    </tr>
                                    <tr>
                                        <td><span className="badge badge-info">TIMED_WAITING</span></td>
                                        <td><span className="badge badge-success">RUNNABLE</span></td>
                                        <td>超时或被唤醒</td>
                                        <td>时间到期或被中断</td>
                                    </tr>
                                    <tr>
                                        <td><span className="badge badge-success">RUNNABLE</span></td>
                                        <td><span className="badge badge-neutral">TERMINATED</span></td>
                                        <td>run()方法执行完毕</td>
                                        <td>正常结束或异常终止</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 className="font-semibold text-base-content">重要注意事项：</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li><strong>RUNNABLE状态：</strong>包含了操作系统的"运行"和"就绪"两种状态</li>
                            <li><strong>BLOCKED vs WAITING：</strong>BLOCKED专门指等待synchronized锁，WAITING是其他等待</li>
                            <li><strong>不可逆转换：</strong>TERMINATED状态无法转换到其他状态</li>
                            <li><strong>并发检查：</strong>线程状态可能在检查的瞬间发生变化</li>
                        </ul>
                    </div>
                </InfoCard>

                {/* 进程 vs 线程对比 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <SecondaryCard title="🏢 进程 (Process)">
                        <div className="space-y-3">
                            <p><strong>定义：</strong>操作系统进行资源分配和调度的基本单位</p>
                            
                            <h5 className="font-semibold text-base-content">主要特点：</h5>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>拥有独立的内存空间和系统资源</li>
                                <li>进程间完全隔离，一个进程崩溃不影响其他进程</li>
                                <li>创建和切换开销大（重量级）</li>
                                <li>需要特殊的IPC机制进行通信</li>
                            </ul>

                            <h5 className="font-semibold text-base-content">拥有的资源：</h5>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>独立的内存地址空间</li>
                                <li>文件句柄和网络连接</li>
                                <li>环境变量</li>
                                <li>进程ID (PID)</li>
                                <li>安全上下文</li>
                            </ul>
                        </div>
                    </SecondaryCard>

                    <InfoCard title="🧵 线程 (Thread)">
                        <div className="space-y-3">
                            <p><strong>定义：</strong>CPU调度的基本单位，轻量级进程</p>
                            
                            <h5 className="font-semibold text-base-content">主要特点：</h5>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>同一进程内的线程共享内存空间</li>
                                <li>线程间共享内存，一个线程异常可能影响整个进程</li>
                                <li>创建和切换开销小（轻量级）</li>
                                <li>通过共享内存直接通信</li>
                            </ul>

                            <h5 className="font-semibold text-base-content">独有的资源：</h5>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>程序计数器 (PC)</li>
                                <li>Java调用栈</li>
                                <li>本地方法栈</li>
                                <li>线程ID (TID)</li>
                                <li>线程私有变量</li>
                            </ul>
                        </div>
                    </InfoCard>
                </div>

                {/* 详细对比表 */}
                <InfoCard title="📋 进程 vs 线程详细对比">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>对比维度</th>
                                    <th>进程 (Process)</th>
                                    <th>线程 (Thread)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-semibold">定义</td>
                                    <td>资源分配的基本单位</td>
                                    <td>CPU调度的基本单位</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">内存空间</td>
                                    <td>独立的地址空间</td>
                                    <td>共享进程的地址空间</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">创建开销</td>
                                    <td><span className="badge badge-error">大(几ms到几十ms)</span></td>
                                    <td><span className="badge badge-success">小(几μs到几ms)</span></td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">切换开销</td>
                                    <td><span className="badge badge-error">大(需要切换地址空间)</span></td>
                                    <td><span className="badge badge-success">小(只需切换寄存器)</span></td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">通信方式</td>
                                    <td>IPC(管道、消息队列、共享内存)</td>
                                    <td>共享内存、方法调用</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">隔离性</td>
                                    <td><span className="badge badge-success">强隔离</span></td>
                                    <td><span className="badge badge-warning">弱隔离</span></td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">稳定性</td>
                                    <td>一个进程崩溃不影响其他进程</td>
                                    <td>一个线程崩溃可能导致整个进程终止</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">扩展性</td>
                                    <td>可跨机器分布</td>
                                    <td>只能在同一台机器上</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </InfoCard>

                {/* Java中的具体实现 */}
                <SuccessCard title="☕ Java中的线程实现">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-success-content">1. 线程创建方式：</h4>
                        <SyntaxHighlighter language="java" style={idea} className="rounded-lg">
{`// 方式1: 继承Thread类
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("当前线程: " + Thread.currentThread().getName());
        System.out.println("线程状态: " + Thread.currentThread().getState());
    }
}

// 方式2: 实现Runnable接口
class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Runnable在线程: " + Thread.currentThread().getName());
    }
}

// 方式3: 使用Callable和Future
class MyCallable implements Callable<String> {
    @Override
    public String call() throws Exception {
        Thread.sleep(1000);
        return "任务执行完成，线程: " + Thread.currentThread().getName();
    }
}

public class ThreadCreationDemo {
    public static void main(String[] args) throws Exception {
        // 使用Thread
        MyThread thread1 = new MyThread();
        thread1.start();
        
        // 使用Runnable
        Thread thread2 = new Thread(new MyRunnable(), "Worker-Thread");
        thread2.start();
        
        // 使用Callable
        ExecutorService executor = Executors.newSingleThreadExecutor();
        Future<String> future = executor.submit(new MyCallable());
        System.out.println("结果: " + future.get());
        executor.shutdown();
    }
}`}
                        </SyntaxHighlighter>

                        <h4 className="font-semibold text-success-content">2. 线程池管理：</h4>
                        <SyntaxHighlighter language="java" style={idea} className="rounded-lg">
{`// 线程池创建和管理
public class ThreadPoolDemo {
    public static void main(String[] args) {
        // 固定大小线程池
        ExecutorService fixedPool = Executors.newFixedThreadPool(4);
        
        // 缓存线程池
        ExecutorService cachedPool = Executors.newCachedThreadPool();
        
        // 单线程池
        ExecutorService singlePool = Executors.newSingleThreadExecutor();
        
        // 自定义线程池
        ThreadPoolExecutor customPool = new ThreadPoolExecutor(
            2,                      // 核心线程数
            4,                      // 最大线程数
            60L,                    // 空闲线程存活时间
            TimeUnit.SECONDS,       // 时间单位
            new LinkedBlockingQueue<>(100), // 工作队列
            new ThreadFactory() {   // 自定义线程工厂
                private AtomicInteger counter = new AtomicInteger(0);
                @Override
                public Thread newThread(Runnable r) {
                    Thread t = new Thread(r, "Custom-Worker-" + counter.incrementAndGet());
                    t.setDaemon(false);
                    return t;
                }
            },
            new ThreadPoolExecutor.CallerRunsPolicy() // 拒绝策略
        );
        
        // 提交任务
        for (int i = 0; i < 10; i++) {
            final int taskId = i;
            customPool.submit(() -> {
                try {
                    System.out.println("任务 " + taskId + " 在线程 " + 
                                     Thread.currentThread().getName() + " 中执行");
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            });
        }
        
        customPool.shutdown();
    }
}`}
                        </SyntaxHighlighter>
                    </div>
                </SuccessCard>

                {/* 内存模型和通信 */}
                <InfoCard title="🧠 Java内存模型与线程通信">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-base-content">线程内存模型：</h4>
                        <SyntaxHighlighter language="java" style={idea} className="rounded-lg">
{`public class ThreadMemoryDemo {
    // 共享变量（堆内存）
    private static volatile boolean flag = false;
    private static int sharedData = 0;
    
    // ThreadLocal变量（线程私有）
    private static ThreadLocal<Integer> threadLocal = ThreadLocal.withInitial(() -> 0);
    
    public static void main(String[] args) throws InterruptedException {
        // 线程1：修改共享数据
        Thread producer = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                sharedData = i;
                threadLocal.set(i * 10); // 设置线程私有数据
                System.out.println("生产者设置: sharedData=" + sharedData + 
                                 ", threadLocal=" + threadLocal.get());
                
                if (i == 3) {
                    flag = true; // volatile保证可见性
                }
                
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }, "Producer");
        
        // 线程2：读取共享数据
        Thread consumer = new Thread(() -> {
            threadLocal.set(999); // 每个线程有自己的ThreadLocal值
            
            while (!flag) { // 等待flag变为true
                try {
                    Thread.sleep(50);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
            
            System.out.println("消费者读取: sharedData=" + sharedData + 
                             ", threadLocal=" + threadLocal.get());
        }, "Consumer");
        
        producer.start();
        consumer.start();
        
        producer.join();
        consumer.join();
        
        // 清理ThreadLocal
        threadLocal.remove();
    }
}`}
                        </SyntaxHighlighter>

                        <h4 className="font-semibold text-base-content">线程间协作：</h4>
                        <SyntaxHighlighter language="java" style={idea} className="rounded-lg">
{`// 生产者-消费者模式
public class ProducerConsumerDemo {
    private final Queue<Integer> queue = new LinkedList<>();
    private final int CAPACITY = 5;
    private final Object lock = new Object();
    
    // 生产者
    class Producer implements Runnable {
        @Override
        public void run() {
            int value = 0;
            while (true) {
                synchronized (lock) {
                    // 队列满时等待
                    while (queue.size() == CAPACITY) {
                        try {
                            System.out.println("队列已满，生产者等待...");
                            lock.wait(); // 进入WAITING状态
                        } catch (InterruptedException e) {
                            Thread.currentThread().interrupt();
                            return;
                        }
                    }
                    
                    // 生产数据
                    queue.offer(++value);
                    System.out.println("生产者生产: " + value);
                    lock.notifyAll(); // 唤醒所有等待的线程
                }
                
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    break;
                }
            }
        }
    }
    
    // 消费者
    class Consumer implements Runnable {
        @Override
        public void run() {
            while (true) {
                synchronized (lock) {
                    // 队列空时等待
                    while (queue.isEmpty()) {
                        try {
                            System.out.println("队列为空，消费者等待...");
                            lock.wait(); // 进入WAITING状态
                        } catch (InterruptedException e) {
                            Thread.currentThread().interrupt();
                            return;
                        }
                    }
                    
                    // 消费数据
                    int value = queue.poll();
                    System.out.println("消费者消费: " + value);
                    lock.notifyAll(); // 唤醒所有等待的线程
                }
                
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    break;
                }
            }
        }
    }
    
    public void start() {
        new Thread(new Producer(), "Producer").start();
        new Thread(new Consumer(), "Consumer-1").start();
        new Thread(new Consumer(), "Consumer-2").start();
    }
    
    public static void main(String[] args) {
        new ProducerConsumerDemo().start();
    }
}`}
                        </SyntaxHighlighter>
                    </div>
                </InfoCard>

                {/* 最佳实践 */}
                <WarningCard title="⚠️ 线程使用注意事项与最佳实践">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-warning-content">常见问题：</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li><strong>死锁：</strong>多个线程相互等待对方释放资源</li>
                            <li><strong>竞态条件：</strong>多个线程并发修改共享资源导致数据不一致</li>
                            <li><strong>内存泄漏：</strong>ThreadLocal使用后未及时清理</li>
                            <li><strong>线程泄漏：</strong>线程池使用后未正确关闭</li>
                        </ul>

                        <h4 className="font-semibold text-warning-content">最佳实践：</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>优先使用线程池而不是直接创建线程</li>
                            <li>合理设置线程池参数，避免资源浪费或任务堆积</li>
                            <li>使用concurrent包下的线程安全集合</li>
                            <li>避免在finally块中调用可能阻塞的方法</li>
                            <li>使用ThreadLocal时记得调用remove()方法</li>
                            <li>优先使用不可变对象减少同步需求</li>
                        </ul>

                        <h4 className="font-semibold text-warning-content">性能考虑：</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>线程数量不是越多越好，过多会导致上下文切换开销</li>
                            <li>根据任务类型选择合适的线程池：CPU密集型任务使用较少线程，I/O密集型任务可以使用较多线程</li>
                            <li>避免频繁创建和销毁线程，使用线程池复用</li>
                            <li>合理使用volatile关键字，避免过度同步</li>
                        </ul>
                    </div>
                </WarningCard>
            </div>
        </QuestionCard>
    )
} 