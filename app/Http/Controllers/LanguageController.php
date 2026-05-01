<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LanguageController extends Controller
{
    public function switch(Request $request)
    {
        $request->validate([
            'locale' => 'required|in:en,id',
        ]);

        session()->put('locale', $request->locale);

        return redirect()->back();
    }
}
