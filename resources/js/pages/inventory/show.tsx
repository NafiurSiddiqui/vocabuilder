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
    deck: Deck | string;
    words: paginatedWords;
}

export default function Show({ deck, words }: Props) {
    console.log('data', words['data']);
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Inventory: ${title}`} />
            <div>
                <h3>Show all the cards in this category</h3>
            </div>
        </AppLayout>
    );
}
