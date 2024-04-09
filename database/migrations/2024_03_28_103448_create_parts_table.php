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
        Schema::create('parts', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("part");
            $table->unsignedBigInteger("request_id")->nullable();
            $table->unsignedBigInteger("order_id")->nullable();
            $table->foreign("order_id")->references("id")->on("buy_orders")->onDelete('cascade');
            $table->bigInteger("count");
            $table->bigInteger("Buy_count");
            $table->double("price");
            $table->enum("status",["В закупке","Доступен","Закончился"])->default("В закупке");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parts');
    }
};
