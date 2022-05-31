import { useEffect } from "react";
import {
  Navigate,
  Route, Routes
} from "react-router-dom";
import './App.css';
import { HomePage } from './pages';
import LoginPage from "./pages/login";

function App() {

  let clevertap = window.clevertap
  useEffect(() => {
    clevertap.notifications.push({
      "apnsWebPushId": "<apple web push id>", //only for safari browser
      "apnsWebPushServiceUrl": "<safari package service url>",//only for safari browser
      "titleText": 'Would you like to receive Push Notifications?',
      "bodyText": 'We promise to only send you relevant content and give you updates on your transactions',
      "okButtonText": 'Sign me up!',
      "rejectButtonText": 'No thanks',
      "okButtonColor": '#f28046',
      "serviceWorkerPath": "./firebase-messaging-sw.js"
    });
  }, [clevertap])

  return (
    <div className="App h-screen">
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/home" element={<HomePage clevertap={clevertap} />}></Route>
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </Routes>
    </div>
  );
}

export default App;
