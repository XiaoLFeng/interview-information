import { QuestionCard } from "../../../../base/knowledge_question_card";
import { ExpandableCode } from "../../../../base/expandable_code";
import { SuccessCard } from "../../../../card/success_card";
import { InfoCard } from "../../../../card/info_card";
import { WarningCard } from "../../../../card/warning_card";
import { SecondaryCard } from "../../../../card/secondary_card";

interface Props {
    id: string;
}

export function FrontTypeScriptModules({ id }: Props) {
    return (
        <QuestionCard
            question={{
                id,
                title: "TypeScript 模块系统",
                category: "TypeScript",
                content: "TypeScript 的模块系统是什么？ES6 模块、CommonJS、命名空间的区别和使用场景？如何进行模块声明和类型导入导出？",
                tags: ["TypeScript", "模块系统", "ES6模块", "CommonJS", "命名空间", "类型导入"]
            }}
        >
            <div className="space-y-6">
                <SuccessCard title="核心要点">
                    <p>TypeScript 支持多种模块系统，包括 ES6 模块、CommonJS 和内部命名空间，提供了灵活的代码组织和类型管理能力。</p>
                </SuccessCard>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoCard title="ES6 模块">
                        <p>现代 JavaScript 标准模块系统，支持静态分析和树摇优化。</p>
                    </InfoCard>
                    <InfoCard title="命名空间">
                        <p>TypeScript 内部模块系统，用于组织代码和避免全局污染。</p>
                    </InfoCard>
                </div>

                <SecondaryCard title="ES6 模块导入导出">
                    <ExpandableCode 
                        language="typescript"
                        maxHeight={350}
                    >
{`// 基本导出
export interface User {
    id: number;
    name: string;
    email: string;
}

export class UserService {
    getUser(id: number): User | null {
        // 实现逻辑
        return null;
    }
}

export const API_BASE_URL = "https://api.example.com";

export function formatUser(user: User): string {
    return \`\${user.name} (\${user.email})\`;
}

// 默认导出
export default class DefaultUserService {
    private users: User[] = [];
    
    addUser(user: User): void {
        this.users.push(user);
    }
}

// 重新导出
export { User as UserType } from './types';
export * from './constants';
export { default as Logger } from './logger';

// 导入使用
import DefaultUserService from './user-service';
import { User, UserService, API_BASE_URL } from './user-service';
import * as UserModule from './user-service';

// 类型导入（TypeScript 3.8+）
import type { User } from './types';
import type { Logger } from './logger';

// 混合导入
import UserService, { type User, API_BASE_URL } from './user-service';`}
                    </ExpandableCode>
                </SecondaryCard>

                <SecondaryCard title="命名空间 (Namespace)">
                    <ExpandableCode 
                        language="typescript"
                        maxHeight={300}
                    >
{`// 命名空间定义
namespace Validation {
    export interface StringValidator {
        isValid(s: string): boolean;
    }

    export class EmailValidator implements StringValidator {
        isValid(email: string): boolean {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
    }

    export class PhoneValidator implements StringValidator {
        isValid(phone: string): boolean {
            return /^\d{10,}$/.test(phone);
        }
    }

    // 内部函数，不导出
    function sanitize(input: string): string {
        return input.trim().toLowerCase();
    }
}

// 使用命名空间
const emailValidator = new Validation.EmailValidator();
const isValidEmail = emailValidator.isValid("test@example.com");

// 嵌套命名空间
namespace App {
    export namespace Utils {
        export function formatDate(date: Date): string {
            return date.toISOString().split('T')[0];
        }
    }

    export namespace API {
        export const BASE_URL = "https://api.example.com";
        
        export interface Response<T> {
            data: T;
            status: number;
        }
    }
}

// 使用嵌套命名空间
const formattedDate = App.Utils.formatDate(new Date());
const response: App.API.Response<string> = {
    data: "Hello",
    status: 200
};`}
                    </ExpandableCode>
                </SecondaryCard>

                <SecondaryCard title="模块声明文件">
                    <ExpandableCode 
                        language="typescript"
                        maxHeight={300}
                    >
{`// types.d.ts - 类型声明文件
declare module "lodash" {
    export function debounce<T extends (...args: any[]) => any>(
        func: T,
        wait: number
    ): T;
    
    export function cloneDeep<T>(obj: T): T;
}

// 全局变量声明
declare global {
    interface Window {
        myApp: {
            version: string;
            config: any;
        };
    }
    
    var MY_GLOBAL_CONSTANT: string;
}

// 模块扩展
declare module "express" {
    interface Request {
        user?: {
            id: number;
            name: string;
        };
    }
}

// 自定义模块类型
declare module "*.vue" {
    import { ComponentOptions } from "vue";
    const component: ComponentOptions;
    export default component;
}

declare module "*.css" {
    const classes: { [key: string]: string };
    export default classes;
}

// 环境变量类型
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: "development" | "production" | "test";
        DATABASE_URL: string;
        API_KEY: string;
    }
}`}
                    </ExpandableCode>
                </SecondaryCard>

                <SecondaryCard title="动态导入和代码分割">
                    <ExpandableCode 
                        language="typescript"
                        maxHeight={300}
                    >
{`// 动态导入
async function loadUserModule() {
    const { UserService } = await import('./user-service');
    return new UserService();
}

// 条件加载
async function loadValidation(type: "email" | "phone") {
    if (type === "email") {
        const { EmailValidator } = await import('./email-validator');
        return new EmailValidator();
    } else {
        const { PhoneValidator } = await import('./phone-validator');
        return new PhoneValidator();
    }
}

// 类型安全的动态导入
interface ModuleWithDefault<T> {
    default: T;
}

async function loadDefaultExport<T>(
    modulePath: string
): Promise<T> {
    const module = await import(modulePath) as ModuleWithDefault<T>;
    return module.default;
}

// React 组件懒加载
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./components/HeavyComponent'));

function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LazyComponent />
        </Suspense>
    );
}

// Webpack 魔法注释
const UserDashboard = lazy(() => 
    import(
        /* webpackChunkName: "user-dashboard" */
        /* webpackPreload: true */
        './components/UserDashboard'
    )
);`}
                    </ExpandableCode>
                </SecondaryCard>

                <WarningCard title="模块系统注意事项">
                    <ul className="list-disc pl-4 space-y-2">
                        <li><strong>循环依赖：</strong>避免模块之间的循环依赖，可能导致运行时错误</li>
                        <li><strong>类型导入：</strong>优先使用 type 导入，减少运行时开销</li>
                        <li><strong>命名空间 vs 模块：</strong>优先使用 ES6 模块，命名空间主要用于类型组织</li>
                        <li><strong>声明合并：</strong>注意命名空间和接口的声明合并规则</li>
                    </ul>
                </WarningCard>
            </div>
        </QuestionCard>
    );
} 