import { JavaBasicsOOP } from "./basics/data/oop";
import { JavaBasicsStringDifference } from "./basics/data/string-difference";
import { JavaBasicsCollections } from "./basics/data/collections";
import { JavaBasicsConcurrency } from "./basics/data/concurrency";
import { JavaBasicsJVM } from "./basics/data/jvm";
import { JavaBasicsIO } from "./basics/data/io";
import { JavaBasicsWhatIsJava } from "./basics/data/java-concept";

// SpringBoot
import { SpringBootIntro } from "./springboot/data/springboot-intro";
import { SpringBootAutoConfiguration } from "./springboot/data/auto-configuration";

// Redis
import { RedisPerformance } from "./redis/data/redis-performance";

// MySQL
import { MySQLTransactionIsolation } from "./mysql/data/transaction-isolation";

/**
 * Java 技术栈知识点主页面
 */
export function JavaBasics() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="container mx-auto px-6 py-8">
                {/* 页面标题 */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Java技术栈交互式面试指南
                    </h1>
                    <p className="text-lg text-gray-600 mb-2">
                        深圳、苏州、南京、杭州实习备战
                    </p>
                    <p className="text-base text-gray-500">
                        全面覆盖 Java 基础、SpringBoot、Redis、MySQL、RabbitMQ 核心知识点
                    </p>
                    <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* 知识点卡片列表 */}
                <div className="space-y-8">
                    {/* Java 基础部分 */}
                    <section>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                                <i className="fi fi-brands-java text-orange-500 mr-3"></i>
                                Java 基础
                            </h2>
                            <div className="w-16 h-0.5 bg-orange-500 rounded-full"></div>
                        </div>
                        
                        <div className="grid gap-6">
                            <JavaBasicsWhatIsJava id="java-concept" />
                            <JavaBasicsOOP id="oop" />
                            <JavaBasicsStringDifference id="string-difference" />
                            <JavaBasicsCollections id="collections" />
                            <JavaBasicsConcurrency id="concurrency" />
                            <JavaBasicsJVM id="jvm" />
                            <JavaBasicsIO id="io" />
                        </div>
                    </section>

                    {/* SpringBoot 部分 */}
                    <section>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                                <i className="fi fi-rr-leaf text-green-500 mr-3"></i>
                                SpringBoot
                            </h2>
                            <div className="w-16 h-0.5 bg-green-500 rounded-full"></div>
                        </div>
                        
                        <div className="grid gap-6">
                            <SpringBootIntro id="springboot-intro" />
                            <SpringBootAutoConfiguration id="auto-configuration" />
                        </div>
                    </section>

                    {/* Redis 部分 */}
                    <section>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                                <i className="fi fi-rr-database text-red-500 mr-3"></i>
                                Redis
                            </h2>
                            <div className="w-16 h-0.5 bg-red-500 rounded-full"></div>
                        </div>
                        
                        <div className="grid gap-6">
                            <RedisPerformance id="redis-performance" />
                        </div>
                    </section>

                    {/* MySQL 部分 */}
                    <section>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                                <i className="fi fi-rr-data-transfer text-blue-500 mr-3"></i>
                                MySQL
                            </h2>
                            <div className="w-16 h-0.5 bg-blue-500 rounded-full"></div>
                        </div>
                        
                        <div className="grid gap-6">
                            <MySQLTransactionIsolation id="mysql-transaction-isolation" />
                        </div>
                    </section>

                    {/* 面试技巧部分 */}
                    <section>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                                <i className="fi fi-rr-user-check text-purple-500 mr-3"></i>
                                面试技巧
                            </h2>
                            <div className="w-16 h-0.5 bg-purple-500 rounded-full"></div>
                        </div>
                        
                        <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                            <div className="text-center py-8">
                                <i className="fi fi-rr-construction text-4xl text-gray-400 mb-4"></i>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">面试技巧模块开发中</h3>
                                <p className="text-gray-500">
                                    正在准备技术面试策略、常见问题应对、项目经验表达等内容...
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* 页脚信息 */}
                <footer className="mt-16 text-center">
                    <div className="inline-flex items-center px-6 py-3 bg-white rounded-full shadow-lg border border-gray-200">
                        <i className="fi fi-rr-heart text-red-500 mr-2"></i>
                        <span className="text-gray-600 text-sm">
                            祝您面试顺利，斩获心仪Offer！
                        </span>
                    </div>
                </footer>
            </div>
        </div>
    );
} 