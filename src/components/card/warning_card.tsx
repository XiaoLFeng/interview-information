/**
 * # 警告卡片
 * 用于在内容中插入警告信息，通常用于易错点、深究、注意事项等。
 * 
 * @param title 标题
 * @param children 内容
 * @returns 警告卡片
 */
export function WarningCard({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="mt-3 p-3 bg-warning/10 border-l-4 border-warning rounded">
            <h4 className="font-semibold text-warning-content mb-2">⚠️ {title}</h4>
            {children}
        </div>
    )
}