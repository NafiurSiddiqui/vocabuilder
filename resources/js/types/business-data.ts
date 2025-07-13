export interface Word {
    id: number;
    deck_id: number | null;
    default_deck_id: number | null;
    title: string;
    slug: string;
    created_at: string;
    updated_at: string;
    phonetic: string;
    pronunciation: string;
    definition: string;
    examples: string;
    category: string;
    user_id: number;
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
    title: string;
    slug: string;
    description: string | null;
    user_id?: number;
    created_at: string;
    updated_at: string;
    words_count: number;
}

export interface DefaultDeck {
    id: number;
    title: string;
    slug: string;
    description: string;
    words_count?: number;
}
