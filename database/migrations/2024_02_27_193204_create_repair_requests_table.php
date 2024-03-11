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
        Schema::create('repair_requests', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger('inv_id')->nullable();
            $table->foreign('inv_id')
            ->references('id')->on('inventories')
            ->onDelete('cascade'); 
            $table->unsignedBigInteger('cabinet_id')->nullable();
            $table->foreign('cabinet_id')
            ->references('id')->on('cabinets')
            ->onDelete('cascade'); 
            $table->unsignedBigInteger('employe_id')->nullable();
            $table->foreign('employe_id')
            ->references('id')->on('employes')
            ->onDelete('cascade'); 
            $table->unsignedBigInteger('recieve_id')->nullable();
            $table->foreign('recieve_id')
            ->references('id')->on('employes'); 
            $table->text('problemDescription');
            $table->enum('status', ['Выполнен', 'Отклонен', 'На обработке', 'В ожидании'])->default('В ожидании');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repair_requests');
    }
};
