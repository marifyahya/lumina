<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    protected $fillable = [
        'academic_year_id',
        'registration_number',
        'full_name',
        'gender',
        'place_birth',
        'birth_date',
        'religion',
        'nisn',
        'nik',
        'kk_number',
        'address_full',
        'rt',
        'rw',
        'village',
        'district',
        'city',
        'postal_code',
        'previous_school',
        'grades',
        'achievements',
        'father_name',
        'father_job',
        'mother_name',
        'mother_job',
        'parent_education',
        'parent_phone',
        'path',
        'declaration',
        'status',
        'doc_birth_cert',
        'doc_kk',
        'doc_ijazah',
        'doc_photo',
        'doc_report',
        'doc_kip',
        'doc_certificate',
        'doc_mutation'
    ];

    public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class);
    }
}
