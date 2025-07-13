import { WordIndexAccordion } from '@/components/word-index-accordion';
import { DeckProvider } from '@/context/DeckContext';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Deck, DefaultDeck, Word } from '@/types/business-data';
import { Head } from '@inertiajs/react';

interface paginatedWords {
    current_page: number;
    current_page_url: string;
    data: Word[];
    first_page_url: string;
    from: number;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
}

interface Props {
    currentDeck: Deck;
    words: paginatedWords;
    decks: Deck[];
    defaultDeck: DefaultDeck;
}

export default function Show({ currentDeck, words, decks, defaultDeck }: Props) {
    // const dataparsed = JSON.parse(words['data'][0]['definition']);
    // console.log('data', dataparsed);
    // Try to extract title from the deck object or fallback to string
    const title = typeof currentDeck === 'string' ? currentDeck : (currentDeck?.title ?? '');

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Inventory',
            href: '/inventory',
        },
        {
            title: title,
            href: `/inventory/${encodeURIComponent(title)}`,
        },
    ];

    // console.log(decks.data[0], defaultDeck);
    const wordsTransformed = Object.entries(words);
    //now you are getting object
    // console.log(typeof words);
    // console.log(words);
    // console.log(wordsTransformed);
    //TODO: props drilling starts with this currentDeckTitle. Which the category dropdown needs on the card-details. useContext or some other ways to share data. NO PROPS DRILLING!
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Inventory: ${title}`} />
            <DeckProvider decks={decks.data} defaultDeck={defaultDeck}>
                <section className="p-4">
                    <div className="w-full">
                        {/* <WordIndexAccordion Letter="A" wordCount={wordsTransformed.length} words={words['data']} deckTitle={deck.title} /> */}

                        {wordsTransformed.map(([letter, words]) => (
                            <WordIndexAccordion key={letter} Letter={letter} wordCount={words.length} words={words} deckTitle={currentDeck.title} />
                        ))}
                    </div>
                </section>
            </DeckProvider>
        </AppLayout>
    );
}
