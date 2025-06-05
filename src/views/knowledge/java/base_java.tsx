import { Outlet } from "react-router";
import { SideMenu } from "../../../components/base/knowledge_side_menu";
import type { MenuItem } from "../../../components/base/knowledge_side_menu";

// Java 知识点菜单
const javaMenuItems: MenuItem[] = [
    {
        id: "overview",
        label: "Java 概览",
        path: "/knowledge/java",
        icon: "fi fi-rr-apps",
        description: "技能树和学习路径"
    },
    {
        id: "collections",
        label: "集合框架",
        path: "/knowledge/java/collections",
        icon: "fi fi-rr-list",
        description: "List、Set、Map 详解"
    },
    {
        id: "concurrent",
        label: "并发编程",
        path: "/knowledge/java/concurrent",
        icon: "fi fi-rr-time-forward",
        description: "多线程、锁、并发工具"
    },
    {
        id: "jvm",
        label: "JVM 原理",
        path: "/knowledge/java/jvm",
        icon: "fi fi-rr-settings",
        description: "内存模型、垃圾回收"
    },
    {
        id: "spring",
        label: "Spring 框架",
        path: "/knowledge/java/spring",
        icon: "fi fi-rr-leaf",
        description: "IoC、AOP、Spring Boot"
    },
    {
        id: "database",
        label: "数据库相关",
        path: "/knowledge/java/database",
        icon: "fi fi-rr-database",
        description: "JDBC、MyBatis、JPA"
    },
    {
        id: "network",
        label: "网络编程",
        path: "/knowledge/java/network",
        icon: "fi fi-rr-wifi",
        description: "Socket、HTTP、RPC"
    }
];

export function BaseJava() {
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