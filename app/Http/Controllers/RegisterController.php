<?php

namespace App\Http\Controllers;

use App\Models\Employe;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    $user=Employe::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => bcrypt($request->password),
    ]);

    $token = $user->createToken('MyApp')->accessToken;

    return response()->json(['token' => $token],  200);
}
