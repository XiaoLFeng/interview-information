import { Outlet } from "react-router";
import { SideMenu } from "../../../components/base/knowledge_side_menu";
import type { MenuItem } from "../../../components/base/knowledge_side_menu";

// Go 知识点菜单
const goMenuItems: MenuItem[] = [
    {
        id: "go-basics",
        label: "Go 基础",
        path: "/knowledge/go", // Default path for the Go section
        icon: "fi fi-rr-document", // Example icon
        description: "Go 语言的核心语法和基础概念"
    },
    {
        id: "go-concurrency",
        label: "Goroutines 与 Channels",
        path: "/knowledge/go/concurrency",
        icon: "fi fi-rr-shuffle",
        description: "Go 语言并发核心：Goroutines 和 Channels"
    },
    {
        id: "go-web-development",
        label: "Web 开发",
        path: "/knowledge/go/web-development",
        icon: "fi fi-rr-globe",
        description: "使用 Go 进行 Web 应用和 API 开发"
    },
    {
        id: "go-databases",
        label: "操作数据库",
        path: "/knowledge/go/databases",
        icon: "fi fi-rr-database",
        description: "使用 Go 连接和操作各类数据库"
    },
    {
        id: "go-testing",
        label: "测试",
        path: "/knowledge/go/testing",
        icon: "fi fi-rr-test-tube",
        description: "Go 语言中的单元测试和基准测试"
    }
];

export function BaseGo() {
    document.title = "Go技术栈 - 筱锋的知识库";

    return (
        <div className="flex h-full">
            {/* 左侧菜单 - 固定不随滚动 */}
            <div className="sticky top-0 h-full">
                <SideMenu
                    title="Go 技术栈"
                    icon="fi fi-brands-golang"
                    menuItems={goMenuItems}
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
