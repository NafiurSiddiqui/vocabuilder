import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

// TODO: See the kind of data you are receiving, make a type/word.tsx and use it here.

export default function Show({ deck, words }: { deck: Deck | string; words: Word[] }) {
    // console.log(deck);
    console.log('data', words['data']);
    // Try to extract title from the deck object or fallback to string
    const title = typeof deck === 'string' ? deck : (deck?.name ?? '');

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Inventory: ${title}`} />
            <div>
                <h3>Show all the cards in this category</h3>
            </div>
        </AppLayout>
    );
}
