<?php

namespace App\Http\Controllers;

use App\Models\Deck;
use App\Models\DefaultDeck;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DefaultDeckController extends Controller
{


    public function show(DefaultDeck $defaultDeck): Response
    {
        $userId = Auth::user()->id;
        // $words = $defaultDeck->words()->orderBy('title', 'desc')->simplePaginate(20);

        $words = $defaultDeck->words()
            ->orderBy('title')
            ->get()
            ->groupBy(function ($word) {
                return strtoupper(substr($word->title, 0, 1));
            });


        $decks = Deck::where('user_id', $userId)
            ->orderBy('title', 'desc')
            ->simplePaginate(20);
        // dd($decks, $defaultDeck);
        return Inertia::render('inventory/show', ['currentDeck' => $defaultDeck, 'decks' => $decks, 'defaultDeck' => $defaultDeck, 'words' => $words]);
    }
}
