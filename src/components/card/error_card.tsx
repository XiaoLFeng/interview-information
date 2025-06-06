/**
 * # 错误卡片
 * 用于在内容中插入错误信息，通常用于易错点、深究、注意事项等。
 * 
 * @param title 标题
 * @param children 内容
 * @returns 错误卡片
 */
export function ErrorCard({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="mt-3 p-3 bg-error/10 border-l-4 border-error rounded">
            <h4 className="font-semibold text-error-content mb-2">❌ {title}</h4>
            {children}
        </div>
    )
}