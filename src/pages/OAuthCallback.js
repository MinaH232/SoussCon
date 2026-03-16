// src/pages/OAuthCallback.js
import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const OAuthCallback = () => {
    const { socialLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const [processText, setProcessText] = useState("Authenticating...");

    useEffect(() => {
        const handleCallback = () => {
            const pendingProvider = localStorage.getItem("oauth_pending_provider");
            if (!pendingProvider) {
                // If accessed directly without intent, act normally.
                if (window.opener) window.close();
                else navigate("/");
                return;
            }

            // Small delay to simulate processing the OAuth code
            setTimeout(() => {
                setProcessText(`Finalizing ${pendingProvider} Login...`);
                setTimeout(() => {
                    const result = socialLogin(pendingProvider);
                    localStorage.removeItem("oauth_pending_provider");

                    if (window.opener) {
                        // Send success/failure message back to original window and close
                        window.opener.postMessage(result.success ? "oauth-success" : "oauth-failure", window.location.origin);
                        window.close();
                    } else {
                        // Fallback in case popup was blocked and opened as a normal tab
                        if (result.success) navigate("/");
                        else {
                            alert("Social login verification failed.");
                            navigate("/login");
                        }
                    }
                }, 1000);
            }, 1000);
        };

        handleCallback();
    }, [navigate, socialLogin]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', textAlign: 'center' }}>
            <div>
                <h2>{processText}</h2>
                <p>Please wait while we verify your credentials with the provider.</p>
            </div>
        </div>
    );
};

export default OAuthCallback;
