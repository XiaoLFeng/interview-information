import { QuestionCard } from "../../../../base/knowledge_question_card";
import { InfoCard } from "../../../../card/info_card";

interface Props {
    id: string;
}

export function FrontCSSResponsive({ id }: Props) {
    return (
        <QuestionCard
            question={{
                id,
                title: "CSS 响应式设计",
                category: "CSS",
                content: "CSS 响应式设计的原理和实现方法是什么？",
                tags: ["CSS", "响应式", "媒体查询", "移动端"]
            }}
        >
            <InfoCard title="敬请期待">
                <p>响应式设计内容正在准备中...</p>
            </InfoCard>
        </QuestionCard>
    );
} 