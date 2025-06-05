import { QuestionCard } from "../../../../base/knowledge_question_card"
import ReactECharts from 'echarts-for-react';

/**
 * # JVM相关
 * 
 * @returns 
 */
export function JavaBasicsJVM({ id }: { id: string }) {
    const jvmMemoryOption = {
        title: {
            text: 'JVM内存结构分布',
            left: 'center',
            textStyle: {
                fontSize: 16,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            top: 50,
            data: ['Java堆', '方法区/元空间', 'Java虚拟机栈', '程序计数器', '本地方法栈']
        },
        series: [
            {
                name: '内存占用',
                type: 'pie',
                radius: ['20%', '50%'],
                center: ['60%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '18',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 60, name: 'Java堆', itemStyle: { color: '#ff6b6b' } },
                    { value: 25, name: '方法区/元空间', itemStyle: { color: '#4ecdc4' } },
                    { value: 10, name: 'Java虚拟机栈', itemStyle: { color: '#45b7d1' } },
                    { value: 3, name: '程序计数器', itemStyle: { color: '#96ceb4' } },
                    { value: 2, name: '本地方法栈', itemStyle: { color: '#feca57' } }
                ]
            }
        ]
    };

    const gcPerformanceOption = {
        title: {
            text: '垃圾收集器性能对比',
            left: 'center',
            textStyle: {
                fontSize: 16,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['吞吐量', '停顿时间(反向)', '内存开销(反向)'],
            top: 30
        },
        radar: {
            indicator: [
                { name: 'Serial', max: 100 },
                { name: 'ParNew', max: 100 },
                { name: 'Parallel', max: 100 },
                { name: 'CMS', max: 100 },
                { name: 'G1', max: 100 },
                { name: 'ZGC', max: 100 }
            ]
        },
        series: [{
            name: '性能指标',
            type: 'radar',
            data: [
                {
                    value: [30, 50, 85, 70, 80, 90],
                    name: '吞吐量',
                    itemStyle: { color: '#ff6b6b' }
                },
                {
                    value: [20, 40, 60, 85, 75, 95],
                    name: '停顿时间(反向)',
                    itemStyle: { color: '#4ecdc4' }
                },
                {
                    value: [90, 80, 75, 60, 70, 50],
                    name: '内存开销(反向)',
                    itemStyle: { color: '#45b7d1' }
                }
            ]
        }]
    };

    return (
        <QuestionCard key={id} question={{
            id,
            title: "JVM：运行时数据区、类加载、垃圾回收",
            category: "JVM",
            content: "请解释JVM的内存结构、类加载机制和垃圾回收原理。",
            tags: ["JVM", "内存模型", "类加载", "垃圾回收", "GC"]
        }}>
            <div className="space-y-4">
                <h4 className="font-semibold"><strong>JVM</strong>运行时数据区</h4>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 p-4 bg-slate-100 rounded-lg">
                            <div className="space-y-2">
                                <div className="p-2 bg-teal-100 border border-teal-300 rounded text-center text-sm">程序计数器 (PC Register)</div>
                                <div className="p-2 bg-teal-100 border border-teal-300 rounded text-center text-sm">Java虚拟机栈 (JVM Stack)</div>
                                <div className="p-2 bg-teal-100 border border-teal-300 rounded text-center text-sm">本地方法栈 (Native Method Stack)</div>
                                <div className="text-xs text-center text-slate-500">线程私有</div>
                            </div>
                            <div className="space-y-2">
                                <div className="p-2 bg-blue-200 border border-blue-300 rounded text-center text-sm">Java堆 (Heap)</div>
                                <div className="p-2 bg-blue-200 border border-blue-300 rounded text-center text-sm">方法区/元空间 (Method Area/Metaspace)</div>
                                <div className="text-xs text-center text-slate-500">线程共享</div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2 bg-gray-50 p-4 rounded-lg">
                        <ReactECharts option={jvmMemoryOption} style={{ height: '300px' }} />
                    </div>
                </div>

                <p><strong>类加载机制：</strong>加载、验证、准备、解析、初始化。双亲委派模型。</p>
                
                <div>
                    <p><strong>垃圾回收(GC)：</strong></p>
                    <ul className="ml-4 space-y-1 text-sm">
                        <li>判断对象存活：引用计数法（有循环引用问题，<strong>Java</strong>不用）、可达性分析（<strong>GC Roots</strong>）。</li>
                        <li><strong>GC</strong>算法：标记-清除（碎片）、标记-复制（新生代）、标记-整理（老年代）。分代收集。</li>
                        <li>垃圾收集器：<strong>Serial</strong>, <strong>ParNew</strong>, <strong>Parallel Scavenge</strong> (吞吐量优先), <strong>CMS</strong> (低停顿), <strong>G1</strong> (可预测停顿, 区域化), <strong>ZGC</strong>, <strong>Shenandoah</strong> (极低停顿)。</li>
                        <li><strong>Minor GC</strong>/<strong>Young GC</strong> vs <strong>Full GC</strong>/<strong>Major GC</strong>。</li>
                    </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <ReactECharts option={gcPerformanceOption} style={{ height: '400px' }} />
                </div>

                <p><strong>JVM调优初步：</strong>常用参数如 <strong>-Xms</strong>, <strong>-Xmx</strong>, <strong>-Xmn</strong>, <strong>-XX:MetaspaceSize</strong>, <strong>-XX:MaxMetaspaceSize</strong>, <strong>-XX:+PrintGCDetails</strong>。</p>

                <div className="mt-3 p-3 bg-amber-50 border-l-4 border-amber-500 rounded">
                    <h4 className="font-semibold text-amber-700 mb-2">易错点与深究</h4>
                    <ul className="text-sm space-y-1">
                        <li>双亲委派模型及其破坏场景。</li>
                        <li>不同垃圾收集器的适用场景和工作原理。</li>
                        <li><strong>OOM</strong>和<strong>StackOverflowError</strong>的原因及排查。</li>
                        <li>强引用、软引用、弱引用、虚引用。</li>
                    </ul>
                </div>
            </div>
        </QuestionCard>
    )
} 