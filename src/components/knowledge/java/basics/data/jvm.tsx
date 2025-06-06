import { QuestionCard } from "../../../../base/knowledge_question_card"
import { WarningCard } from "../../../../card/warning_card"
import { InfoCard } from "../../../../card/info_card"
import { PrimaryCard } from "../../../../card/primary_card"

/**
 * # JVM核心知识
 * 内存模型 + 类加载 + 垃圾回收
 */
export function JavaBasicsJVM({ id }: { id: string }) {
    return (
        <QuestionCard key={id} question={{
            id,
            title: "JVM：运行时数据区、类加载、垃圾回收",
            category: "JVM",
            content: "请解释JVM的内存结构、类加载机制和垃圾回收原理。",
            tags: ["JVM", "内存模型", "类加载", "垃圾回收", "GC"]
        }}>
            <div className="space-y-6">
                {/* JVM运行时数据区 */}
                <InfoCard title="JVM运行时数据区">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-3 rounded border border-blue-200">
                            <h5 className="font-semibold text-blue-800 mb-2">🔒 线程私有</h5>
                            <div className="space-y-2 text-sm">
                                <div className="bg-white p-2 rounded shadow-sm">
                                    <strong>程序计数器(PC Register):</strong>
                                    <p className="text-xs text-gray-600">当前线程执行字节码的行号指示器</p>
                                </div>
                                <div className="bg-white p-2 rounded shadow-sm">
                                    <strong>Java虚拟机栈:</strong>
                                    <p className="text-xs text-gray-600">局部变量表、操作数栈、动态链接</p>
                                </div>
                                <div className="bg-white p-2 rounded shadow-sm">
                                    <strong>本地方法栈:</strong>
                                    <p className="text-xs text-gray-600">native方法服务</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-green-50 p-3 rounded border border-green-200">
                            <h5 className="font-semibold text-green-800 mb-2">🌐 线程共享</h5>
                            <div className="space-y-2 text-sm">
                                <div className="bg-white p-2 rounded shadow-sm">
                                    <strong>Java堆(Heap):</strong>
                                    <p className="text-xs text-gray-600">对象实例、数组，GC主要区域</p>
                                    <p className="text-xs text-green-600">新生代(Eden、S0、S1) + 老年代</p>
                                </div>
                                <div className="bg-white p-2 rounded shadow-sm">
                                    <strong>方法区/元空间:</strong>
                                    <p className="text-xs text-gray-600">类信息、常量池、静态变量</p>
                                    <p className="text-xs text-green-600">JDK8+改为直接内存中的元空间</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </InfoCard>

                {/* 类加载机制 */}
                <InfoCard title="类加载机制">
                    <div className="space-y-4">
                        <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                            <h5 className="font-semibold text-yellow-800 mb-2">📂 类加载过程</h5>
                            <div className="grid grid-cols-5 gap-2 text-sm">
                                <div className="bg-white p-2 rounded text-center">加载</div>
                                <div className="bg-white p-2 rounded text-center">验证</div>
                                <div className="bg-white p-2 rounded text-center">准备</div>
                                <div className="bg-white p-2 rounded text-center">解析</div>
                                <div className="bg-white p-2 rounded text-center">初始化</div>
                            </div>
                        </div>
                        
                        <div className="bg-purple-50 p-3 rounded border border-purple-200">
                            <h5 className="font-semibold text-purple-800 mb-2">👥 双亲委派模型</h5>
                            <div className="space-y-1 text-sm">
                                <div className="flex items-center justify-between bg-white p-2 rounded">
                                    <span><strong>启动类加载器:</strong> rt.jar核心API</span>
                                    <span className="badge badge-error">最高优先级</span>
                                </div>
                                <div className="flex items-center justify-between bg-white p-2 rounded">
                                    <span><strong>扩展类加载器:</strong> ext目录jar包</span>
                                    <span className="badge badge-warning">父委派</span>
                                </div>
                                <div className="flex items-center justify-between bg-white p-2 rounded">
                                    <span><strong>应用程序类加载器:</strong> classpath类</span>
                                    <span className="badge badge-info">默认</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </InfoCard>

                {/* 垃圾回收 */}
                <InfoCard title="垃圾回收(GC)">
                    <div className="space-y-4">
                        {/* GC算法 */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <PrimaryCard title="🧹 标记-清除">
                                <div className="text-sm space-y-1">
                                    <p><strong>过程:</strong>标记→清除</p>
                                    <p><strong>优点:</strong>算法简单</p>
                                    <p><strong>缺点:</strong>内存碎片</p>
                                </div>
                            </PrimaryCard>
                            
                            <PrimaryCard title="📋 标记-复制">
                                <div className="text-sm space-y-1">
                                    <p><strong>过程:</strong>复制存活对象</p>
                                    <p><strong>优点:</strong>无碎片，效率高</p>
                                    <p><strong>缺点:</strong>空间利用率低</p>
                                    <div className="badge badge-success">新生代首选</div>
                                </div>
                            </PrimaryCard>
                            
                            <PrimaryCard title="🔧 标记-整理">
                                <div className="text-sm space-y-1">
                                    <p><strong>过程:</strong>标记→整理→清除</p>
                                    <p><strong>优点:</strong>无碎片，空间利用率高</p>
                                    <p><strong>缺点:</strong>效率较低</p>
                                    <div className="badge badge-warning">老年代首选</div>
                                </div>
                            </PrimaryCard>
                        </div>

                        {/* 垃圾收集器对比 */}
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full text-sm">
                                <thead>
                                    <tr>
                                        <th>收集器</th>
                                        <th>类型</th>
                                        <th>算法</th>
                                        <th>STW时间</th>
                                        <th>吞吐量</th>
                                        <th>适用场景</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="font-semibold">Serial</td>
                                        <td>单线程</td>
                                        <td>复制/标记整理</td>
                                        <td><span className="badge badge-error">长</span></td>
                                        <td><span className="badge badge-warning">中</span></td>
                                        <td>客户端模式</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">ParNew</td>
                                        <td>多线程</td>
                                        <td>复制</td>
                                        <td><span className="badge badge-warning">中等</span></td>
                                        <td><span className="badge badge-success">高</span></td>
                                        <td>新生代+CMS</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">Parallel Scavenge</td>
                                        <td>多线程</td>
                                        <td>复制</td>
                                        <td><span className="badge badge-warning">中等</span></td>
                                        <td><span className="badge badge-success">很高</span></td>
                                        <td>注重吞吐量</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">CMS</td>
                                        <td>并发</td>
                                        <td>标记清除</td>
                                        <td><span className="badge badge-success">短</span></td>
                                        <td><span className="badge badge-warning">中</span></td>
                                        <td>注重响应时间</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">G1</td>
                                        <td>并发</td>
                                        <td>复制+标记整理</td>
                                        <td><span className="badge badge-success">可预测</span></td>
                                        <td><span className="badge badge-success">高</span></td>
                                        <td>大内存，低延迟</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">ZGC</td>
                                        <td>并发</td>
                                        <td>着色指针</td>
                                        <td><span className="badge badge-success">极短(&lt;10ms)</span></td>
                                        <td><span className="badge badge-success">高</span></td>
                                        <td>超大内存，极低延迟</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </InfoCard>

                {/* JVM调优参数 */}
                <InfoCard title="JVM调优常用参数">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <h5 className="font-semibold mb-2">💾 内存设置</h5>
                            <ul className="space-y-1">
                                <li><code className="bg-base-200 p-1 rounded">-Xms</code> 初始堆大小</li>
                                <li><code className="bg-base-200 p-1 rounded">-Xmx</code> 最大堆大小</li>
                                <li><code className="bg-base-200 p-1 rounded">-Xmn</code> 新生代大小</li>
                                <li><code className="bg-base-200 p-1 rounded">-XX:MetaspaceSize</code> 元空间初始大小</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h5 className="font-semibold mb-2">🔍 GC设置</h5>
                            <ul className="space-y-1">
                                <li><code className="bg-base-200 p-1 rounded">-XX:+UseG1GC</code> 使用G1收集器</li>
                                <li><code className="bg-base-200 p-1 rounded">-XX:+PrintGCDetails</code> 打印GC详情</li>
                                <li><code className="bg-base-200 p-1 rounded">-XX:MaxGCPauseMillis</code> GC停顿目标</li>
                                <li><code className="bg-base-200 p-1 rounded">-Xloggc:gc.log</code> GC日志文件</li>
                            </ul>
                        </div>
                    </div>
                </InfoCard>

                <WarningCard title="核心易错点">
                    <div className="space-y-3 text-sm">
                        <div>
                            <h5 className="font-semibold text-error">❌ 内存区域混淆</h5>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li><strong>JDK8之前：</strong>永久代(PermGen) → 存储类信息</li>
                                <li><strong>JDK8+：</strong>元空间(Metaspace) → 直接内存，避免OOM</li>
                                <li><strong>常量池：</strong>JDK7后字符串常量池移到堆中</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h5 className="font-semibold text-error">❌ GC类型理解错误</h5>
                            <div className="bg-base-200 p-3 rounded mt-2">
                                <p><strong>Minor GC：</strong>新生代GC，频繁但快速</p>
                                <p><strong>Major GC：</strong>老年代GC，通常和Full GC同时发生</p>
                                <p><strong>Full GC：</strong>整个堆+方法区，最慢，要避免频繁发生</p>
                            </div>
                        </div>

                        <div>
                            <h5 className="font-semibold text-error">❌ 双亲委派模型破坏</h5>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>SPI机制：通过线程上下文类加载器</li>
                                <li>热替换：OSGI、Spring Boot DevTools</li>
                                <li>Tomcat等容器的类加载器设计</li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-semibold text-error">❌ OOM类型区分</h5>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li><strong>Java heap space：</strong>堆内存溢出</li>
                                <li><strong>Metaspace：</strong>元空间溢出（类太多）</li>
                                <li><strong>Direct buffer memory：</strong>直接内存溢出</li>
                                <li><strong>StackOverflowError：</strong>栈溢出（递归太深）</li>
                            </ul>
                        </div>
                    </div>
                </WarningCard>
            </div>
        </QuestionCard>
    )
} 