import { useState } from 'react';

// 问题接口定义
export interface Question {
    id: string;
    title: string;
    category: string;
    content: string;
    tags: string[];
}

interface QuestionCardProps {
    question: Question;
    children: React.ReactNode;
}

/**
 * # 问题卡片
 * 用于在内容中插入问题，通常用于问题和答案。
 * 
 * @param question 问题
 * @param children 内容
 * @returns 问题卡片
 */
export function QuestionCard({ question, children }: QuestionCardProps) {
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <div className="card bg-linear-to-br from-secondary/10 to-secondary/2 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="card-body p-4">
                {/* 标题和标签区域 */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <h2 className="card-title text-xl">{question.title}</h2>
                    <div className="flex flex-wrap gap-2">
                        <span className="badge badge-soft">{question.category}</span>
                        <span
                            className={`badge badge-soft ${showAnswer ? 'badge-success' : 'badge-error'} cursor-pointer hover:scale-105 transition-all select-none`}
                            onClick={() => setShowAnswer(!showAnswer)}
                        >
                            <i className={`fi ${showAnswer ? 'fi-rr-eye-crossed' : 'fi-rr-eye'} flex`}></i>
                            {showAnswer ? '隐藏答案' : '查看答案'}
                        </span>
                    </div>
                </div>

                {/* 问题内容 */}
                <div className="mb-1">
                    <p className="text-base-content whitespace-pre-line">{question.content}</p>
                </div>

                {/* 标签列表 */}
                <div className="flex flex-wrap gap-2">
                    {question.tags.map(tag => (
                        <span key={tag} className="badge badge-outline badge-sm">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* 答案展示 */}
                {showAnswer && (
                    <div className="mt-1">
                        <div className="mt-1 p-4 bg-base-200 rounded-lg">
                            <pre className="whitespace-pre-line text-base-content grid">
                                {children}
                            </pre>
                        </div>
                    </div>
                )}
            </div >
        </div >
    )
} 