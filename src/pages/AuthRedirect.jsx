import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthRedirect = () => {
  const navigate = useNavigate();
  const { handleTokenLogin } = useAuth();

  useEffect(() => {
    const run = async () => {
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get('accessToken');
      const refreshToken = params.get('refreshToken');
      const error = params.get('error');

      if (error || !accessToken) {
        navigate('/', { replace: true });
        return;
      }

      await handleTokenLogin(accessToken, refreshToken);
      navigate('/dashboard', { replace: true });
    };

    run();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050510]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500" />
    </div>
  );
};

export default AuthRedirect;
