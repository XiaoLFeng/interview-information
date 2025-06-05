import { Link, Outlet, useNavigate } from "react-router";

export function BaseKnowledge() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-screen">
            <header className="bg-base-200 p-4 shadow-sm">
                <div className="flex justify-between">
                    <Link to={"/"} className="flex items-center gap-2 text-2xl hover:text-primary transition">
                        <i className="fi fi-rr-book-bookmark flex" />
                        <span className="text-2xl font-bold">筱锋的知识库</span>
                    </Link>
                    <div className="flex gap-2">
                        <button className="btn btn-ghost btn-sm transition-all" onClick={() => navigate("/")}>
                            <i className="fi fi-br-house-chimney flex" />
                        </button>
                        <button className="btn btn-ghost btn-sm transition-all" onClick={() => navigate("https://github.com/xiao-lfeng")}>
                            <i className="fi fi-brands-github flex" />
                        </button>
                    </div>
                </div>
            </header>
            <main className="flex-1 overflow-y-hidden">
                <Outlet />
            </main>
        </div>
    );
}