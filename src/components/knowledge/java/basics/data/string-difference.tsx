import { QuestionCard } from "../../../../base/knowledge_question_card"
import { WarningCard } from "../../../../card/warning_card"
import { InfoCard } from "../../../../card/info_card"
import { PrimaryCard } from "../../../../card/primary_card"

/**
 * # String字符串类对比
 * String vs StringBuilder vs StringBuffer
 */
export function JavaBasicsStringDifference({ id }: { id: string }) {
    return (
        <QuestionCard key={id} question={{
            id,
            title: "Java String、StringBuilder、StringBuffer的区别？",
            category: "字符串处理",
            content: "请解释String、StringBuilder、StringBuffer三者的区别及其适用场景。",
            tags: ["String", "StringBuilder", "StringBuffer", "性能优化"]
        }}>
            <div className="space-y-6">
                {/* 三种字符串类型对比 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <PrimaryCard title="🔒 String">
                        <div className="space-y-2 text-sm">
                            <p><strong>特点：</strong>不可变对象</p>
                            <p><strong>底层：</strong>final char[]</p>
                            <p><strong>线程安全：</strong>是</p>
                            <p><strong>性能：</strong>频繁修改时差</p>
                            <div className="badge badge-warning">适合常量操作</div>
                        </div>
                    </PrimaryCard>

                    <PrimaryCard title="⚡ StringBuilder">
                        <div className="space-y-2 text-sm">
                            <p><strong>特点：</strong>可变字符序列</p>
                            <p><strong>底层：</strong>char[]数组</p>
                            <p><strong>线程安全：</strong>否</p>
                            <p><strong>性能：</strong>高效</p>
                            <div className="badge badge-success">单线程首选</div>
                        </div>
                    </PrimaryCard>

                    <PrimaryCard title="🔐 StringBuffer">
                        <div className="space-y-2 text-sm">
                            <p><strong>特点：</strong>可变字符序列</p>
                            <p><strong>底层：</strong>char[]数组</p>
                            <p><strong>线程安全：</strong>是(synchronized)</p>
                            <p><strong>性能：</strong>较低</p>
                            <div className="badge badge-info">多线程安全</div>
                        </div>
                    </PrimaryCard>
                </div>

                {/* 详细对比表格 */}
                <InfoCard title="详细特性对比">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full text-sm">
                            <thead>
                                <tr>
                                    <th>特性</th>
                                    <th>String</th>
                                    <th>StringBuilder</th>
                                    <th>StringBuffer</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-semibold">可变性</td>
                                    <td><span className="badge badge-error">不可变</span></td>
                                    <td><span className="badge badge-success">可变</span></td>
                                    <td><span className="badge badge-success">可变</span></td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">线程安全</td>
                                    <td><span className="badge badge-success">安全</span></td>
                                    <td><span className="badge badge-error">不安全</span></td>
                                    <td><span className="badge badge-success">安全</span></td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">性能(拼接)</td>
                                    <td><span className="badge badge-error">差</span></td>
                                    <td><span className="badge badge-success">最快</span></td>
                                    <td><span className="badge badge-warning">较快</span></td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">内存开销</td>
                                    <td><span className="badge badge-error">大</span></td>
                                    <td><span className="badge badge-success">小</span></td>
                                    <td><span className="badge badge-warning">中等</span></td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">JDK版本</td>
                                    <td>1.0+</td>
                                    <td>1.5+</td>
                                    <td>1.0+</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">适用场景</td>
                                    <td>字符串常量、少量操作</td>
                                    <td>单线程频繁拼接</td>
                                    <td>多线程频繁拼接</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </InfoCard>

                {/* 性能对比 */}
                <InfoCard title="性能分析">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-red-50 p-3 rounded border border-red-200">
                            <h5 className="font-semibold text-red-800 mb-2">🐌 String 性能问题</h5>
                            <ul className="space-y-1 text-red-700">
                                <li>• 每次拼接创建新对象</li>
                                <li>• 产生大量临时对象</li>
                                <li>• 频繁GC影响性能</li>
                                <li>• 时间复杂度：O(n²)</li>
                            </ul>
                        </div>
                        
                        <div className="bg-green-50 p-3 rounded border border-green-200">
                            <h5 className="font-semibold text-green-800 mb-2">🚀 StringBuilder 优势</h5>
                            <ul className="space-y-1 text-green-700">
                                <li>• 内部使用可变数组</li>
                                <li>• 自动扩容机制</li>
                                <li>• 减少对象创建</li>
                                <li>• 时间复杂度：O(n)</li>
                            </ul>
                        </div>
                        
                        <div className="bg-blue-50 p-3 rounded border border-blue-200">
                            <h5 className="font-semibold text-blue-800 mb-2">🔒 StringBuffer 特点</h5>
                            <ul className="space-y-1 text-blue-700">
                                <li>• 方法添加synchronized</li>
                                <li>• 多线程环境安全</li>
                                <li>• 性能略低于StringBuilder</li>
                                <li>• 现代开发较少使用</li>
                            </ul>
                        </div>
                    </div>
                </InfoCard>

                <WarningCard title="核心易错点">
                    <div className="space-y-3 text-sm">
                        <div>
                            <h5 className="font-semibold text-error">❌ String不可变误区</h5>
                            <div className="bg-base-200 p-3 rounded mt-2">
                                <p><strong>错误理解：</strong>String可以修改内容</p>
                                <p><strong>正确理解：</strong>String对象内容不可变，每次"修改"都创建新对象</p>
                                <code className="text-xs block mt-1">
                                    String s = "a"; s += "b"; // 创建了新的String对象
                                </code>
                            </div>
                        </div>
                        
                        <div>
                            <h5 className="font-semibold text-error">❌ 编译器优化陷阱</h5>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li><strong>编译时常量：</strong>"a" + "b" + "c" → "abc" (编译器优化)</li>
                                <li><strong>运行时拼接：</strong>循环中的 str += s 会创建大量对象</li>
                                <li><strong>误区：</strong>认为所有String拼接都会优化</li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-semibold text-error">❌ 选择使用误区</h5>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>单线程使用StringBuffer（性能浪费）</li>
                                <li>多线程共享StringBuilder（线程不安全）</li>
                                <li>简单字符串操作使用StringBuilder（过度优化）</li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-semibold text-error">❌ 容量设置疏忽</h5>
                            <p className="ml-2">创建StringBuilder时不设置初始容量，导致频繁扩容影响性能</p>
                            <code className="text-xs bg-base-200 p-1 rounded block mt-1">
                                StringBuilder sb = new StringBuilder(expectedSize); // 推荐
                            </code>
                        </div>
                    </div>
                </WarningCard>
            </div>
        </QuestionCard>
    )
} 