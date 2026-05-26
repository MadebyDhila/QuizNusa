// src/libs/supabase.js
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Ganti dengan URL dan Anon Key dari Supabase kamu
const supabaseUrl = 'https://mlmitsczbetnauzlzpln.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sbWl0c2N6YmV0bmF1emx6cGxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MTE1NDcsImV4cCI6MjA5NTE4NzU0N30.Yzk2jzmP871Pwj6TmYVQe9qkzSJF3rSOtG5PsVboZkI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});