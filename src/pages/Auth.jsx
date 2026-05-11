import { GoogleOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AuthForm = () => {
  const { loginWithGoogle, isAuthenticated } = useAuth();
  const navigate = useNavigate();  
  const from = "/dashboard";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, from, navigate]);

  const handleGoogleAuth = () => {
    loginWithGoogle();
  };

  return (
    <button
      onClick={handleGoogleAuth}
      className="flex items-center justify-center gap-3 w-full
                   text-white font-medium               
                   h-10 min-w-[240px] 
                   transition"
    >
      <GoogleOutlined style={{ fontSize: 20, color: "#4285F4" }} />
      <span
        className="text-sm cursor-pointer"
        style={{ textShadow: "1px 1px 2px #1f2937" }}
      >
        Continue with Google
      </span>

    </button>
  );
};

export default AuthForm;
