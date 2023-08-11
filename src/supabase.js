import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://qncbiipasimmzbnhydck.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuY2JpaXBhc2ltbXpibmh5ZGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE1NzI5MzYsImV4cCI6MjAwNzE0ODkzNn0.i3n-9cLSMTKVgxzst3PMIlcFRGn7dDyylmJNk6PLYX0';
export default createClient(supabaseUrl, supabaseKey);
