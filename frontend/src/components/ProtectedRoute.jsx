import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function ProtectedRoute({ children }) {
    const location = useLocation();
    const { t } = useTranslation();

    const authChecked = useSelector(
        (state) =>
            state.client?.authChecked
    );

    const user = useSelector(
        (state) =>
            state.client?.user
    );

    /*
     * Uygulama açılırken verify tamamlanmadan
     * redirect yapma.
     */
    if (!authChecked) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center bg-white">
                <p className="text-sm font-bold text-[#737373]">
                    {t("common.loading")}
                </p>
            </div>
        );
    }

    const localToken =
        localStorage.getItem("token");

    const sessionToken =
        sessionStorage.getItem("token");

    const token =
        localToken || sessionToken;

    /*
     * Token yoksa login'e gönder.
     */
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

    /*
     * Verify başarılı olmasına rağmen user yoksa
     * güvenlik amacıyla login'e gönder.
     */
    if (
        !user ||
        Object.keys(user).length === 0
    ) {
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
