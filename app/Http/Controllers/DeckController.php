<?php

namespace App\Http\Controllers;

use App\Models\Deck;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DeckController extends Controller
{
    public function index()
    {
        $userId = auth()->id();
        $decks = Deck::where('user_id', $userId)->get();
        return Inertia::render('inventory/index', ['decks' => $decks]);
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
        $attributes['user_id'] = auth()->user()->id;

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
