<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckPosition
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next, ...$positions)
    {
        if (!$request->user() || !in_array($request->user()->position, $positions)) {
            abort(403, 'Access denied');
        }
    
        return $next($request);
    }
}
