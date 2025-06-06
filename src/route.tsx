import { createBrowserRouter } from "react-router";
import BaseIndex from "./views/base_index";
import { BaseJava } from "./views/knowledge/java/base_java";
import { BaseKnowledge } from "./views/base_knowledge";
import { JavaBasics } from "./views/knowledge/java/data/java_basics";
import { JavaSpringBoot } from "./views/knowledge/java/data/java_springboot";
import { JavaRedis } from "./views/knowledge/java/data/java_redis";
import { JavaMySQL } from "./views/knowledge/java/data/java_mysql";
import { BaseFront } from "./views/knowledge/front/base_front";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: BaseIndex
    },
    {
        path: "knowledge",
        Component: BaseKnowledge,
        children: [
            {
                path: "java",
                Component: BaseJava,
                children: [
                    {
                        path: "",
                        Component: JavaBasics
                    },
                    {
                        path: "springboot",
                        Component: JavaSpringBoot
                    },
                    {
                        path: "redis",
                        Component: JavaRedis
                    },
                    {
                        path: "mysql",
                        Component: JavaMySQL
                    }
                ]
            },
            {
                path: "front",
                Component: BaseFront,
                children: [
                    {
                        path: "",
                        Component: () => (
                            <div className="text-center py-4">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/20 mb-6">
                                    <i className="fi fi-rr-browser text-4xl text-secondary"></i>
                                </div>
                                <h1 className="text-3xl font-bold text-secondary mb-4">前端技术栈</h1>
                                <p className="text-base-content/70 max-w-2xl mx-auto mb-8">
                                    从HTML、CSS基础到现代前端框架和工程化，全面掌握前端开发技术
                                </p>
                                <div className="stats shadow inline-flex bg-base-100">
                                    <div className="stat">
                                        <div className="stat-title">知识模块</div>
                                        <div className="stat-value text-secondary">8</div>
                                        <div className="stat-desc">涵盖核心技术</div>
                                    </div>
                                    <div className="stat">
                                        <div className="stat-title">面试题目</div>
                                        <div className="stat-value text-secondary">143</div>
                                        <div className="stat-desc">重点难点解析</div>
                                    </div>
                                </div>
                                <div className="mt-12 text-sm text-base-content/60">
                                    <i className="fi fi-rr-info-circle mr-2"></i>
                                    选择左侧菜单中的知识点开始学习
                                </div>
                            </div>
                        )
                    }
                ]
            },
            {
                path: "go",
                Component: () => (
                    <div className="flex items-center justify-center min-h-96">
                        <div className="text-center">
                            <i className="fi fi-rr-house-leave text-6xl text-accent mb-4"></i>
                            <h3 className="text-2xl font-bold text-accent mb-2">Go 知识库</h3>
                            <p className="text-base-content/70">Golang 基础、并发、微服务等内容正在准备中...</p>
                        </div>
                    </div>
                )
            }
        ]
    }
]);