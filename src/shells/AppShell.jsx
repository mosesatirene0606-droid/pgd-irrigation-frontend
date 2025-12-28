import { AnimatePresence, motion } from "framer-motion";

import Layout from "../components/Layout";
import RequireAuth from "../components/RequireAuth";
import RequireAdmin from "../components/RequireAdmin";

// ===================== PAGES =====================
import Dashboard from "../pages/Dashboard";
import WeatherForm from "../pages/WeatherForm";
import CropForm from "../pages/CropForm";
import ResultsPage from "../pages/ResultsPage";
import SettingsPage from "../pages/SettingsPage";
import AdminView from "../pages/AdminView";
import BackendConsole from "../pages/BackendConsole";
import DatabaseDiagram from "../pages/DatabaseDiagram";
import NewEstimationPage from "../pages/NewEstimationPage";
import ErrorScreen from "../pages/ErrorScreen";

// ===================== SCREEN MAP =====================
const SCREENS = {
  dashboard: Dashboard,
  weather: WeatherForm,
  crop: CropForm,
  results: ResultsPage,
  settings: SettingsPage,
  console: BackendConsole,
  db: DatabaseDiagram,
  "new-estimation": NewEstimationPage,
};

export default function AppShell({ screen, setScreen, errorConfig }) {
  const ScreenComponent = SCREENS[screen];

  return (
    <Layout screen={screen} setScreen={setScreen}>
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="h-full">
          {/* NORMAL SCREENS */}
          {ScreenComponent && screen !== "admin" && screen !== "error" && (
            <ScreenComponent setScreen={setScreen} />
          )}

          {/* ADMIN SCREEN */}
          {screen === "admin" && (
            <RequireAuth setScreen={setScreen}>
              <RequireAdmin>
                <AdminView />
              </RequireAdmin>
            </RequireAuth>
          )}

          {/* ERROR SCREEN */}
          {screen === "error" && errorConfig && (
            <ErrorScreen
              {...errorConfig}
              onAction={() => setScreen(errorConfig.nextScreen)}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}
