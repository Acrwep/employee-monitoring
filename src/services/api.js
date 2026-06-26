import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const AccessToken = localStorage.getItem("AccessToken");
        // const AccessToken =
        //   "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF6aGFyQGV4YW1wbGUuY29tIiwidXNlcklkIjoxMDA0LCJyb2xlIjoiQURNSU4iLCJzdWIiOjEwMDQsIm5iZiI6MTcyMjIzMzE1MS4wLCJpYXQiOjE3MjIyMzMxNTEuMCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo0NDMwMC8iLCJhdWQiOiJzZWN1cmVhcGl1c2VyIiwiZXhwIjoxNzIyMzE5NTUxLjB9.hlN8tu-TXh2lqS9PpMrhyKB0pHVZwV7cjK61hJq_JFE";
        if (AccessToken) {
            //   const expired = isTokenExpired(AccessToken);
            //   if (expired === true) {
            //     ShowModal();
            //     return Promise.reject(new Error("Token is expired"));
            //   }
            config.headers.Authorization = `Bearer ${AccessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export const getAppUsage = async (payload) => {
    return await api.post(`/api/app-usage`, payload);
};

export const getMessages = async (payload) => {
    return await api.post(`/api/messages`, payload);
};

export const getNotifications = async (payload) => {
    return await api.post(`/api/notifications`, payload);
};

export const getCallLogs = async (payload) => {
    return await api.post(`/api/call-logs`, payload);
};

export const getUsers = async () => {
    return await api.get(`/api/users`);
};

export const getWhatsappChatLogs = async (payload) => {
    return await api.post('/api/whatsapp-chat-logs', payload);
}

export const getWhatsappCallLogs = async (payload) => {
    return await api.post('/api/whatsapp-call-logs', payload);
};

export const login = async (payload) => {
    return await api.post('/api/login', payload);
}
