import { QuestionCard } from "../../../../base/knowledge_question_card"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { PrimaryCard } from "../../../../card/primary_card"
import { SecondaryCard } from "../../../../card/secondary_card"
import { InfoCard } from "../../../../card/info_card"
import { WarningCard } from "../../../../card/warning_card"
import { SuccessCard } from "../../../../card/success_card"

/**
 * # 自动装箱与自动拆箱详解
 * 深入分析 Java 中自动装箱/拆箱机制及其陷阱
 */
export function JavaBasicsAutoboxingUnboxing({ id }: { id: string }) {
    return (
        <QuestionCard question={{
            id,
            title: "自动装箱与拆箱机制详解",
            category: "类型转换",
            content: "什么是自动装箱和拆箱？它们的实现原理是什么？有哪些性能陷阱？",
            tags: ["自动装箱", "拆箱", "包装类", "缓存", "性能优化"]
        }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 概念对比 */}
                <PrimaryCard title="📦 自动装箱 (Autoboxing)">
                    <div className="space-y-3">
                        <p><strong>定义：</strong>基本类型自动转换为对应的包装类对象</p>
                        <p><strong>时机：</strong>将基本类型赋值给包装类型时</p>
                        <p><strong>本质：</strong>编译器语法糖，调用 valueOf() 方法</p>
                    </div>
                </PrimaryCard>

                <SecondaryCard title="📤 自动拆箱 (Unboxing)">
                    <div className="space-y-3">
                        <p><strong>定义：</strong>包装类对象自动转换为对应的基本类型</p>
                        <p><strong>时机：</strong>将包装类型赋值给基本类型时</p>
                        <p><strong>本质：</strong>编译器语法糖，调用 xxxValue() 方法</p>
                    </div>
                </SecondaryCard>
            </div>

            {/* 基本原理 */}
            <div className="mt-6">
                <InfoCard title="装箱拆箱机制原理">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-base-content">编译器转换示例：</h4>
                        <SyntaxHighlighter language="java" style={github} className="rounded-lg">
{`// 源代码
public class AutoboxingExample {
    public void example() {
        // 自动装箱
        Integer a = 100;        // 基本类型 -> 包装类型
        List<Integer> list = new ArrayList<>();
        list.add(200);          // 基本类型 -> 包装类型
        
        // 自动拆箱
        int b = a;              // 包装类型 -> 基本类型
        int sum = a + 50;       // 包装类型 -> 基本类型进行运算
    }
}

// 编译器实际生成的代码
public class AutoboxingExample {
    public void example() {
        // 编译器调用 Integer.valueOf()
        Integer a = Integer.valueOf(100);
        List<Integer> list = new ArrayList<>();
        list.add(Integer.valueOf(200));
        
        // 编译器调用 intValue()
        int b = a.intValue();
        int sum = a.intValue() + 50;
    }
}`}
                        </SyntaxHighlighter>

                        <h4 className="font-semibold text-base-content mt-4">包装类型对应表：</h4>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra table-sm">
                                <thead>
                                    <tr>
                                        <th>基本类型</th>
                                        <th>包装类型</th>
                                        <th>装箱方法</th>
                                        <th>拆箱方法</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>byte</td><td>Byte</td><td>Byte.valueOf()</td><td>byteValue()</td></tr>
                                    <tr><td>short</td><td>Short</td><td>Short.valueOf()</td><td>shortValue()</td></tr>
                                    <tr><td>int</td><td>Integer</td><td>Integer.valueOf()</td><td>intValue()</td></tr>
                                    <tr><td>long</td><td>Long</td><td>Long.valueOf()</td><td>longValue()</td></tr>
                                    <tr><td>float</td><td>Float</td><td>Float.valueOf()</td><td>floatValue()</td></tr>
                                    <tr><td>double</td><td>Double</td><td>Double.valueOf()</td><td>doubleValue()</td></tr>
                                    <tr><td>boolean</td><td>Boolean</td><td>Boolean.valueOf()</td><td>booleanValue()</td></tr>
                                    <tr><td>char</td><td>Character</td><td>Character.valueOf()</td><td>charValue()</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </InfoCard>
            </div>

            {/* 缓存机制详解 */}
            <div className="mt-6">
                <InfoCard title="整数缓存机制 (Integer Cache)">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-base-content">缓存范围：</h4>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                <thead>
                                    <tr>
                                        <th>包装类型</th>
                                        <th>缓存范围</th>
                                        <th>可配置</th>
                                        <th>说明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="font-semibold">Integer</td>
                                        <td>-128 ~ 127</td>
                                        <td><span className="badge badge-success">是</span></td>
                                        <td>-XX:AutoBoxCacheMax=N</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">Long</td>
                                        <td>-128 ~ 127</td>
                                        <td><span className="badge badge-error">否</span></td>
                                        <td>固定范围</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">Short</td>
                                        <td>-128 ~ 127</td>
                                        <td><span className="badge badge-error">否</span></td>
                                        <td>固定范围</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">Byte</td>
                                        <td>-128 ~ 127</td>
                                        <td><span className="badge badge-error">否</span></td>
                                        <td>全范围缓存</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">Character</td>
                                        <td>0 ~ 127</td>
                                        <td><span className="badge badge-error">否</span></td>
                                        <td>ASCII字符</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">Boolean</td>
                                        <td>true/false</td>
                                        <td><span className="badge badge-error">否</span></td>
                                        <td>只有两个实例</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 className="font-semibold text-base-content mt-4">缓存机制示例：</h4>
                        <SyntaxHighlighter language="java" style={github} className="rounded-lg">
{`public class CacheExample {
    public static void main(String[] args) {
        // 缓存范围内 - 同一个对象
        Integer a1 = 100;
        Integer a2 = 100;
        System.out.println(a1 == a2);        // true (引用相同)
        System.out.println(a1.equals(a2));   // true (值相同)
        
        // 缓存范围外 - 不同对象
        Integer b1 = 200;
        Integer b2 = 200;
        System.out.println(b1 == b2);        // false (引用不同)
        System.out.println(b1.equals(b2));   // true (值相同)
        
        // 手动创建 - 总是新对象
        Integer c1 = new Integer(100);
        Integer c2 = new Integer(100);
        System.out.println(c1 == c2);        // false
        
        // 与缓存对象比较
        Integer d = 100;
        System.out.println(c1 == d);         // false
    }
}`}
                        </SyntaxHighlighter>
                    </div>
                </InfoCard>
            </div>

            {/* NullPointerException 陷阱 */}
            <div className="mt-6">
                <WarningCard title="NullPointerException 陷阱">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-warning-content mb-2">常见NPE场景：</h4>
                        <SyntaxHighlighter language="java" style={github} className="rounded-lg">
{`public class NPETraps {
    public void commonTraps() {
        // 1. null拆箱 - 最常见的陷阱
        Integer nullInteger = null;
        int value = nullInteger;  // NPE! 调用nullInteger.intValue()
        
        // 2. 条件运算符的陷阱
        Boolean flag = null;
        boolean result = flag ? true : false;  // NPE!
        
        // 3. 算术运算的陷阱
        Integer a = null;
        Integer b = 10;
        int sum = a + b;  // NPE! a.intValue() + b.intValue()
        
        // 4. 比较运算的陷阱
        Integer x = null;
        if (x > 0) {  // NPE! x.intValue() > 0
            // ...
        }
        
        // 5. 方法参数的陷阱
        List<Integer> numbers = Arrays.asList(1, 2, null, 4);
        int total = numbers.stream()
                          .mapToInt(Integer::intValue)  // NPE when processing null
                          .sum();
    }
    
    // 安全的处理方式
    public void safeHandling() {
        Integer nullInteger = null;
        
        // 1. null检查
        if (nullInteger != null) {
            int value = nullInteger;
        }
        
        // 2. 使用Optional
        Optional<Integer> optional = Optional.ofNullable(nullInteger);
        int value = optional.orElse(0);
        
        // 3. 使用工具方法
        int value2 = Objects.requireNonNullElse(nullInteger, 0);
    }
}`}
                        </SyntaxHighlighter>
                    </div>
                </WarningCard>
            </div>

            {/* 性能陷阱 */}
            <div className="mt-6">
                <WarningCard title="性能陷阱与优化">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-warning-content mb-2">1. 频繁装箱拆箱的性能问题：</h4>
                        <SyntaxHighlighter language="java" style={github} className="rounded-lg">
{`public class PerformanceTraps {
    // ❌ 性能陷阱 - 频繁装箱
    public void badExample() {
        Long sum = 0L;  // 使用包装类型
        for (int i = 0; i < 1000000; i++) {
            sum += i;   // 每次循环都会拆箱、运算、装箱
        }
        // 总共进行了100万次装箱操作！
    }
    
    // ✅ 优化版本 - 使用基本类型
    public void goodExample() {
        long sum = 0L;  // 使用基本类型
        for (int i = 0; i < 1000000; i++) {
            sum += i;   // 直接运算，无装箱拆箱
        }
        Long result = sum;  // 只在最后装箱一次
    }
    
    // ❌ 集合操作的性能陷阱
    public void collectionTrap() {
        List<Integer> numbers = new ArrayList<>();
        for (int i = 0; i < 10000; i++) {
            numbers.add(i);  // 每次都装箱
        }
        
        int sum = 0;
        for (Integer num : numbers) {
            sum += num;  // 每次都拆箱
        }
    }
    
    // ✅ 使用专门的基本类型集合
    public void optimizedCollection() {
        // 使用第三方库如 Eclipse Collections, Trove 等
        IntList numbers = new IntArrayList();
        for (int i = 0; i < 10000; i++) {
            numbers.add(i);  // 无装箱
        }
        
        long sum = numbers.sum();  // 无拆箱
    }
}`}
                        </SyntaxHighlighter>

                        <h4 className="font-semibold text-warning-content mb-2">2. 缓存失效导致的内存问题：</h4>
                        <SyntaxHighlighter language="java" style={github} className="rounded-lg">
{`public class CacheIssues {
    // ❌ 大量对象创建
    public void memoryWaste() {
        List<Integer> largeNumbers = new ArrayList<>();
        for (int i = 1000; i < 10000; i++) {
            largeNumbers.add(i);  // 每个都是新对象，无法复用
        }
        // 创建了9000个Integer对象
    }
    
    // ✅ 复用策略
    public void reuseStrategy() {
        // 1. 尽量使用缓存范围内的值
        List<Integer> smallNumbers = new ArrayList<>();
        for (int i = -128; i <= 127; i++) {
            smallNumbers.add(i);  // 复用缓存对象
        }
        
        // 2. 对于大数值，考虑使用基本类型数组
        int[] largeNumbers = new int[9000];
        for (int i = 0; i < 9000; i++) {
            largeNumbers[i] = i + 1000;
        }
    }
}`}
                        </SyntaxHighlighter>
                    </div>
                </WarningCard>
            </div>

            {/* 易错点总结 */}
            <div className="mt-6">
                <WarningCard title="常见易错点总结">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-warning-content mb-2">1. == vs equals() 混淆</h4>
                            <SyntaxHighlighter language="java" style={github} className="rounded-lg">
{`// 易错示例
Integer a = 128;
Integer b = 128;
System.out.println(a == b);      // false! 超出缓存范围
System.out.println(a.equals(b)); // true

// 正确做法：包装类型比较始终使用equals()
if (Objects.equals(a, b)) {
    // 安全的比较，处理null情况
}`}
                            </SyntaxHighlighter>
                        </div>

                        <div>
                            <h4 className="font-semibold text-warning-content mb-2">2. 条件运算符类型不匹配</h4>
                            <SyntaxHighlighter language="java" style={github} className="rounded-lg">
{`// 陷阱：三元运算符的类型提升
Integer a = 1;
Double b = 2.0;
// 编译器会将Integer拆箱为int，然后提升为double
Number result = true ? a : b;  // result是Double类型的1.0，不是Integer的1

// 安全做法：确保类型一致
Number result1 = true ? (Number)a : b;`}
                            </SyntaxHighlighter>
                        </div>

                        <div>
                            <h4 className="font-semibold text-warning-content mb-2">3. 重载方法的选择问题</h4>
                            <SyntaxHighlighter language="java" style={github} className="rounded-lg">
{`public class OverloadingIssue {
    public void method(int i) { System.out.println("int: " + i); }
    public void method(Integer i) { System.out.println("Integer: " + i); }
    
    public void test() {
        method(1);        // 调用 method(int) - 优先精确匹配
        Integer i = 1;
        method(i);        // 调用 method(Integer)
        method((int)i);   // 强制调用 method(int)
    }
}`}
                            </SyntaxHighlighter>
                        </div>
                    </div>
                </WarningCard>
            </div>

            {/* 最佳实践 */}
            <div className="mt-6">
                <SuccessCard title="最佳实践建议">
                    <div className="space-y-3">
                        <h4 className="font-semibold text-success-content">性能优化：</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>在性能敏感的代码中优先使用基本类型</li>
                            <li>避免在循环中进行频繁的装箱拆箱操作</li>
                            <li>使用专门的基本类型集合库（如TroveMap）</li>
                            <li>合理利用缓存范围内的小整数</li>
                        </ul>
                        
                        <h4 className="font-semibold text-success-content mt-4">代码安全：</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>包装类型比较始终使用equals()方法</li>
                            <li>对可能为null的包装类型进行null检查</li>
                            <li>使用Optional处理可能为null的情况</li>
                            <li>避免混合使用基本类型和包装类型进行比较</li>
                        </ul>
                        
                        <h4 className="font-semibold text-success-content mt-4">设计建议：</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>API设计时明确基本类型还是包装类型</li>
                            <li>数据传输对象(DTO)中使用包装类型支持null</li>
                            <li>业务逻辑计算中使用基本类型提高性能</li>
                            <li>合理使用@Nullable和@NonNull注解</li>
                        </ul>
                    </div>
                </SuccessCard>
            </div>
        </QuestionCard>
    )
} 