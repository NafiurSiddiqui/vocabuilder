import { capitalizeFirstLetter } from '@/lib/utils';
import { Word } from '@/types/business-data';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { Volume2 } from 'lucide-react';
import { useRef } from 'react';
import { Badge } from '../ui/badge';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
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

export default function WordCardDetail({ word }: { word: Word }) {
    const wordParsed = JSON.parse(word['definition']);
    const synonyms = wordParsed[0]['synonyms'];
    const pronunciation = JSON.parse(word.pronunciation);
    console.log(wordParsed);

    const audioRef = useRef<HTMLAudioElement>(null);

    const playAudio = () => {
        audioRef.current?.play();
    };

    return wordParsed.map((wordParsed, index) => {
        // console.log();
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
                        {/* TODO: Render pronunciation properly, there maybe one or more */}
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

                    {/* Right Side */}
                    <div className="flex flex-col items-end gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Badge>Category</Badge>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent sideOffset={5}>
                                <DropdownMenuLabel>Deck</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Default Deck</DropdownMenuItem>
                                <DropdownMenuItem>Advanced Vocab</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>✏️ Edit deck</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
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
