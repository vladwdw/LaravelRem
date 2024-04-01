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
        Schema::create('part_in_requests', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger("request_id");
            $table->unsignedBigInteger("part_id"); 
            $table->foreign("part_id")->references("id")->on("parts")->onDelete('cascade');
            $table->foreign("request_id")->references("id")->on("repair_requests")->onDelete('cascade');
            $table->bigInteger("count");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('part_in_requests');
    }
};
