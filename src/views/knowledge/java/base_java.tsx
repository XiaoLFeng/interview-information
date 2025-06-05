import { Outlet } from "react-router";
import { SideMenu } from "../../../components/base/knowledge_side_menu";
import type { MenuItem } from "../../../components/base/knowledge_side_menu";

// Java 知识点菜单
const javaMenuItems: MenuItem[] = [
    {
        id: "base",
        label: "Java 基础",
        path: "/knowledge/java",
        icon: "fi fi-rr-apps",
        description: "Java 基础知识"
    },
];

export function BaseJava() {
    document.title = "Java技术栈 - 筱锋的知识库";

    return (
        <div className="flex h-full">
            {/* 左侧菜单 - 固定不随滚动 */}
            <div className="sticky top-0 h-full">
                <SideMenu 
                    title="Java 技术栈"
                    icon="fi fi-brands-java"
                    menuItems={javaMenuItems}
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