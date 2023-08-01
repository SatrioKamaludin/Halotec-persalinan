<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CatatanIbu extends Model
{
    protected $table = 'catatan_ibu';
    protected $fillable = ['nama_ibu', 'usia_ibu', 'usia_kehamilan', 'nama_ayah', 'alamat_rumah', 'nomor_telepon_darurat', 'kelahiran_anak_ke'];

    // Relasi One-to-Many dengan CatatanBayi
    public function catatanBayi()
    {
        return $this->hasMany(CatatanBayi::class, 'id_ibu', 'id');
    }
}
