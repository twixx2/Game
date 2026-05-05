import { usePage } from "@context";
import { useEffect } from "react";

export const Page = ({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) => {
    const { setTitle, setSubtitle } = usePage();
    useEffect(() => {
        setTitle(title);
        setSubtitle(subtitle);
    }, [title, subtitle]);

    return <>{children}</>
};