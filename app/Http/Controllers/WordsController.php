<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class WordsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('WordProcessor');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());


        $attributes = $request->validate([
            'words' => ['required', 'string']
        ]);

        // Step 1: Normalize newlines to spaces
        $normalizedInput = preg_replace('/[\r\n]+/', ' ', $attributes['words']);

        // Step 2: Trim extra whitespace
        $cleanInput = trim($normalizedInput);

        // Step 3: Split the input into words/phrases
        $wordsArray = explode(' ', $cleanInput);


        $words = [];
        $sentence = [];


        // Step 3: Extract sentences wrapped in double quotes using regex
        $pattern = '/\[(.*?)\]/';  // Match text inside double quotes (including empty quotes)
        preg_match_all($pattern, $cleanInput, $matches);

        $sentences = [];
        // if (!empty($matches[1])) {
        //     $sentences = array_map(function ($sentence) {
        //         // Remove extra spaces within the extracted sentence
        //         return trim(preg_replace('/\s+/', ' ', $sentence));
        //     }, $matches[1]);
        // }

        // // Step 4: Remove extracted sentences from the input
        // $inputWithoutSentences = preg_replace($pattern, '', $cleanInput);

        // // Step 5: Split the remaining input into words
        // $words = array_filter(explode(' ', $inputWithoutSentences), function ($word) {
        //     return !empty(trim($word)); // Exclude empty entries
        // });

        // // Final arrays
        // dd([
        //     'sentences' => $sentences,
        //     'words' => $words,
        // ]);

        // Process each sentence wrapped in []
        if (!empty($matches[1])) {
            foreach ($matches[1] as $sentence) {
                // Add the sentence to the sentences array
                $sentences[] = $sentence;

                // Detect words wrapped in <...> within the sentence
                preg_match_all('/<([^>]+)>/', $sentence, $wordMatches);

                if (!empty($wordMatches[1])) {
                    // Add these words to the words array
                    $words = array_merge($words, $wordMatches[1]);
                }
            }
        }

        // Step 4: Remove sentences from input to extract remaining words
        $inputWithoutSentences = preg_replace($pattern, '', $cleanInput);

        // Step 5: Split the remaining input into words and add to the words array
        $remainingWords = array_filter(explode(' ', $inputWithoutSentences), function ($word) {
            return !empty(trim($word)); // Exclude empty entries
        });
        $words = array_merge($words, $remainingWords);

        // Final debug or return the results
        dd([
            'sentences' => $sentences,
            'words' => $words,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
