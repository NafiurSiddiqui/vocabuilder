<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('words', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('title');
            $table->unique(['title', 'user_id']);
            $table->string('slug');
            $table->unique(['slug', 'user_id']);
            $table->string('phonetic')->nullable();
            $table->json('pronunciation')->nullable();
            $table->json('definition');
            $table->json('examples')->nullable();
            $table->foreignId('deck_id')->nullable();
            $table->foreignId('default_deck_id')->nullable();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('words');
    }
};
