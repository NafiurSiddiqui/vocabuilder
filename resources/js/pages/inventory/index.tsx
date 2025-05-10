import { DeckCard } from '@/components/deck-card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Deck } from '@/types/business-data';
import { Head, useForm } from '@inertiajs/react';
import { Filter, Plus } from 'lucide-react';
import { useState } from 'react';

//TODO: work on edit, delete, and update on DeckController

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inventory',
        href: '/inventory',
    },
];

export default function Inventory({ deckItems, decks }: { deckItems: Deck[]; decks: Deck[] }) {
    const [open, setOpen] = useState(false);
    console.log(deckItems);
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
    });

    const handleDeckChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleDeckSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/inventory', {
            onSuccess: () => {
                setOpen(false);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inventory" />

            <div className="flex items-center justify-between border-b px-6 py-1">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="default" className="rounded-sm p-2" size="sm">
                            <Plus size={16} />
                            Create a Deck
                        </Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create a Deck</DialogTitle>
                        </DialogHeader>

                        <form onSubmit={handleDeckSubmit}>
                            <fieldset>
                                <Label htmlFor="name">Name</Label>
                                <Input type="text" name="name" onChange={handleDeckChange} value={data.name} id="name" />
                                {errors.name && <div className="my-2 text-xs text-red-500">{errors.name}</div>}
                            </fieldset>
                            <fieldset>
                                <Label htmlFor="description">Description</Label>
                                <Textarea name="description" onChange={handleDeckChange} value={data.description} id="description" />
                                {errors.description && <div className="my-2 text-xs text-red-500">{errors.description}</div>}
                            </fieldset>
                            <DialogFooter className="mt-4">
                                <Button type="submit">Create</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
                <div>
                    <DropdownMenu>
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
            </div>

            <section className="grid gap-4 px-8 py-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-6">
                {deckItems?.map((deck) => (
                    <DeckCard
                        key={deck.id}
                        title={deck.name}
                        wordCount={deck.words?.count || 0}
                        showCheckbox
                        checked={false}
                        onCheck={() => {}}
                        onAdd={() => {}}
                    />
                ))}
            </section>
        </AppLayout>
    );
}

// Word data structure
{
    /* <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
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
            </div> */
}
