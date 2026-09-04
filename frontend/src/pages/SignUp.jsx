import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { signup } from "../api/auth";
import { getRoles } from "../redux/thunks/clientThunks";

function SignUp() {
    const { t } = useTranslation();
    const [submitError, setSubmitError] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
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
            const formData = { ...data };
            delete formData.passwordValidation;

            formData.role_id = Number(
                formData.role_id
            );

            if (!isStore) {
                delete formData.store;
            }

            await signup(formData);

            const message = t("signup.activationMessage");

            toast.success(message);
            navigate(
                location.state?.from || "/",
                { replace: true }
            );
        } catch (error) {
            console.error(
                "Signup failed:",
                error
            );

            const message =
                error.response?.data?.message ||
                error.response?.data?.error ||
                t("signup.signupFailed");

            setSubmitError(message);
            toast.error(message);
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
                            {t("signup.eyebrow")}
                        </p>

                        <h1 className="mb-4 text-[32px] font-bold leading-10 text-[#252b42] md:text-[40px] md:leading-[50px]">
                            {t("signup.title")}
                        </h1>

                        <p className="mx-auto max-w-[420px] text-sm leading-6 text-[#737373]">
                            {t("signup.description")}
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
                                    {t("signup.name")}
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    placeholder={t("signup.yourName")}
                                    autoComplete="name"
                                    disabled={isSubmitting}
                                    {...register("name", {
                                        required:
                                            t("validation.nameRequired"),
                                        minLength: {
                                            value: 3,
                                            message:
                                                t("validation.nameMinLength"),
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
                                    {t("signup.email")}
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    placeholder={t("signup.yourEmail")}
                                    autoComplete="email"
                                    disabled={isSubmitting}
                                    {...register("email", {
                                        required:
                                            t("validation.emailRequired"),
                                        pattern: {
                                            value:
                                                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message:
                                                t("validation.invalidEmail"),
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
                                    {t("signup.password")}
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    placeholder={t("signup.createPassword")}
                                    autoComplete="new-password"
                                    disabled={isSubmitting}
                                    {...register("password", {
                                        required:
                                            t("validation.passwordRequired"),
                                        minLength: {
                                            value: 8,
                                            message:
                                                t("validation.passwordMinLength"),
                                        },
                                        pattern: {
                                            value:
                                                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/,
                                            message:
                                                t("validation.passwordComplexity"),
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
                                    {t("signup.confirmPassword")}
                                </label>

                                <input
                                    id="passwordValidation"
                                    type="password"
                                    placeholder={t("signup.repeatPassword")}
                                    autoComplete="new-password"
                                    disabled={isSubmitting}
                                    {...register(
                                        "passwordValidation",
                                        {
                                            required:
                                                t("validation.confirmPasswordRequired"),
                                            validate: (
                                                value,
                                                formValues
                                            ) =>
                                                value ===
                                                formValues.password ||
                                                t("validation.passwordsDoNotMatch"),
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
                                    {t("signup.accountType")}
                                </label>

                                <select
                                    id="role_id"
                                    disabled={
                                        roles.length === 0 ||
                                        isSubmitting
                                    }
                                    {...register("role_id", {
                                        required:
                                            t("validation.roleRequired"),
                                    })}
                                    className={inputClass(
                                        errors.role_id
                                    )}
                                >
                                    <option value="">
                                        {roles.length === 0
                                            ? t("signup.loadingAccountTypes")
                                            : t("signup.selectAccountType")}
                                    </option>

                                    {roles.map((role) => (
                                        <option
                                            key={role.id}
                                            value={role.id}
                                        >
                                            {t(`roles.${role.code}`)}
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
                                            {t("signup.storeInformation")}
                                        </h2>

                                        <p className="mt-1 text-xs leading-5 text-[#737373]">
                                            {t("signup.storeDescription")}
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-5">

                                        {/* STORE NAME */}
                                        <div>
                                            <label
                                                htmlFor="storeName"
                                                className="mb-2 block text-xs font-bold"
                                            >
                                                {t("signup.storeName")}
                                            </label>

                                            <input
                                                id="storeName"
                                                type="text"
                                                placeholder={t("signup.yourStoreName")}
                                                disabled={isSubmitting}
                                                {...register(
                                                    "store.name",
                                                    {
                                                        required:
                                                            t("validation.storeNameRequired"),
                                                        minLength: {
                                                            value: 3,
                                                            message:
                                                                t("validation.storeNameMinLength"),
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
                                                {t("signup.storePhone")}
                                            </label>

                                            <input
                                                id="storePhone"
                                                type="tel"
                                                placeholder={t("signup.storePhonePlaceholder")}
                                                disabled={isSubmitting}
                                                {...register(
                                                    "store.phone",
                                                    {
                                                        required:
                                                            t("validation.storePhoneRequired"),
                                                        pattern: {
                                                            value:
                                                                /^(?:\+90|90|0)?5\d{9}$/,
                                                            message:
                                                                t("validation.invalidTurkishPhone"),
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
                                                {t("signup.storeTaxId")}
                                            </label>

                                            <input
                                                id="taxNo"
                                                type="text"
                                                placeholder={t("signup.taxIdPlaceholder")}
                                                disabled={isSubmitting}
                                                {...register(
                                                    "store.tax_no",
                                                    {
                                                        required:
                                                            t("validation.taxIdRequired"),
                                                        pattern: {
                                                            value:
                                                                /^T\d{4}V\d{6}$/,
                                                            message:
                                                                t("validation.taxIdFormat"),
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
                                                {t("signup.storeBankAccount")}
                                            </label>

                                            <input
                                                id="bankAccount"
                                                type="text"
                                                placeholder={t("signup.ibanPlaceholder")}
                                                disabled={isSubmitting}
                                                {...register(
                                                    "store.bank_account",
                                                    {
                                                        required:
                                                            t("validation.bankAccountRequired"),
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
                                                                t("validation.invalidTurkishIban")
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
                                {isSubmitting ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                        {t("signup.creatingAccount")}
                                    </>
                                ) : (
                                    t("signup.submit")
                                )}
                            </button>
                        </form>

                        {/* LOGIN LINK */}
                        <p className="mt-6 text-center text-sm text-[#737373]">
                            {t("signup.alreadyHaveAccount")}{" "}

                            <Link
                                to="/login"
                                className="font-bold text-[#23a6f0] hover:underline"
                            >
                                {t("auth.login")}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SignUp;
