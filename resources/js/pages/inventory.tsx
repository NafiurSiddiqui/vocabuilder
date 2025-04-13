import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

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
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
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
            </div>
        </AppLayout>
    );
}
