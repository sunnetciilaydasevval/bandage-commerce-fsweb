import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    getAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    fetchCards,
    addCard,
    editCard,
    removeCard,
    createOrder,
} from "../redux/thunks/clientThunks";

import { setCart } from "../redux/actions/shoppingCartActions";

const cities = [
    "adana",
    "adiyaman",
    "afyonkarahisar",
    "agri",
    "amasya",
    "ankara",
    "antalya",
    "artvin",
    "aydin",
    "balikesir",
    "bilecik",
    "bingol",
    "bitlis",
    "bolu",
    "burdur",
    "bursa",
    "canakkale",
    "cankiri",
    "corum",
    "denizli",
    "diyarbakir",
    "duzce",
    "edirne",
    "elazig",
    "erzincan",
    "erzurum",
    "eskisehir",
    "gaziantep",
    "giresun",
    "gumushane",
    "hakkari",
    "hatay",
    "igdir",
    "isparta",
    "istanbul",
    "izmir",
    "kahramanmaras",
    "karabuk",
    "karaman",
    "kars",
    "kastamonu",
    "kayseri",
    "kilis",
    "kirikkale",
    "kirklareli",
    "kirsehir",
    "kocaeli",
    "konya",
    "kutahya",
    "malatya",
    "manisa",
    "mardin",
    "mersin",
    "mugla",
    "mus",
    "nevsehir",
    "nigde",
    "ordu",
    "osmaniye",
    "rize",
    "sakarya",
    "samsun",
    "sanliurfa",
    "siirt",
    "sinop",
    "sirnak",
    "sivas",
    "tekirdag",
    "tokat",
    "trabzon",
    "tunceli",
    "usak",
    "van",
    "yalova",
    "yozgat",
    "zonguldak",
];

const emptyAddress = {
    title: "",
    name: "",
    surname: "",
    phone: "",
    city: "",
    district: "",
    neighborhood: "",
};

const emptyCard = {
    card_no: "",
    expire_month: "",
    expire_year: "",
    name_on_card: "",
};

const emptyPayment = {
    card_ccv: "",
};

function getProductDetail(product) {
    const color =
        product?.color?.name ||
        product?.color ||
        product?.selectedColor ||
        "";

    const size =
        product?.size?.name ||
        product?.size ||
        product?.selectedSize ||
        "";

    if (color && size) {
        return `${color} - ${size}`;
    }

    return color || size || "";
}

function getProductPrice(product) {
    return Number(
        product?.discountedPrice ??
        product?.price ??
        0
    );
}

function maskCardNumber(cardNumber) {
    const value = String(
        cardNumber || ""
    ).replace(/\s+/g, "");

    if (!value) {
        return "**** **** **** ****";
    }

    if (value.length <= 4) {
        return `**** ${value}`;
    }

    return `**** **** **** ${value.slice(-4)}`;
}

function CreateOrder() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addressList =
        useSelector(
            (state) =>
                state.client?.addressList || []
        );

    const creditCards =
        useSelector(
            (state) =>
                state.client?.creditCards || []
        );

    const cart =
        useSelector(
            (state) =>
                state.shoppingCart?.cart || []
        );

    const [step, setStep] = useState(1);

    const [showForm, setShowForm] =
        useState(false);

    const [editingAddress, setEditingAddress] =
        useState(null);

    const [shippingAddress, setShippingAddress] =
        useState(null);

    const [receiptAddress, setReceiptAddress] =
        useState(null);

    const [showCardForm, setShowCardForm] =
        useState(false);

    const [editingCard, setEditingCard] =
        useState(null);

    const [selectedCard, setSelectedCard] =
        useState(null);

    const [isOrdering, setIsOrdering] =
        useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm({
        defaultValues: emptyAddress,
    });

    const {
        register: registerCard,
        handleSubmit: handleCardSubmit,
        reset: resetCard,
        formState: {
            errors: cardErrors,
            isSubmitting: isCardSubmitting,
        },
    } = useForm({
        defaultValues: emptyCard,
    });

    const {
        register: registerPayment,
        handleSubmit: handlePaymentSubmit,
        reset: resetPayment,
        formState: {
            errors: paymentErrors,
        },
    } = useForm({
        defaultValues: emptyPayment,
    });

    useEffect(() => {
        dispatch(getAddresses());
        dispatch(fetchCards());
    }, [dispatch]);

    const selectedItems = useMemo(
        () =>
            cart.filter(
                (item) =>
                    item.checked !== false
            ),
        [cart]
    );

    const orderPrice = useMemo(
        () =>
            selectedItems.reduce(
                (total, item) =>
                    total +
                    getProductPrice(
                        item.product
                    ) *
                    Number(
                        item.count || 0
                    ),
                0
            ),
        [selectedItems]
    );

    const openAddAddress = () => {
        setEditingAddress(null);
        reset(emptyAddress);
        setShowForm(true);
    };

    const openEditAddress = (address) => {
        setEditingAddress(address);

        reset({
            title: address.title || "",
            name: address.name || "",
            surname:
                address.surname || "",
            phone: address.phone || "",
            city: address.city || "",
            district:
                address.district || "",
            neighborhood:
                address.neighborhood || "",
        });

        setShowForm(true);
    };

    const closeForm = () => {
        setEditingAddress(null);
        setShowForm(false);
        reset(emptyAddress);
    };

    const onSubmit = async (data) => {
        try {
            if (editingAddress) {
                await dispatch(
                    updateAddress({
                        id: editingAddress.id,
                        ...data,
                    })
                );
            } else {
                await dispatch(
                    addAddress(data)
                );
            }

            closeForm();
        } catch (error) {
            console.error(
                "Address save failed:",
                error
            );

            alert(
                "Address could not be saved."
            );
        }
    };

    const handleDelete = async (
        addressId
    ) => {
        try {
            await dispatch(
                deleteAddress(addressId)
            );

            if (
                shippingAddress?.id ===
                addressId
            ) {
                setShippingAddress(null);
            }

            if (
                receiptAddress?.id ===
                addressId
            ) {
                setReceiptAddress(null);
            }
        } catch (error) {
            console.error(
                "Address delete failed:",
                error
            );

            alert(
                "Address could not be deleted."
            );
        }
    };

    const selectShippingAddress = (
        address
    ) => {
        setShippingAddress(address);
    };

    const selectReceiptAddress = (
        address
    ) => {
        setReceiptAddress(address);
    };

    const openAddCard = () => {
        setEditingCard(null);
        resetCard(emptyCard);
        setShowCardForm(true);
    };

    const openEditCard = (card) => {
        setEditingCard(card);

        resetCard({
            card_no: card.card_no || "",
            expire_month:
                card.expire_month || "",
            expire_year:
                card.expire_year || "",
            name_on_card:
                card.name_on_card || "",
        });

        setShowCardForm(true);
    };

    const closeCardForm = () => {
        setEditingCard(null);
        setShowCardForm(false);
        resetCard(emptyCard);
    };

    const onCardSubmit = async (data) => {
        try {
            const cardData = {
                card_no: String(
                    data.card_no || ""
                ).replace(/\s+/g, ""),

                expire_month: Number(
                    data.expire_month
                ),

                expire_year: Number(
                    data.expire_year
                ),

                name_on_card:
                    data.name_on_card.trim(),
            };

            if (editingCard) {
                await dispatch(
                    editCard({
                        id: editingCard.id,
                        ...cardData,
                    })
                );
            } else {
                await dispatch(
                    addCard(cardData)
                );
            }

            closeCardForm();
        } catch (error) {
            console.error(
                "Card save failed:",
                error
            );

            alert(
                "Card could not be saved."
            );
        }
    };

    const handleDeleteCard = async (
        cardId
    ) => {
        try {
            await dispatch(
                removeCard(cardId)
            );

            if (
                selectedCard?.id ===
                cardId
            ) {
                setSelectedCard(null);
                resetPayment(
                    emptyPayment
                );
            }
        } catch (error) {
            console.error(
                "Card delete failed:",
                error
            );

            alert(
                "Card could not be deleted."
            );
        }
    };

    const selectCard = (card) => {
        setSelectedCard(card);
        resetPayment(emptyPayment);
    };

    const handleCreateOrder = async (
        paymentData
    ) => {
        if (!shippingAddress) {
            alert(
                "Please select a shipping address."
            );
            setStep(1);
            return;
        }

        if (!receiptAddress) {
            alert(
                "Please select a receipt address."
            );
            setStep(1);
            return;
        }

        if (!selectedCard) {
            alert(
                "Please select a payment card."
            );
            return;
        }

        if (selectedItems.length === 0) {
            alert(
                "Please select at least one product."
            );
            navigate("/cart");
            return;
        }

        if (orderPrice <= 0) {
            alert(
                "Order total must be greater than zero."
            );
            return;
        }

        setIsOrdering(true);

        try {
            const products =
                selectedItems.map(
                    (item) => ({
                        product_id:
                            item.product.id,

                        count: Number(
                            item.count || 0
                        ),

                        detail:
                            getProductDetail(
                                item.product
                            ),
                    })
                );

            const orderData = {
                address_id:
                    shippingAddress.id,

                order_date:
                    new Date().toISOString(),

                card_no: String(
                    selectedCard.card_no
                ).replace(/\s+/g, ""),

                card_name:
                    selectedCard.name_on_card,

                card_expire_month:
                    Number(
                        selectedCard.expire_month
                    ),

                card_expire_year:
                    Number(
                        selectedCard.expire_year
                    ),

                card_ccv: Number(
                    paymentData.card_ccv
                ),

                price: orderPrice,

                products,
            };

            /*
             * IMPORTANT:
             *
             * receiptAddress seçiliyor ancak mevcut
             * order API sözleşmesinde hangi field ile
             * gönderileceği bilinmiyor.
             *
             * Backend örneğin:
             *
             * receipt_address_id
             *
             * veya
             *
             * invoice_address_id
             *
             * bekliyorsa burada ilgili alan eklenmelidir.
             */

            await dispatch(
                createOrder(orderData)
            );

            dispatch(setCart([]));

            setShippingAddress(null);
            setReceiptAddress(null);
            setSelectedCard(null);

            resetPayment(
                emptyPayment
            );

            setStep(1);

            alert(
                "Congratulations! Your order has been successfully created."
            );

            navigate("/");
        } catch (error) {
            console.error(
                "Order creation failed:",
                error
            );

            alert(
                "Order could not be created. Please try again."
            );
        } finally {
            setIsOrdering(false);
        }
    };

    return (
        <main className="min-h-screen bg-white px-6 py-12 font-['Montserrat',sans-serif] text-[#252b42]">
            <div className="mx-auto max-w-[1050px]">
                <h1 className="mb-10 text-3xl font-bold">
                    Create Order
                </h1>

                <div className="mb-8 flex gap-4">
                    <button
                        type="button"
                        onClick={() =>
                            setStep(1)
                        }
                        className={`px-6 py-3 font-bold ${step === 1
                                ? "bg-[#252b42] text-white"
                                : "border"
                            }`}
                    >
                        Address
                    </button>

                    <button
                        type="button"
                        disabled={
                            !shippingAddress ||
                            !receiptAddress
                        }
                        onClick={() =>
                            setStep(2)
                        }
                        className={`px-6 py-3 font-bold ${step === 2
                                ? "bg-[#252b42] text-white"
                                : "border"
                            } disabled:opacity-50`}
                    >
                        Order
                    </button>
                </div>

                {step === 1 && (
                    <section>
                        <div className="mb-8 flex items-center justify-between">
                            <h2 className="text-2xl font-bold">
                                Addresses
                            </h2>

                            <button
                                type="button"
                                onClick={
                                    openAddAddress
                                }
                                className="bg-[#23a6f0] px-5 py-3 font-bold text-white"
                            >
                                Add Address
                            </button>
                        </div>

                        {showForm && (
                            <form
                                onSubmit={handleSubmit(
                                    onSubmit
                                )}
                                className="mb-10 border p-6"
                            >
                                <h3 className="mb-6 text-xl font-bold">
                                    {editingAddress
                                        ? "Update Address"
                                        : "Add Address"}
                                </h3>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="title"
                                            className="mb-2 block font-bold"
                                        >
                                            Address Title
                                        </label>

                                        <input
                                            id="title"
                                            type="text"
                                            {...register(
                                                "title",
                                                {
                                                    required:
                                                        "Address title is required",
                                                }
                                            )}
                                            className="w-full border p-3"
                                        />

                                        {errors.title && (
                                            <p className="mt-1 text-red-500">
                                                {
                                                    errors
                                                        .title
                                                        .message
                                                }
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="mb-2 block font-bold"
                                        >
                                            Name
                                        </label>

                                        <input
                                            id="name"
                                            type="text"
                                            {...register(
                                                "name",
                                                {
                                                    required:
                                                        "Name is required",
                                                }
                                            )}
                                            className="w-full border p-3"
                                        />

                                        {errors.name && (
                                            <p className="mt-1 text-red-500">
                                                {
                                                    errors
                                                        .name
                                                        .message
                                                }
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="surname"
                                            className="mb-2 block font-bold"
                                        >
                                            Surname
                                        </label>

                                        <input
                                            id="surname"
                                            type="text"
                                            {...register(
                                                "surname",
                                                {
                                                    required:
                                                        "Surname is required",
                                                }
                                            )}
                                            className="w-full border p-3"
                                        />

                                        {errors.surname && (
                                            <p className="mt-1 text-red-500">
                                                {
                                                    errors
                                                        .surname
                                                        .message
                                                }
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="phone"
                                            className="mb-2 block font-bold"
                                        >
                                            Phone
                                        </label>

                                        <input
                                            id="phone"
                                            type="tel"
                                            {...register(
                                                "phone",
                                                {
                                                    required:
                                                        "Phone is required",
                                                }
                                            )}
                                            className="w-full border p-3"
                                        />

                                        {errors.phone && (
                                            <p className="mt-1 text-red-500">
                                                {
                                                    errors
                                                        .phone
                                                        .message
                                                }
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="city"
                                            className="mb-2 block font-bold"
                                        >
                                            City (İl)
                                        </label>

                                        <select
                                            id="city"
                                            {...register(
                                                "city",
                                                {
                                                    required:
                                                        "City is required",
                                                }
                                            )}
                                            className="w-full border p-3"
                                        >
                                            <option value="">
                                                Select city
                                            </option>

                                            {cities.map(
                                                (
                                                    city
                                                ) => (
                                                    <option
                                                        key={
                                                            city
                                                        }
                                                        value={
                                                            city
                                                        }
                                                    >
                                                        {city}
                                                    </option>
                                                )
                                            )}
                                        </select>

                                        {errors.city && (
                                            <p className="mt-1 text-red-500">
                                                {
                                                    errors
                                                        .city
                                                        .message
                                                }
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="district"
                                            className="mb-2 block font-bold"
                                        >
                                            District (İlçe)
                                        </label>

                                        <input
                                            id="district"
                                            type="text"
                                            {...register(
                                                "district",
                                                {
                                                    required:
                                                        "District is required",
                                                }
                                            )}
                                            className="w-full border p-3"
                                        />

                                        {errors.district && (
                                            <p className="mt-1 text-red-500">
                                                {
                                                    errors
                                                        .district
                                                        .message
                                                }
                                            </p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label
                                            htmlFor="neighborhood"
                                            className="mb-2 block font-bold"
                                        >
                                            Neighborhood (Mahalle)
                                        </label>

                                        <textarea
                                            id="neighborhood"
                                            {...register(
                                                "neighborhood",
                                                {
                                                    required:
                                                        "Neighborhood is required",
                                                }
                                            )}
                                            rows="4"
                                            className="w-full border p-3"
                                        />

                                        {errors.neighborhood && (
                                            <p className="mt-1 text-red-500">
                                                {
                                                    errors
                                                        .neighborhood
                                                        .message
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-6 flex gap-3">
                                    <button
                                        type="submit"
                                        disabled={
                                            isSubmitting
                                        }
                                        className="bg-[#23856d] px-5 py-3 font-bold text-white disabled:opacity-50"
                                    >
                                        {isSubmitting
                                            ? "Saving..."
                                            : editingAddress
                                                ? "Update Address"
                                                : "Save Address"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={
                                            closeForm
                                        }
                                        className="border px-5 py-3 font-bold"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}

                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <h3 className="mb-4 text-xl font-bold">
                                    Shipping Address
                                </h3>

                                {addressList.length ===
                                    0 ? (
                                    <p className="text-[#737373]">
                                        No addresses
                                        available.
                                    </p>
                                ) : (
                                    addressList.map(
                                        (
                                            address
                                        ) => (
                                            <div
                                                key={
                                                    address.id
                                                }
                                                className={`mb-4 border p-5 ${shippingAddress?.id ===
                                                        address.id
                                                        ? "border-[#23a6f0]"
                                                        : ""
                                                    }`}
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <h4 className="font-bold">
                                                            {
                                                                address.title
                                                            }
                                                        </h4>

                                                        <p>
                                                            {
                                                                address.name
                                                            }{" "}
                                                            {
                                                                address.surname
                                                            }
                                                        </p>

                                                        <p>
                                                            {
                                                                address.phone
                                                            }
                                                        </p>

                                                        <p>
                                                            {
                                                                address.city
                                                            }{" "}
                                                            {
                                                                address.district
                                                            }
                                                        </p>

                                                        <p>
                                                            {
                                                                address.neighborhood
                                                            }
                                                        </p>
                                                    </div>

                                                    <div className="flex flex-wrap gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                selectShippingAddress(
                                                                    address
                                                                )
                                                            }
                                                            className="border px-3 py-2 text-sm font-bold"
                                                        >
                                                            Select
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                openEditAddress(
                                                                    address
                                                                )
                                                            }
                                                            className="border px-3 py-2 text-sm font-bold"
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    address.id
                                                                )
                                                            }
                                                            className="px-3 py-2 text-sm font-bold text-red-500"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )
                                )}
                            </div>

                            <div>
                                <h3 className="mb-4 text-xl font-bold">
                                    Receipt Address
                                </h3>

                                {addressList.length ===
                                    0 ? (
                                    <p className="text-[#737373]">
                                        No addresses
                                        available.
                                    </p>
                                ) : (
                                    addressList.map(
                                        (
                                            address
                                        ) => (
                                            <div
                                                key={
                                                    address.id
                                                }
                                                className={`mb-4 border p-5 ${receiptAddress?.id ===
                                                        address.id
                                                        ? "border-[#23a6f0]"
                                                        : ""
                                                    }`}
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <h4 className="font-bold">
                                                            {
                                                                address.title
                                                            }
                                                        </h4>

                                                        <p>
                                                            {
                                                                address.name
                                                            }{" "}
                                                            {
                                                                address.surname
                                                            }
                                                        </p>

                                                        <p>
                                                            {
                                                                address.phone
                                                            }
                                                        </p>

                                                        <p>
                                                            {
                                                                address.city
                                                            }{" "}
                                                            {
                                                                address.district
                                                            }
                                                        </p>

                                                        <p>
                                                            {
                                                                address.neighborhood
                                                            }
                                                        </p>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            selectReceiptAddress(
                                                                address
                                                            )
                                                        }
                                                        className="border px-3 py-2 text-sm font-bold"
                                                    >
                                                        Select
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    )
                                )}
                            </div>
                        </div>

                        <div className="mt-8 text-right">
                            <button
                                type="button"
                                disabled={
                                    !shippingAddress ||
                                    !receiptAddress
                                }
                                onClick={() =>
                                    setStep(2)
                                }
                                className="bg-[#23a6f0] px-6 py-3 font-bold text-white disabled:opacity-50"
                            >
                                Continue
                            </button>
                        </div>
                    </section>
                )}

                {step === 2 && (
                    <section>
                        <h2 className="mb-6 text-2xl font-bold">
                            Order
                        </h2>

                        <div className="mb-6 grid gap-6 md:grid-cols-2">
                            <div className="border p-5">
                                <h3 className="mb-4 font-bold">
                                    Shipping Address
                                </h3>

                                <p>
                                    {
                                        shippingAddress?.title
                                    }
                                </p>

                                <p>
                                    {
                                        shippingAddress?.name
                                    }{" "}
                                    {
                                        shippingAddress?.surname
                                    }
                                </p>

                                <p>
                                    {
                                        shippingAddress?.phone
                                    }
                                </p>

                                <p>
                                    {
                                        shippingAddress?.city
                                    }{" "}
                                    {
                                        shippingAddress?.district
                                    }
                                </p>

                                <p>
                                    {
                                        shippingAddress?.neighborhood
                                    }
                                </p>
                            </div>

                            <div className="border p-5">
                                <h3 className="mb-4 font-bold">
                                    Receipt Address
                                </h3>

                                <p>
                                    {
                                        receiptAddress?.title
                                    }
                                </p>

                                <p>
                                    {
                                        receiptAddress?.name
                                    }{" "}
                                    {
                                        receiptAddress?.surname
                                    }
                                </p>

                                <p>
                                    {
                                        receiptAddress?.phone
                                    }
                                </p>

                                <p>
                                    {
                                        receiptAddress?.city
                                    }{" "}
                                    {
                                        receiptAddress?.district
                                    }
                                </p>

                                <p>
                                    {
                                        receiptAddress?.neighborhood
                                    }
                                </p>
                            </div>
                        </div>

                        <div className="mb-6 border p-6">
                            <div className="mb-6 flex items-center justify-between gap-4">
                                <h3 className="text-xl font-bold">
                                    Payment Methods
                                </h3>

                                <button
                                    type="button"
                                    onClick={
                                        openAddCard
                                    }
                                    className="bg-[#23a6f0] px-5 py-3 font-bold text-white"
                                >
                                    Add New Card
                                </button>
                            </div>

                            {showCardForm && (
                                <form
                                    onSubmit={handleCardSubmit(
                                        onCardSubmit
                                    )}
                                    className="mb-8 border p-6"
                                >
                                    <h4 className="mb-6 text-lg font-bold">
                                        {editingCard
                                            ? "Update Card"
                                            : "Add New Card"}
                                    </h4>

                                    <div className="grid gap-5 md:grid-cols-2">
                                        <div className="md:col-span-2">
                                            <label
                                                htmlFor="card_no"
                                                className="mb-2 block font-bold"
                                            >
                                                Card Number
                                            </label>

                                            <input
                                                id="card_no"
                                                type="text"
                                                inputMode="numeric"
                                                autoComplete="cc-number"
                                                {...registerCard(
                                                    "card_no",
                                                    {
                                                        required:
                                                            "Card number is required",

                                                        pattern:
                                                        {
                                                            value: /^[0-9\s]{13,23}$/,
                                                            message:
                                                                "Enter a valid card number",
                                                        },
                                                    }
                                                )}
                                                className="w-full border p-3"
                                            />

                                            {cardErrors.card_no && (
                                                <p className="mt-1 text-red-500">
                                                    {
                                                        cardErrors
                                                            .card_no
                                                            .message
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="expire_month"
                                                className="mb-2 block font-bold"
                                            >
                                                Expire Month
                                            </label>

                                            <input
                                                id="expire_month"
                                                type="number"
                                                min="1"
                                                max="12"
                                                {...registerCard(
                                                    "expire_month",
                                                    {
                                                        required:
                                                            "Expire month is required",

                                                        min: {
                                                            value: 1,
                                                            message:
                                                                "Month must be between 1 and 12",
                                                        },

                                                        max: {
                                                            value: 12,
                                                            message:
                                                                "Month must be between 1 and 12",
                                                        },
                                                    }
                                                )}
                                                className="w-full border p-3"
                                            />

                                            {cardErrors.expire_month && (
                                                <p className="mt-1 text-red-500">
                                                    {
                                                        cardErrors
                                                            .expire_month
                                                            .message
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="expire_year"
                                                className="mb-2 block font-bold"
                                            >
                                                Expire Year
                                            </label>

                                            <input
                                                id="expire_year"
                                                type="number"
                                                min="2026"
                                                max="2100"
                                                {...registerCard(
                                                    "expire_year",
                                                    {
                                                        required:
                                                            "Expire year is required",
                                                    }
                                                )}
                                                className="w-full border p-3"
                                            />

                                            {cardErrors.expire_year && (
                                                <p className="mt-1 text-red-500">
                                                    {
                                                        cardErrors
                                                            .expire_year
                                                            .message
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        <div className="md:col-span-2">
                                            <label
                                                htmlFor="name_on_card"
                                                className="mb-2 block font-bold"
                                            >
                                                Name on Card
                                            </label>

                                            <input
                                                id="name_on_card"
                                                type="text"
                                                autoComplete="cc-name"
                                                {...registerCard(
                                                    "name_on_card",
                                                    {
                                                        required:
                                                            "Name on card is required",
                                                    }
                                                )}
                                                className="w-full border p-3"
                                            />

                                            {cardErrors.name_on_card && (
                                                <p className="mt-1 text-red-500">
                                                    {
                                                        cardErrors
                                                            .name_on_card
                                                            .message
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-6 flex gap-3">
                                        <button
                                            type="submit"
                                            disabled={
                                                isCardSubmitting
                                            }
                                            className="bg-[#23856d] px-5 py-3 font-bold text-white disabled:opacity-50"
                                        >
                                            {isCardSubmitting
                                                ? "Saving..."
                                                : editingCard
                                                    ? "Update Card"
                                                    : "Save Card"}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={
                                                closeCardForm
                                            }
                                            className="border px-5 py-3 font-bold"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}

                            <h4 className="mb-4 text-lg font-bold">
                                Saved Cards
                            </h4>

                            {creditCards.length ===
                                0 ? (
                                <p>
                                    No saved cards.
                                </p>
                            ) : (
                                <div className="grid gap-4">
                                    {creditCards.map(
                                        (
                                            card
                                        ) => (
                                            <div
                                                key={
                                                    card.id
                                                }
                                                className={`border p-5 ${selectedCard?.id ===
                                                        card.id
                                                        ? "border-[#23a6f0]"
                                                        : ""
                                                    }`}
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <p className="font-bold">
                                                            {
                                                                card.name_on_card
                                                            }
                                                        </p>

                                                        <p>
                                                            {maskCardNumber(
                                                                card.card_no
                                                            )}
                                                        </p>

                                                        <p>
                                                            {
                                                                card.expire_month
                                                            }
                                                            /
                                                            {
                                                                card.expire_year
                                                            }
                                                        </p>
                                                    </div>

                                                    <div className="flex flex-wrap gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                selectCard(
                                                                    card
                                                                )
                                                            }
                                                            className="border px-3 py-2 text-sm font-bold"
                                                        >
                                                            Select
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                openEditCard(
                                                                    card
                                                                )
                                                            }
                                                            className="border px-3 py-2 text-sm font-bold"
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDeleteCard(
                                                                    card.id
                                                                )
                                                            }
                                                            className="px-3 py-2 text-sm font-bold text-red-500"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}

                            {selectedCard && (
                                <form
                                    onSubmit={handlePaymentSubmit(
                                        handleCreateOrder
                                    )}
                                    className="mt-6 border p-5"
                                >
                                    <h4 className="mb-4 text-lg font-bold">
                                        Payment Option
                                    </h4>

                                    <p className="font-bold">
                                        {
                                            selectedCard.name_on_card
                                        }
                                    </p>

                                    <p>
                                        {maskCardNumber(
                                            selectedCard.card_no
                                        )}
                                    </p>

                                    <p>
                                        {
                                            selectedCard.expire_month
                                        }
                                        /
                                        {
                                            selectedCard.expire_year
                                        }
                                    </p>

                                    <div className="mt-5 max-w-[300px]">
                                        <label
                                            htmlFor="card_ccv"
                                            className="mb-2 block font-bold"
                                        >
                                            CCV
                                        </label>

                                        <input
                                            id="card_ccv"
                                            type="password"
                                            inputMode="numeric"
                                            autoComplete="cc-csc"
                                            maxLength="4"
                                            {...registerPayment(
                                                "card_ccv",
                                                {
                                                    required:
                                                        "CCV is required",

                                                    pattern:
                                                    {
                                                        value: /^[0-9]{3,4}$/,
                                                        message:
                                                            "CCV must contain 3 or 4 digits",
                                                    },
                                                }
                                            )}
                                            className="w-full border p-3"
                                        />

                                        {paymentErrors.card_ccv && (
                                            <p className="mt-1 text-red-500">
                                                {
                                                    paymentErrors
                                                        .card_ccv
                                                        .message
                                                }
                                            </p>
                                        )}
                                    </div>

                                    <div className="mt-6 border-t pt-5">
                                        <div className="mb-4 flex justify-between text-lg font-bold">
                                            <span>
                                                Total
                                            </span>

                                            <span>
                                                {orderPrice.toFixed(
                                                    2
                                                )}{" "}
                                                ₺
                                            </span>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={
                                                isOrdering
                                            }
                                            className="w-full bg-[#23a6f0] px-6 py-4 font-bold text-white disabled:opacity-50"
                                        >
                                            {isOrdering
                                                ? "Creating Order..."
                                                : "Complete Order"}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                setStep(1)
                            }
                            className="border px-6 py-3 font-bold"
                        >
                            Back
                        </button>
                    </section>
                )}
            </div>
        </main>
    );
}

export default CreateOrder;
