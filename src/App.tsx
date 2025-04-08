import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAtomValue } from "jotai";
import { onboardingCompleteAtom } from "./lib/store";
import Onboarding from "./Pages/Onboarding";
import CalendarView from "./Pages/CalendarView";
import Navbar from "./components/Navbar";
import { useState } from "react";
import PomodoroWidget from "./widgets/Pomodoro";
import YouTubeWidget from "./widgets/YoutubeWidget";
import SpotifyWidget from "./widgets/Spotify";
import ExcalidrawWidget from "./widgets/Excalidraw";
import LandingPage from "./Pages/Home";

export default function App() {
  const onboardingComplete = useAtomValue(onboardingCompleteAtom);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const location = useLocation();

  return (
    <>
      {/* Show Navbar on all pages except onboarding */}
      {!["/", "/home", "/onboarding"].includes(location.pathname) && (
        <Navbar activeTool={activeTool} setActiveTool={setActiveTool} />
      )}

      <Routes>
        {/* Always allow landing page */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />

        {/* Onboarding flow */}
        {!onboardingComplete ? (
          <>
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/calendar" element={<Navigate to="/onboarding" />} />
          </>
        ) : (
          <>
            <Route path="/onboarding" element={<Navigate to="/calendar" />} />
            <Route path="/calendar" element={<CalendarView />} />
          </>
        )}

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Global floating widgets */}
      {activeTool === "pomodoro" && <PomodoroWidget />}
      {activeTool === "spotify" && <SpotifyWidget />}
      {activeTool === "youtube" && <YouTubeWidget />}
      {activeTool === "notebook" && <ExcalidrawWidget />}
    </>
  );
}
