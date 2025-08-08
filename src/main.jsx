import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip'
import Header from './components/custom/Header'
import { Toaster } from './components/ui/sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './view-trip/[tripId]'
import MyTrip from './my-trip'
import { DarkModeProvider } from "./context/DarkModeContext";
import Flights from './pages/Flights'
import PackingList from './pages/PackingList'
import Scrapbook from './pages/Scrapbook'
import Home from './components/custom/Home'
import FAQs from './components/custom/FAQs'
import AboutUs from './components/custom/AboutUs'
import BudgetTracking from './pages/BudgetTracking'



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/create-trip',
    element: <CreateTrip />
  },
  {
    path: '/view-trip/:tripId',
    element: <ViewTrip />
  },
  {
    path: '/my-trip',
    element: <MyTrip />
  },
   {
    path: "/flights",
    element: <Flights />
   },
   {
    path: "/packing-list",
    element: <PackingList />
   },
   {
    path: "/home",
    element: <Home />
   },
   {
    path: "/faqs",
    element: <FAQs />
   },
   {
    path: "/about-us",
    element: <AboutUs />
   },
   {
    path: "/budgetTracking",
    element: <BudgetTracking />
   },
   {
    path: "/scrapbook",
    element: <Scrapbook />
   }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DarkModeProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
        <Header />
        <Toaster />
        <RouterProvider router={router} />
      </GoogleOAuthProvider>;
    </DarkModeProvider>
  </StrictMode>,
)
