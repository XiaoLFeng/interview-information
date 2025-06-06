import { Outlet } from "react-router";
import { SideMenu } from "../../../components/base/knowledge_side_menu";
import type { MenuItem } from "../../../components/base/knowledge_side_menu";

// 前端知识点菜单
const frontMenuItems: MenuItem[] = [
    {
        id: "javascript-fundamentals",
        label: "JavaScript",
        path: "/knowledge/front",
        icon: "fi fi-brands-node-js",
        description: "JavaScript语言核心概念和面试要点"
    },
    {
        id: "typescript-fundamentals",
        label: "TypeScript",
        path: "/knowledge/front/typescript",
        icon: "fi fi-brands-typescript",
        description: "TypeScript类型系统和进阶特性"
    },
    {
        id: "css-fundamentals",
        label: "CSS",
        path: "/knowledge/front/css",
        icon: "fi fi-rr-palette",
        description: "CSS布局、选择器、动画等核心概念"
    },
    {
        id: "html-fundamentals",
        label: "HTML",
        path: "/knowledge/front/html",
        icon: "fi fi-br-code-simple",
        description: "HTML语义化、表单、无障碍等知识点"
    },
    {
        id: "react-fundamentals",
        label: "React",
        path: "/knowledge/front/react",
        icon: "fi fi-ss-react",
        description: "React Hooks、生命周期、状态管理等"
    },
    {
        id: "vue-fundamentals",
        label: "Vue",
        path: "/knowledge/front/vue",
        icon: "fi fi-br-v",
        description: "Vue组合式API、响应式原理等"
    },
    {
        id: "browser-fundamentals",
        label: "浏览器原理",
        path: "/knowledge/front/browser",
        icon: "fi fi-rr-browser",
        description: "渲染机制、事件循环、存储等"
    },
    {
        id: "engineering-fundamentals",
        label: "前端工程化",
        path: "/knowledge/front/engineering",
        icon: "fi fi-rr-settings",
        description: "构建工具、模块化、性能优化等"
    }
];

export function BaseFront() {
    document.title = "前端技术栈 - 筱锋的知识库";

    return (
        <div className="flex h-full">
            {/* 左侧菜单 - 固定不随滚动 */}
            <div className="sticky top-0 h-full">
                <SideMenu 
                    title="前端技术栈"
                    icon="fi fi-rr-browser"
                    menuItems={frontMenuItems}
                />
            </div>

            {/* 右侧内容 - 可滚动区域 */}
            <div className="flex-1 overflow-y-auto bg-gradient-to-br from-base-100 via-base-200/30 to-base-200/60">
                <div className="p-8 mx-auto max-w-6xl">
                    <div className="bg-base-100 rounded-2xl shadow-xl p-6 backdrop-blur-sm border border-base-300/20">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
} 