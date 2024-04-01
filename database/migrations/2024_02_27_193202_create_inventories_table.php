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
        Schema::create('inventories', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name');
            $table->date('buyDate')->nullable();
            $table->date('spisDate')->nullable();
            $table->enum("status",["Доступен","Списан"])->default("Доступен");
            $table->unsignedBigInteger('cabinet_id')->nullable();
            $table->foreign('cabinet_id')->references('id')->on('cabinets')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventories');
    }
};
