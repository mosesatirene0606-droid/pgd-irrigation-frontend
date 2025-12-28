import { AnimatePresence, motion } from "framer-motion";
import AuthShell from "../components/ui/AuthShell";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const authVariants = {
  initial: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 60 : -60,
    scale: 0.96,
  }),
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -60 : 60,
    scale: 0.96,
    transition: { duration: 0.35, ease: "easeIn" },
  }),
};

export default function AuthFlow({
  screen,
  setScreen,
  authDirection,
  setAuthDirection,
}) {
  const isAuthScreen = screen === "login" || screen === "register";

  if (!isAuthScreen) return null;

  return (
    <AnimatePresence mode="wait" custom={authDirection}>
      <motion.div
        key={screen}
        custom={authDirection}
        variants={authVariants}
        initial="initial"
        animate="animate"
        exit="exit">
        <AuthShell>
          {screen === "login" && (
            <LoginPage
              setScreen={setScreen}
              setAuthDirection={setAuthDirection}
            />
          )}

          {screen === "register" && (
            <RegisterPage
              setScreen={setScreen}
              setAuthDirection={setAuthDirection}
            />
          )}
        </AuthShell>
      </motion.div>
    </AnimatePresence>
  );
}
