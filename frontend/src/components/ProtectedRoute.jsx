import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
    const location = useLocation();

    const localToken =
        localStorage.getItem("token");

    const sessionToken =
        sessionStorage.getItem("token");

    const token =
        localToken || sessionToken;

    if (!token) {
        const from =
            `${location.pathname}${location.search}${location.hash}`;

        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from,
                }}
            />
        );
    }

    return children;
}

export default ProtectedRoute;
