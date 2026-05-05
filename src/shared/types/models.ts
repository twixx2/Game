export interface InvItemInterface {
    id: number;
    caseId: number;
    name: string;
    rarity: string;
    value: number;
    image: string;
    weight: number;
    count: number;
}

export interface CaseItemInterface {
    id: number;
    caseId: number;
    name: string;
    rarity: string;
    value: number;
    image: string;
    weight: number;
}


export interface CaseInterface {
    id: number;
    title: string;
    image: string;
    price: number;
}

export interface CaseDetailInterface {
    id: number;
    title: string;
    image: string;
    price: number;
    items: number[];
}

export interface cellInterface {
    id: number
}