import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MenuPage } from '@/pages/MenuPage';
import { DetailPage } from '@/pages/DetailPage';
import { CartPage } from '@/pages/CartPage';
import { OrderCompletePage } from '@/pages/OrderCompletePage';
import { Toast } from '@/shared/components/Toast';
import '@/styles/global.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/menu/:itemId" element={<DetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders/:orderId" element={<OrderCompletePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Toast />
    </QueryClientProvider>
  );
}

export default App;
