import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Deck } from '@/types/business-data';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Word Processor',
        href: '/word-processor',
    },
];

type WordsForm = {
    words: string;
    deck_id: string;
};

export default function WordProcessor({ deckItems, defaultDeckId }: { deckItems: Deck[]; defaultDeckId: number }) {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm<Required<WordsForm>>({
        words: '',
        deck_id: deckItems.length > 0 ? `${defaultDeckId}` : '',
    });
    console.log(deckItems);
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('word-processor.store'), {
            onFinish: () => {
                // console.log('finished, should have cleared');
                reset('words');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Word Processor" />
            <Card className="m-8 w-[20rem]">
                {/* m-8 flex w-[20rem] flex-col gap-6 rounded-sm border p-2 */}
                <CardContent>
                    <form className="space-y-6" onSubmit={submit}>
                        <div>
                            <Label htmlFor="words">Words</Label>
                            <Textarea
                                placeholder="Put your words here"
                                name="words"
                                id="words"
                                value={data.words}
                                autoFocus
                                tabIndex={1}
                                autoComplete="words"
                                onChange={(e) => setData('words', e.target.value)}
                                required
                            />

                            <InputError message={errors.words} className="mt-2" />
                        </div>

                        {/* Associate deck with select */}
                        <div>
                            <Label htmlFor="deck">Deck</Label>
                            <Select name="deck_id" value={data.deck} onValueChange={(value) => setData('deck', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a deck" />
                                </SelectTrigger>
                                <SelectContent>
                                    {/* <SelectItem value="1">Tossed</SelectItem>
                                    <SelectItem value="2">Deck 2</SelectItem> */}
                                    {deckItems.map((deck) => (
                                        <SelectItem key={deck.id} value={`${deck.id}`}>
                                            {deck.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.deck} className="mt-2" />
                        </div>
                        <Button className="my-2" type="submit" disabled={processing}>
                            {processing ? <LoaderCircle /> : 'Submit'}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {recentlySuccessful && 'Uploaded successful!!'}
        </AppLayout>
    );
}
