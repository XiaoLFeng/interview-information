/**
 * # 强调卡片
 * 用于在内容中插入强调信息，通常用于易错点、深究、注意事项等。
 * 注意，标题不带Emoji（有需要请自行添加）
 * 
 * @param title 标题
 * @param children 内容
 * @returns 强调卡片
 */
export function AccentCard({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="mt-3 p-3 bg-accent/10 border-l-4 border-accent rounded">
            <h4 className="font-semibold text-accent mb-2">{title}</h4>
            {children}
        </div>
    )
}