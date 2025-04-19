import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

// TODO: Make the category relationship with the words
// TODO: Make the word relationship with the Category
// TODO: See the kind of data you are receiving, make a type/word.tsx and use it here.

export default function Show({ word }: { word: Word }) {


    // Try to extract title from the word object or fallback to string
    const title = typeof word === "string" ? word : word?.title ?? "";

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