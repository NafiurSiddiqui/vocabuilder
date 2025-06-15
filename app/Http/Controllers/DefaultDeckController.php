<?php

namespace App\Http\Controllers;

use App\Models\DefaultDeck;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DefaultDeckController extends Controller
{


    public function show(DefaultDeck $defaultDeck): Response
    {

        // $words = $defaultDeck->words()->orderBy('title', 'desc')->simplePaginate(20);

        $words = $defaultDeck->words()
            ->orderBy('title')
            ->get()
            ->groupBy(function ($word) {
                return strtoupper(substr($word->title, 0, 1));
            });

        return Inertia::render('inventory/show', ['deck' => $defaultDeck, 'words' => $words]);
    }
}
