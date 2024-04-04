<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'buyDate', 'spisDate', 'status', 'cabinet_id'];
    public function cabinet()
    {
        return $this->belongsTo(Cabinet::class);
    }
    public function repairRequests(){
        return $this->hasMany(RepairRequest::class);
    }
}
