import { QuestionCard } from "../../../../base/knowledge_question_card"
import { WarningCard } from "../../../../card/warning_card"
import { InfoCard } from "../../../../card/info_card"
import { PrimaryCard } from "../../../../card/primary_card"

/**
 * # Java I/O模型对比
 * 核心：理解阻塞/非阻塞、同步/异步的区别
 */
export function JavaBasicsIO({ id }: { id: string }) {
    return (
        <QuestionCard key={id} question={{
            id,
            title: "Java I/O模型：BIO, NIO, AIO的区别？",
            category: "I/O模型",
            content: "请解释Java中BIO、NIO、AIO三种I/O模型的特点和适用场景。",
            tags: ["I/O", "BIO", "NIO", "AIO", "网络编程"]
        }}>
            <div className="space-y-6">
                {/* 三种IO模型对比 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <PrimaryCard title="🔒 BIO (阻塞IO)">
                        <div className="space-y-2 text-sm">
                            <p><strong>特点：</strong>同步阻塞</p>
                            <p><strong>模式：</strong>一连接一线程</p>
                            <p><strong>适用：</strong>连接数少且稳定</p>
                            <div className="badge badge-error">并发能力差</div>
                        </div>
                    </PrimaryCard>

                    <PrimaryCard title="⚡ NIO (非阻塞IO)">
                        <div className="space-y-2 text-sm">
                            <p><strong>特点：</strong>同步非阻塞</p>
                            <p><strong>模式：</strong>多路复用器</p>
                            <p><strong>适用：</strong>高并发场景</p>
                            <div className="badge badge-success">主流选择</div>
                        </div>
                    </PrimaryCard>

                    <PrimaryCard title="🚀 AIO (异步IO)">
                        <div className="space-y-2 text-sm">
                            <p><strong>特点：</strong>异步非阻塞</p>
                            <p><strong>模式：</strong>事件回调</p>
                            <p><strong>适用：</strong>超高并发</p>
                            <div className="badge badge-warning">实现复杂</div>
                        </div>
                    </PrimaryCard>
                </div>

                {/* 详细对比表格 */}
                <InfoCard title="详细对比表">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full text-sm">
                            <thead>
                                <tr>
                                    <th>特性</th>
                                    <th>BIO</th>
                                    <th>NIO</th>
                                    <th>AIO</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-semibold">IO方式</td>
                                    <td>同步阻塞</td>
                                    <td>同步非阻塞</td>
                                    <td>异步非阻塞</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">线程模型</td>
                                    <td>1个连接1个线程</td>
                                    <td>1个线程处理多个连接</td>
                                    <td>回调处理</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">并发能力</td>
                                    <td><span className="badge badge-error">低</span></td>
                                    <td><span className="badge badge-success">高</span></td>
                                    <td><span className="badge badge-success">极高</span></td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">编程复杂度</td>
                                    <td><span className="badge badge-success">简单</span></td>
                                    <td><span className="badge badge-warning">中等</span></td>
                                    <td><span className="badge badge-error">复杂</span></td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">核心组件</td>
                                    <td>Stream</td>
                                    <td>Channel+Buffer+Selector</td>
                                    <td>CompletionHandler</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">适用场景</td>
                                    <td>连接数少、并发度低</td>
                                    <td>连接数多、高并发</td>
                                    <td>超高并发、IO密集</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </InfoCard>

                {/* NIO核心组件 */}
                <InfoCard title="NIO核心三大组件">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-blue-50 p-3 rounded border border-blue-200">
                            <h5 className="font-semibold text-blue-800 mb-2">📡 Channel (通道)</h5>
                            <ul className="space-y-1 text-blue-700">
                                <li>• 双向数据传输</li>
                                <li>• FileChannel、SocketChannel</li>
                                <li>• 可配置阻塞/非阻塞模式</li>
                            </ul>
                        </div>
                        
                        <div className="bg-green-50 p-3 rounded border border-green-200">
                            <h5 className="font-semibold text-green-800 mb-2">💾 Buffer (缓冲区)</h5>
                            <ul className="space-y-1 text-green-700">
                                <li>• 数据容器</li>
                                <li>• position、limit、capacity</li>
                                <li>• flip()、clear()、compact()</li>
                            </ul>
                        </div>
                        
                        <div className="bg-purple-50 p-3 rounded border border-purple-200">
                            <h5 className="font-semibold text-purple-800 mb-2">🎯 Selector (选择器)</h5>
                            <ul className="space-y-1 text-purple-700">
                                <li>• 多路复用器</li>
                                <li>• 监听Channel事件</li>
                                <li>• SELECT、READ、WRITE、CONNECT</li>
                            </ul>
                        </div>
                    </div>
                </InfoCard>

                <WarningCard title="核心易错点">
                    <div className="space-y-3 text-sm">
                        <div>
                            <h5 className="font-semibold text-error">❌ 概念混淆</h5>
                            <div className="bg-base-200 p-3 rounded mt-2">
                                <p><strong>同步/异步：</strong>关注的是<span className="badge badge-info">消息通知机制</span></p>
                                <p><strong>阻塞/非阻塞：</strong>关注的是<span className="badge badge-warning">程序等待调用结果时的状态</span></p>
                            </div>
                        </div>
                        
                        <div>
                            <h5 className="font-semibold text-error">❌ NIO误区</h5>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>认为NIO一定比BIO快（小数据量时BIO可能更快）</li>
                                <li>不理解Buffer的状态转换（position、limit关系）</li>
                                <li>Selector的keys()和selectedKeys()混淆</li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-semibold text-error">❌ 零拷贝理解错误</h5>
                            <p className="ml-2">零拷贝指减少数据在内核空间和用户空间之间的拷贝次数，不是完全没有拷贝</p>
                        </div>
                    </div>
                </WarningCard>
            </div>
        </QuestionCard>
    )
} 