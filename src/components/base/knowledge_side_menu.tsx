import { Link, useLocation } from "react-router";

export interface MenuItem {
    id: string;
    label: string;
    path: string;
    icon: string;
    description?: string;
}

interface SideMenuProps {
    title: string;
    icon: string;
    menuItems: MenuItem[];
}

export function SideMenu({ 
    title, 
    icon, 
    menuItems, 
}: SideMenuProps) {
    const location = useLocation();
    
    return (
        <div className="w-72 bg-base-100 shadow-xl h-full flex flex-col">
            <div className="p-6 flex flex-col h-full">
                {/* 顶部标题区域 */}
                <div className="mb-6 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 from-secondary to-secondary/50 rounded-2xl bg-gradient-to-br shadow-lg mb-4`}>
                        <i className={`${icon} flex text-3xl font-bold text-base-100`}></i>
                    </div>
                    <h2 className={`text-xl font-bold text-primary`}>{title}</h2>
                    <div className="divider mt-2 mb-2"></div>
                </div>
                
                {/* 菜单列表 - 可滚动 */}
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    <ul className="menu w-full p-0 space-y-3">
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <li key={item.id} className="menu-item">
                                    <Link 
                                        to={item.path}
                                        className={`flex items-center p-3 rounded-xl transition-all duration-300 ${
                                            isActive 
                                                ? `bg-gradient-to-r from-primary/50 to-primary/20 text-primary-content shadow-md hover:shadow-lg` 
                                                : `hover:bg-base-200 hover:scale-[1.02] hover:shadow`
                                        }`}
                                    >
                                        <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                                            isActive 
                                                ? `bg-primary-content/20 backdrop-blur-sm` 
                                                : `bg-primary/10`
                                        }`}>
                                            <i className={`${item.icon} text-lg flex ${
                                                isActive 
                                                    ? `text-primary-content` 
                                                    : `text-primary`
                                            }`}></i>
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <div className={`font-medium transition-all duration-300 ${isActive ? 'text-lg' : 'text-base'}`}>
                                                {item.label}
                                            </div>
                                            {item.description && (
                                                <div className={`text-xs transition-all duration-300 ${
                                                    isActive ? 'opacity-90' : 'opacity-70'
                                                }`}>
                                                    {item.description}
                                                </div>
                                            )}
                                        </div>
                                        {isActive && (
                                            <div className="ml-2">
                                                <i className={`fi fi-rr-angle-right text-primary-content`}></i>
                                            </div>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
} 