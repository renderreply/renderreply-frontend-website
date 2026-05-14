import axios from 'axios';

// Use relative URL so Next.js proxy handles it (no CORS issues)
const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    // Browser: use relative path → goes through Next.js proxy rewrite
    return '/api';
  }
  // Server-side: call Railway backend directly
  return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api`;
};

export const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Session expired. Redirecting to login.');
      // Clear next-auth cookies if possible from client
      document.cookie = "next-auth.session-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "__Secure-next-auth.session-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
      // Redirect with reason
      if (typeof window !== 'undefined') {
        window.location.href = '/login?reason=session_expired';
      }
    }
    return Promise.reject(error);
  }
);
