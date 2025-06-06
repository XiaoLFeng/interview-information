import { Link, Outlet, useNavigate } from "react-router";

export function BaseKnowledge() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-screen">
            <header className="bg-gradient-to-r from-primary to-primary/50 p-4 shadow-sm">
                <div className="flex justify-between">
                    <Link to={"/"} className="flex items-center gap-2 text-2xl text-primary-content hover:text-secondary-content transition">
                        <i className="fi fi-rr-book-bookmark flex" />
                        <span className="text-2xl font-bold">筱锋的知识库</span>
                    </Link>
                    <div className="flex gap-2">
                        <details className="dropdown">
                            <summary className="btn btn-ghost btn-sm hover:bg-primary border-0 transition-all tooltip tooltip-left" data-tip="切换主题" onMouseEnter={() => {
                                const themeList = document.querySelector('#theme-list');
                                if (themeList && themeList.parentElement) {
                                    (themeList.parentElement as HTMLDetailsElement).open = true;
                                }
                            }} onMouseLeave={() => {
                                const themeList = document.querySelector('#theme-list');
                                if (themeList && themeList.parentElement) {
                                    (themeList.parentElement as HTMLDetailsElement).open = false;
                                }
                            }} onClick={(e) => e.preventDefault()}>
                                <i className="fi fi-br-background flex" />
                            </summary>
                            <ul id="theme-list" className="menu dropdown-content bg-base-100 rounded-lg z-1 p-2 shadow-sm" onMouseEnter={() => {
                                const themeList = document.querySelector('#theme-list');
                                if (themeList && themeList.parentElement) {
                                    (themeList.parentElement as HTMLDetailsElement).open = true;
                                }
                            }} onMouseLeave={() => {
                                const themeList = document.querySelector('#theme-list');
                                if (themeList && themeList.parentElement) {
                                    (themeList.parentElement as HTMLDetailsElement).open = false;
                                }
                            }}>
                                <li><span className="cursor-pointer select-none" onClick={() => document.documentElement.setAttribute('data-theme', 'emerald')}>Emerald</span></li>
                                <li><span className="cursor-pointer select-none" onClick={() => document.documentElement.setAttribute('data-theme', 'light')}>Light</span></li>
                                <li><span className="cursor-pointer select-none" onClick={() => document.documentElement.setAttribute('data-theme', 'dark')}>Dark</span></li>
                                <li><span className="cursor-pointer select-none" onClick={() => document.documentElement.setAttribute('data-theme', 'cupcake')}>Cupcake</span></li>
                                <li><span className="cursor-pointer select-none" onClick={() => document.documentElement.setAttribute('data-theme', 'autumn')}>Autumn</span></li>
                                <li><span className="cursor-pointer select-none" onClick={() => document.documentElement.setAttribute('data-theme', 'business')}>Business</span></li>
                                <li><span className="cursor-pointer select-none" onClick={() => document.documentElement.setAttribute('data-theme', 'night')}>Night</span></li>
                                <li><span className="cursor-pointer select-none" onClick={() => document.documentElement.setAttribute('data-theme', 'forest')}>Forest</span></li>
                                <li><span className="cursor-pointer select-none" onClick={() => document.documentElement.setAttribute('data-theme', 'aqua')}>Aqua</span></li>
                            </ul>
                        </details>
                        <button className="btn btn-ghost btn-sm hover:bg-primary border-0 transition-all tooltip tooltip-left" data-tip="回到首页" onClick={() => navigate("/")}>
                            <i className="fi fi-br-house-chimney flex" />
                        </button>
                        <button className="btn btn-ghost btn-sm hover:bg-primary border-0 transition-all tooltip tooltip-left" data-tip="前往GitHub" onClick={() => window.open("https://github.com/XiaoLFeng/interview-information", "_blank")}>
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