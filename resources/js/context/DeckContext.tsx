import { Deck, DefaultDeck } from '@/types/business-data';
import { createContext, useContext } from 'react';

interface DeckContextType {
    decks: Deck[];
    defaultDeck: DefaultDeck;
}

const DeckContext = createContext<DeckContextType | null>(null);

export function useDeckContext() {
    const context = useContext(DeckContext);
    if (!context) throw new Error('useDeckContext must be used within DeckProvider');
    return context;
}

export const DeckProvider = ({ children, decks, defaultDeck }: { children: React.ReactNode; decks: Deck[]; defaultDeck: DefaultDeck }) => {
    return <DeckContext.Provider value={{ decks, defaultDeck }}>{children}</DeckContext.Provider>;
};
