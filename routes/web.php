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
    Route::get('/inventory', [
        WordController::class,
        'index'
    ])->name('inventory');
    Route::get('/inventory/{title}', [
        WordController::class,
        'show'
    ])->name('inventory.show');
    // Route::get('/inventory/{title}/edit', [
    //     WordController::class,
    //     'edit'
    // ])->name('inventory.edit');
    // Route::put('/inventory/{title}', [
    //     WordController::class,
    //     'update'
    // ])->name('inventory.update');
    // Route::delete('/inventory/{title}', [
    //     WordController::class,
    //     'destroy'
    // ])->name('inventory.destroy');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
