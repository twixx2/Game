import { createContext, useContext, useState } from "react";

interface PageContextInterface {
    title: string;
    subtitle: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    setSubtitle: React.Dispatch<React.SetStateAction<string>>;
}

const PageContext = createContext<PageContextInterface | null>(null);

export const PageProvider = ({ children }: { children: React.ReactNode }) => {
    const [title, setTitle] = useState<string>("");
    const [subtitle, setSubtitle] = useState<string>("");


    return (
        <PageContext.Provider value={{ title, subtitle, setTitle, setSubtitle }}>
            {children}
        </PageContext.Provider>
    );

};

export const usePage = () => {
    const context = useContext(PageContext);
    if (!context) {
        throw new Error("Ошибка получения контекста");
    }

    return context;
};