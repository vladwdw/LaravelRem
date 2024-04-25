<?php

namespace App\Http\Controllers;
use App\Models\Employe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
class EmployeController extends Controller
{
    public function index()
{
    $employes = Employe::paginate(); // Используйте Eloquent ORM для получения всех записей
    return response()->json($employes); // Возвращаем данные в формате JSON
}
    public function delete($id){
        $employ=Employe::find($id);
        $employ->delete();
        return response()->json('Пользователь был удален');
    }

    public function get($id){
        $employe=Employe::find($id);
        return response()->json([
            'id'=>$employe->id,
            'username'=>$employe->username,
            'password'=>$employe->password,
            'full_name'=>$employe->full_name,
            'position'=>$employe->position
        ]);
    }
    public function getTopEmployesByRepairs(Request $request)
{
    $startDate = $request->input('start_date');
    $endDate = $request->input('end_date');

    // Проверяем, что даты были переданы и корректны
    if (!$startDate || !$endDate) {
        return response()->json(['error' => 'Даты не указаны'], 400);
    }

    // Выполняем запрос
    $topEmployes = DB::table('repair_requests')
        ->select('recieve_id', DB::raw('count(*) as repairs_count'))
        ->whereBetween('doned', [$startDate, $endDate])
        ->where('status', 'Выполнен')
        ->groupBy('recieve_id')
        ->orderBy('repairs_count', 'desc')
        ->limit(5)
        ->get();

    // Получаем данные сотрудников
    $employesData = [];
    foreach ($topEmployes as $topEmploye) {
        $employe = Employe::find($topEmploye->recieve_id);
        $employesData[] = [
            'id' => $employe->id,
            'username' => $employe->username,
            'full_name' => $employe->full_name,
            'position' => $employe->position,
            'repairs_count' => $topEmploye->repairs_count,
        ];
    }

    return response()->json($employesData);
}
    public function update(Request $request, $id)
    {
        try {
            $employee = Employe::find($id);
    
            if (!$employee) {
                return response()->json(['message' => 'Employee not found'], 404);
            }
    
            $validatedData = $request->toArray();
            if ($request->has('username')) {
                $employee->username = $validatedData['username'];
            }
            if ($request->has('password')) {
                $employee->password = Hash::make($validatedData['password']); // Используйте Hash::make для хеширования пароля
            }
            if ($request->has('full_name')) {
                $employee->full_name = $validatedData['full_name'];
            }
            if ($request->has('position')) {
                $employee->position = $validatedData['position'];
            }
    
            // Сохранение изменений
            $employee->save();
    
    
    
            return response()->json(['message' => 'Employee updated successfully', 'employee' => $request->toArray()]);
        } catch (\Exception $e) {
           
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
    public function create(Request $request){
        try{
            $validatedData = $request->toArray();
        }
        catch(\Exception $e){
                return response()->json(['message' => 'Не прошла валидация'], 422);
        }
try
{
            $employe = new Employe;
            $employe->username = $validatedData['username'];
            $employe->password = Hash::make($validatedData['password']);
            $employe->full_name = $validatedData['full_name'];
            $employe->position = $validatedData['position'];
            $employe->save();

            return response()->json(['message' => 'Employee created successfully', 'employee' => $validatedData]);
}
        catch(\Exception $e){
            return response()->json(['message' => 'Internal server error',$e->getMessage()], 500);
        }
    }

}
