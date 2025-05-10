<?php

namespace App\Http\Controllers;

use App\Models\Deck;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class DeckController extends Controller
{
    public function index()
    {
        $userId = Auth::user()->id;
        $decks = Deck::forAuthedUser()->orderBy('name', 'desc')->simplePaginate(20);
        // $decks = Deck::where('user_id', $userId)->get();
        // dd($decks->items());
        // dd($decks);
        return Inertia::render('inventory/index', ['deckItems' => $decks->items(), 'decks' => $decks]);
    }

    public function create()
    {
        return Inertia::render('inventory/create');
    }

    public function store(Request $request)
    {
        $attributes = $request->validate([
            'name' => ['required', 'min:3', 'max:255', 'unique:decks'],
            'description' => ['nullable'],
        ]);
        $attributes['user_id'] = Auth::user()->id;
        $attributes['name'] = ucfirst($attributes['name']);
        Deck::create($attributes);

        return redirect()->route('inventory.index');
    }

    public function show(Deck $deck)
    {
        return Inertia::render('inventory/show', ['deck' => $deck]);
    }

    public function edit(Deck $deck)
    {
        // return Inertia::render('inventory/edit', ['deck' => $deck]);
    }

    public function update(Request $request, Deck $deck)
    {
        // $request->validate([
        //     'name' => 'required',
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
