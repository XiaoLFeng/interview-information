import { 
    RedisPerformance
} from "../../../../components/knowledge/java/redis";

/**
 * # Redis
 * Redis 缓存技术与应用实践
 */
export function JavaRedis() {
    return (
        <div className="container mx-auto max-w-6xl">
            {/* 页面标题 */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-primary mb-3">Redis</h1>
                <p className="text-base-content/70">
                    Redis 缓存技术与应用实践
                </p>
            </div>

            {/* 题目列表 */}
            <div className="space-y-6">
                <RedisPerformance id="redis-1" />
            </div>
        </div>
    );
} 