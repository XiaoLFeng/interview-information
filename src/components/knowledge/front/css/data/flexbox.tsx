import { QuestionCard } from "../../../../base/knowledge_question_card";
import { InfoCard } from "../../../../card/info_card";

interface Props {
    id: string;
}

export function FrontCSSFlexbox({ id }: Props) {
    return (
        <QuestionCard
            question={{
                id,
                title: "CSS Flexbox 弹性布局",
                category: "CSS",
                content: "CSS Flexbox 弹性布局的使用方法和常见应用场景？",
                tags: ["CSS", "Flexbox", "弹性布局", "布局"]
            }}
        >
            <InfoCard title="敬请期待">
                <p>Flexbox 内容正在准备中...</p>
            </InfoCard>
        </QuestionCard>
    );
} 