import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Word } from '@/types/business-data';
import { WordCard } from '../cards/word-card';

interface Props {
    Letter: string;
    wordCount: number;
    words: Word[];
}

export function WordIndexAccordion({ Letter, wordCount, words }: Props) {
    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="">
                <AccordionTrigger className="border p-4 text-xl">
                    <div className="flex items-center gap-2">
                        <p>{Letter}</p>
                        <div className="text-sm font-normal">({wordCount} words)</div>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-0">
                    <div className="border-l-2 pt-2">
                        {/* Run loops */}
                        {words.map((word: Word) => {
                            return <WordCard key={word.id} word={word} />;
                        })}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
