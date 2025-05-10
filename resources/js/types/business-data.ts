export interface InventoryProps {
    words: Array<{
        id: number;
        created_at: string;
        updated_at: string;
        word: string;
        phonetic: string;
        pronunciation: string;
        definition: string;
        examples: string;
        category: string;
        user_id: number;
    }>;
}

export interface Definitions {
    antonyms: Array<string>;
    definition: string;
    example: string;
    synonyms: Array<string>;
}

//Deck
export interface Deck {
    id: number;
    name: string;
    description: string | null;
    user_id: number;
    created_at: string;
    updated_at: string;
}
