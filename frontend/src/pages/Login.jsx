import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login } from "../api/auth";
import { setUser } from "../redux/actions/clientActions";

function Login() {
    const [submitError, setSubmitError] =
        useState("");

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
        },
    });

    const onSubmit = async (data) => {
        setSubmitError("");

        try {
            const response = await login(data);
            const responseData = response.data;

            const token =
                responseData.token ||
                responseData.accessToken ||
                responseData.access;

            if (!token) {
                throw new Error(
                    "Login response does not contain a token."
                );
            }

            localStorage.setItem(
                "token",
                token
            );

            if (responseData.user) {
                dispatch(
                    setUser(responseData.user)
                );
            }

            const from =
                location.state?.from ||
                "/";

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
                "Login failed. Please try again.";

            setSubmitError(message);
        }
    };

    return (
        <main
            style={{
                maxWidth: "500px",
                margin: "40px auto",
                padding: "20px",
            }}
        >
            <h1>Login</h1>

            {submitError && (
                <div
                    style={{
                        color: "#b00020",
                        backgroundColor: "#ffe5e5",
                        padding: "10px",
                        marginBottom: "20px",
                        borderRadius: "4px",
                    }}
                >
                    {submitError}
                </div>
            )}

            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <div
                    style={{
                        marginBottom: "15px",
                    }}
                >
                    <label htmlFor="email">
                        Email
                    </label>

                    <br />

                    <input
                        id="email"
                        type="email"
                        {...register("email", {
                            required:
                                "Email is required",
                        })}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px",
                            boxSizing:
                                "border-box",
                        }}
                    />

                    {errors.email && (
                        <p
                            style={{
                                color: "red",
                            }}
                        >
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div
                    style={{
                        marginBottom: "15px",
                    }}
                >
                    <label htmlFor="password">
                        Password
                    </label>

                    <br />

                    <input
                        id="password"
                        type="password"
                        {...register("password", {
                            required:
                                "Password is required",
                        })}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px",
                            boxSizing:
                                "border-box",
                        }}
                    />

                    {errors.password && (
                        <p
                            style={{
                                color: "red",
                            }}
                        >
                            {
                                errors.password
                                    .message
                            }
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        padding: "10px 20px",
                    }}
                >
                    {isSubmitting
                        ? "Logging in..."
                        : "Login"}
                </button>
            </form>
        </main>
    );
}

export default Login;
