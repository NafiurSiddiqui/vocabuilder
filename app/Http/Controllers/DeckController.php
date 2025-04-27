<?php

namespace App\Http\Controllers;

use App\Models\Deck;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DeckController extends Controller
{
    public function index()
    {
        $decks = Deck::all();
        return Inertia::render('inventory/index', ['decks' => $decks]);
    }
}
