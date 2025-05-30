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
    deck_data: string;
};

export default function WordProcessor({ deckItems, defaultDeckId }: { deckItems: Deck[]; defaultDeckId: number }) {
    // console.log(defaultDeckId);
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm<Required<WordsForm>>({
        words: '',
        deck_data: deckItems.length > 0 ? JSON.stringify({ id: defaultDeckId, slug: deckItems.find((d) => d.id === defaultDeckId)?.slug ?? '' }) : '',
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
                            <Select name="deck_data" value={data.deck_data} onValueChange={(value) => setData('deck_data', value)}>
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
                            <InputError message={errors.deck_data} className="mt-2" />
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
