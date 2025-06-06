import { QuestionCard } from "../../../../base/knowledge_question_card";
import { ExpandableCode } from "../../../../base/expandable_code";
import { SuccessCard } from "../../../../card/success_card";
import { InfoCard } from "../../../../card/info_card";
import { SecondaryCard } from "../../../../card/secondary_card";

interface Props {
    id: string;
}

export function FrontTypeScriptGenerics({ id }: Props) {
    return (
        <QuestionCard
            question={{
                id,
                title: "TypeScript 泛型系统",
                category: "TypeScript",
                content: "TypeScript 的泛型系统是什么？如何在函数、接口、类中使用泛型？泛型约束的作用和使用场景是什么？",
                tags: ["TypeScript", "泛型", "函数泛型", "接口泛型", "类泛型", "泛型约束"]
            }}
        >
            <div className="space-y-6">
                <SuccessCard title="核心要点">
                    <p>泛型是 TypeScript 中实现代码重用和类型安全的重要机制，允许在保持类型安全的同时编写可重用的组件。</p>
                </SuccessCard>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoCard title="函数泛型">
                        <p>在函数中使用泛型参数，实现类型安全的通用函数。</p>
                    </InfoCard>
                    <InfoCard title="接口泛型">
                        <p>在接口中使用泛型，定义可重用的类型结构。</p>
                    </InfoCard>
                </div>

                <SecondaryCard title="函数泛型基础">
                    <ExpandableCode 
                        language="typescript"
                        maxHeight={300}
                    >
{`// 基本函数泛型
function identity<T>(arg: T): T {
    return arg;
}

// 使用方式
let output1 = identity<string>("hello");
let output2 = identity<number>(42);
let output3 = identity("world"); // 类型推断

// 多个泛型参数
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

const result = pair<string, number>("hello", 42);

// 泛型数组函数
function getArrayLength<T>(arr: T[]): number {
    return arr.length;
}

function getFirstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}

// 泛型箭头函数
const reverse = <T>(arr: T[]): T[] => {
    return arr.slice().reverse();
};`}
                    </ExpandableCode>
                </SecondaryCard>

                <SecondaryCard title="接口泛型">
                    <ExpandableCode 
                        language="typescript"
                        maxHeight={300}
                    >
{`// 泛型接口
interface Container<T> {
    value: T;
    getValue(): T;
    setValue(value: T): void;
}

class Box<T> implements Container<T> {
    constructor(public value: T) {}
    
    getValue(): T {
        return this.value;
    }
    
    setValue(value: T): void {
        this.value = value;
    }
}

const stringBox = new Box<string>("hello");
const numberBox = new Box<number>(42);

// 泛型数组接口
interface Repository<T> {
    items: T[];
    add(item: T): void;
    find(predicate: (item: T) => boolean): T | undefined;
    getAll(): T[];
}

class UserRepository implements Repository<User> {
    items: User[] = [];
    
    add(user: User): void {
        this.items.push(user);
    }
    
    find(predicate: (user: User) => boolean): User | undefined {
        return this.items.find(predicate);
    }
    
    getAll(): User[] {
        return [...this.items];
    }
}`}
                    </ExpandableCode>
                </SecondaryCard>

                <SecondaryCard title="类泛型">
                    <ExpandableCode 
                        language="typescript"
                        maxHeight={300}
                    >
{`// 泛型类
class Stack<T> {
    private items: T[] = [];
    
    push(item: T): void {
        this.items.push(item);
    }
    
    pop(): T | undefined {
        return this.items.pop();
    }
    
    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }
    
    isEmpty(): boolean {
        return this.items.length === 0;
    }
    
    size(): number {
        return this.items.length;
    }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);

const stringStack = new Stack<string>();
stringStack.push("hello");
stringStack.push("world");

// 泛型类继承
class ExtendedStack<T> extends Stack<T> {
    getAll(): T[] {
        return [...this.items];
    }
    
    clear(): void {
        this.items = [];
    }
}`}
                    </ExpandableCode>
                </SecondaryCard>

                <SecondaryCard title="泛型约束">
                    <div className="space-y-4">
                        <p className="text-sm">泛型约束限制泛型参数必须满足某些条件，提供更精确的类型控制。</p>
                        
                        <ExpandableCode 
                            language="typescript"
                            maxHeight={300}
                        >
{`// extends 约束
interface Lengthwise {
    length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

logLength("hello"); // OK
logLength([1, 2, 3]); // OK
// logLength(123); // Error: number 没有 length 属性

// 键约束
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const person = { name: "Alice", age: 30, email: "alice@example.com" };
const name = getProperty(person, "name"); // string
const age = getProperty(person, "age"); // number
// const invalid = getProperty(person, "invalid"); // Error

// 条件约束
interface Bird {
    fly(): void;
}

interface Fish {
    swim(): void;
}

function move<T extends Bird | Fish>(animal: T): void {
    if ('fly' in animal) {
        animal.fly();
    } else {
        animal.swim();
    }
}

// 构造器约束
interface Constructable {
    new (...args: any[]): any;
}

function create<T extends Constructable>(ctor: T, ...args: any[]): InstanceType<T> {
    return new ctor(...args);
}`}
                        </ExpandableCode>
                    </div>
                </SecondaryCard>

                <InfoCard title="最佳实践">
                    <ul className="list-disc pl-4 space-y-2">
                        <li><strong>明确命名：</strong>使用有意义的泛型参数名，如 TKey、TValue 而不是 T、U</li>
                        <li><strong>合理约束：</strong>使用泛型约束提供更好的类型提示和错误信息</li>
                        <li><strong>避免过度泛型：</strong>不要为了泛型而泛型，保持代码的可读性</li>
                        <li><strong>默认类型：</strong>为泛型参数提供合理的默认值</li>
                    </ul>
                </InfoCard>
            </div>
        </QuestionCard>
    );
} 