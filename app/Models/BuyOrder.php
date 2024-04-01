<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BuyOrder extends Model
{
    use HasFactory;
    public function parts()
{
    return $this->hasMany(Part::class, 'order_id');
}
public function sender()
{
    return $this->belongsTo(Employe::class, 'sender_id');
}
}
