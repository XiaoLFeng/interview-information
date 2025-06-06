import { QuestionCard } from "../../../../base/knowledge_question_card"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { PrimaryCard } from "../../../../card/primary_card"
import { SecondaryCard } from "../../../../card/secondary_card"
import { InfoCard } from "../../../../card/info_card"
import { WarningCard } from "../../../../card/warning_card"
import { SuccessCard } from "../../../../card/success_card"

/**
 * # == vs equals() 和 hashCode() 协定详解
 * 深入分析 Java 中对象比较和哈希码协定
 */
export function JavaBasicsEqualsHashcode({ id }: { id: string }) {
    return (
        <QuestionCard question={{
            id,
            title: "== vs equals() vs hashCode()",
            category: "对象比较",
            content: "详细解释 == 与 equals() 的区别，以及 hashCode() 的作用和协定。",
            tags: ["equals", "hashCode", "对象比较", "字符串常量池", "协定"]
        }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 概念对比 */}
                <PrimaryCard title="⚖️ == 运算符">
                    <div className="space-y-3">
                        <p><strong>作用：</strong>比较两个变量的值或引用</p>
                        <p><strong>基本类型：</strong>比较值是否相等</p>
                        <p><strong>引用类型：</strong>比较引用是否指向同一对象</p>
                        <p><strong>性能：</strong><span className="badge badge-success">极快</span></p>
                    </div>
                </PrimaryCard>

                <SecondaryCard title="🎯 equals() 方法">
                    <div className="space-y-3">
                        <p><strong>作用：</strong>比较两个对象的内容是否相等</p>
                        <p><strong>可重写：</strong>子类可以定义自己的比较逻辑</p>
                        <p><strong>语义：</strong>判断对象的逻辑相等性</p>
                        <p><strong>性能：</strong><span className="badge badge-warning">取决于实现</span></p>
                    </div>
                </SecondaryCard>
            </div>

            {/* == vs equals() 详解 */}
            <div className="mt-6">
                <InfoCard title="== vs equals() 详细比较">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-base-content">基本使用示例：</h4>
                        <SyntaxHighlighter language="java" style={oneDark} className="rounded-lg">
{`public class ComparisonExample {
    public static void main(String[] args) {
        // 基本类型比较 - == 比较值
        int a = 100;
        int b = 100;
        System.out.println(a == b);     // true (值相等)
        
        // 引用类型比较
        String str1 = new String("hello");
        String str2 = new String("hello");
        String str3 = "hello";
        String str4 = "hello";
        
        // == 比较引用
        System.out.println(str1 == str2);    // false (不同对象)
        System.out.println(str3 == str4);    // true (字符串常量池)
        
        // equals() 比较内容
        System.out.println(str1.equals(str2)); // true (内容相同)
        System.out.println(str1.equals(str3)); // true (内容相同)
        
        // null 处理
        String nullStr = null;
        System.out.println(nullStr == null);        // true
        // System.out.println(nullStr.equals("test")); // NullPointerException
        System.out.println(Objects.equals(nullStr, "test")); // false (安全)
    }
}`}
                        </SyntaxHighlighter>
                    </div>
                </InfoCard>
            </div>

            {/* 字符串比较的特殊性 */}
            <div className="mt-6">
                <WarningCard title="字符串比较：常量池的影响">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <h5 className="font-semibold text-warning-content mb-2">⚠️ 容易混淆的情况</h5>
                                <SyntaxHighlighter language="java" style={oneDark} className="rounded-lg">
{`// 字符串字面量 - 常量池
String s1 = "hello";
String s2 = "hello";
System.out.println(s1 == s2); // true (同一对象)

// new关键字 - 堆内存
String s3 = new String("hello");
String s4 = new String("hello");
System.out.println(s3 == s4); // false (不同对象)

// 混合情况
String s5 = "hello";
String s6 = new String("hello");
System.out.println(s5 == s6); // false

// 但是equals比较
System.out.println(s5.equals(s6)); // true

// 编译时常量拼接
String s7 = "hel" + "lo";
System.out.println(s1 == s7); // true (编译器优化)

// 运行时拼接
String prefix = "hel";
String s8 = prefix + "lo";
System.out.println(s1 == s8); // false`}
                                </SyntaxHighlighter>
                            </div>
                            
                            <div>
                                <h5 className="font-semibold text-info mb-2">💡 intern()方法</h5>
                                <SyntaxHighlighter language="java" style={oneDark} className="rounded-lg">
{`// intern()方法的作用
String s1 = "hello";
String s2 = new String("hello");
String s3 = s2.intern(); // 返回常量池中的引用

System.out.println(s1 == s2); // false
System.out.println(s1 == s3); // true

// intern()的性能考虑
// ✅ 适用于：大量重复字符串的场景
// ❌ 不适用于：字符串变化很大的场景

// 示例：缓存用户角色
Set<String> roles = new HashSet<>();
// 假设有大量重复的角色名
for (User user : users) {
    roles.add(user.getRole().intern());
}`}
                                </SyntaxHighlighter>
                                <div className="alert alert-warning mt-2">
                                    <span className="text-sm"><strong>注意：</strong>过度使用intern()可能导致永久代/元空间内存泄漏</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </WarningCard>
            </div>

            {/* equals() 和 hashCode() 协定 */}
            <div className="mt-6">
                <InfoCard title="equals() 和 hashCode() 协定">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-base-content">📋 强制性协定规则</h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-error/10 p-4 rounded-lg border border-error/20">
                                <h6 className="font-semibold text-error mb-2">🔴 核心规则</h6>
                                <ul className="space-y-1 text-sm">
                                    <li><strong>规则1：</strong>如果两个对象equals()返回true，则hashCode()必须相等</li>
                                    <li><strong>规则2：</strong>如果两个对象equals()返回false，hashCode()可以相等也可以不等</li>
                                    <li><strong>规则3：</strong>同一对象多次调用hashCode()必须返回相同值(在equals比较信息未修改的前提下)</li>
                                </ul>
                            </div>
                            
                            <div className="bg-warning/10 p-4 rounded-lg border border-warning/20">
                                <h6 className="font-semibold text-warning mb-2">⚠️ 违反后果</h6>
                                <ul className="space-y-1 text-sm">
                                    <li>HashMap/HashSet中无法正确存取对象</li>
                                    <li>contains()方法可能返回错误结果</li>
                                    <li>HashSet中可能存储"重复"对象</li>
                                    <li>HashMap中逻辑上相同的key被视为不同</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </InfoCard>
            </div>

            {/* equals() 方法规范 */}
            <div className="mt-6">
                <SuccessCard title="equals() 方法规范">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <h6 className="font-semibold text-success-content mb-2">五大特性</h6>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                    <li><strong>自反性：</strong>x.equals(x) == true</li>
                                    <li><strong>对称性：</strong>x.equals(y) == y.equals(x)</li>
                                    <li><strong>传递性：</strong>x.equals(y) && y.equals(z) → x.equals(z)</li>
                                    <li><strong>一致性：</strong>多次调用结果不变(对象未修改)</li>
                                    <li><strong>非空性：</strong>x.equals(null) == false</li>
                                </ul>
                            </div>
                            
                            <div>
                                <h6 className="font-semibold text-success-content mb-2">标准实现模板</h6>
                                <SyntaxHighlighter language="java" style={oneDark} className="rounded-lg">
{`@Override
public boolean equals(Object obj) {
    // 1. 自反性检查
    if (this == obj) return true;
    
    // 2. 空值检查
    if (obj == null) return false;
    
    // 3. 类型检查
    if (getClass() != obj.getClass()) return false;
    
    // 4. 字段比较
    Person other = (Person) obj;
    return Objects.equals(name, other.name) 
        && age == other.age
        && Objects.equals(email, other.email);
}`}
                                </SyntaxHighlighter>
                            </div>
                        </div>
                    </div>
                </SuccessCard>
            </div>

            {/* hashCode() 实现策略 */}
            <div className="mt-6">
                <InfoCard title="hashCode() 实现策略">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <h6 className="font-semibold text-base-content mb-2">常用算法</h6>
                                <SyntaxHighlighter language="java" style={oneDark} className="rounded-lg">
{`// 方法1: Objects.hash() (推荐)
@Override
public int hashCode() {
    return Objects.hash(name, age, email);
}

// 方法2: 手动实现
@Override
public int hashCode() {
    int result = 17; // 非零常数
    result = 31 * result + (name != null ? name.hashCode() : 0);
    result = 31 * result + age;
    result = 31 * result + (email != null ? email.hashCode() : 0);
    return result;
}

// 方法3: 基于数组
@Override
public int hashCode() {
    return Arrays.hashCode(new Object[]{name, age, email});
}`}
                                </SyntaxHighlighter>
                            </div>
                            
                            <div>
                                <h6 className="font-semibold text-base-content mb-2">设计考虑</h6>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                    <li><strong>性能：</strong>计算要快速</li>
                                    <li><strong>分布：</strong>尽可能均匀分布</li>
                                    <li><strong>一致性：</strong>equals相等的对象hashCode必须相等</li>
                                    <li><strong>稳定性：</strong>对象未修改时保持不变</li>
                                </ul>
                                <div className="alert alert-info mt-4">
                                    <span className="text-sm"><strong>为什么用31？</strong>31是质数，31*i可以优化为(i&lt;&lt;5)-i，性能更好</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </InfoCard>
            </div>

            {/* 实际应用示例 */}
            <div className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <WarningCard title="错误示例">
                        <div className="space-y-4">
                            <h5 className="font-semibold text-warning-content">只重写equals，不重写hashCode</h5>
                            <SyntaxHighlighter language="java" style={oneDark} className="rounded-lg">
{`public class BadPerson {
    private String name;
    private int age;
    
    // ❌ 只重写了equals，没重写hashCode
    @Override
    public boolean equals(Object obj) {
        if (obj instanceof BadPerson) {
            BadPerson p = (BadPerson) obj;
            return Objects.equals(name, p.name) && age == p.age;
        }
        return false;
    }
    // hashCode()使用Object的默认实现
}

// 使用时的问题
Set<BadPerson> set = new HashSet<>();
BadPerson p1 = new BadPerson("Alice", 25);
BadPerson p2 = new BadPerson("Alice", 25);

set.add(p1);
System.out.println(set.contains(p2)); // false! 应该是true
set.add(p2); // 添加了"重复"对象
System.out.println(set.size()); // 2! 应该是1`}
                            </SyntaxHighlighter>
                        </div>
                    </WarningCard>
                    
                    <SuccessCard title="正确示例">
                        <div className="space-y-4">
                            <h5 className="font-semibold text-success-content">同时重写equals和hashCode</h5>
                            <SyntaxHighlighter language="java" style={oneDark} className="rounded-lg">
{`public class GoodPerson {
    private String name;
    private int age;
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        
        GoodPerson person = (GoodPerson) obj;
        return age == person.age && Objects.equals(name, person.name);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}

// 使用时正常工作
Set<GoodPerson> set = new HashSet<>();
GoodPerson p1 = new GoodPerson("Alice", 25);
GoodPerson p2 = new GoodPerson("Alice", 25);

set.add(p1);
System.out.println(set.contains(p2)); // true ✅
set.add(p2); // 不会添加重复对象
System.out.println(set.size()); // 1 ✅`}
                            </SyntaxHighlighter>
                        </div>
                    </SuccessCard>
                </div>
            </div>

            {/* 性能优化与注意事项 */}
            <div className="mt-6">
                <InfoCard title="性能优化与注意事项">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <h5 className="font-semibold text-warning mb-2">⚠️ 性能陷阱</h5>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                    <li><strong>慢速equals：</strong>比较大量字段或复杂对象</li>
                                    <li><strong>hashCode冲突：</strong>糟糕的哈希函数导致性能下降</li>
                                    <li><strong>不稳定hashCode：</strong>基于可变字段计算哈希码</li>
                                    <li><strong>递归比较：</strong>对象间相互引用导致栈溢出</li>
                                </ul>
                                
                                <h6 className="font-semibold text-warning mt-4 mb-2">❌ 性能问题示例</h6>
                                <SyntaxHighlighter language="java" style={oneDark} className="rounded-lg">
{`// ❌ 性能问题示例
public class SlowClass {
    private List<String> items;
    
    @Override
    public boolean equals(Object obj) {
        // 比较大集合，性能差
        return Objects.equals(items, other.items);
    }
    
    @Override
    public int hashCode() {
        // 每次都计算整个列表的哈希
        return items.hashCode(); // 可能很慢
    }
}`}
                                </SyntaxHighlighter>
                            </div>
                            
                            <div>
                                <h5 className="font-semibold text-success mb-2">✅ 优化策略</h5>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                    <li><strong>快速路径：</strong>先比较最可能不同的字段</li>
                                    <li><strong>缓存hashCode：</strong>不可变对象可缓存哈希值</li>
                                    <li><strong>选择性比较：</strong>只比较关键字段</li>
                                    <li><strong>短路求值：</strong>利用逻辑运算符的短路特性</li>
                                </ul>
                                
                                <h6 className="font-semibold text-success mt-4 mb-2">✅ 优化示例</h6>
                                <SyntaxHighlighter language="java" style={oneDark} className="rounded-lg">
{`// ✅ 优化示例
public class OptimizedClass {
    private final String id; // 最重要的标识
    private final String name;
    private final List<String> items;
    private int hashCode; // 缓存哈希值
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof OptimizedClass)) return false;
        
        OptimizedClass other = (OptimizedClass) obj;
        // 先比较最可能不同的字段
        return Objects.equals(id, other.id) &&
               Objects.equals(name, other.name) &&
               Objects.equals(items, other.items);
    }
    
    @Override
    public int hashCode() {
        if (hashCode == 0) { // 懒加载缓存
            hashCode = Objects.hash(id, name, items);
        }
        return hashCode;
    }
}`}
                                </SyntaxHighlighter>
                            </div>
                        </div>
                    </div>
                </InfoCard>
            </div>

            {/* 详细对比表格 */}
            <div className="mt-6">
                <div className="bg-base-100 rounded-lg p-4 shadow-sm border border-base-300">
                    <h3 className="text-lg font-semibold text-base-content mb-4">📊 详细对比表</h3>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>特性</th>
                                    <th>== 运算符</th>
                                    <th>equals() 方法</th>
                                    <th>hashCode() 方法</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-semibold">比较内容</td>
                                    <td>引用地址或基本类型值</td>
                                    <td>对象的逻辑内容</td>
                                    <td>对象的哈希码值</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">性能</td>
                                    <td><span className="badge badge-success">极快</span></td>
                                    <td><span className="badge badge-warning">取决于实现</span></td>
                                    <td><span className="badge badge-info">通常较快</span></td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">null处理</td>
                                    <td>安全，可以比较null</td>
                                    <td>需要null检查</td>
                                    <td>null对象调用会抛异常</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">可重写</td>
                                    <td><span className="badge badge-error">不可重写</span></td>
                                    <td><span className="badge badge-success">可重写</span></td>
                                    <td><span className="badge badge-success">可重写</span></td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">使用场景</td>
                                    <td>引用比较、基本类型比较</td>
                                    <td>内容比较、逻辑相等性</td>
                                    <td>Hash集合的键值计算</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <WarningCard title="关键易错点与最佳实践">
                <div className="space-y-3 text-sm">
                    <div>
                        <h5 className="font-semibold text-error mb-1">🚨 最常见的错误</h5>
                        <ul className="list-disc list-inside space-y-1">
                            <li><strong>只重写equals不重写hashCode：</strong>导致HashSet/HashMap行为异常</li>
                            <li><strong>使用==比较字符串内容：</strong>忽略了字符串常量池的复杂性</li>
                            <li><strong>equals方法不检查null：</strong>可能抛出NullPointerException</li>
                            <li><strong>不满足equals的对称性：</strong>A.equals(B) != B.equals(A)</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h5 className="font-semibold text-success mb-1">✅ 最佳实践建议</h5>
                        <ul className="list-disc list-inside space-y-1">
                            <li>总是同时重写equals()和hashCode()方法</li>
                            <li>使用Objects.equals()进行null安全的比较</li>
                            <li>使用Objects.hash()简化hashCode的实现</li>
                            <li>考虑使用IDE或Lombok自动生成这些方法</li>
                            <li>比较字符串内容时总是使用equals()而不是==</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h5 className="font-semibold text-info mb-1">💡 记忆技巧</h5>
                        <p><strong>"先身份再内容"：</strong>==比较身份(是否同一个对象)，equals()比较内容(对象状态是否相等)。<strong>"相等必同码"：</strong>equals相等的对象，hashCode必须相等，但hashCode相等的对象不一定equals相等。</p>
                    </div>
                </div>
            </WarningCard>
        </QuestionCard>
    )
} 