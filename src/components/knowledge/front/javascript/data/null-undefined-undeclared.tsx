import { QuestionCard } from "../../../../base/knowledge_question_card"
import { ExpandableCode } from "../../../../base/expandable_code"
import { InfoCard } from "../../../../card/info_card"
import { WarningCard } from "../../../../card/warning_card"
import { ErrorCard } from "../../../../card/error_card"

/**
 * # null vs. undefined vs. 未声明变量
 */
export function FrontJavaScriptNullUndefinedUndeclared({ id }: { id: string }) {
    return (
        <QuestionCard question={{
            id,
            title: "null vs. undefined vs. 未声明变量",
            category: "变量与类型",
            content: "请解释 JavaScript 中 null、undefined 和未声明变量之间的区别，并说明如何检查它们各自的状态。",
            tags: ["null", "undefined", "变量声明", "类型检查"]
        }}>
            <div className="space-y-6">
                {/* 三者概念对比 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InfoCard title="undefined">
                        <div className="space-y-2 text-sm">
                            <p><strong>含义：</strong>已声明未赋值</p>
                            <p><strong>类型：</strong><code>typeof</code> 返回 'undefined'</p>
                            <p><strong>检查：</strong><code>=== undefined</code></p>
                            <div className="badge badge-info">原始数据类型</div>
                        </div>
                    </InfoCard>

                    <WarningCard title="null">
                        <div className="space-y-2 text-sm">
                            <p><strong>含义：</strong>显式空对象指针</p>
                            <p><strong>类型：</strong><code>typeof</code> 返回 'object'</p>
                            <p><strong>检查：</strong><code>=== null</code></p>
                            <div className="badge badge-warning">历史遗留bug</div>
                        </div>
                    </WarningCard>

                    <ErrorCard title="未声明 (Undeclared)">
                        <div className="space-y-2 text-sm">
                            <p><strong>含义：</strong>变量未声明</p>
                            <p><strong>类型：</strong><code>typeof</code> 返回 'undefined'</p>
                            <p><strong>检查：</strong>try-catch 包裹</p>
                            <div className="badge badge-error">ReferenceError</div>
                        </div>
                    </ErrorCard>
                </div>

                {/* 代码示例 */}
                <InfoCard title="检查方法示例">
                    <ExpandableCode language="javascript">
{`// 检查 undefined
let myVar;
console.log(myVar === undefined); // true
console.log(typeof myVar === 'undefined'); // true

// 检查 null
let nullVar = null;
console.log(nullVar === null); // true
console.log(typeof nullVar); // "object" (历史遗留bug)

// 检查未声明变量
try {
  console.log(undeclaredVar);
} catch (e) {
  if (e instanceof ReferenceError) {
    console.log('Variable is undeclared');
  }
}

// 安全检查未声明的全局变量
console.log(typeof undeclaredVar === 'undefined'); // true`}
                    </ExpandableCode>
                </InfoCard>

                {/* 易错点 */}
                <WarningCard title="常见陷阱">
                    <div className="space-y-4">
                        <div>
                            <h5 className="font-semibold text-warning">❌ typeof null 返回 'object'</h5>
                            <p className="text-sm mt-1">这是JavaScript的历史遗留bug，为了向后兼容而保留</p>
                            <ExpandableCode language="javascript">
{`console.log(typeof null); // "object" (不是 "null")
console.log(null instanceof Object); // false`}
                            </ExpandableCode>
                        </div>
                        
                        <div>
                            <h5 className="font-semibold text-warning">❌ null == undefined 为 true</h5>
                            <p className="text-sm mt-1">宽松相等运算符会进行类型转换</p>
                            <ExpandableCode language="javascript">
{`console.log(null == undefined);  // true
console.log(null === undefined); // false`}
                            </ExpandableCode>
                        </div>
                    </div>
                </WarningCard>
            </div>
        </QuestionCard>
    );
} 