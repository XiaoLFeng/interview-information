/**
 * # 成功卡片
 * 用于在内容中插入成功信息，通常用于易错点、深究、注意事项等。
 * 
 * @param title 标题
 * @param children 内容
 * @returns 成功卡片
 */
export function SuccessCard({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="mt-3 p-3 bg-success/10 border-l-4 border-success rounded">
            <h4 className="font-semibold text-success-content mb-2">✅ {title}</h4>
            {children}
        </div>
    )
}