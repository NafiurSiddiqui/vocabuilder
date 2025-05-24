<?php

namespace App\Http\Controllers;

use App\Models\Deck;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class DeckController extends Controller
{
    public function index()
    {
        $userId = Auth::user()->id;
        $decks = Deck::forAuthedUser()
            ->withCount('words') //this gives you the words_count
            ->orderBy('title', 'desc')
            ->simplePaginate(20);

        // dd($decks->words_count);
        return Inertia::render('inventory/index', ['deckItems' => $decks->items(), 'decks' => $decks]);
    }

    public function create()
    {
        return Inertia::render('inventory/create');
    }

    public function store(Request $request)
    {
        $attributes = $request->validate([
            'title' => ['required', 'min:3', 'max:255', 'unique:decks'],
            'description' => ['nullable'],
        ]);
        $attributes['user_id'] = Auth::user()->id;
        $attributes['title'] = ucfirst($attributes['title']);
        Deck::create($attributes);

        return redirect()->route('inventory.index');
    }

    public function show(Deck $deck): Response
    {
        // dd($deck->words()->get());
        $words = $deck->words()->orderBy('title', 'desc')->simplePaginate(20);
        // dd($words->items());
        return Inertia::render('inventory/show', ['deck' => $deck, 'words' => $words]);
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
