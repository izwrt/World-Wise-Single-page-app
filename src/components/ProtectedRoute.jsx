import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/FakeAuthContext';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const {isAuthenticated} = useAuth();

    useEffect(
        function() {
            if (!isAuthenticated) navigate("/")
        },[navigate,isAuthenticated])

  return isAuthenticated ? children : null
}

export default ProtectedRoute
