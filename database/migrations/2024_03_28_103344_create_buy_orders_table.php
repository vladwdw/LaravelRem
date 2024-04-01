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
        Schema::create('buy_orders', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger("sender_id");
            $table->foreign("sender_id")->references("id")->on("employes")->onDelete('cascade');;
            $table->enum("status",["Подтверждение", "Выполнен"])->default("Подтверждение");
            $table->dateTime("created")->default(now());
            $table->dateTime("accepted")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('buy_orders');
    }
};
