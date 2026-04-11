import { NotFoundPage } from '@/pages/NotFoundPage';
import { MyReservationsPage } from '@/pages/my/MyReservationsPage';
import { ReservationAddPage } from '@/pages/reservations/ReservationAddPage';
import { ReservationDetailPage } from '@/pages/reservations/ReservationDetailPage';
import { MainPage } from '@/pages/MainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/reservations/new" element={<ReservationAddPage />} />
        <Route path="/reservations/:id" element={<ReservationDetailPage />} />
        <Route path="/my-reservations" element={<MyReservationsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
