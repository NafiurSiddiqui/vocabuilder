import { WordIndexAccordion } from '@/components/word-index-accordion';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Deck, Word } from '@/types/business-data';
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
    deck: Deck;
    words: paginatedWords;
}

export default function Show({ deck, words }: Props) {
    // const dataparsed = JSON.parse(words['data'][0]['definition']);
    // console.log('data', dataparsed);
    // Try to extract title from the deck object or fallback to string
    const title = typeof deck === 'string' ? deck : (deck?.title ?? '');

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

    const wordsTransformed = Object.entries(words);
    //now you are getting object
    console.log(typeof words);
    console.log(words);
    console.log(wordsTransformed);
    //TODO: props drilling starts with this deckTitle. Which the category dropdown needs on the card-details. useContext or some other ways to share data. NO PROPS DRILLING!
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Inventory: ${title}`} />
            <section className="p-4">
                <div className="w-full">
                    {/* <WordIndexAccordion Letter="A" wordCount={wordsTransformed.length} words={words['data']} deckTitle={deck.title} /> */}

                    {wordsTransformed.map(([letter, words]) => (
                        <WordIndexAccordion key={letter} Letter={letter} wordCount={words.length} words={words} deckTitle={deck.title} />
                    ))}
                </div>
            </section>
        </AppLayout>
    );
}
