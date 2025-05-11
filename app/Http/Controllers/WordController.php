<?php

namespace App\Http\Controllers;

use App\Models\Deck;
use App\Models\Word;
use Inertia\Inertia;
use Illuminate\Http\Request;
use function PHPSTORM_META\map;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class WordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $words = Word::all();
        // dd($words);
        // return Inertia::render('inventory/index', ['words' => $words]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // $userId = Auth::user()->id;
        $deckItems = Deck::forAuthedUser()->orderBy('name')->get();
        //get only the deck with the id of 1
        $defaultDeckId = Deck::where('name', 'tossed')->get()->first()->id;

        return Inertia::render('word-processor', ['deckItems' => $deckItems, 'defaultDeckId' => $defaultDeckId]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        dd($request->all());

        $attributes = $request->validate([
            'words' => ['required', 'string'],
            'deck_id' => ['required', 'exists:decks,id'],
        ]);

        // Step 1: Normalize newlines to spaces (Enter key '\r' and Newline '\n')
        $normalizedInput = preg_replace('/[\r\n]+/', ' ', $attributes['words']);

        // Step 2: Trim extra whitespace
        $cleanInput = trim($normalizedInput);

        // Step 3: Split the input into words/phrases
        $wordsArray = explode(' ', $cleanInput);


        $words = [];
        $sentence = [];


        // Step 3: Extract sentences wrapped in double quotes using regex
        $pattern = '/\[(.*?)\]/';
        preg_match_all($pattern, $cleanInput, $matches);
        $sentences = [];
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

        // // // Final debug or return the results
        // dd([
        //     'sentences' => $sentences,
        //     'words' => $words,
        // ]);
        // dd($attributes['words']);
        // make api calls for each words

        // try {

        $data = [];
        $transactionReport = [];

        foreach ($words as $word) {
            # code...
            $response = Http::get("https://api.dictionaryapi.dev/api/v2/entries/en/$word");

            if ($response->successful()) {
                $result = $response->json();
                $user_id = Auth::user()->id;
                $data[] = [
                    'created_at' => now(),
                    'updated_at' => now(),
                    'word' => $result[0]['word'],
                    'phonetic' => $result[0]['phonetic'] ?? '',
                    'pronunciation' => json_encode($result[0]['phonetics']),
                    'definition' => json_encode($result[0]['meanings']),
                    'examples' => json_encode($result[0]['examples'] ?? []),
                    'user_id' => $user_id
                ];

                $transactionReport[] = [
                    'message' => "The word <$word> is successfully saved"
                ];
            } else {

                $transactionReport[] = [
                    'message' => "The word <$word> is not saved.",
                    'api_response' => $response->json()
                ];
            }
        }



        // dd('Finished processing', $data);
        Word::insert($data);
        //write $transactionReport to a file
        $file = fopen('transaction_report.txt', 'w');
        fwrite($file, json_encode($transactionReport));
        fclose($file);



        return redirect('/word-processor')->with('success', 'Word saved successfully');


        //get the definition, phonetics, if no_example_provided by user, get examples
        //create the words, associate user_id
        //make a report of each words like - successful, failed and so on to a separate file
    }

    /**
     * Display the specified resource.
     */
    public function show(Word $word)
    {
        // return Inertia::render('inventory/show', ['word' => $word]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Word $word)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Word $word)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Word $word)
    {
        //
    }
}
