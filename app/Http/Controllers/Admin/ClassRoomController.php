<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\ClassRoom;
use App\Models\AcademicYear;
use App\Models\Teacher;
use Inertia\Inertia;

class ClassRoomController extends Controller
{
    public function index()
    {
        $activeYear = AcademicYear::where('is_active', true)->first();

        return Inertia::render('Admin/Classes/Index', [
            'classes' => ClassRoom::with(['teacher.user', 'academicYear'])
                ->when($activeYear, fn($q) => $q->where('academic_year_id', $activeYear->id))
                ->get(),
            'teachers' => Teacher::with('user')->get(),
            'activeYear' => $activeYear,
        ]);
    }

    public function store(Request $request)
    {
        $activeYear = AcademicYear::where('is_active', true)->first();

        if (!$activeYear) {
            return redirect()->back()->withErrors(['error' => 'Please activate an academic year first.']);
        }

        $request->validate([
            'name' => 'required|string',
            'level' => 'required|integer|min:1|max:12',
            'teacher_id' => 'nullable|exists:teachers,id',
        ]);

        ClassRoom::create([
            'name' => $request->name,
            'level' => $request->level,
            'teacher_id' => $request->teacher_id,
            'academic_year_id' => $activeYear->id,
        ]);

        return redirect()->back()->with('message', 'Class created successfully.');
    }

    public function destroy(ClassRoom $class)
    {
        $class->delete();
        return redirect()->back()->with('message', 'Class deleted successfully.');
    }
}
