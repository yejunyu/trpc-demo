import { useState } from "react";
import NewsHomePage from "@/components/NewsHomePage";
import EventDetailPage from "@/components/EventDetailPage";
import { type NewsEvent } from "@/data/mockNews";

function App() {
  const [currentView, setCurrentView] = useState<"home" | "detail">("home");
  const [selectedEvent, setSelectedEvent] = useState<NewsEvent | null>(null);

  const handleEventClick = (event: NewsEvent) => {
    setSelectedEvent(event);
    setCurrentView("detail");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    setSelectedEvent(null);
  };

  return (
    <div className="app">
      {currentView === "home" ? (
        <NewsHomePage onEventClick={handleEventClick} />
      ) : (
        selectedEvent && (
          <EventDetailPage event={selectedEvent} onBack={handleBackToHome} />
        )
      )}
    </div>
  );
}

export default App;
