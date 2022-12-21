import { ColorModeContext, useMode } from "./theme";
import Topbar from "./screens/global/Topbar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Sidebar from "./screens/global/Sidebar";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./screens/dashboard/Dashboard";
import { useEffect, useState } from "react";
import UserCalendar from "./screens/calendar/Calendar";
import BarChart from "./components/BarChart";
import Bar from "./screens/barChart/bar";
import Pie from "./screens/pieChart/pie";
import BookingForm from "./screens/form/reservation/bookingForm";
import ClientForm from "./screens/form/client/clientForm";
import StylishForm from "./screens/form/stylish/stylishForm";
import Clients from "./screens/grid/clients/Clients";
import Reservations from "./screens/grid/reservations/Reservations";
import SalonTeam from "./screens/grid/salonTeam/Stylish";
import Admin from "./screens/grid/admin/Admin";
import Register from "./Register/Register";
import Login from "./Login/Login";
import UpdateReservationForm from "./screens/form/reservation/UpdateReservationForm";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [adminDetails, setAdminDetails] = useState({});

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('admin'));
  }


  useEffect(() => {
    const admin = getCurrentUser();
    if (admin) {
      setIsLogin(true);
      setAdminDetails(admin);
    }
  }, [])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {!isLogin && <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
        }
        {isLogin &&
          <div className="app">
            <Sidebar isSidebar={isSidebar} adminDetails={adminDetails} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/team" element={<SalonTeam />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/bookingForm" element={<BookingForm />} />
                <Route path="/editBookingForm/:id" element={<UpdateReservationForm />} />
                <Route path="/clientForm" element={<ClientForm />} />
                <Route path="/stylishForm" element={<StylishForm />} />
                <Route path="/calendar" element={<UserCalendar />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                {/* <Route path="/" element={<Navigate to="/dashboard" />} /> */}
              </Routes>
            </main>
          </div>
        }
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

export default App;
