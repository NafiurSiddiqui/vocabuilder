import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
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
    const { data, setData, post, processing, errors, reset } = useForm<Required<WordsForm>>({
        words: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('word-processor.store'), {
            onFinish: () => {
                console.log('finished, should have cleared');
                reset('words');
            },
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Word Processor" />
            {/* <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4"></div> */}

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <Label htmlFor="words">Words</Label>
                    {/* <Input
                        id="name"
                        type="text"
                        required
                        autoFocus
                        tabIndex={1}
                        autoComplete="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        disabled={processing}
                        placeholder="Full name"
                    /> */}
                    <Textarea placeholder="Put your words here" />
                    <InputError message={errors.words} className="mt-2" />
                </div>
            </form>
        </AppLayout>
    );
}
