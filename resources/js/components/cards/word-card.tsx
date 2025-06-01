import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Word } from '@/types/business-data';
import { Link } from '@inertiajs/react';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog';
import WordCardDetail from './word-card-detail';

// clickable card
//opens modal onclick for detailed information of the word

export function WordCard({ word }: { word: Word }) {
    const [open, setOpen] = useState(false);

    const wordParsed = JSON.parse(word['definition']);
    const definitions = wordParsed[0]['definitions'];
    const partsOfSpeech = wordParsed[0]['partOfSpeech'];
    const synonyms = wordParsed[0]['synonyms'];
    console.log(word);
    console.log(definitions);
    console.log(partsOfSpeech);
    console.log(synonyms);
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{word.title}</DialogTitle>
                    </DialogHeader>
                    <WordCardDetail />
                </DialogContent>
            </Dialog>
            <Card className="rounded-none">
                <CardContent className="flex items-center justify-between">
                    <CardTitle className="">
                        <Button variant={'link'} onClick={() => setOpen(true)} className="text-xl font-normal">
                            {word.title[0].toUpperCase() + word.title.slice(1)}
                        </Button>
                    </CardTitle>
                    {/* Parts of Speech */}
                    <div className="flex justify-between">
                        <div className="text-muted-foreground font-regular mr-4 flex items-center gap-1 text-xs italic">
                            <Tooltip>
                                <TooltipTrigger>
                                    <span>.n</span>,
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Noun</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger>
                                    <span>.v</span>,
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Verb</p>
                                </TooltipContent>
                            </Tooltip>
                            <span> +3 More</span>
                        </div>
                        <div className="flex gap-2">
                            {/* Deck Name */}
                            <Badge asChild>
                                <Link href={route('inventory.default.show', 'tossed')}>Tossed</Link>
                            </Badge>
                            <Badge asChild>
                                <Link href={route('inventory.show', 'test')}>Test</Link>
                            </Badge>
                            {/* Tags */}
                            <Badge>Tag</Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
