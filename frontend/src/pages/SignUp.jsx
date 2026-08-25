import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

function SignUp() {
    const [roles, setRoles] = useState([]);
    const [submitError, setSubmitError] = useState("");

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {
        const getRoles = async () => {
            try {
                const response = await api.get("/roles");

                setRoles(response.data);

                const customerRole = response.data.find(
                    (role) => role.code === "customer"
                );

                if (customerRole) {
                    setValue("role_id", String(customerRole.id));
                }
            } catch (error) {
                console.error("Roles could not be fetched:", error);
            }
        };

        getRoles();
    }, [setValue]);

    const selectedRole = watch("role_id");

    const selectedRoleData = roles.find(
        (role) => String(role.id) === String(selectedRole)
    );

    const isStore = selectedRoleData?.code === "store";

    const onSubmit = async (data) => {
        setSubmitError("");

        const { passwordValidation, ...formData } = data;

        formData.role_id = Number(formData.role_id);

        try {
            const response = await api.post("/signup", formData);

            console.log("Signup successful:", response.data);

            const message =
                "You need to click link in email to activate your account!";

            sessionStorage.setItem("signupMessage", message);

            /*
             * Placeholder warning.
             * Backend/frontend alert sistemi geldiğinde
             * burası gerçek warning/toast sistemiyle değiştirilebilir.
             */
            alert(message);

            navigate(-1);
        } catch (error) {
            console.error("Signup failed:", error);

            const message =
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Signup failed. Please try again.";

            setSubmitError(message);
        }
    };

    return (
        <div
            style={{
                maxWidth: "500px",
                margin: "40px auto",
                padding: "20px",
            }}
        >
            <h1>Sign Up</h1>

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

            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="name">Name</label>
                    <br />

                    <input
                        id="name"
                        type="text"
                        {...register("name", {
                            required: "Name is required",
                            minLength: {
                                value: 3,
                                message:
                                    "Name must be at least 3 characters",
                            },
                        })}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px",
                            boxSizing: "border-box",
                        }}
                    />

                    {errors.name && (
                        <p style={{ color: "red" }}>
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="email">Email</label>
                    <br />

                    <input
                        id="email"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Please enter a valid email",
                            },
                        })}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px",
                            boxSizing: "border-box",
                        }}
                    />

                    {errors.email && (
                        <p style={{ color: "red" }}>
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="password">Password</label>
                    <br />

                    <input
                        id="password"
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message:
                                    "Password must be at least 8 characters",
                            },
                            pattern: {
                                value:
                                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/,
                                message:
                                    "Password must include number, lowercase, uppercase and special character",
                            },
                        })}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px",
                            boxSizing: "border-box",
                        }}
                    />

                    {errors.password && (
                        <p style={{ color: "red" }}>
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="passwordValidation">
                        Password Validation
                    </label>
                    <br />

                    <input
                        id="passwordValidation"
                        type="password"
                        {...register("passwordValidation", {
                            required:
                                "Please confirm your password",
                            validate: (value, formValues) =>
                                value === formValues.password ||
                                "Passwords do not match",
                        })}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px",
                            boxSizing: "border-box",
                        }}
                    />

                    {errors.passwordValidation && (
                        <p style={{ color: "red" }}>
                            {errors.passwordValidation.message}
                        </p>
                    )}
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="role_id">Role</label>
                    <br />

                    <select
                        id="role_id"
                        {...register("role_id", {
                            required: "Role is required",
                        })}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px",
                            boxSizing: "border-box",
                        }}
                    >
                        {roles.map((role) => (
                            <option
                                key={role.id}
                                value={role.id}
                            >
                                {role.name}
                            </option>
                        ))}
                    </select>

                    {errors.role_id && (
                        <p style={{ color: "red" }}>
                            {errors.role_id.message}
                        </p>
                    )}
                </div>

                {isStore && (
                    <div>
                        <h2>Store Information</h2>

                        <div style={{ marginBottom: "15px" }}>
                            <label htmlFor="storeName">
                                Store Name
                            </label>
                            <br />

                            <input
                                id="storeName"
                                type="text"
                                {...register("store.name", {
                                    required:
                                        "Store name is required",
                                    minLength: {
                                        value: 3,
                                        message:
                                            "Store name must be at least 3 characters",
                                    },
                                })}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    marginTop: "5px",
                                    boxSizing: "border-box",
                                }}
                            />

                            {errors.store?.name && (
                                <p style={{ color: "red" }}>
                                    {errors.store.name.message}
                                </p>
                            )}
                        </div>

                        <div style={{ marginBottom: "15px" }}>
                            <label htmlFor="storePhone">
                                Store Phone
                            </label>
                            <br />

                            <input
                                id="storePhone"
                                type="tel"
                                placeholder="05551234567"
                                {...register("store.phone", {
                                    required:
                                        "Store phone is required",
                                    pattern: {
                                        value:
                                            /^(?:\+90|90|0)?5\d{9}$/,
                                        message:
                                            "Please enter a valid Türkiye phone number",
                                    },
                                })}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    marginTop: "5px",
                                    boxSizing: "border-box",
                                }}
                            />

                            {errors.store?.phone && (
                                <p style={{ color: "red" }}>
                                    {errors.store.phone.message}
                                </p>
                            )}
                        </div>

                        <div style={{ marginBottom: "15px" }}>
                            <label htmlFor="taxNo">
                                Store Tax ID
                            </label>
                            <br />

                            <input
                                id="taxNo"
                                type="text"
                                placeholder="T1234V123456"
                                {...register("store.tax_no", {
                                    required:
                                        "Tax ID is required",
                                    pattern: {
                                        value:
                                            /^T\d{4}V\d{6}$/,
                                        message:
                                            "Tax ID must be TXXXXVXXXXXX",
                                    },
                                })}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    marginTop: "5px",
                                    boxSizing: "border-box",
                                }}
                            />

                            {errors.store?.tax_no && (
                                <p style={{ color: "red" }}>
                                    {errors.store.tax_no.message}
                                </p>
                            )}
                        </div>

                        <div style={{ marginBottom: "15px" }}>
                            <label htmlFor="bankAccount">
                                Store Bank Account
                            </label>
                            <br />

                            <input
                                id="bankAccount"
                                type="text"
                                placeholder="TR000000000000000000000000"
                                {...register("store.bank_account", {
                                    required:
                                        "Bank account is required",
                                    pattern: {
                                        value:
                                            /^TR\d{24}$/,
                                        message:
                                            "Please enter a valid Turkish IBAN",
                                    },
                                })}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    marginTop: "5px",
                                    boxSizing: "border-box",
                                }}
                            />

                            {errors.store?.bank_account && (
                                <p style={{ color: "red" }}>
                                    {
                                        errors.store.bank_account
                                            .message
                                    }
                                </p>
                            )}
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        padding: "10px 20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        cursor: isSubmitting
                            ? "not-allowed"
                            : "pointer",
                        opacity: isSubmitting ? 0.7 : 1,
                    }}
                >
                    {isSubmitting && (
                        <span
                            style={{
                                width: "14px",
                                height: "14px",
                                border: "2px solid #ccc",
                                borderTop: "2px solid #333",
                                borderRadius: "50%",
                                display: "inline-block",
                                animation:
                                    "signup-spin 0.8s linear infinite",
                            }}
                        />
                    )}

                    {isSubmitting ? "Signing Up..." : "Sign Up"}
                </button>
            </form>

            <style>
                {`
                    @keyframes signup-spin {
                        from {
                            transform: rotate(0deg);
                        }
                        to {
                            transform: rotate(360deg);
                        }
                    }
                `}
            </style>
        </div>
    );
}

export default SignUp;
