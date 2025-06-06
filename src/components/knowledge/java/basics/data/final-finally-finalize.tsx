import { QuestionCard } from "../../../../base/knowledge_question_card"
import { PrimaryCard } from "../../../../card/primary_card"
import { SecondaryCard } from "../../../../card/secondary_card"
import { InfoCard } from "../../../../card/info_card"
import { WarningCard } from "../../../../card/warning_card"
import { SuccessCard } from "../../../../card/success_card"
import { ErrorCard } from "../../../../card/error_card"
import { ExpandableCode } from "../../../../base/expandable_code"

/**
 * # final vs finally vs finalize 详解
 * 深入分析 Java 中三个容易混淆的关键字/方法
 */
export function JavaBasicsFinalFinallyFinalize({ id }: { id: string }) {
    return (
        <QuestionCard question={{
            id,
            title: "final vs finally vs finalize",
            category: "关键字",
            content: "请详细解释 final、finally、finalize 这三个关键字的区别和用途。",
            tags: ["final", "finally", "finalize", "关键字", "内存管理"]
        }}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 三个关键字概念对比 */}
                <PrimaryCard title="🔒 final">
                    <div className="space-y-3">
                        <p><strong>作用：</strong>修饰符，表示"最终的"、"不可变的"</p>
                        <p><strong>应用：</strong>变量、方法、类</p>
                        <p><strong>目的：</strong>确保不可修改性</p>
                    </div>
                </PrimaryCard>

                <SecondaryCard title="🛡️ finally">
                    <div className="space-y-3">
                        <p><strong>作用：</strong>异常处理块，总是执行</p>
                        <p><strong>应用：</strong>try-catch 语句</p>
                        <p><strong>目的：</strong>确保资源清理</p>
                    </div>
                </SecondaryCard>

                <InfoCard title="🗑️ finalize">
                    <div className="space-y-3">
                        <p><strong>作用：</strong>Object类的方法</p>
                        <p><strong>应用：</strong>垃圾回收前调用</p>
                        <p><strong>状态：</strong>已废弃(JDK 9+)</p>
                    </div>
                </InfoCard>
            </div>

            {/* final 详解 */}
            <div className="mt-6">
                <InfoCard title="final 关键字详解">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-base-content">1. final 变量 - 常量</h4>
                        <ExpandableCode language="java">
{`public class FinalExample {
    // 编译时常量
    public static final int MAX_SIZE = 100;
    
    // 运行时常量
    public final String name;
    public final List<String> list = new ArrayList<>();
    
    public FinalExample(String name) {
        this.name = name; // 只能在构造方法或声明时赋值
    }
    
    public void test() {
        final int localVar = 10;
        // localVar = 20; // 编译错误
        
        // 引用不可变，但内容可变
        list.add("item"); // 可以
        // list = new ArrayList<>(); // 编译错误
    }
}`}
                        </ExpandableCode>

                        <h4 className="font-semibold text-base-content mt-4">2. final 方法 - 不可重写</h4>
                        <ExpandableCode language="java">
{`public class Parent {
    // final方法不能被子类重写
    public final void finalMethod() {
        System.out.println("Cannot be overridden");
    }
    
    public void normalMethod() {
        System.out.println("Can be overridden");
    }
}

public class Child extends Parent {
    // @Override
    // public void finalMethod() { } // 编译错误
    
    @Override
    public void normalMethod() {
        System.out.println("Overridden method");
    }
}`}
                        </ExpandableCode>

                        <h4 className="font-semibold text-base-content mt-4">3. final 类 - 不可继承</h4>
                        <ExpandableCode language="java">
{`// final类不能被继承
public final class String {
    // String类的实现
}

public final class Integer {
    // Integer类的实现
}

// public class MyString extends String { } // 编译错误`}
                        </ExpandableCode>
                    </div>
                </InfoCard>
            </div>

            {/* finally 详解 */}
            <div className="mt-6">
                <InfoCard title="finally 语句块详解">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-base-content">基本用法：</h4>
                        <ExpandableCode language="java">
{`public class FinallyExample {
    public void readFile(String filename) {
        FileInputStream fis = null;
        try {
            fis = new FileInputStream(filename);
            // 读取文件操作
        } catch (IOException e) {
            System.out.println("读取文件异常: " + e.getMessage());
        } finally {
            // 无论是否发生异常都会执行
            if (fis != null) {
                try {
                    fis.close();
                } catch (IOException e) {
                    System.out.println("关闭文件异常: " + e.getMessage());
                }
            }
            System.out.println("finally块执行");
        }
    }
}`}
                        </ExpandableCode>

                        <h4 className="font-semibold text-base-content mt-4">try-with-resources (推荐)：</h4>
                        <ExpandableCode language="java">
{`public void readFileModern(String filename) {
    // 自动资源管理，无需手动finally
    try (FileInputStream fis = new FileInputStream(filename);
         BufferedReader reader = new BufferedReader(new InputStreamReader(fis))) {
        
        // 读取文件操作
        String line = reader.readLine();
        
    } catch (IOException e) {
        System.out.println("文件操作异常: " + e.getMessage());
    }
    // 资源会自动关闭，等价于finally块
}`}
                        </ExpandableCode>
                    </div>
                </InfoCard>
            </div>

            {/* finalize 详解 */}
            <div className="mt-6">
                <ErrorCard title="finalize 方法详解 (已废弃)">
                    <div className="space-y-4">
                        <WarningCard title="重要警告">
                            <p className="text-sm">finalize() 方法在 JDK 9 中被标记为 @Deprecated，不推荐使用！</p>
                        </WarningCard>

                        <h4 className="font-semibold text-error-content">finalize 的问题：</h4>
                        <ExpandableCode language="java">
{`public class ProblematicClass {
    @Override
    protected void finalize() throws Throwable {
        try {
            // 清理代码
            System.out.println("对象被回收");
        } finally {
            super.finalize();
        }
    }
}

// 问题示例
public class FinalizeProblems {
    public static void main(String[] args) {
        for (int i = 0; i < 100000; i++) {
            new ProblematicClass();
        }
        // finalize可能不会被调用，导致资源泄露
        System.gc(); // 仅是建议，不保证执行
    }
}`}
                        </ExpandableCode>

                        <h4 className="font-semibold text-error-content mt-4">推荐的替代方案：</h4>
                        <ExpandableCode language="java">
{`// 1. 实现 AutoCloseable 接口
public class ModernResource implements AutoCloseable {
    private boolean closed = false;
    
    public void doSomething() {
        if (closed) {
            throw new IllegalStateException("Resource is closed");
        }
        // 执行操作
    }
    
    @Override
    public void close() {
        if (!closed) {
            // 清理资源
            closed = true;
            System.out.println("Resource closed");
        }
    }
}

// 2. 使用 Cleaner API (JDK 9+)
public class CleanerExample {
    private static final Cleaner CLEANER = Cleaner.create();
    
    private final Cleaner.Cleanable cleanable;
    
    public CleanerExample() {
        this.cleanable = CLEANER.register(this, new CleanupAction());
    }
    
    private static class CleanupAction implements Runnable {
        @Override
        public void run() {
            // 清理操作
            System.out.println("Cleanup performed");
        }
    }
}`}
                        </ExpandableCode>
                    </div>
                </ErrorCard>
            </div>

            {/* 对比表格 */}
            <div className="mt-6">
                <div className="bg-base-100 rounded-lg p-4 shadow-sm border border-base-300">
                    <h3 className="text-lg font-semibold text-base-content mb-4">📊 详细对比表</h3>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>特性</th>
                                    <th>final</th>
                                    <th>finally</th>
                                    <th>finalize</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-semibold">性质</td>
                                    <td>修饰符/关键字</td>
                                    <td>语句块</td>
                                    <td>方法</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">用途</td>
                                    <td>确保不可变性</td>
                                    <td>异常处理后清理</td>
                                    <td>对象销毁前处理</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">执行时机</td>
                                    <td>编译时/运行时</td>
                                    <td>try-catch结束后</td>
                                    <td>GC前(不确定)</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">是否必须执行</td>
                                    <td><span className="badge badge-success">是</span></td>
                                    <td><span className="badge badge-success">是</span></td>
                                    <td><span className="badge badge-error">否</span></td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">性能影响</td>
                                    <td>可能优化</td>
                                    <td>轻微</td>
                                    <td>严重</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">推荐使用</td>
                                    <td><span className="badge badge-success">推荐</span></td>
                                    <td><span className="badge badge-info">替代方案更好</span></td>
                                    <td><span className="badge badge-error">已废弃</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* 性能影响分析 */}
            <div className="mt-6">
                <WarningCard title="性能影响分析">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-warning-content mb-2">1. final 的性能优化</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>final变量可能被内联，提高性能</li>
                                <li>final方法可能被内联优化</li>
                                <li>final类避免虚方法调用开销</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="font-semibold text-warning-content mb-2">2. finally 的性能考虑</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>总是执行，可能影响正常流程性能</li>
                                <li>推荐使用 try-with-resources 替代</li>
                                <li>避免在finally中执行耗时操作</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="font-semibold text-warning-content mb-2">3. finalize 的性能问题</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>延长对象生命周期，增加GC压力</li>
                                <li>可能导致内存泄露</li>
                                <li>执行时机不确定，影响资源释放</li>
                            </ul>
                        </div>
                    </div>
                </WarningCard>
            </div>

            {/* 最佳实践 */}
            <div className="mt-6">
                <SuccessCard title="最佳实践建议">
                    <div className="space-y-3">
                        <h4 className="font-semibold text-success-content">final 使用建议：</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>优先使用final修饰不可变变量</li>
                            <li>工具类使用final class</li>
                            <li>模板方法使用final修饰</li>
                            <li>final集合引用不变，但内容可变</li>
                        </ul>
                        
                        <h4 className="font-semibold text-success-content mt-4">资源管理建议：</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>优先使用 try-with-resources</li>
                            <li>实现 AutoCloseable 接口</li>
                            <li>必要时使用 Cleaner API</li>
                            <li>避免使用 finalize 方法</li>
                        </ul>
                    </div>
                </SuccessCard>
            </div>
        </QuestionCard>
    )
} 