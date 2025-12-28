import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({ screen, setScreen, children }) {
  const isAuthScreen = screen === "login" || screen === "register";

  const screenTitleMap = {
    dashboard: "Dashboard",
    weather: "Weather Data",
    crop: "Crop Profile",
    results: "Irrigation Results",
    settings: "Settings",
    admin: "Admin Dashboard",
    console: "Backend Console",
    db: "Database Diagram",
    error: "Errors",
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {!isAuthScreen && <Sidebar screen={screen} setScreen={setScreen} />}

      <div className="flex-1 flex flex-col">
        {!isAuthScreen && <Header title={screenTitleMap[screen]} />}

        <main
          className={`
            flex-1 overflow-y-auto
            ${
              isAuthScreen
                ? "flex items-center justify-center p-6"
                : "p-6 pt-24"
            }
          `}>
          {children}
        </main>
      </div>
    </div>
  );
}
