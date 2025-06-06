import { QuestionCard } from "../../../../base/knowledge_question_card"
import { ExpandableCode } from "../../../../base/expandable_code"
import { InfoCard } from "../../../../card/info_card"
import { WarningCard } from "../../../../card/warning_card"
import { SuccessCard } from "../../../../card/success_card"

/**
 * # 类型转换与相等性: == vs. ===
 */
export function FrontJavaScriptEqualityComparison({ id }: { id: string }) {
    return (
        <QuestionCard question={{
            id,
            title: "类型转换与相等性: == vs. ===",
            category: "类型转换",
            content: "解释 JavaScript 中 == (宽松相等) 和 === (严格相等) 运算符的区别，包括它们如何处理类型转换、NaN、以及 +0 和 -0。",
            tags: ["==", "===", "类型转换", "NaN", "Object.is"]
        }}>
            <div className="space-y-6">
                {/* 三种比较方式对比 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <WarningCard title="== (宽松相等)">
                        <div className="space-y-2 text-sm">
                            <p><strong>特性：</strong>进行类型转换</p>
                            <p><strong>规则：</strong>复杂转换规则</p>
                            <p><strong>推荐：</strong><span className="badge badge-error">避免使用</span></p>
                            <p><strong>场景：</strong>null == undefined</p>
                        </div>
                    </WarningCard>

                    <SuccessCard title="=== (严格相等)">
                        <div className="space-y-2 text-sm">
                            <p><strong>特性：</strong>不进行类型转换</p>
                            <p><strong>规则：</strong>类型和值都相等</p>
                            <p><strong>推荐：</strong><span className="badge badge-success">首选</span></p>
                            <p><strong>特例：</strong>NaN !== NaN</p>
                        </div>
                    </SuccessCard>

                    <InfoCard title="Object.is()">
                        <div className="space-y-2 text-sm">
                            <p><strong>特性：</strong>精确比较</p>
                            <p><strong>规则：</strong>同值相等</p>
                            <p><strong>推荐：</strong><span className="badge badge-info">特殊场景</span></p>
                            <p><strong>特例：</strong>Object.is(+0, -0) 为 false</p>
                        </div>
                    </InfoCard>
                </div>

                {/* 比较结果表格 */}
                <InfoCard title="相等性比较对照表">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full text-sm">
                            <thead>
                                <tr>
                                    <th>x</th>
                                    <th>y</th>
                                    <th>==</th>
                                    <th>===</th>
                                    <th>Object.is</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>null</td>
                                    <td>undefined</td>
                                    <td><span className="badge badge-success">true</span></td>
                                    <td><span className="badge badge-error">false</span></td>
                                    <td><span className="badge badge-error">false</span></td>
                                </tr>
                                <tr>
                                    <td>0</td>
                                    <td>false</td>
                                    <td><span className="badge badge-success">true</span></td>
                                    <td><span className="badge badge-error">false</span></td>
                                    <td><span className="badge badge-error">false</span></td>
                                </tr>
                                <tr>
                                    <td>+0</td>
                                    <td>-0</td>
                                    <td><span className="badge badge-success">true</span></td>
                                    <td><span className="badge badge-success">true</span></td>
                                    <td><span className="badge badge-error">false</span></td>
                                </tr>
                                <tr>
                                    <td>NaN</td>
                                    <td>NaN</td>
                                    <td><span className="badge badge-error">false</span></td>
                                    <td><span className="badge badge-error">false</span></td>
                                    <td><span className="badge badge-success">true</span></td>
                                </tr>
                                <tr>
                                    <td>''</td>
                                    <td>false</td>
                                    <td><span className="badge badge-success">true</span></td>
                                    <td><span className="badge badge-error">false</span></td>
                                    <td><span className="badge badge-error">false</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </InfoCard>

                {/* 代码示例 */}
                <WarningCard title="== 运算符的陷阱示例">
                    <ExpandableCode language="javascript">
{`// 意外的类型转换结果
console.log([] == false);        // true
console.log([] == !![]);         // false
console.log('0' == false);       // true
console.log(0 == false);         // true
console.log('' == false);        // true

// 推荐使用 === 
console.log([] === false);       // false
console.log('0' === false);      // false

// Object.is() 的特殊用法
console.log(Object.is(NaN, NaN));     // true
console.log(Object.is(+0, -0));       // false
console.log(Number.isNaN(NaN));       // true (推荐检查NaN的方法)`}
                    </ExpandableCode>
                </WarningCard>
            </div>
        </QuestionCard>
    );
} 