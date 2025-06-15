import { capitalizeFirstLetter } from '@/lib/utils';
import { Word } from '@/types/business-data';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { Volume2 } from 'lucide-react';
import { useRef } from 'react';
import { Badge } from '../ui/badge';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';

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
    const definitions = wordParsed[0]['definitions'];
    const partsOfSpeech = wordParsed[0]['partOfSpeech'];
    const synonyms = wordParsed[0]['synonyms'];
    const pronunciation = JSON.parse(word.pronunciation);
    // console.log(wordParsed);
    // console.log(wordParsed.map((word) => word['antonyms']));
    // console.log(word.phonetic);
    // console.log(pronunciation);
    // console.log(definitions);
    // console.log(partsOfSpeech);
    // console.log(synonyms);

    const audioRef = useRef<HTMLAudioElement>(null);
    // console.log(audioRef);
    const playAudio = () => {
        audioRef.current?.play();
    };
    // TODO: render two cards, one for each part of speech

    return wordParsed.map((wordParsed, index) => {
        // console.log();
        return (
            <article role="dialog" aria-modal="true" aria-labelledby="word-title" className="" key={index + 1}>
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
                    <h3 className="mb-2 text-xl font-semibold">Definitions</h3>
                    <ol className="list-inside list-decimal space-y-4">
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

                    <button type="button" className="mt-4 text-blue-600 hover:underline" aria-expanded="false">
                        Show more definitions
                    </button>
                </section>

                {/* Synonyms */}
                <section className="mt-6">
                    <h3 className="mb-2 text-xl font-semibold">Synonyms</h3>
                    <ul className="flex flex-wrap gap-2">
                        {/* <li>
                        <button className="rounded bg-gray-100 px-2 py-1 hover:bg-gray-200">Articulate</button>
                    </li> */}
                        {synonyms &&
                            synonyms.map((synonym: string, index: number) => {
                                return (
                                    <li key={index}>
                                        <button className="rounded bg-gray-100 px-2 py-1 hover:bg-gray-200">{synonym}</button>
                                    </li>
                                );
                            })}
                    </ul>
                </section>
            </article>
        );
    });
}

// {/* <article role="dialog" aria-modal="true" aria-labelledby="word-title" className="">
//     {/* Header */}
//     <header className="flex items-start justify-between">
//         {/* Left Side */}
//         <div>
//             <span className="text-sm text-gray-500">{partsOfSpeech}</span>
//             <h2 id="word-title" className="text-3xl font-bold">
//                 {capitalizeFirstLetter(word.title)}
//             </h2>
//             {/* TODO: Render pronunciation properly, there maybe one or more */}
//             <div className="flex items-center gap-4">
//                 {pronunciation.map((pronunciation: Pronunciation, index: number) => {
//                     return (
//                         <div key={index + 1} className="flex items-center">
//                             <span>{pronunciation['audio'].includes('uk') ? '🇬🇧' : '🇺🇸'}</span>
//                             <button
//                                 onClick={playAudio}
//                                 className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
//                                 aria-label="Play pronunciation"
//                             >
//                                 <Volume2 className="h-5 w-5" />
//                             </button>

//                             <span className="text-sm text-gray-700 dark:text-gray-300">{pronunciation['text']}</span>

//                             <audio ref={audioRef} src={pronunciation['audio']} preload="none" />
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>

//         {/* Right Side */}
//         <div className="flex flex-col items-end gap-2">
//             {/* <div className="flex items-center gap-2">
//             <label htmlFor="deck-select" className="sr-only">
//                 Deck
//             </label>
//             <select id="deck-select" className="rounded border-gray-300">
//                 <option>Default Deck</option>
//                 <option>Advanced Vocab</option>
//             </select>
//             <button aria-label="Edit deck" className="text-gray-500 hover:text-gray-800">
//                 ✏️
//             </button>
//             <button aria-label="More options" className="text-gray-500 hover:text-gray-800">
//                 ⋯
//             </button>
//         </div> */}

//             <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                     <Badge>Category</Badge>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent sideOffset={5}>
//                     <DropdownMenuLabel>Deck</DropdownMenuLabel>
//                     <DropdownMenuSeparator />
//                     <DropdownMenuItem>Default Deck</DropdownMenuItem>
//                     <DropdownMenuItem>Advanced Vocab</DropdownMenuItem>
//                     <DropdownMenuSeparator />
//                     <DropdownMenuItem>✏️ Edit deck</DropdownMenuItem>
//                 </DropdownMenuContent>
//             </DropdownMenu>
//         </div>
//     </header>

//     {/* Definitions */}
//     <section className="mt-6">
//         <h3 className="mb-2 text-xl font-semibold">Definitions</h3>
//         <dl className="space-y-2">
//             {definitions &&
//                 definitions.map((definition: Definition, index: number) => {
//                     // console.log(definition);
//                     return (
//                         <div key={index}>
//                             <dt className="sr-only">Definition {index + 1}</dt>
//                             {/* <span>{definition.example}</span> */}
//                             <dd>{definition.definition}</dd>
//                         </div>
//                     );
//                 })}
//         </dl>

//         <button type="button" className="mt-4 text-blue-600 hover:underline" aria-expanded="false">
//             Show more definitions
//         </button>
//     </section>

//     {/* Synonyms */}
//     <section className="mt-6">
//         <h3 className="mb-2 text-xl font-semibold">Synonyms</h3>
//         <ul className="flex flex-wrap gap-2">
//             {/* <li>
//             <button className="rounded bg-gray-100 px-2 py-1 hover:bg-gray-200">Articulate</button>
//         </li> */}
//             {synonyms &&
//                 synonyms.map((synonym: string, index: number) => {
//                     return (
//                         <li key={index}>
//                             <button className="rounded bg-gray-100 px-2 py-1 hover:bg-gray-200">{synonym}</button>
//                         </li>
//                     );
//                 })}
//         </ul>
//     </section>
// </article>; */}
