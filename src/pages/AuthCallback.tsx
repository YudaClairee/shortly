import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "@/db/supabase";

/**
 * Dedicated OAuth callback page
 * Wait for session to be established before redirecting
 */
function AuthCallback() {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleCallback = async () => {
            try {
                if (!supabase) {
                    setError("Supabase tidak terkonfigurasi dengan benar.");
                    setTimeout(
                        () => navigate("/auth", { replace: true }),
                        2000,
                    );
                    return;
                }
                // Wait for Supabase to process the auth hash/code
                const {
                    data: { session },
                    error: sessionError,
                } = await supabase.auth.getSession();

                if (sessionError) {
                    console.error("Session error:", sessionError);
                    setError("Gagal menyelesaikan login. Silakan coba lagi.");
                    // Redirect to auth page after 2 seconds
                    setTimeout(
                        () => navigate("/auth", { replace: true }),
                        2000,
                    );
                    return;
                }

                if (session) {
                    // Session confirmed, clean URL and redirect
                    const cleanPath = window.location.pathname.replace(
                        "/auth/callback",
                        "/dashboard",
                    );
                    window.history.replaceState(null, "", cleanPath);
                    navigate("/dashboard", { replace: true });
                } else {
                    // No session found
                    console.warn("No session after callback");
                    setError("Tidak dapat menemukan sesi. Silakan coba lagi.");
                    setTimeout(
                        () => navigate("/auth", { replace: true }),
                        2000,
                    );
                }
            } catch (err) {
                console.error("Callback error:", err);
                setError("Terjadi kesalahan. Silakan coba lagi.");
                setTimeout(() => navigate("/auth", { replace: true }), 2000);
            }
        };

        handleCallback();
    }, [navigate]);

    // Show loading state or error
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center space-y-4">
                {error ? (
                    <>
                        <div className="text-red-500 text-lg">❌</div>
                        <p className="text-red-500">{error}</p>
                        <p className="text-sm text-muted-foreground">
                            Mengalihkan kembali...
                        </p>
                    </>
                ) : (
                    <>
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="text-muted-foreground">
                            Menyelesaikan login...
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

export default AuthCallback;
