<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BirthRecordsPost extends Model
{
    /**
     * @var string
     */
    protected $table = 'birthrecords';

    /**
     * @var array
     */
    protected $fillable = [
        'nama_ibu',
        'usia_ibu',
        'usia_kehamilan',
        'gender_bayi',
        'panjang_bayi',
        'berat_badan_bayi',
        'tgl_jam_persalinan',
        'proses_partus',
        'kondisi_kelahiran',
        'kelahiran_anak_ke',
        'nama_ayah',
        'alamat_rumah',
        'nomor_telepon_darurat',
    ];
}