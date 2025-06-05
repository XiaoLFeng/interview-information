import { QuestionCard } from "../../../../base/knowledge_question_card"
import ReactECharts from 'echarts-for-react';

/**
 * # String、StringBuilder、StringBuffer的区别
 * 
 * @returns 
 */
export function JavaBasicsStringDifference({ id }: { id: string }) {
    const stringPerformanceOption = {
        title: {
            text: 'String操作性能对比',
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
            }
        },
        legend: {
            data: ['String', 'StringBuffer', 'StringBuilder'],
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
            data: ['少量操作', '中等操作', '大量操作']
        },
        yAxis: {
            type: 'value',
            name: '性能评分',
            max: 100
        },
        series: [
            {
                name: 'String',
                type: 'bar',
                data: [85, 40, 15],
                itemStyle: {
                    color: '#ff6b6b'
                }
            },
            {
                name: 'StringBuffer',
                type: 'bar',
                data: [70, 75, 80],
                itemStyle: {
                    color: '#4ecdc4'
                }
            },
            {
                name: 'StringBuilder',
                type: 'bar',
                data: [75, 85, 95],
                itemStyle: {
                    color: '#45b7d1'
                }
            }
        ]
    };

    return (
        <QuestionCard key={id} question={{
            id,
            title: "Java String、StringBuilder、StringBuffer的区别？",
            category: "字符串处理",
            content: "请解释String、StringBuilder、StringBuffer三者的区别及其适用场景。",
            tags: ["String", "StringBuilder", "StringBuffer", "性能优化"]
        }}>
            <div className="space-y-4">
                <div className="space-y-2">
                    <p><strong>String：</strong>不可变字符序列（`final char[] value`）。每次对<strong>String</strong>的操作（如拼接、替换）都会产生新的<strong>String</strong>对象，效率较低。适合少量字符串操作或字符串常量。</p>
                    <p><strong>StringBuilder：</strong>可变字符序列。非线程安全，效率高。适合单线程环境下大量字符串拼接操作。</p>
                    <p><strong>StringBuffer：</strong>可变字符序列。线程安全（方法基本都加了<strong>synchronized</strong>），效率相对较低。适合多线程环境下大量字符串拼接操作。</p>
                    <p><strong>性能：</strong><strong>StringBuilder</strong> &gt; <strong>StringBuffer</strong> &gt; <strong>String</strong> (在频繁修改时)</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <ReactECharts option={stringPerformanceOption} style={{ height: '300px' }} />
                </div>

                <div className="mt-3 p-3 bg-amber-50 border-l-4 border-amber-500 rounded">
                    <h4 className="font-semibold text-amber-700 mb-2">易错点与深究</h4>
                    <ul className="text-sm space-y-1">
                        <li>不清楚<strong>String</strong>不可变的具体原因（<strong>final</strong>修饰数组，且没有提供修改数组内容的方法）。</li>
                        <li>混淆三者线程安全性。</li>
                        <li>不了解`String s = "a" + "b" + "c";` 在编译期会优化为 `String s = "abc";`。而循环内拼接<strong>String</strong>则会创建大量对象。</li>
                    </ul>
                </div>
            </div>
        </QuestionCard>
    )
} 