import { QuestionCard } from "../../../../base/knowledge_question_card";
import { InfoCard } from "../../../../card/info_card";

interface Props {
    id: string;
}

export function FrontCSSLayoutBasics({ id }: Props) {
    return (
        <QuestionCard
            question={{
                id,
                title: "CSS 布局基础",
                category: "CSS",
                content: "CSS 布局的基础概念和常用方法有哪些？",
                tags: ["CSS", "布局", "基础", "Layout"]
            }}
        >
            <InfoCard title="敬请期待">
                <p>布局基础内容正在准备中...</p>
            </InfoCard>
        </QuestionCard>
    );
} 