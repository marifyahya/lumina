<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Registration;
use App\Models\User;
use App\Models\Student;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class PPDBController extends Controller
{
    public function index(Request $request)
    {
        $query = Registration::with('academicYear');

        if ($request->status) {
            $query->where('status', $request->status);
        }

        $registrations = $query->orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('Admin/Admissions/Index', [
            'registrations' => $registrations,
            'filters' => $request->only(['status']),
        ]);
    }

    public function show(Registration $registration)
    {
        return Inertia::render('Admin/Admissions/Detail', [
            'registration' => $registration->load('academicYear'),
        ]);
    }

    public function approve(Registration $registration)
    {
        if ($registration->status !== 'Pending') {
            return back()->withErrors(['error' => 'Registration is already processed.']);
        }

        return DB::transaction(function () use ($registration) {
            // 1. Update Registration Status
            $registration->update(['status' => 'Approved']);

            // 2. Create User
            // Generate email from name: name_random@lumina.test
            $cleanName = Str::slug($registration->full_name, '_');
            $email = $cleanName . '_' . Str::random(4) . '@lumina.test';
            
            $user = User::create([
                'name' => $registration->full_name,
                'email' => $email,
                'password' => Hash::make('password123'),
            ]);

            // 3. Assign Student Role
            $user->assignRole('Student');

            // 4. Create Student Record
            Student::create([
                'user_id' => $user->id,
                'registration_id' => $registration->id,
                'nisn' => $registration->nisn,
                'status' => 'Active',
            ]);

            return redirect()->route('admin.admissions.index')->with('success', 'Registration approved and student created.');
        });
    }

    public function reject(Registration $registration)
    {
        if ($registration->status !== 'Pending') {
            return back()->withErrors(['error' => 'Registration is already processed.']);
        }

        $registration->update(['status' => 'Rejected']);

        return redirect()->route('admin.admissions.index')->with('success', 'Registration rejected.');
    }
}
