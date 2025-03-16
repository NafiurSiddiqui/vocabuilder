<?php

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
    Route::get('/word-inventory', [
        WordController::class,
        'index'
    ])->name('word-inventory');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
