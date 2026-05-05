export const ROUTES = {
    // static 
    HOME: "/",
    SWAP: "/swap",
    MRKT: "/mrkt",
    NVNT: "/nvnt",
    CARE: "/care",
    MINEHUNT: "/minehunt",
    TOPS: "/tops",
    IDEA: "/idea",
    RATE: "/rate",
    PROFILE: "/profile",
    SAPPER: "/sapper",
    TOWER: "/tower",
    CASES: "/cases",
    MAINTENANCE: "/maintenance",
    LOGIN: "/login",
    REGISTER: "/register",

    // dynamic
    CASE: (id: string | number) => `/cases/${id}`,

    // for router
    PATHS: {
        CASE: "/cases/:caseId"
    }
} as const;