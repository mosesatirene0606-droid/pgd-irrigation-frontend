import { useEffect, useState } from "react";
import AuthFlow from "./flows/AuthFlow";
import AppShell from "./shells/AppShell";

export default function PGDMockups() {
  const [screen, setScreen] = useState("login");
  const [authDirection, setAuthDirection] = useState(1);
  const [errorConfig, setErrorConfig] = useState(null);

  const isAuthScreen = screen === "login" || screen === "register";

  // ===================== GLOBAL ERROR HANDLER =====================
  useEffect(() => {
    const handler = async (event) => {
      const detail = event.detail || {};

      const config = {
        title: detail.title || "Oops!",
        message:
          detail.message || "Something went wrong. Please try again later.",
        actionLabel: detail.actionLabel || "Go Back",
        nextScreen: detail.nextScreen || "dashboard",
      };

      setErrorConfig(config);
      setScreen("error");

      try {
        await fetch(
          `${import.meta.env.VITE_API_URL}/api/notifications/frontend-error`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: config.title,
              message: config.message,
              source: "frontend",
            }),
          }
        );
      } catch {
        console.warn("Failed to log frontend error");
      }
    };

    window.addEventListener("app-error", handler);
    return () => window.removeEventListener("app-error", handler);
  }, []);

  return (
    <>
      {/* AUTH */}
      <AuthFlow
        screen={screen}
        setScreen={setScreen}
        authDirection={authDirection}
        setAuthDirection={setAuthDirection}
      />

      {/* APP */}
      {!isAuthScreen && (
        <AppShell
          screen={screen}
          setScreen={setScreen}
          errorConfig={errorConfig}
        />
      )}
    </>
  );
}
