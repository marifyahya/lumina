<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('academic_year_id')->constrained()->cascadeOnDelete();
            $table->string('registration_number')->unique();
            
            // Identity
            $table->string('full_name');
            $table->enum('gender', ['M', 'F']);
            $table->string('place_birth');
            $table->date('birth_date');
            $table->string('religion');
            $table->string('nisn')->nullable();
            $table->string('nik')->nullable();
            $table->string('kk_number')->nullable();

            // Address
            $table->text('address_full');
            $table->string('rt', 5)->nullable();
            $table->string('rw', 5)->nullable();
            $table->string('village');
            $table->string('district');
            $table->string('city');
            $table->string('postal_code', 10)->nullable();

            // Education
            $table->string('previous_school');
            $table->string('grades')->nullable();
            $table->text('achievements')->nullable();

            // Parents
            $table->string('father_name');
            $table->string('father_job')->nullable();
            $table->string('mother_name');
            $table->string('mother_job')->nullable();
            $table->string('parent_education')->nullable();
            $table->string('parent_phone');

            // Path & Admission
            $table->string('path'); // domicile, affirmation, mutation, achievement
            $table->boolean('declaration')->default(false);
            $table->enum('status', ['Pending', 'Approved', 'Rejected'])->default('Pending');

            // Documents (Paths)
            $table->string('doc_birth_cert')->nullable();
            $table->string('doc_kk')->nullable();
            $table->string('doc_ijazah')->nullable();
            $table->string('doc_photo')->nullable();
            $table->string('doc_report')->nullable();
            $table->string('doc_kip')->nullable();
            $table->string('doc_certificate')->nullable();
            $table->string('doc_mutation')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};
