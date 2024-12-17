<script setup lang="ts">
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';

const form = useForm({
    words: '',
    sentence: '',
});

const submit = () => {
    form.post(route('word-processor.store'), {
        onFinish: () => {
            form.reset('words');
        },
    });
};
</script>
<template>
    <Head title="Word Processor" />
    <AuthenticatedLayout>
        <template #header>
            <h2
                class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200"
            >
                Word Processor
            </h2>
        </template>
        <form @submit.prevent="submit">
            <!-- cards bg -->
            <div>
                <InputLabel for="words" value="Words" />
                <TextInput
                    id="words"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.words"
                    required
                    autofocus
                    autocomplete="words"
                />

                <InputError class="mt-2" :message="form.errors.words" />
            </div>

            <!-- <div>
                <InputLabel for="sentence" value="Sentence" />
                <TextInput
                    id="sentence"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.sentence"
                    required
                    autofocus
                    autocomplete="sentence"
                />

                <InputError class="mt-2" :message="form.errors.sentence" />
            </div> -->

            <PrimaryButton>Submit</PrimaryButton>
        </form>
    </AuthenticatedLayout>
</template>
