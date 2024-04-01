<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared('
            SET GLOBAL event_scheduler = ON;
        ');

        DB::unprepared('
            CREATE EVENT `update_inventory_status`
            ON SCHEDULE EVERY 1 DAY
            STARTS CURRENT_DATE
            ON COMPLETION NOT PRESERVE ENABLE
            DO
            BEGIN
                UPDATE inventories
                SET status = "Списан"
                WHERE spisDate = CURDATE();
            
                INSERT INTO spis_invs (reason, inv_id)
                SELECT "Срок подошел к концу", id
                FROM inventories
                WHERE spisDate = CURDATE();
            END
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP EVENT IF EXISTS `update_inventory_status`');
    }
};
