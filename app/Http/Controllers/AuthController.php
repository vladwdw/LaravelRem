<?php

namespace App\Http\Controllers;
use App\Models\Employe;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function username()
{
    return 'username';
}
public function login(Request $request)
{
    

    $employe = Employe::where('username', $request->username)->first();

    if (!$employe || !Hash::check($request->password, $employe->password)) {
        return response()->json(['message' => 'Неверные учетные данные'], 401);
    }

    $token = $employe->createToken('authToken')->plainTextToken;
    $position = $employe->position;
    $full_name=$employe->full_name;
    $id=$employe->id;
    return response()->json(['token' => $token,
    'position'=>$position, 
    'full_name'=>$full_name, 
    'id'=>$id], 200);
}

}
