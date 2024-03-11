<?php

namespace App\Http\Controllers;
use App\Models\Cabinet;
use Illuminate\Http\Request;

class CabinetController extends Controller
{
    public function index()
    {
        $cabinets = Cabinet::paginate(10); // Используйте Eloquent ORM для получения всех записей
        return response()->json($cabinets); // Возвращаем данные в формате JSON
    }
    public function delete($id){
        $cabinet=Cabinet::find($id);
        $cabinet->delete();
        return response()->json('Кабинет был удален');
    }
}
