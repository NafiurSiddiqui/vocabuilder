import { useDeckContext } from '@/context/DeckContext';
import { capitalizeFirstLetter } from '@/lib/utils';
import { Word } from '@/types/business-data';
import { useForm } from '@inertiajs/react';
import { Volume2 } from 'lucide-react';
import { useRef } from 'react';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';

interface Pronunciation {
    audio: string;
    text: string;
}

interface Definition {
    antonyms: string[];
    definition: string;
    example: string;
    synonyms: string[];
}

export default function WordCardDetail({ word, deckTitle }: { word: Word; deckTitle: string }) {
    const wordParsed = JSON.parse(word['definition']);
    const synonyms = wordParsed[0]['synonyms'];
    const pronunciation = JSON.parse(word.pronunciation);
    const { decks, defaultDeck } = useDeckContext();

    const deckItems = [...decks, defaultDeck];

    const { data, setData, processing, errors, reset, recentlySuccessful, patch } = useForm({
        deck_data:
            deckItems.length > 0 ? JSON.stringify({ id: defaultDeck.id, slug: deckItems.find((d) => d.id === defaultDeck.id)?.slug ?? '' }) : '',
    });

    const deckUpdateHandler: (value: string) => void = (value) => {
        setData('deck_data', value);
        patch(route('word-processor.update'), {});
    };

    const audioRef = useRef<HTMLAudioElement>(null);
    const playAudio = () => {
        audioRef.current?.play();
    };

    return wordParsed.map((wordParsed, index) => {
        return (
            <article role="dialog" aria-modal="true" aria-labelledby="word-title" className="my-4 rounded-sm bg-stone-50 p-4" key={index + 1}>
                {/* Header */}
                <header className="flex items-start justify-between">
                    {/* Left Side */}
                    <div>
                        <span className="text-sm text-gray-500">{wordParsed.partOfSpeech}</span>
                        <h2 id="word-title" className="text-3xl font-bold">
                            {capitalizeFirstLetter(word.title)}
                        </h2>
                        <div className="flex items-center gap-4">
                            {pronunciation.map((pronunciation: Pronunciation, index: number) => {
                                return (
                                    <div key={index + 1} className="flex items-center">
                                        <span>{pronunciation['audio'].includes('uk') ? '🇬🇧' : '🇺🇸'}</span>
                                        <button
                                            onClick={playAudio}
                                            className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                                            aria-label="Play pronunciation"
                                        >
                                            <Volume2 className="h-5 w-5" />
                                        </button>

                                        <span className="text-sm text-gray-700 dark:text-gray-300">{pronunciation['text']}</span>

                                        <audio ref={audioRef} src={pronunciation['audio']} preload="none" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Dropdown */}
                    <div className="flex flex-col items-end gap-2">
                        <div>
                            {/* <Select name="deck_data" value={data.deck_data} onValueChange={(value) => setData('deck_data', value)}> */}
                            <Select name="deck_data" value={data.deck_data} onValueChange={deckUpdateHandler}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a deck" />
                                </SelectTrigger>
                                <SelectContent>
                                    {deckItems.map((deck) => (
                                        <SelectItem key={deck.id} value={JSON.stringify({ id: deck.id, slug: deck.slug })}>
                                            {deck.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {/* <InputError message={errors.deck_data} className="mt-2" />  */}
                        </div>
                    </div>
                </header>

                {/* Definitions */}
                <section className="mt-6">
                    <h3 className="text-xl font-semibold">Definitions</h3>
                    <Separator />
                    <ol className="mt-2 list-inside list-decimal space-y-4">
                        {wordParsed.definitions &&
                            wordParsed.definitions.map((definition: Definition, index: number) => {
                                return (
                                    <li key={index}>
                                        {definition.definition}
                                        {definition.example && (
                                            <div className="mt-2 block border-l-4 p-2 text-sm text-gray-500 italic">"{definition.example}"</div>
                                        )}
                                    </li>
                                );
                            })}
                    </ol>
                </section>
                {/* Synonyms */}
                {wordParsed.synonyms.length > 0 && (
                    <section className="mt-6">
                        <h3 className="text-xl font-semibold">Synonyms</h3>
                        <Separator />
                        <ul className="mt-2 flex flex-wrap gap-2">
                            {synonyms &&
                                synonyms.map((synonym: string, index: number) => {
                                    return (
                                        <li key={index}>
                                            <Badge>{synonym}</Badge>
                                        </li>
                                    );
                                })}
                        </ul>
                    </section>
                )}
                {/* Antonyms */}
                {wordParsed.antonyms.length > 0 && (
                    <section className="mt-6">
                        <h3 className="text-xl font-semibold">Antonyms</h3>
                        <Separator />
                        <ul className="mt-2 flex flex-wrap gap-2">
                            {wordParsed.antonyms.map((antonym: string, index: number) => {
                                return (
                                    <li key={index}>
                                        <Badge>{antonym}</Badge>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                )}
            </article>
        );
    });
}
