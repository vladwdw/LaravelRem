<?php

namespace App\Http\Controllers;
use App\Models\Employe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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
    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'username' => ['required'],
            'password' => ['required'],
        ]);
    
        if (Auth::guard('employe')->attempt($credentials)) {
            $request->session()->regenerate();
    
            return redirect()->intended('dashboard');
        }
    
        return back()->withErrors([
            'username' => 'The provided credentials do not match our records.',
        ]);
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
            $validatedData = $request->validate([
                'username' => 'required|unique:employes,username',
                'password' => 'required',
                'full_name' => 'required',
                'position' => 'required',
            ]);
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
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }

}
