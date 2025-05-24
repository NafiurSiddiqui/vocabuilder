<?php

namespace App\Enum;

enum DeckEnum: string
{
    case DEFAULT_TITLE = 'Tossed';
    case DEFAULT_SLUG = 'tossed';
    case DEFAULT_DESCRIPTION = "Default deck, where all the words are tossed into.";
}
