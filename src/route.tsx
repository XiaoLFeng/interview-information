import { createBrowserRouter } from "react-router";
import BaseIndex from "./views/base_index";
import { BaseJava } from "./views/knowledge/java/base_java";
import { BaseGo } from "./views/knowledge/go/base_go";
import { BaseKnowledge } from "./views/base_knowledge";
import { GoBasicsPage } from "./views/knowledge/go/data/go_basics";
import { GoConcurrencyPage } from "./views/knowledge/go/data/go_concurrency";
import { GoWebDevelopmentPage } from "./views/knowledge/go/data/go_web_development";
import { GoDatabasesPage } from "./views/knowledge/go/data/go_databases";
import { GoTestingPage } from "./views/knowledge/go/data/go_testing";
import { JavaBasics } from "./views/knowledge/java/data/java_basics";
import { JavaSpringBoot } from "./views/knowledge/java/data/java_springboot";
import { JavaRedis } from "./views/knowledge/java/data/java_redis";
import { JavaMySQL } from "./views/knowledge/java/data/java_mysql";
import { BaseFront } from "./views/knowledge/front/base_front";
import { JavaScriptFundamentals } from "./views/knowledge/front/data/javascript-fundamentals";
import { TypeScriptFundamentals } from "./views/knowledge/front/data/typescript-fundamentals";
import { CSSFundamentals } from "./views/knowledge/front/data/css-fundamentals";
import { HTMLFundamentals } from "./views/knowledge/front/data/html-fundamentals";
import { ReactFundamentals } from "./views/knowledge/front/data/react-fundamentals";
import { VueFundamentals } from "./views/knowledge/front/data/vue-fundamentals";
import { BrowserFundamentals } from "./views/knowledge/front/data/browser-fundamentals";
import { EngineeringFundamentals } from "./views/knowledge/front/data/engineering-fundamentals";
import { NetworkFundamentals } from "./views/knowledge/network/network-fundamentals";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: BaseIndex
    },
    {
        path: "knowledge",
        Component: BaseKnowledge,
        children: [
            {
                path: "java",
                Component: BaseJava,
                children: [
                    {
                        path: "",
                        Component: JavaBasics
                    },
                    {
                        path: "springboot",
                        Component: JavaSpringBoot
                    },
                    {
                        path: "redis",
                        Component: JavaRedis
                    },
                    {
                        path: "mysql",
                        Component: JavaMySQL
                    }
                ]
            },
                            {
                    path: "front",
                    Component: BaseFront,
                    children: [
                        {
                            path: "",
                            Component: JavaScriptFundamentals
                        },
                        {
                            path: "typescript",
                            Component: TypeScriptFundamentals
                        },
                        {
                            path: "css",
                            Component: CSSFundamentals
                        },
                        {
                            path: "html",
                            Component: HTMLFundamentals
                        },
                        {
                            path: "react",
                            Component: ReactFundamentals
                        },
                        {
                            path: "vue",
                            Component: VueFundamentals
                        },
                        {
                            path: "browser",
                            Component: BrowserFundamentals
                        },
                        {
                            path: "engineering",
                            Component: EngineeringFundamentals
                        }
                    ]
                },
            {
                path: "network",
                Component: NetworkFundamentals
            },
            {
                path: "go",
                Component: BaseGo,
                children: [
                    {
                        path: "", // Default child route for /knowledge/go
                        Component: GoBasicsPage
                    },
                    {
                        path: "concurrency",
                        Component: GoConcurrencyPage
                    },
                    {
                        path: "web-development",
                        Component: GoWebDevelopmentPage
                    },
                    {
                        path: "databases",
                        Component: GoDatabasesPage
                    },
                    {
                        path: "testing",
                        Component: GoTestingPage
                    }
                ]
            }
        ]
    }
]);