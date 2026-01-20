import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import apiClient from '../api/apiClient';

// Named export (and default) so imports like `import { useAuth }` work.
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const { setUser, setIsAuthenticated } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await apiClient.get('/auth/check');
                setUser(response.data.user);
                setIsAuthenticated(true);
            } catch (error) {
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [setUser, setIsAuthenticated]);

    const login = async (credentials) => {
        const response = await apiClient.post('/auth/login', credentials);
        setUser(response.data.user);
        setIsAuthenticated(true);
    };

    const logout = async () => {
        await apiClient.post('/auth/logout');
        setUser(null);
        setIsAuthenticated(false);
    };

    return { loading, login, logout };
};

export default AuthProvider;