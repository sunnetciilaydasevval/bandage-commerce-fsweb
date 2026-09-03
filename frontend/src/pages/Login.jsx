import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { loginUser } from "../redux/thunks/clientThunks";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    const onSubmit = async (data) => {
        try {
            await dispatch(
                loginUser(
                    {
                        email: data.email,
                        password: data.password,
                    },
                    data.rememberMe
                )
            );

            toast.success(
                "Login successful!"
            );

            /*
             * ProtectedRoute tarafından login'e gönderilen
             * önceki sayfayı kullanıyoruz.
             *
             * pathname + search birlikte tutulduğu için
             * query parametreleri de kaybolmaz.
             */
            const from =
                location.state?.from || "/";

            navigate(from, {
                replace: true,
            });
        } catch (error) {
            console.error(
                "Login failed:",
                error
            );

            const message =
                error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                "Login failed. Please check your email and password.";

            toast.error(message);
        }
    };

    const inputClass = (hasError) =>
        `w-full rounded-md border bg-white px-4 py-3 text-sm text-[#252b42] outline-none transition-colors placeholder:text-[#bdbdbd] ${hasError
            ? "border-red-400 focus:border-red-500"
            : "border-[#dddddd] focus:border-[#23a6f0]"
        }`;

    return (
        <main className="min-h-[calc(100vh-82px)] bg-white px-6 py-16 font-['Montserrat',sans-serif]">
            <div className="mx-auto max-w-[1050px]">
                <div className="mx-auto max-w-[520px]">

                    {/* HEADER */}
                    <div className="mb-10 text-center">
                        <p className="mb-4 text-xs font-bold tracking-wide text-[#23a6f0]">
                            WELCOME BACK
                        </p>

                        <h1 className="mb-4 text-[32px] font-bold leading-10 text-[#252b42] md:text-[40px] md:leading-[50px]">
                            Login to your account
                        </h1>

                        <p className="mx-auto max-w-[400px] text-sm leading-6 text-[#737373]">
                            Welcome back. Sign in to continue
                            shopping and manage your account.
                        </p>
                    </div>

                    {/* FORM CARD */}
                    <div className="rounded-md border border-[#eeeeee] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] md:p-10">

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-5"
                        >

                            {/* EMAIL */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-xs font-bold text-[#252b42]"
                                >
                                    Email
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Your email"
                                    autoComplete="email"
                                    disabled={isSubmitting}
                                    {...register("email", {
                                        required:
                                            "Email is required",
                                        pattern: {
                                            value:
                                                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message:
                                                "Please enter a valid email",
                                        },
                                    })}
                                    className={inputClass(
                                        errors.email
                                    )}
                                />

                                {errors.email && (
                                    <p className="mt-2 text-xs text-[#e74040]">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* PASSWORD */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-xs font-bold text-[#252b42]"
                                >
                                    Password
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Your password"
                                    autoComplete="current-password"
                                    disabled={isSubmitting}
                                    {...register("password", {
                                        required:
                                            "Password is required",
                                    })}
                                    className={inputClass(
                                        errors.password
                                    )}
                                />

                                {errors.password && (
                                    <p className="mt-2 text-xs text-[#e74040]">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* OPTIONS */}
                            <div className="flex items-center justify-between text-xs">

                                <label className="flex cursor-pointer items-center gap-2 text-[#737373]">
                                    <input
                                        type="checkbox"
                                        disabled={isSubmitting}
                                        {...register(
                                            "rememberMe"
                                        )}
                                        className="h-4 w-4 accent-[#23a6f0]"
                                    />

                                    Remember me
                                </label>

                                <button
                                    type="button"
                                    onClick={() =>
                                        toast.info(
                                            "Forgot password is not available yet."
                                        )
                                    }
                                    className="font-bold text-[#23a6f0] hover:underline"
                                >
                                    Forgot password?
                                </button>

                            </div>

                            {/* SUBMIT */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="mt-2 flex min-h-12 items-center justify-center rounded-md bg-[#23a6f0] px-8 py-3 text-xs font-bold text-white transition-colors hover:bg-[#1d96dc] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSubmitting
                                    ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> Logging in...</>
                                    : "Login"}
                            </button>

                        </form>

                        {/* SIGNUP */}
                        <p className="mt-6 text-center text-sm text-[#737373]">
                            Don't have an account?{" "}

                            <Link
                                to="/signup"
                                className="font-bold text-[#23a6f0] hover:underline"
                            >
                                Sign Up
                            </Link>
                        </p>

                    </div>
                </div>
            </div>
        </main>
    );
}

export default Login;