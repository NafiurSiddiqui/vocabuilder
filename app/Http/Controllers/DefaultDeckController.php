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

        $words = $defaultDeck->words()->orderBy('title', 'desc')->simplePaginate(20);

        return Inertia::render('inventory/show', ['deck' => $defaultDeck, 'words' => $words]);
    }
}
