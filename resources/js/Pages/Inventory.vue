<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';

// Define props to receive words from the controller
const props = defineProps<{
    words: {
        id: number;
        word: string;
        definition: string;
        phonetic?: string;
    }[];
}>();

console.log(props.words[0]['definition']);
console.log(JSON.parse(props.words[0]['definition'])[0]);
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2
                class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200"
            >
                Inventory
            </h2>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div
                    class="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800"
                >
                    <!-- Render words foreach loop -->
                    <div
                        class="p-6 text-gray-900 dark:text-gray-100"
                        v-for="word in props.words"
                        :key="word.id"
                    >
                        <h3 class="text-lg font-bold">{{ word.word }}</h3>
                        <p v-if="word.phonetic">
                            Phonetic: {{ word.phonetic }}
                        </p>
                        <p>
                            Antonyms:
                            {{ JSON.parse(word.definition)[0].antonyms }}
                        </p>
                        <p>
                            Synonyms:
                            {{ JSON.parse(word.definition)[0].synonyms }}
                        </p>
                        <div>
                            <p>Definitions:</p>

                            <ul
                                v-for="definition in JSON.parse(
                                    word.definition,
                                )[0].definitions"
                                :key="definition.defintion"
                            >
                                <li>{{ definition.definition }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
