import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { capitalizeFirstLetter } from '@/lib/utils';
import { Word } from '@/types/business-data';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import WordCardDetail from './word-card-detail';

// clickable card
//opens modal onclick for detailed information of the word

export function WordCard({ word }: { word: Word }) {
    const [open, setOpen] = useState(false);
    // console.log(word);
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    {/* <VisuallyHidden asChild>> */}
                    <DialogHeader>
                        <DialogTitle className="sr-only">{word.title}</DialogTitle>
                    </DialogHeader>
                    {/* </VisuallyHidden> */}
                    <WordCardDetail word={word} />
                </DialogContent>
            </Dialog>
            <Card className="rounded-none">
                <CardContent className="flex items-center justify-between">
                    <CardTitle className="">
                        <Button variant={'link'} onClick={() => setOpen(true)} className="text-xl font-normal">
                            {/* {word.title[0].toUpperCase() + word.title.slice(1)} */}
                            {capitalizeFirstLetter(word.title)}
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
