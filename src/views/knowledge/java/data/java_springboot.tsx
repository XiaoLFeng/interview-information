import {
    SpringBootIntro,
    SpringBootAutoConfiguration
} from "../../../../components/knowledge/java/springboot";

/**
 * # SpringBoot
 * SpringBoot 框架核心技术与实践
 */
export function JavaSpringBoot() {
    return (
        <div className="container mx-auto max-w-6xl">
            {/* 页面标题 */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-primary mb-3">SpringBoot</h1>
                <p className="text-base-content/70">
                    SpringBoot 框架核心技术与实践
                </p>
            </div>

            {/* 题目列表 */}
            <div className="space-y-6">
                <SpringBootIntro id="springboot-1" />
                <SpringBootAutoConfiguration id="springboot-2" />
            </div>
        </div>
    );
} 