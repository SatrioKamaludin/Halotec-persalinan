<?php

namespace App\Http\Controllers;

use App\BirthRecordsPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BirthRecordsController extends Controller
{
    public function index()
    {
        $posts = BirthRecordsPost::all();

        return response()->json([
            'success' => true,
            'message' => 'List Semua Data',
            'data'    => $posts
        ], 200);
    }

    public function show($id)
    {
        $post = BirthRecordsPost::find($id);

        if ($post) {
            return response()->json([
                'success'   => true,
                'message'   => 'Detail',
                'data'      => $post
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Data Tidak Ditemukan!',
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama_ibu.*' => 'required',
            'usia_ibu.*' => 'required|numeric',
            'usia_kehamilan.*' => 'required|numeric',
            'gender_bayi.*' => 'required',
            'panjang_bayi.*' => 'required|numeric',
            'berat_badan_bayi.*' => 'required|numeric',
            'tgl_jam_persalinan.*' => 'required|date',
            'proses_partus.*' => 'required',
            'kondisi_kelahiran.*' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Semua Kolom Wajib Diisi!',
                'data'   => $validator->errors()
            ], 401);
        } else {
            $data = $request->all();
            $result = BirthRecordsPost::insert($data);

            if ($result) {
                return response()->json([
                    'success' => true,
                    'message' => 'Data Berhasil Disimpan!',
                ], 201);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Data Gagal Disimpan!',
                ], 400);
            }
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nama_ibu' => 'string',
            'usia_ibu' => 'numeric',
            'usia_kehamilan' => 'numeric',
            'gender_bayi' => 'string',
            'panjang_bayi' => 'numeric',
            'berat_badan_bayi' => 'numeric',
            'tgl_jam_persalinan' => 'dateTime',
            'proses_partus' => 'string',
            'kondisi_kelahiran' => 'string',
            'kelahiran_anak_ke' => 'numeric',
            'nama_ayah' => 'numeric',
            'alamat_rumah' => 'numeric',
            'nomor_telepon_darurat' => 'numeric',
        ]);

        if ($validator->fails()) {

            return response()->json([
                'success' => false,
                'message' => 'Semua Kolom Wajib Diisi!',
                'data'   => $validator->errors()
            ], 401);
        } else {

            $post = BirthRecordsPost::whereId($id)->update([
                'nama_ibu' => $request->input('nama_ibu'),
                'usia_ibu' => $request->input('usia_ibu'),
                'usia_kehamilan' => $request->input('usia_kehamilan'),
                'gender_bayi' => $request->input('gender_bayi'),
                'panjang_bayi' => $request->input('panjang_bayi'),
                'berat_badan_bayi' => $request->input('berat_badan_bayi'),
                'tgl_jam_persalinan' => $request->input('proses_partus'),
                'kondisi_kelahiran' => $request->input('kondisi_kelahiran'),
                'kelahiran_anak_ke' => $request->input('kelahiran_anak_ke'),
                'nama_ayah' => $request->input('nama_ayah'),
                'alamat_rumah' => $request->input('alamat_rumah'),
                'nomor_telepon_darurat' => $request->input('nomor_telepon_darurat'),
            ]);

            if ($post) {
                return response()->json([
                    'success' => true,
                    'message' => 'Data Berhasil Diupdate!',
                    'data' => $post
                ], 201);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Data Gagal Diupdate!',
                ], 400);
            }
        }
    }

    public function destroy($id)
    {
        $post = BirthRecordsPost::whereId($id)->first();

        $post->delete();

        if ($post) {
            return response()->json([
                'success' => true,
                'message' => 'Data Berhasil Dihapus!',
            ], 200);
        }
    }
}
