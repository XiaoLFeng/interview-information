import { MySQLTransactionIsolation } from "../../../../components/knowledge/java/mysql";

/**
 * # MySQL
 * MySQL 数据库核心技术与优化
 */
export function JavaMySQL() {
    return (
        <div className="container mx-auto max-w-6xl">
            {/* 页面标题 */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-primary mb-3">MySQL</h1>
                <p className="text-base-content/70">
                    MySQL 数据库核心技术与优化
                </p>
            </div>

            {/* 题目列表 */}
            <div className="space-y-6">
                <MySQLTransactionIsolation id="mysql-1" />
            </div>
        </div>
    );
} 