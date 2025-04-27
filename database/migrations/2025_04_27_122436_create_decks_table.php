<?php

use App\Models\Deck;
use App\Enum\DeckEnum;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('decks', function (Blueprint $table) {
            $table->id();
            $table->unique(['name', 'user_id']);
            $table->string('name');
            $table->text('description')->nullable();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });

        if (env('APP_ENV') === 'local') {
            //You are guarding here so that you don't create a default deck if one already exists
            //Also making sure user relationship is ensured.
            Deck::firstOrCreate(
                [
                    'name' => DeckEnum::DEFAULT ->value,
                    'user_id' => User::firstOrCreate(
                        ['email' => 'dev@local.me'],
                        [
                            'name' => 'ed',
                            'password' => bcrypt('secret'),
                            'email_verified_at' => now(),
                        ]
                    )->id
                ],
                ['description' => DeckEnum::DEFAULT_DESCRIPTION->value],
            );
        }

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('decks');
    }
};
