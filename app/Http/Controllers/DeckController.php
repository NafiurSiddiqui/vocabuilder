<?php

namespace App\Http\Controllers;

use App\Models\Deck;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\DefaultDeck;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Services\DeckService;
use Illuminate\Support\Facades\Auth;


//NOTE:Make sure you are fetching only the data that belongs to the user

class DeckController extends Controller
{


    public function index()
    {
        $userId = Auth::user()->id;


        $decks = Deck::where('user_id', $userId)
            ->withCount('words') //this gives you the words_count
            ->orderBy('title', 'desc')
            ->simplePaginate(20);


        $defaultDeck = DefaultDeck::withCount([
            'words as words_count' => function ($query) use ($userId) {
                $query->where('user_id', $userId);
            }
        ])->firstOrFail();


        return Inertia::render('inventory/index', ['deckItems' => $decks->items(), 'decks' => $decks, 'defaultDeck' => $defaultDeck]);
    }

    public function create()
    {
        //using a modal here

    }

    public function store(Request $request)
    {

        $attributes = $request->validate([
            'title' => ['required', 'min:3', 'max:255', 'unique:decks'],
            'description' => ['nullable'],
        ]);


        $attributes['user_id'] = Auth::user()->id;
        $attributes['title'] = ucfirst($attributes['title']);
        $attributes['slug'] = Str::slug($attributes['title']);
        Deck::create($attributes);

        return redirect()->route('inventory.index');
    }

    public function show(Deck $deck): Response
    {
        $userId = Auth::user()->id;
        // $words = $deck->words()->orderBy('title', 'desc')->simplePaginate(20);

        $words = $deck->words()
            ->orderBy('title')
            ->get()
            ->groupBy(function ($word) {
                return strtoupper(substr($word->title, 0, 1));
            });

        $decks = Deck::where('user_id', $userId)
            ->orderBy('title', 'desc')
            ->simplePaginate(20);


        $defaultDeck = DefaultDeck::withCount([
            'words as words_count' => function ($query) use ($userId) {
                $query->where('user_id', $userId);
            }
        ])->firstOrFail();


        // dd($decks);
        return Inertia::render('inventory/show', ['currentDeck' => $deck, 'words' => $words, 'decks' => $decks, 'defaultDeck' => $defaultDeck]);
    }

    public function edit(Deck $deck)
    {
        // return Inertia::render('inventory/edit', ['deck' => $deck]);
    }

    public function update(Request $request, Deck $deck)
    {
        // $request->validate([
        //     'title' => 'required',
        //     'description' => 'required',
        // ]);

        // $deck->update($request->all());

        // return redirect()->route('inventory.index');
    }

    public function destroy(Deck $deck)
    {
        // $deck->delete();

        // return redirect()->route('inventory.index');
    }
}
