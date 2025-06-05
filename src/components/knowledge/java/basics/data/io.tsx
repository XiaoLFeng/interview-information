import { QuestionCard } from "../../../../base/knowledge_question_card"
import ReactECharts from 'echarts-for-react';

/**
 * # Java I/O模型
 * 
 * @returns 
 */
export function JavaBasicsIO({ id }: { id: string }) {
    const ioComparisonOption = {
        title: {
            text: 'I/O模型性能对比',
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
            data: ['并发连接数', 'CPU使用率(反向)', '内存使用率(反向)', '编程复杂度'],
            top: 30
        },
        xAxis: {
            type: 'category',
            data: ['BIO', 'NIO', 'AIO']
        },
        yAxis: {
            type: 'value',
            max: 100
        },
        series: [
            {
                name: '并发连接数',
                type: 'bar',
                data: [20, 85, 90],
                itemStyle: { color: '#ff6b6b' }
            },
            {
                name: 'CPU使用率(反向)',
                type: 'bar',
                data: [30, 70, 80],
                itemStyle: { color: '#4ecdc4' }
            },
            {
                name: '内存使用率(反向)',
                type: 'bar',
                data: [25, 75, 85],
                itemStyle: { color: '#45b7d1' }
            },
            {
                name: '编程复杂度',
                type: 'line',
                data: [20, 70, 90],
                itemStyle: { color: '#96ceb4' },
                yAxisIndex: 0
            }
        ]
    };

    return (
        <QuestionCard key={id} question={{
            id,
            title: "Java I/O模型：BIO, NIO, AIO的区别？",
            category: "I/O模型",
            content: "请解释Java中BIO、NIO、AIO三种I/O模型的特点和适用场景。",
            tags: ["I/O", "BIO", "NIO", "AIO", "网络编程"]
        }}>
            <div className="space-y-4">
                <div className="space-y-2">
                    <p><strong>BIO (Blocking I/O):</strong> 同步阻塞IO。一个连接一个线程，线程等待数据准备和IO操作完成。简单，但并发能力差。</p>
                    
                    <p><strong>NIO (Non-blocking I/O / New I/O):</strong> 同步非阻塞IO。基于事件驱动，<strong>Selector</strong>多路复用器轮询<strong>Channel</strong>事件。一个线程可处理多个连接。核心组件：<strong>Channel</strong>, <strong>Buffer</strong>, <strong>Selector</strong>。适合高并发、连接数多的场景（如<strong>Netty</strong>）。</p>
                    
                    <p><strong>AIO (Asynchronous I/O / NIO.2):</strong> 异步非阻塞IO。应用发起IO操作后立即返回，<strong>OS</strong>完成后通知应用。真正的异步，但底层实现复杂，依赖<strong>OS</strong>支持，用得相对较少。</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <ReactECharts option={ioComparisonOption} style={{ height: '350px' }} />
                </div>

                <div className="mt-3 p-3 bg-amber-50 border-l-4 border-amber-500 rounded">
                    <h4 className="font-semibold text-amber-700 mb-2">易错点与深究</h4>
                    <ul className="text-sm space-y-1">
                        <li>混淆同步/异步与阻塞/非阻塞概念。</li>
                        <li><strong>NIO</strong>核心组件及其关系不清楚。</li>
                        <li>零拷贝（<strong>Zero-copy</strong>）概念。</li>
                    </ul>
                </div>
            </div>
        </QuestionCard>
    )
} 