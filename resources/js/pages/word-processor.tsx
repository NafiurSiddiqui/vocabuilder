import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
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
};

export default function WordProcessor() {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm<Required<WordsForm>>({
        words: '',
    });

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
            <form className="m-8 flex flex-col gap-6" onSubmit={submit}>
                <div className="w-[20rem]">
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
                    <Button className="my-2" type="submit" disabled={processing}>
                        {processing ? <LoaderCircle /> : 'Submit'}
                    </Button>
                </div>
            </form>

            {recentlySuccessful && 'Uploaded successful!!'}
        </AppLayout>
    );
}
