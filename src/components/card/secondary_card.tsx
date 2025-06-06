/**
 * # 次要卡片
 * 用于在内容中插入次要信息，通常用于易错点、深究、注意事项等。
 * 注意，标题不带Emoji（有需要请自行添加）
 * 
 * @param title 标题
 * @param children 内容
 * @returns 次要卡片
 */
export function SecondaryCard({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="mt-3 p-3 bg-secondary/10 border-l-4 border-secondary rounded">
            <h4 className="font-semibold text-secondary mb-2">{title}</h4>
            {children}
        </div>
    )
}