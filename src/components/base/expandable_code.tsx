import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface ExpandableCodeProps {
    children: string
    language?: string
    className?: string
    maxHeight?: number
    expandedHeight?: number
}

/**
 * # 可展开代码块
 * 用于在内容中插入可展开代码块，通常用于代码示例。
 * 
 * @param children 代码内容
 * @param language 代码语言
 * @param maxHeight 最大高度
 * @param expandedHeight 展开后高度
 * @returns 可展开代码块
 */
export function ExpandableCode({
    children,
    language = 'java',
    maxHeight = 300,
    expandedHeight = 800
}: ExpandableCodeProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    
    // 计算代码行数，估算是否需要展开按钮
    const lineCount = children.split('\n').length
    const estimatedHeight = lineCount * 22 // 每行大约22px (包含行高)
    const needsExpansion = estimatedHeight > maxHeight

    return (
        <div className={`relative rounded-lg`}>
            <div 
                className="relative rounded-lg overflow-hidden border border-base-300"
                style={{ 
                    maxHeight: isExpanded ? `${expandedHeight}px` : `${maxHeight}px`,
                    transition: 'max-height 0.3s ease-in-out'
                }}
            >
                <SyntaxHighlighter 
                    language={language} 
                    style={oneDark}
                    customStyle={{
                        margin: 0,
                        fontSize: '12px',
                        lineHeight: '1.4'
                    }}
                    showLineNumbers={true}
                >
                    {children}
                </SyntaxHighlighter>
                
                {/* 渐变遮罩，只在未展开且需要展开时显示 */}
                {needsExpansion && !isExpanded && (
                    <div 
                        className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"
                    />
                )}
                
                {/* 代码内嵌展开/收起按钮 */}
                {needsExpansion && (
                    <div className="absolute bottom-2 right-2">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="px-3 py-1.5 bg-black/70 hover:bg-black/80 text-white text-xs rounded-md backdrop-blur-sm border border-white/20 transition-all duration-200 flex items-center gap-1"
                        >
                            <i className={`fi ${isExpanded ? 'fi-rr-compress' : 'fi-rr-expand'} text-xs flex`}></i>
                            {isExpanded ? '收起' : '展开'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
} 