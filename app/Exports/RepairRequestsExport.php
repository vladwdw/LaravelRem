<?php

namespace App\Exports;

use App\Models\RepairRequest;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class RepairRequestsExport implements FromCollection, WithHeadings, WithMapping
{
    public function collection()
    {
        return RepairRequest::all();
    }

    public function headings(): array
    {
        return [
            'ID',
            'Created At',
            'Done At',
            'Inventory Name',
            'Cabinet ID',
            'Employee ID',
            'Receive ID',
            'Problem Description',
            'Status',
            'Image',
        ];
    }

    public function map($repairRequest): array
    {
        return [
            $repairRequest->id,
            $repairRequest->created_at,
            $repairRequest->doned,
            $repairRequest->inventoryName,
            $repairRequest->cabinet_id,
            $repairRequest->employe_id,
            $repairRequest->recieve_id,
            $repairRequest->problemDescription,
            $repairRequest->status,
            $repairRequest->image,
        ];
    }
}