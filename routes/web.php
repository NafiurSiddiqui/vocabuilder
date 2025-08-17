<?php

use App\Http\Controllers\DeckController;
use App\Http\Controllers\DefaultDeckController;
use App\Http\Controllers\WordController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/word-processor', [WordController::class, 'create'])->name('word-processor');
    Route::post('word-processor', [WordController::class, 'store'])->name('word-processor.store');
    Route::patch('/word-processor', [WordController::class, 'update'])->name('word-processor.update');
    Route::delete('/word-processor/{word}', [WordController::class, 'destroy'])->name('word-processor.destroy');
    Route::get('/inventory', [DeckController::class, 'index'])->name('inventory.index');
    Route::get('/inventory/{deck:slug}', [DeckController::class, 'show'])->name('inventory.show');
    Route::get('/inventory/default/{defaultDeck:slug}', [DefaultDeckController::class, 'show'])->name('inventory.default.show');
    Route::post('/inventory', [DeckController::class, 'store'])->name('inventory.store');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
