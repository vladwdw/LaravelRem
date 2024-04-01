<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('spis_invs', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("reason")->nullable();
            $table->unsignedBigInteger("inv_id");
            $table->foreign("inv_id")->references("id")->on("inventories")->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('spis_invs');
    }
};
