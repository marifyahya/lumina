<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $superAdmin = User::firstOrCreate([
            'email' => 'admin@lumina.test',
        ], [
            'name' => 'Super Admin',
            'password' => Hash::make('password'),
        ]);

        $superAdmin->assignRole('Super Admin');
    }
}
