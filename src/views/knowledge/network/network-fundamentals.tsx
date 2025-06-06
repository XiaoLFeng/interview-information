import { 
    NetworkHttpHttps
} from "../../../components/knowledge/network";

/**
 * # 网络通信基础
 * 掌握网络协议、HTTP通信、安全传输等核心知识
 */
export function NetworkFundamentals() {

    return (
        <div className="container mx-auto max-w-6xl">
            {/* 页面标题 */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-primary mb-3">网络通信基础</h1>
                <p className="text-base-content/70">
                    掌握网络协议、HTTP通信、安全传输等核心知识
                </p>
            </div>

            {/* 题目列表 */}
            <div className="space-y-6">
                <NetworkHttpHttps id="network-fundamentals-1" />
            </div>
        </div>
    );
} 