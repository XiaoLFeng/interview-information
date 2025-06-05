import { Outlet } from "react-router";
import { SideMenu } from "../../../components/base/knowledge_side_menu";
import type { MenuItem } from "../../../components/base/knowledge_side_menu";

// 前端知识点菜单
const frontMenuItems: MenuItem[] = [
    {
        id: "overview",
        label: "前端概览",
        path: "/knowledge/front",
        icon: "fi fi-rr-apps",
        description: "学习路径和知识体系"
    },
    {
        id: "html-css",
        label: "HTML & CSS",
        path: "/knowledge/front/html-css",
        icon: "fi fi-rr-browser",
        description: "页面结构和样式"
    },
    {
        id: "javascript",
        label: "JavaScript",
        path: "/knowledge/front/javascript",
        icon: "fi fi-brands-js",
        description: "语言基础和ES6+"
    },
    {
        id: "react",
        label: "React",
        path: "/knowledge/front/react",
        icon: "fi fi-brands-react",
        description: "组件、Hooks、状态管理"
    },
    {
        id: "vue",
        label: "Vue",
        path: "/knowledge/front/vue",
        icon: "fi fi-rr-angle-double-right",
        description: "组件化和响应式系统"
    },
    {
        id: "typescript",
        label: "TypeScript",
        path: "/knowledge/front/typescript",
        icon: "fi fi-rr-square-code",
        description: "类型系统和接口"
    },
    {
        id: "engineering",
        label: "工程化",
        path: "/knowledge/front/engineering",
        icon: "fi fi-rr-tools",
        description: "构建工具和CI/CD"
    },
    {
        id: "performance",
        label: "性能优化",
        path: "/knowledge/front/performance",
        icon: "fi fi-rr-rocket",
        description: "加载性能和运行性能"
    }
];

export function BaseFront() {
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