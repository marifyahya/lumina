<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::post('/role/switch', function (\Illuminate\Http\Request $request) {
    $request->validate(['role' => 'required|string']);
    
    // Ensure the user actually has this role before switching
    if ($request->user()->hasRole($request->role)) {
        session(['active_role' => $request->role]);
    }
    
    return back();
})->middleware('auth')->name('role.switch');

Route::post('/language', [\App\Http\Controllers\LanguageController::class, 'switch'])->name('language.switch');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin Routes
    Route::prefix('admin')->name('admin.')->group(function () {
        // Academic Years
        Route::get('/academic-years', [\App\Http\Controllers\Admin\AcademicYearController::class, 'index'])->name('academic-years.index');
        Route::post('/academic-years', [\App\Http\Controllers\Admin\AcademicYearController::class, 'store'])->name('academic-years.store');
        Route::patch('/academic-years/{academicYear}/activate', [\App\Http\Controllers\Admin\AcademicYearController::class, 'activate'])->name('academic-years.activate');
        Route::delete('/academic-years/{academicYear}', [\App\Http\Controllers\Admin\AcademicYearController::class, 'destroy'])->name('academic-years.destroy');

        // Classes
        Route::get('/classes', [\App\Http\Controllers\Admin\ClassRoomController::class, 'index'])->name('classes.index');
        Route::post('/classes', [\App\Http\Controllers\Admin\ClassRoomController::class, 'store'])->name('classes.store');
        Route::delete('/classes/{class}', [\App\Http\Controllers\Admin\ClassRoomController::class, 'destroy'])->name('classes.destroy');
    });
});

require __DIR__.'/auth.php';
