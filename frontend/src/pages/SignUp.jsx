import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { signup } from "../api/auth";
import { getRoles } from "../redux/thunks/clientThunks";

function SignUp() {
    const [submitError, setSubmitError] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const roles = useSelector(
        (state) => state.client.roles || []
    );

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passwordValidation: "",
            role_id: "",
            store: {
                name: "",
                phone: "",
                tax_no: "",
                bank_account: "",
            },
        },
    });

    useEffect(() => {
        if (roles.length === 0) {
            dispatch(getRoles());
        }
    }, [dispatch, roles.length]);

    useEffect(() => {
        if (roles.length === 0) {
            return;
        }

        const customerRole = roles.find(
            (role) => role.code === "customer"
        );

        if (customerRole) {
            setValue(
                "role_id",
                String(customerRole.id)
            );
        }
    }, [roles, setValue]);

    const selectedRole = watch("role_id");

    const selectedRoleData = roles.find(
        (role) =>
            String(role.id) === String(selectedRole)
    );

    const isStore =
        selectedRoleData?.code === "store";

    const onSubmit = async (data) => {
        setSubmitError("");

        try {
            const {
                passwordValidation,
                ...formData
            } = data;

            formData.role_id = Number(
                formData.role_id
            );

            if (!isStore) {
                delete formData.store;
            }

            const response = await signup(formData);

            console.log(
                "Signup successful:",
                response.data
            );

            const message =
                "You need to click link in email to activate your account!";

            sessionStorage.setItem(
                "signupMessage",
                message
            );

            alert(message);

            navigate(-1);
        } catch (error) {
            console.error(
                "Signup failed:",
                error
            );

            const message =
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Signup failed. Please try again.";

            setSubmitError(message);
        }
    };

    const inputClass = (hasError) =>
        `w-full rounded-md border bg-white px-4 py-3 text-sm text-[#252b42] outline-none transition-colors placeholder:text-[#bdbdbd] ${hasError
            ? "border-red-400 focus:border-red-500"
            : "border-[#dddddd] focus:border-[#23a6f0]"
        }`;

    const errorClass =
        "mt-2 text-xs text-[#e74040]";

    return (
        <main className="min-h-[calc(100vh-82px)] bg-white px-6 py-16 font-['Montserrat',sans-serif]">
            <div className="mx-auto max-w-[1050px]">
                <div className="mx-auto max-w-[520px]">

                    {/* HEADER */}
                    <div className="mb-10 text-center">
                        <p className="mb-4 text-xs font-bold tracking-wide text-[#23a6f0]">
                            JOIN US
                        </p>

                        <h1 className="mb-4 text-[32px] font-bold leading-10 text-[#252b42] md:text-[40px] md:leading-[50px]">
                            Create your account
                        </h1>

                        <p className="mx-auto max-w-[420px] text-sm leading-6 text-[#737373]">
                            Create an account to discover products,
                            manage your orders and enjoy a better
                            shopping experience.
                        </p>
                    </div>

                    {/* FORM CARD */}
                    <div className="rounded-md border border-[#eeeeee] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] md:p-10">

                        {submitError && (
                            <div
                                role="alert"
                                className="mb-6 rounded-md border border-red-100 bg-red-50 px-4 py-3 text-sm leading-5 text-[#b00020]"
                            >
                                {submitError}
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-5"
                        >
                            {/* NAME */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-xs font-bold text-[#252b42]"
                                >
                                    Name
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Your name"
                                    autoComplete="name"
                                    disabled={isSubmitting}
                                    {...register("name", {
                                        required:
                                            "Name is required",
                                        minLength: {
                                            value: 3,
                                            message:
                                                "Name must be at least 3 characters",
                                        },
                                    })}
                                    className={inputClass(
                                        errors.name
                                    )}
                                />

                                {errors.name && (
                                    <p className={errorClass}>
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

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
                                    <p className={errorClass}>
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
                                    placeholder="Create a password"
                                    autoComplete="new-password"
                                    disabled={isSubmitting}
                                    {...register("password", {
                                        required:
                                            "Password is required",
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
                                    className={inputClass(
                                        errors.password
                                    )}
                                />

                                {errors.password && (
                                    <p className={errorClass}>
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* PASSWORD CONFIRMATION */}
                            <div>
                                <label
                                    htmlFor="passwordValidation"
                                    className="mb-2 block text-xs font-bold text-[#252b42]"
                                >
                                    Confirm Password
                                </label>

                                <input
                                    id="passwordValidation"
                                    type="password"
                                    placeholder="Repeat your password"
                                    autoComplete="new-password"
                                    disabled={isSubmitting}
                                    {...register(
                                        "passwordValidation",
                                        {
                                            required:
                                                "Please confirm your password",
                                            validate: (
                                                value,
                                                formValues
                                            ) =>
                                                value ===
                                                formValues.password ||
                                                "Passwords do not match",
                                        }
                                    )}
                                    className={inputClass(
                                        errors.passwordValidation
                                    )}
                                />

                                {errors.passwordValidation && (
                                    <p className={errorClass}>
                                        {
                                            errors
                                                .passwordValidation
                                                .message
                                        }
                                    </p>
                                )}
                            </div>

                            {/* ROLE */}
                            <div>
                                <label
                                    htmlFor="role_id"
                                    className="mb-2 block text-xs font-bold text-[#252b42]"
                                >
                                    Account Type
                                </label>

                                <select
                                    id="role_id"
                                    disabled={
                                        roles.length === 0 ||
                                        isSubmitting
                                    }
                                    {...register("role_id", {
                                        required:
                                            "Role is required",
                                    })}
                                    className={inputClass(
                                        errors.role_id
                                    )}
                                >
                                    <option value="">
                                        {roles.length === 0
                                            ? "Loading account types..."
                                            : "Select account type"}
                                    </option>

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
                                    <p className={errorClass}>
                                        {errors.role_id.message}
                                    </p>
                                )}
                            </div>

                            {/* STORE */}
                            {isStore && (
                                <div className="mt-2 border-t border-[#eeeeee] pt-6">
                                    <div className="mb-5">
                                        <h2 className="text-lg font-bold text-[#252b42]">
                                            Store Information
                                        </h2>

                                        <p className="mt-1 text-xs leading-5 text-[#737373]">
                                            Please provide your store
                                            details to continue.
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-5">

                                        {/* STORE NAME */}
                                        <div>
                                            <label
                                                htmlFor="storeName"
                                                className="mb-2 block text-xs font-bold"
                                            >
                                                Store Name
                                            </label>

                                            <input
                                                id="storeName"
                                                type="text"
                                                placeholder="Your store name"
                                                disabled={isSubmitting}
                                                {...register(
                                                    "store.name",
                                                    {
                                                        required:
                                                            "Store name is required",
                                                        minLength: {
                                                            value: 3,
                                                            message:
                                                                "Store name must be at least 3 characters",
                                                        },
                                                    }
                                                )}
                                                className={inputClass(
                                                    errors.store?.name
                                                )}
                                            />

                                            {errors.store?.name && (
                                                <p className={errorClass}>
                                                    {
                                                        errors
                                                            .store
                                                            .name
                                                            .message
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        {/* PHONE */}
                                        <div>
                                            <label
                                                htmlFor="storePhone"
                                                className="mb-2 block text-xs font-bold"
                                            >
                                                Store Phone
                                            </label>

                                            <input
                                                id="storePhone"
                                                type="tel"
                                                placeholder="05551234567"
                                                disabled={isSubmitting}
                                                {...register(
                                                    "store.phone",
                                                    {
                                                        required:
                                                            "Store phone is required",
                                                        pattern: {
                                                            value:
                                                                /^(?:\+90|90|0)?5\d{9}$/,
                                                            message:
                                                                "Please enter a valid Türkiye phone number",
                                                        },
                                                    }
                                                )}
                                                className={inputClass(
                                                    errors.store?.phone
                                                )}
                                            />

                                            {errors.store?.phone && (
                                                <p className={errorClass}>
                                                    {
                                                        errors
                                                            .store
                                                            .phone
                                                            .message
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        {/* TAX */}
                                        <div>
                                            <label
                                                htmlFor="taxNo"
                                                className="mb-2 block text-xs font-bold"
                                            >
                                                Store Tax ID
                                            </label>

                                            <input
                                                id="taxNo"
                                                type="text"
                                                placeholder="T1234V123456"
                                                disabled={isSubmitting}
                                                {...register(
                                                    "store.tax_no",
                                                    {
                                                        required:
                                                            "Tax ID is required",
                                                        pattern: {
                                                            value:
                                                                /^T\d{4}V\d{6}$/,
                                                            message:
                                                                "Tax ID must be TXXXXVXXXXXX",
                                                        },
                                                    }
                                                )}
                                                className={inputClass(
                                                    errors.store?.tax_no
                                                )}
                                            />

                                            {errors.store?.tax_no && (
                                                <p className={errorClass}>
                                                    {
                                                        errors
                                                            .store
                                                            .tax_no
                                                            .message
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        {/* IBAN */}
                                        <div>
                                            <label
                                                htmlFor="bankAccount"
                                                className="mb-2 block text-xs font-bold"
                                            >
                                                Store Bank Account
                                            </label>

                                            <input
                                                id="bankAccount"
                                                type="text"
                                                placeholder="TR000000000000000000000000"
                                                disabled={isSubmitting}
                                                {...register(
                                                    "store.bank_account",
                                                    {
                                                        required:
                                                            "Bank account is required",
                                                        validate: (
                                                            value
                                                        ) => {
                                                            const iban =
                                                                value
                                                                    .replace(
                                                                        /\s/g,
                                                                        ""
                                                                    )
                                                                    .toUpperCase();

                                                            return (
                                                                /^TR\d{24}$/.test(
                                                                    iban
                                                                ) ||
                                                                "Please enter a valid Turkish IBAN"
                                                            );
                                                        },
                                                    }
                                                )}
                                                className={inputClass(
                                                    errors.store
                                                        ?.bank_account
                                                )}
                                            />

                                            {errors.store
                                                ?.bank_account && (
                                                    <p className={errorClass}>
                                                        {
                                                            errors
                                                                .store
                                                                .bank_account
                                                                .message
                                                        }
                                                    </p>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* SUBMIT */}
                            <button
                                type="submit"
                                disabled={
                                    isSubmitting ||
                                    roles.length === 0
                                }
                                className="mt-2 flex min-h-12 items-center justify-center rounded-md bg-[#23a6f0] px-8 py-3 text-xs font-bold text-white transition-colors hover:bg-[#1d96dc] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSubmitting
                                    ? "Creating Account..."
                                    : "Sign Up"}
                            </button>
                        </form>

                        {/* LOGIN LINK */}
                        <p className="mt-6 text-center text-sm text-[#737373]">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-bold text-[#23a6f0] hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SignUp;
