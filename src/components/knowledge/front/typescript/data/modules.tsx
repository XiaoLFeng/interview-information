import { QuestionCard } from "../../../../base/knowledge_question_card";
import { ExpandableCode } from "../../../../base/expandable_code";
import { SuccessCard } from "../../../../card/success_card";
import { InfoCard } from "../../../../card/info_card";
import { WarningCard } from "../../../../card/warning_card";
import { SecondaryCard } from "../../../../card/secondary_card";

interface Props {
    id: string;
}

/**
 * 模块系统
 * 
 * 面试问题：TypeScript 如何处理模块？declare module 的作用？.d.ts 声明文件的工作原理？
 * 
 * 核心解答：TypeScript 基于 ES6 模块系统，支持静态导入和动态导入。声明文件（.d.ts）提供类型信息但不包含实现。declare module 用于为第三方库添加类型声明或扩展现有模块。
 */
export function FrontTypeScriptModules({ id }: Props) {
    return (
        <QuestionCard
            question={{
                id,
                title: "模块系统",
                category: "模块系统",
                content: "面试问题：TypeScript 如何处理模块？declare module 的作用？.d.ts 声明文件的工作原理？",
                tags: ["TypeScript", "模块系统", "面试", "声明文件", "ES6模块"]
            }}
        >
            <div className="space-y-6">
                <SuccessCard title="核心解答">
                    <p>TypeScript 基于 ES6 模块系统，支持<strong>静态导入</strong>和<strong>动态导入</strong>。声明文件（.d.ts）提供类型信息但不包含实现。<code>declare module</code> 用于为第三方库添加类型声明或扩展现有模块。</p>
                </SuccessCard>

                <SecondaryCard title="📝 模块系统核心概念">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold mb-2">1. ES6 模块导入导出</h4>
                            <ExpandableCode language="typescript" maxHeight={180}>
{`// 导出方式
export interface User {
    id: number;
    name: string;
}

export const API_URL = "https://api.example.com";

export function createUser(data: Partial<User>): User {
    return { id: Date.now(), ...data } as User;
}

// 默认导出
export default class UserService {
    getUser(id: number): Promise<User> {
        return fetch(\`\${API_URL}/users/\${id}\`).then(r => r.json());
    }
}

// 重新导出
export { UserType } from './types/user';
export * from './constants';`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2">2. 类型导入 (Type-only Import)</h4>
                            <ExpandableCode language="typescript" maxHeight={150}>
{`// TypeScript 3.8+ 类型导入
import type { User } from './types';
import type { ApiResponse } from './api';

// 混合导入：值和类型
import UserService, { type User, API_URL } from './user-service';

// 为什么需要 type 导入？
// 1. 明确意图 - 表明只导入类型
// 2. 打包优化 - 构建工具可以移除纯类型导入
// 3. 避免循环依赖 - 类型导入不会产生运行时依赖`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2">3. 动态导入与代码分割</h4>
                            <ExpandableCode language="typescript" maxHeight={150}>
{`// 动态导入返回 Promise
async function loadUserModule() {
    const { UserService } = await import('./user-service');
    return new UserService();
}

// 条件加载
async function loadValidator(type: 'email' | 'phone') {
    if (type === 'email') {
        const { EmailValidator } = await import('./validators/email');
        return new EmailValidator();
    }
    // ...
}

// React 懒加载组件
const UserDashboard = lazy(() => import('./UserDashboard'));`}
                            </ExpandableCode>
                        </div>
                    </div>
                </SecondaryCard>

                <InfoCard title="为什么需要模块系统">
                    <ul className="list-disc pl-4 space-y-2">
                        <li><strong>命名空间管理：</strong>避免全局变量冲突</li>
                        <li><strong>依赖关系：</strong>明确模块间的依赖关系</li>
                        <li><strong>代码分割：</strong>支持按需加载，优化性能</li>
                        <li><strong>类型安全：</strong>跨模块的类型检查和推断</li>
                    </ul>
                </InfoCard>

                <WarningCard title="面试常考难点">
                    <div className="space-y-4">
                        <div>
                            <h5 className="font-semibold">1. 声明文件的作用和编写</h5>
                            <ExpandableCode language="typescript" maxHeight={200}>
{`// types/global.d.ts - 全局类型声明
declare global {
    interface Window {
        gtag: (command: string, ...args: any[]) => void;
        dataLayer: any[];
    }
    
    // 扩展已有的全局变量
    var MY_APP_VERSION: string;
}

// 为第三方库添加类型
declare module "lodash" {
    export function debounce<T extends (...args: any[]) => any>(
        func: T,
        wait: number
    ): T;
}

// 模块扩展 - 为现有库添加新方法
declare module "express-serve-static-core" {
    interface Request {
        user?: { id: string; role: string };
    }
}`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">2. 模块解析策略</h5>
                            <ExpandableCode language="typescript" maxHeight={180}>
{`// tsconfig.json 中的模块解析配置
{
    "compilerOptions": {
        "moduleResolution": "node",     // Node.js 解析策略
        "baseUrl": "./src",             // 基础路径
        "paths": {                      // 路径映射
            "@/*": ["*"],
            "@components/*": ["components/*"],
            "@utils/*": ["utils/*"]
        }
    }
}

// 使用路径映射
import { Button } from '@components/ui';      // -> src/components/ui
import { debounce } from '@utils/helpers';    // -> src/utils/helpers

// 面试重点：解释 moduleResolution 的区别
// "node" - 遵循 Node.js 解析规则
// "classic" - TypeScript 旧版解析规则（不推荐）`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">3. 循环依赖问题</h5>
                            <ExpandableCode language="typescript" maxHeight={150}>
{`// ❌ 容易产生循环依赖
// user.ts
import { Post } from './post';
export interface User {
    posts: Post[];
}

// post.ts  
import { User } from './user';
export interface Post {
    author: User;
}

// ✅ 解决方案：使用类型导入
// post.ts
import type { User } from './user';
export interface Post {
    author: User;
}`}
                            </ExpandableCode>
                        </div>
                    </div>
                </WarningCard>

                <SecondaryCard title="💡 面试实战技巧">
                    <div className="space-y-4">
                        <div>
                            <h5 className="font-semibold">设计一个类型安全的插件系统</h5>
                            <ExpandableCode language="typescript" maxHeight={200}>
{`// 插件接口定义
interface Plugin<T = any> {
    name: string;
    version: string;
    install(app: App): void;
    config?: T;
}

// 插件管理器
class PluginManager {
    private plugins = new Map<string, Plugin>();
    
    register<T>(plugin: Plugin<T>): void {
        this.plugins.set(plugin.name, plugin);
    }
    
    async loadPlugin(name: string): Promise<void> {
        // 动态导入插件
        const module = await import(\`./plugins/\${name}\`);
        const plugin = module.default as Plugin;
        this.register(plugin);
    }
}

// 插件模块声明
declare module './plugins/*' {
    const plugin: Plugin;
    export default plugin;
}`}
                            </ExpandableCode>
                        </div>

                        <div>
                            <h5 className="font-semibold">环境变量和配置的类型安全</h5>
                            <ExpandableCode language="typescript" maxHeight={150}>
{`// env.d.ts - 环境变量类型声明
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        DATABASE_URL: string;
        JWT_SECRET: string;
        PORT?: string;
    }
}

// config.ts - 配置文件
interface Config {
    port: number;
    database: {
        url: string;
    };
    jwt: {
        secret: string;
        expiresIn: string;
    };
}

export const config: Config = {
    port: parseInt(process.env.PORT || '3000'),
    database: {
        url: process.env.DATABASE_URL,  // 类型安全，必须存在
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: '7d'
    }
};`}
                            </ExpandableCode>
                        </div>
                    </div>
                </SecondaryCard>

                <InfoCard title="面试加分点">
                    <ul className="list-disc pl-4 space-y-2">
                        <li><strong>打包工具集成：</strong>了解 TypeScript 与 Webpack、Vite 的集成</li>
                        <li><strong>声明文件发布：</strong>为开源库编写和发布类型声明</li>
                        <li><strong>monorepo 管理：</strong>在 monorepo 中管理 TypeScript 模块</li>
                        <li><strong>性能优化：</strong>理解模块解析对编译性能的影响</li>
                    </ul>
                </InfoCard>
            </div>
        </QuestionCard>
    );
} 