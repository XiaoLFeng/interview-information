import { QuestionCard } from "../../../../base/knowledge_question_card";
import { InfoCard } from "../../../../card/info_card";

interface Props {
    id: string;
}

export function FrontCSSGrid({ id }: Props) {
    return (
        <QuestionCard
            question={{
                id,
                title: "CSS Grid 网格布局",
                category: "CSS",
                content: "CSS Grid 网格布局的使用方法和常见应用场景？",
                tags: ["CSS", "Grid", "网格布局", "布局"]
            }}
        >
            <InfoCard title="敬请期待">
                <p>Grid 内容正在准备中...</p>
            </InfoCard>
        </QuestionCard>
    );
} 