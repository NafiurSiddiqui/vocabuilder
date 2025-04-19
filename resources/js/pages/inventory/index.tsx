import { DropdownMenuContent } from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Check, Filter } from 'lucide-react';
import { InventoryCard } from '@/components/inventory-card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inventory',
        href: '/inventory',
    },
];

interface InventoryProps {
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

interface Definitions {
    antonyms: Array<string>;
    definition: string;
    example: string;
    synonyms: Array<string>;
}

export default function Inventory({ words }: InventoryProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inventory" />
            <div className='border-b flex items-center justify-end px-6 py-1'>
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="rounded-sm p-2">
                            <Filter size={16} />
                            Filter
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {/* <DropdownMenuLabel>Filter</DropdownMenuLabel> */}
                        {/* <DropdownMenuSeparator /> */}
                        <DropdownMenuItem>Category</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* sort */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="rounded-sm p-2">
                            <Filter size={16} />
                            Sort
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {/* <DropdownMenuLabel>Filter</DropdownMenuLabel> */}

                        <DropdownMenuItem>
                            <span className="flex items-center">
                                <span className="mr-2">A - Z</span>
                                {/* <Check className="h-4 w-4" /> */}
                            </span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <span className="flex items-center">
                                <span className="mr-2">Z - A</span>
                                {/* <Check className="h-4 w-4" /> */}
                            </span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {/* <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {words.map((wordObj) => {
                    try {
                        const definitions = JSON.parse(wordObj.definition)[0]['definitions'];
                        const pronunciation = JSON.parse(wordObj.pronunciation)[0]?.audio;
                        const partOfSpeech = JSON.parse(wordObj.definition)[0]['partOfSpeech'];
                        const antonyms = JSON.parse(wordObj.definition)[0].antonyms;
                        const synonyms = JSON.parse(wordObj.definition)[0].synonyms;

                        return (
                            <div key={wordObj.id} className="border p-2">
                                <h3 className="text-lg font-bold">{wordObj.word}</h3>
                                <p>Category: {wordObj.category}</p>
                                <p className="italic">{partOfSpeech}</p>
                                <p>Phonetic: {wordObj.phonetic}</p>

                                {pronunciation && (
                                    <div>
                                        <p>Pronunciations</p> <audio src={pronunciation} controls></audio>
                                    </div>
                                )}
                                <div>
                                    {definitions.map((def: Definitions, index: number) => {
                                        return (
                                            <div key={index}>
                                                <p>
                                                    <b>Definition:</b> {def.definition}
                                                </p>
                                                {def.example && <p>Example: {def.example}</p>}
                                            </div>
                                        );
                                    })}
                                </div>

                                <div>
                                    {antonyms.length > 0 && (
                                        <p>
                                            <b>Antonyms</b>: {antonyms}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <b>Synonyms</b>
                                    {synonyms.length > 0 && (
                                        <ul>
                                            {synonyms.map((item: string, index: number) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        );
                    } catch (error) {
                        console.error('Error parsing definition:', error, wordObj.definition);
                        return (
                            <div key={wordObj.id} className="border p-2">
                                <h3 className="text-lg font-bold">{wordObj.word}</h3>
                                <p>Phonetic: {wordObj.phonetic}</p>
                                <p>Definition: Error parsing definition</p>
                            </div>
                        );
                    }
                })}
            </div> */}
            {/* <div className='gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'> */}
            <section className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 px-8 lg:px-6 py-4'>
                <InventoryCard
                    title="Chemistry"
                    wordCount={words.length}
                    showCheckbox
                    checked={false}
                    onCheck={() => { }}
                    onAdd={() => { }}
                />
                <InventoryCard
                    title="Biology"
                    wordCount={words.length}
                    showCheckbox
                    checked={false}
                    onCheck={() => { }}
                    onAdd={() => { }}
                />
                <InventoryCard
                    title="Tech"
                    wordCount={words.length}
                    showCheckbox
                    checked={false}
                    onCheck={() => { }}
                    onAdd={() => { }}
                />
            </section>
        </AppLayout>
    );
}
