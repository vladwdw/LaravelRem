<?php

namespace App\Http\Controllers;

use App\Models\BuyOrder;
use App\Models\Employe;
use App\Models\Inventory;
use App\Models\RepairRequest;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use PhpOffice\PhpWord\PhpWord;
use PhpOffice\PhpWord\TemplateProcessor;
use App\Exports\RepairRequestsExport;
use Maatwebsite\Excel\Facades\Excel;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
class DocumentsController extends Controller
{
    public function ReceiptInvoice($id){
        $phpWord = new PhpWord();
        $order = BuyOrder::with("parts")->find($id);
        $user=Employe::find($order->sender_id);
        $templateProcessor= new TemplateProcessor('templates\nakladnaya.docx');
        $templateProcessor->setValue('number',$id);
        $newFileName = 'Накладная_'.$id;
        $section=$phpWord->addSection();
        $section->addTextBreak(1);
        $styleCell =
        array(
        'borderColor' =>'000000',
        'borderSize' => 3,
        'valign' => 'center',
        );
        $styleText = array(
            'name' => 'Times New Roman',
            'valign'=>'center',
            'size' => 10,
        );
    
        $table = $section->addTable($styleCell);
        $i=0;
        $total=0;
        foreach ($order->parts as $part) {
            $table->addRow(200);
            $table->addCell(1200, $styleCell)->addText($i+1,$styleText);
            $table->addCell(3300, $styleCell)->addText($part->part,$styleText);
            $table->addCell(2000, $styleCell)->addText("шт.",$styleText);
            $table->addCell(1280, $styleCell)->addText($part->Buy_count,$styleText);
            $table->addCell(1560, $styleCell)->addText($part->price,$styleText);
            $table->addCell(1200, $styleCell)->addText(($part->price*$part->Buy_count),$styleText);
            $total+=($part->price*$part->Buy_count);
            $i++;
        }
        $templateProcessor->setComplexBlock('table',$table);
        $templateProcessor->setValue('total',$total);
        $templateProcessor->setValue('sender',$user->full_name);
        $templateProcessor->setValue('day', date('d', strtotime($order->accepted)) );
        $templateProcessor->setValue('year', date('y', strtotime($order->accepted)) );
        $templateProcessor->setValue('month', date('m', strtotime($order->accepted)) );
        $templateProcessor->saveAs($newFileName.'.docx');
        $headers = ['Content-Type' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        return response()->download(public_path($newFileName.'.docx'), $newFileName.'.docx', $headers)->deleteFileAfterSend(true);
    }
    public function export(Request $request)
    {
        $date = $request->toArray()['date'];
        $fileName = 'repair_requests_' . $date . '.xlsx';

        // Создание и сохранение файла
        Excel::store(new class($date) implements FromCollection, WithHeadings, WithMapping, WithColumnWidths {
            protected $date;

            public function __construct($date)
            {
                $this->date = $date;
            }

            public function collection()
            {
                return RepairRequest::whereDate('doned', $this->date)->get();
            }

            public function headings(): array
            {
                return [
                    'Номер',
                    'Создана',
                    'Выполнена',
                    'Инвентарный номер',
                    '№_Кабинет',
                    'ФИО Отправителя',
                    'Фио ремонтника',
                    'Описание проблемы',
                    'Статус',
      
                ];
            }

            public function map($repairRequest): array
            {
                $inventory = $repairRequest->inv_id == 0 ? $repairRequest->inventoryName : $repairRequest->inventory->name;
                $cabinet=$repairRequest->cabinet_id."_".$repairRequest->cabinet->name;
                $sender=Employe::find($repairRequest->employe_id);
                $recieve=Employe::find($repairRequest->recieve_id);
                return [
                    $repairRequest->id,
                    $repairRequest->created,
                    $repairRequest->doned,
                    $inventory,
                    $cabinet,
                    $sender->full_name,
                    $recieve->full_name,
                    $repairRequest->problemDescription,
                    $repairRequest->status,

                ];
            }
            public function columnWidths(): array
            {
                return [
                    'A' => 10, // Ширина столбца A
                    'B' => 20, // Ширина столбца B
                    'C' => 20, // Ширина столбца C
                    'D' => 30, // Ширина столбца D
                    'E' => 15, // Ширина столбца E
                    'F' => 15, // Ширина столбца F
                    'G' => 15, // Ширина столбца G
                    'H' => 30, // Ширина столбца H
                    'I' => 15, // Ширина столбца I
                    'J' => 30, // Ширина столбца J
                ];
            }
        }, $fileName, 'public');

        // Скачивание файла и его удаление после скачивания
        $filePath = storage_path('app/public/' . $fileName);
        return response()->download($filePath)->deleteFileAfterSend(true);
    }
    
    public function RemontDocument($id){
        $phpWord = new PhpWord();
        $repair=RepairRequest::find($id);
        $sender=Employe::find($repair->employe_id);
        $reciever=Employe::find($repair->recieve_id);
        
        if($repair->inv_id!=null){
            $inventory=Inventory::find($repair->inv_id);
            $inv=$inventory->name;
        }
        else {
            $inventory=$repair->inventoryName;
        }

        $templateProcessor= new TemplateProcessor('templates\remont.docx');
        $templateProcessor->setValue('id',$id);
        $templateProcessor->setValue('master',$reciever->full_name);
        $templateProcessor->setValue('employe',$sender->full_name);
        $newFileName = 'АктРемонта_'.$id;
        $section=$phpWord->addSection();
        $section->addTextBreak(1);
        $section->addTextBreak(1);
        $parts=$repair->getPartsNames();
        $styleCell =
        array(
        'borderColor' =>'000000',
        'borderSize' => 3,
        'valign' => 'center',
        );
        $styleText = array(
            'name' => 'Times New Roman',
            'valign'=>'center',
            'size' => 12,
        );
    
        $table = $section->addTable($styleCell);
        $i=1;
        $total=0;
        $templateProcessor->setValue('inventory',$inventory);
        foreach ($parts[0]['parts:'] as $part) {
            $table->addRow(200);
            $table->addCell(420, $styleCell)->addText($i, $styleText);
            $table->addCell(2800, $styleCell)->addText($part['name'], $styleText);
            $table->addCell(1740, $styleCell)->addText($part['count'], $styleText);
            $table->addCell(1740, $styleCell)->addText("шт.", $styleText);
            $table->addCell(1380, $styleCell)->addText($part['price'], $styleText);
            $table->addCell(1670, $styleCell)->addText($part['sum'], $styleText);
            $total += ($part['price'] * $part['count']);
            $i++;
        }
        if($total<=0){
            $total="0";
        }
  
        $templateProcessor->setComplexBlock('table',$table);
        $templateProcessor->setValue('total',$total);
        $templateProcessor->setValue('day', date('d', strtotime($repair->doned)) );
        $templateProcessor->setValue('year', date('y', strtotime($repair->doned)) );
        $templateProcessor->setValue('month', date('m', strtotime($repair->doned)) );
         $templateProcessor->saveAs($newFileName.'.docx');
         $headers = ['Content-Type' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        return response()->download(public_path($newFileName.'.docx'), $newFileName.'.docx', $headers)->deleteFileAfterSend(true);
    }
}
