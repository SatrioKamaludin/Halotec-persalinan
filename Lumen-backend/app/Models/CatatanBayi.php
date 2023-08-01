<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CatatanBayi extends Model
{
    protected $table = 'catatan_bayi';
    protected $fillable = ['id_ibu', 'gender_bayi', 'panjang_bayi', 'berat_badan_bayi', 'tgl_jam_persalinan', 'proses_partus', 'kondisi_kelahiran'];

    // Relasi Many-to-One dengan CatatanIbu
    public function catatanIbu()
    {
        return $this->belongsTo(CatatanIbu::class, 'id_ibu', 'id');
    }
}
