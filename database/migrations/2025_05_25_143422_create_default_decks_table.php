<?php

use App\Enum\DeckEnum;
use App\Models\DefaultDeck;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('default_decks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->timestamps();
        });
        // Use db table instead of ORM. A lot of time ORM fails here.
        // updateOrInsert won't break the app if the user already exists, good for staging, development, testing.
        // WARNING: DONT use enum for this. Should not have no dependency here.

        //updateOrInsert([column to match], [data to update or insert])
        DB::table('default_decks')->updateOrInsert(
            ['slug' => 'tossed'],
            [
                'title' => 'Tossed',
                'description' => 'Default deck - where all the words are tossed into',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('default_decks');
    }
};
