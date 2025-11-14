import supabase from "./supabase";

// Login dengan email & password
export async function login(email: string, password: string) {
    if (!supabase) throw new Error("Supabase is not configured");

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw error;
    return data;
}

// Signup dengan email & password
export async function signup(email: string, password: string, name: string) {
    if (!supabase) throw new Error("Supabase is not configured");

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name,
            },
        },
    });

    if (error) throw error;
    return data;
}

// Login dengan Google OAuth
// Login dengan Google OAuth
export async function loginWithGoogle() {
    if (!supabase) throw new Error("Supabase is not configured");

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            // Redirect ke callback page dulu buat clean tokens dari URL
            redirectTo: `${window.location.origin}/auth/callback`,
            queryParams: {
                access_type: "offline",
                prompt: "consent",
            },
            // Ensure redirect flow (not popup) for better mobile compatibility
            skipBrowserRedirect: false,
        },
    });

    if (error) throw error;
    return data;
}

// Logout
export async function logout() {
    if (!supabase) throw new Error("Supabase is not configured");

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}

// Get current user
export async function getCurrentUser() {
    if (!supabase) return null;

    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();
    if (error) throw error;
    return session?.user ?? null;
}
