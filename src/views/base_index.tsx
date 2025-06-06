import { Link } from "react-router";

export default function BaseIndex() {
    document.title = "筱锋的知识库";

    return (
        <div className="min-h-screen bg-base-100">
            {/* 头部区域 */}
            <div className="hero min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
                <div className="hero-content text-center">
                    <div className="max-w-4xl">
                        <h1 className="text-5xl font-bold text-primary mb-6">
                            筱锋的知识库
                        </h1>
                        <p className="text-xl text-base-content/70 mb-8">
                            汇总 Java、前端、Go 技术栈面试题，对外开放可扩展的知识库，助你高效备战面试
                        </p>

                        {/* 知识分类卡片区域 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                            {/* Java 分类卡片 */}
                            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer">
                                <div className="card-body items-center text-center">
                                    <div className="text-6xl mb-4">
                                        <i className="fi fi-brands-java flex" />
                                    </div>
                                    <h2 className="card-title text-primary text-2xl">Java</h2>
                                    <p className="text-base-content/60 mb-4">
                                        Java 基础、Spring、JVM、多线程等
                                    </p>
                                    <div className="card-actions justify-end">
                                        <Link to={"/knowledge/java"} className="btn btn-primary">进入学习</Link>
                                    </div>
                                </div>
                            </div>

                            {/* 前端分类卡片 */}
                            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer">
                                <div className="card-body items-center text-center">
                                    <div className="text-6xl mb-4">
                                        <i className="fi fi-rr-browser flex" />
                                    </div>
                                    <h2 className="card-title text-secondary text-2xl">前端</h2>
                                    <p className="text-base-content/60 mb-4">
                                        JavaScript、React、Vue、CSS 等
                                    </p>
                                    <div className="card-actions justify-end">
                                        <Link to={"/knowledge/front"} className="btn btn-secondary">进入学习</Link>
                                    </div>
                                </div>
                            </div>

                            {/* 网络通信分类卡片 */}
                            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer">
                                <div className="card-body items-center text-center">
                                    <div className="text-6xl mb-4">
                                        <i className="fi fi-rr-globe flex"/>
                                    </div>
                                    <h2 className="card-title text-info text-2xl">网络通信</h2>
                                    <p className="text-base-content/60 mb-4">
                                        HTTP、HTTPS、WebSocket等
                                    </p>
                                    <div className="card-actions justify-end">
                                        <Link to={"/knowledge/network"} className="btn btn-info">进入学习</Link>
                                    </div>
                                </div>
                            </div>

                            {/* Go 分类卡片 */}
                            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer">
                                <div className="card-body items-center text-center">
                                    <div className="text-6xl mb-4">
                                        <i className="fi fi-br-house-leave flex"/>
                                    </div>
                                    <h2 className="card-title text-accent text-2xl">Go</h2>
                                    <p className="text-base-content/60 mb-4">
                                        Golang 基础、并发、微服务等
                                    </p>
                                    <div className="card-actions justify-end">
                                        <Link to={"/knowledge/go"} className="btn btn-accent">进入学习</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 统计信息 */}
                        <div className="stats shadow mt-16 bg-base-100">
                            <div className="stat">
                                <div className="stat-title">技术分类</div>
                                <div className="stat-value text-primary">4</div>
                                <div className="stat-desc">Java • 前端 • 网络 • Go</div>
                            </div>

                            <div className="stat">
                                <div className="stat-title">面试题目</div>
                                <div className="stat-value text-secondary">持续更新</div>
                                <div className="stat-desc">涵盖核心知识点</div>
                            </div>

                            <div className="stat">
                                <div className="stat-title">学习方式</div>
                                <div className="stat-value text-accent">开放扩展</div>
                                <div className="stat-desc">可自定义内容</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 页脚版权信息 */}
            <footer className="footer footer-center p-6 bg-base-200 text-base-content">
                <div>
                    <p className="text-sm">
                        © 2024 
                        <a 
                            href="https://www.x-lf.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="link link-primary ml-1 mr-1"
                        >
                            XiaoLFeng
                        </a>
                        - 筱锋的知识库，开放共享技术知识
                    </p>
                </div>
            </footer>
        </div>
    )
}