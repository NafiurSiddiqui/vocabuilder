<?php

namespace App\Http\Controllers;

use App\Models\Words;
use Doctrine\Inflector\Rules\Word;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
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

        $attributes = $request->validate([
            'words' => ['required', 'string']
        ]);

        // // Step 1: Normalize newlines to spaces
        // $normalizedInput = preg_replace('/[\r\n]+/', ' ', $attributes['words']);

        // // Step 2: Trim extra whitespace
        // $cleanInput = trim($normalizedInput);

        // // Step 3: Split the input into words/phrases
        // $wordsArray = explode(' ', $cleanInput);


        // $words = [];
        // $sentence = [];


        // // Step 3: Extract sentences wrapped in double quotes using regex
        // $pattern = '/\[(.*?)\]/';
        // preg_match_all($pattern, $cleanInput, $matches);
        // $sentences = [];
        // // Process each sentence wrapped in []
        // if (!empty($matches[1])) {
        //     foreach ($matches[1] as $sentence) {
        //         // Add the sentence to the sentences array
        //         $sentences[] = $sentence;

        //         // Detect words wrapped in <...> within the sentence
        //         preg_match_all('/<([^>]+)>/', $sentence, $wordMatches);

        //         if (!empty($wordMatches[1])) {
        //             // Add these words to the words array
        //             $words = array_merge($words, $wordMatches[1]);
        //         }
        //     }
        // }

        // // Step 4: Remove sentences from input to extract remaining words
        // $inputWithoutSentences = preg_replace($pattern, '', $cleanInput);

        // // Step 5: Split the remaining input into words and add to the words array
        // $remainingWords = array_filter(explode(' ', $inputWithoutSentences), function ($word) {
        //     return !empty(trim($word)); // Exclude empty entries
        // });
        // $words = array_merge($words, $remainingWords);

        // // Final debug or return the results
        // dd([
        //     'sentences' => $sentences,
        //     'words' => $words,
        // ]);
        // dd($attributes['words']);
        //make api calls for each words

        // try {
        $response = Http::get("https://api.dictionaryapi.dev/api/v2/entries/en/" . $attributes['words']);
        if ($response->successful()) {
            $data = $response->json();
            // dd($data[0]);
            // dd([
            //     'word' => $data[0]['word'],
            //     'phonetic' => $data[0]['phonetic'] ?? '',
            //     'pronunciation' => $data[0]['phonetics'],
            //     'definition' => $data[0]['meanings'],
            //     'examples' => $data[0]['examples'] ?? [],

            // ]);
            // dd(auth()->user()->id);

            Words::create([
                'word' => $data[0]['word'],
                'phonetic' => $data[0]['phonetic'] ?? '',
                'pronunciation' => json_encode($data[0]['phonetics']),
                'definition' => json_encode($data[0]['meanings']),
                'examples' => json_encode($data[0]['examples'] ?? []),
                'user_id' => auth()->user()->id
            ]);

            return redirect('/word-processor')->with('success', 'Word saved successfully');
        } else {
            $data = json_decode($response->body());
            dd($data->title, $data->message, $data->resolution);

            return redirect()->back()->with('error', 'Word could not be saved successfully');
        }
        // } catch (Exception $e) {
        //     throw new Exception('Something went wrong with the request', 0, $e);
        // }
        //get the definition, phonetics, if no_example_provided by user, get examples
        //create the words, associate user_id
        //make a report of each words like - successful, failed and so on to a separate file
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
