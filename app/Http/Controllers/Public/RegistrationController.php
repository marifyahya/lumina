<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Registration;
use App\Models\AcademicYear;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class RegistrationController extends Controller
{
    public function index()
    {
        $activeYear = AcademicYear::where('is_active', true)->first();

        return Inertia::render('Public/Registration/Index', [
            'activeYear' => $activeYear,
        ]);
    }

    public function store(Request $request)
    {
        $activeYear = AcademicYear::where('is_active', true)->first();

        if (!$activeYear) {
            return redirect()->back()->withErrors(['error' => 'Registration is currently closed. No active academic year.']);
        }

        $request->validate([
            // Identity
            'full_name' => 'required|string|max:255',
            'gender' => 'required|in:M,F',
            'place_birth' => 'required|string|max:255',
            'birth_date' => 'required|date',
            'religion' => 'required|string|max:50',
            'nisn' => 'required|string|size:10',
            'nik' => 'required|string|size:16',
            'kk_number' => 'required|string|size:16',
            // Address
            'address_full' => 'required|string',
            'rt' => 'required|string|max:5',
            'rw' => 'required|string|max:5',
            'village' => 'required|string|max:100',
            'district' => 'required|string|max:100',
            'city' => 'required|string|max:100',
            'postal_code' => 'nullable|string|max:10',
            // School
            'previous_school' => 'required|string|max:255',
            'grades' => 'nullable|string|max:255',
            'achievements' => 'nullable|string',
            // Parents
            'father_name' => 'required|string|max:255',
            'father_job' => 'nullable|string|max:255',
            'mother_name' => 'required|string|max:255',
            'mother_job' => 'nullable|string|max:255',
            'parent_education' => 'nullable|string|max:100',
            'parent_phone' => 'required|string|max:20',
            // Path
            'path' => 'required|string|in:domicile,affirmation,mutation,achievement',
            'declaration' => 'accepted',
            // Documents
            'doc_birth_cert' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'doc_kk' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'doc_ijazah' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'doc_photo' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
            'doc_report' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ]);

        return DB::transaction(function () use ($request, $activeYear) {
            $registrationNumber = $this->generateRegistrationNumber($activeYear->year);

            $data = $request->all();
            $data['academic_year_id'] = $activeYear->id;
            $data['registration_number'] = $registrationNumber;
            $data['status'] = 'Pending';
            $data['declaration'] = true;

            // Handle File Uploads
            $documentFields = ['doc_birth_cert', 'doc_kk', 'doc_ijazah', 'doc_photo', 'doc_report', 'doc_kip', 'doc_certificate', 'doc_mutation'];
            foreach ($documentFields as $field) {
                if ($request->hasFile($field)) {
                    $path = $request->file($field)->store('registrations/documents', 'public');
                    $data[$field] = $path;
                }
            }

            $registration = Registration::create($data);

            return redirect()->route('register.success', $registration->id);
        });
    }

    public function success(Registration $registration)
    {
        return Inertia::render('Public/Registration/Success', [
            'registration' => $registration,
        ]);
    }

    private function generateRegistrationNumber($year)
    {
        // Format: PPDB-2024-0001
        // Replace slash in year if any (e.g. 2024/2025 -> 2024)
        $cleanYear = explode('/', $year)[0];
        
        $lastReg = Registration::where('registration_number', 'like', "PPDB-$cleanYear-%")
            ->orderBy('registration_number', 'desc')
            ->first();

        if (!$lastReg) {
            $number = 1;
        } else {
            $lastNumber = (int) substr($lastReg->registration_number, -4);
            $number = $lastNumber + 1;
        }

        return "PPDB-$cleanYear-" . str_pad($number, 4, '0', STR_PAD_LEFT);
    }
}
