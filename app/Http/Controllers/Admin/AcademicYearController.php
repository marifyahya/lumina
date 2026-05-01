<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\AcademicYear;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class AcademicYearController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/AcademicYears/Index', [
            'academicYears' => AcademicYear::orderBy('year', 'desc')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'year' => 'required|string',
            'semester' => 'required|in:Odd,Even',
        ]);

        AcademicYear::create([
            'year' => $request->year,
            'semester' => $request->semester,
            'is_active' => false,
        ]);

        return redirect()->back()->with('message', 'Academic year created successfully.');
    }

    public function activate(AcademicYear $academicYear)
    {
        DB::transaction(function () use ($academicYear) {
            AcademicYear::where('is_active', true)->update(['is_active' => false]);
            $academicYear->update(['is_active' => true]);
        });

        return redirect()->back()->with('message', 'Academic year activated successfully.');
    }

    public function destroy(AcademicYear $academicYear)
    {
        if ($academicYear->is_active) {
            return redirect()->back()->withErrors(['error' => 'Cannot delete an active academic year.']);
        }

        $academicYear->delete();

        return redirect()->back()->with('message', 'Academic year deleted successfully.');
    }
}
