<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WordsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/vuelearner', function () {
    return Inertia::render('VueLearner');
})->name('vuelearner');



Route::middleware('auth', 'verified')->group(function () {
    Route::get('/word-processor', [WordsController::class, 'create'])->name('word-processor');
    Route::post('word-processor', [WordsController::class, 'store'])->name('word-processor.store');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
