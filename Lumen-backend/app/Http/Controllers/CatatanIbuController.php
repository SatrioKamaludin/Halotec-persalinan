<?php

// CatatanIbuController.php
namespace App\Http\Controllers;

use App\Models\CatatanIbu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CatatanIbuController extends Controller
{
    public function index()
    {
        try {
            $catatanIbus = CatatanIbu::all();
            return response()->json([
                'success' => true,
                'message' => 'List Semua Data Ibu',
                'data' => $catatanIbus
            ], 200);
        } catch (QueryException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error, tidak bisa mengambil semua data ibu.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        $catatanIbu = CatatanIbu::find($id);

        if ($catatanIbu) {
            return response()->json([
                'success'   => true,
                'message'   => 'Detail',
                'data'      => $catatanIbu
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Data Ibu Tidak Ditemukan!',
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama_ibu.*' => 'required|string',
            'usia_ibu.*' => 'required|numeric',
            'usia_kehamilan.*' => 'required|numeric',
            'nama_ayah.*' => 'string',
            'alamat_rumah.*' => 'string',
            'nomor_telepon_darurat.*' => 'string',
            'kelahiran_anak_ke.*' => 'numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation Error',
                'data'   => $validator->errors()
            ], 401);
        } else {
            $data = $request->all();
            $result = CatatanIbu::insert($data);

            if ($result) {
                return response()->json([
                    'success' => true,
                    'message' => 'Data Ibu Berhasil Disimpan!',
                ], 201);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Data Ibu Gagal Disimpan!',
                ], 400);
            }
        }
    }

    public function update(Request $request, $id)
    {
        $catatanIbu = CatatanIbu::find($id);

        if (!$catatanIbu) {
            return response()->json([
                'success' => false,
                'message' => 'Data Ibu Tidak Ditemukan.',
            ], 404);
        }

        $catatanIbu->update($request->all());
        return response()->json([
            'success' => true,
            'message' => "Data Ibu Berhasil Diupdate!",
        ], 200);
    }

    public function destroy($id)
    {
        $catatanIbu = CatatanIbu::find($id);

        if (!$catatanIbu) {
            return response()->json([
                'success' => false,
                'message' => 'Data Ibu Tidak Ditemukan.',
            ], 404);
        }

        $namaIbu = $catatanIbu->nama_ibu;

        // Delete the catatan_ibu record
        CatatanIbu::destroy($id);

        return response()->json([
            'success' => true,
            'message' => "Data Ibu '$namaIbu' Berhasil Dihapus!",
        ], 200);
    }
}
