<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ZaprosController extends Controller
{
    public function zapros1(Request $request){
        try{
            $validatedData = $request->validate([
                'startDate' => 'required|date',
                'endDate' => 'required|date|after_or_equal:startDate',
            ]);
    
            $startDate = $validatedData['startDate'];
            $endDate = $validatedData['endDate'];
    
            // Генерация дат в MySQL с использованием рекурсивного CTE
            $datesQuery = "
                WITH RECURSIVE date_range AS (
                    SELECT '{$startDate}' as date
                    UNION ALL
                    SELECT DATE_ADD(date, INTERVAL 1 DAY)
                    FROM date_range
                    WHERE date < '{$endDate}'
                )
                SELECT date FROM date_range
            ";
    
            // Объединяем временную таблицу с данными о заказах
            $result = DB::table(DB::raw("({$datesQuery}) as dates"))
                ->leftJoin('repair_requests', function ($join) {
                    $join->on(DB::raw("DATE(repair_requests.doned)"), '=', 'dates.date');
                })
                ->select(
                    'dates.date',
                    DB::raw("COALESCE(SUM(CASE WHEN status = 'Выполнен' THEN 1 ELSE 0 END), 0) as completed_orders"),
                    DB::raw("COALESCE(SUM(CASE WHEN status = 'Отклонен' THEN 1 ELSE 0 END), 0) as rejected_orders")
                )
                ->groupBy('dates.date')
                ->orderBy('dates.date')
                ->get();
    
            return response()->json($result);
        }
        catch(\Exception $ex){
            return response()->json(['error' => 'Внутренняя ошибка сервера', 'message' => $ex->getMessage()], 500);
        }
    }
    

}
