<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateRepairRequestStatusTrigger extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared('
        CREATE TRIGGER prevent_confirmation_before_10_minutes BEFORE UPDATE ON repair_requests
        FOR EACH ROW
        BEGIN
            IF NEW.status = "Подтверждение" AND TIMESTAMPDIFF(MINUTE, NEW.created, NEW.doned) < 10 THEN
                SIGNAL SQLSTATE "45000" SET MESSAGE_TEXT = "Cannot confirm a repair request less than 10 minutes after creation.";
            END IF;
        END;
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP TRIGGER IF EXISTS prevent_confirmation_before_10_minutes');
    }
}
