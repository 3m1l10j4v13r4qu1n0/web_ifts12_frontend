import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import { AuthProvider } from './contexts/AuthContext';
import AppRouter from './routes/AppRouter';

const queryClient = new QueryClient();

/**
 * Las rutas `/admin*` usan su propio layout (AdminLayout: franja de marca y pie
 * del panel, Figma A1), sin el header ni el footer público del sitio.
 */
function Contenido() {
  const { pathname } = useLocation();

  if (pathname.startsWith('/admin')) {
    return <AppRouter />;
  }

  return (
    <>
      <Header />
      <AppRouter />
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Contenido />
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
