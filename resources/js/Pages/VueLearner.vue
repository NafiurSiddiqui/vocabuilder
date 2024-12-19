<script setup lang="ts">
import { useRemember } from '@inertiajs/vue3';
import { reactive } from 'vue';

// const count = ref(0);
const counter = reactive({
    count: 0,
});

let currentCount = useRemember(counter);

const increase = () => counter.count++;
</script>

<template>
    <div>count: {{ currentCount.count }}</div>
    <!-- <div>count: {{ counter.count }}</div> -->
    <button v-on:click="increase">Increase</button>
</template>
