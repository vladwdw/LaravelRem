<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RepairRequest extends Model
{
    use HasFactory;
    public function employe()
    {
        return $this->belongsTo(Employe::class)->withDefault([
            'full_name' => 'Не указано',
        ]);
    }
    
    public function employeRecieved()
    {
        return $this->belongsTo(Employe::class)->withDefault([
            'full_name' => 'Не указано',
        ]);
    }
    
    public function inventory()
    {
        return $this->belongsTo(Inventory::class);
    }
    public function cabinet()
{
    return $this->belongsTo(Cabinet::class)->withDefault([
        'name' => 'Не указано',
    ]);
}
}
