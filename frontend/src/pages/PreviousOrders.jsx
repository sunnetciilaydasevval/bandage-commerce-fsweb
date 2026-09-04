import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { getOrders } from "../redux/thunks/clientThunks";

function formatDate(date) {
    if (!date) {
        return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return String(date);
    }

    return parsedDate.toLocaleString("tr-TR");
}

function getOrderId(order) {
    return order?.id ?? order?.order_id ?? "-";
}

function getOrderDate(order) {
    return (
        order?.order_date ??
        order?.created_at ??
        order?.createdAt ??
        null
    );
}

function getOrderPrice(order) {
    return Number(
        order?.price ??
            order?.total_price ??
            order?.totalPrice ??
            0
    );
}

function getProducts(order) {
    const products =
        order?.products ??
        order?.order_products ??
        order?.items ??
        [];

    return Array.isArray(products) ? products : [];
}

function getProductName(product, t) {
    return (
        product?.name ||
        product?.product_name ||
        product?.product?.name ||
        t("previousOrders.productFallback", {
            id: product?.product_id ?? "-",
        })
    );
}

function getProductPrice(product) {
    return Number(
        product?.price ??
            product?.product?.price ??
            0
    );
}

let ordersRequest = null;

export default function PreviousOrders() {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const orders = useSelector(
        (state) => state.client?.orders || []
    );

    const [openOrderId, setOpenOrderId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let mounted = true;

        const loadOrders = async () => {
            try {
                setLoading(true);
                setError(false);

                if (!ordersRequest) {
                    ordersRequest = dispatch(getOrders()).finally(() => {
                        ordersRequest = null;
                    });
                }

                await ordersRequest;
            } catch (error) {
                console.error(
                    "Previous orders could not be loaded:",
                    error
                );

                if (mounted) {
                    setError(true);
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        loadOrders();

        return () => {
            mounted = false;
        };
    }, [dispatch]);

    const toggleOrder = (orderId) => {
        setOpenOrderId((current) =>
            current === orderId ? null : orderId
        );
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-white px-6 py-12 font-['Montserrat',sans-serif] text-[#252b42]">
                <div className="mx-auto max-w-[1050px]">
                    <h1 className="mb-10 text-3xl font-bold">
                        {t("previousOrders.title")}
                    </h1>

                    <p>{t("previousOrders.loading")}</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-white px-6 py-12 font-['Montserrat',sans-serif] text-[#252b42]">
                <div className="mx-auto max-w-[1050px]">
                    <h1 className="mb-10 text-3xl font-bold">
                        {t("previousOrders.title")}
                    </h1>

                    <div className="border p-8 text-center">
                        <p className="font-bold text-red-500">
                            {t("previousOrders.loadFailed")}
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white px-6 py-12 font-['Montserrat',sans-serif] text-[#252b42]">
            <div className="mx-auto max-w-[1050px]">
                <h1 className="mb-10 text-3xl font-bold">
                    {t("previousOrders.title")}
                </h1>

                {orders.length === 0 ? (
                    <div className="border p-8 text-center">
                        <p className="text-lg font-bold">
                            {t("previousOrders.empty")}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-hidden border">
                        <div className="hidden grid-cols-4 gap-4 bg-[#252b42] px-6 py-4 font-bold text-white md:grid">
                            <span>{t("previousOrders.orderId")}</span>
                            <span>{t("previousOrders.date")}</span>
                            <span>{t("previousOrders.products")}</span>
                            <span>{t("previousOrders.total")}</span>
                        </div>

                        {orders.map((order, index) => {
                            const orderId = getOrderId(order);
                            const products = getProducts(order);

                            const uniqueId = String(
                                orderId !== "-"
                                    ? orderId
                                    : `index-${index}`
                            );

                            const isOpen =
                                openOrderId === uniqueId;

                            return (
                                <div
                                    key={uniqueId}
                                    className="border-b last:border-b-0"
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            toggleOrder(uniqueId)
                                        }
                                        aria-expanded={isOpen}
                                        className="w-full px-6 py-5 text-left transition-colors hover:bg-[#f8f8f8]"
                                    >
                                        <div className="grid gap-4 md:grid-cols-4">
                                            <div>
                                                <span className="mb-1 block text-xs font-bold text-[#737373] md:hidden">
                                                    {t("previousOrders.orderId")}
                                                </span>

                                                <span className="font-bold">
                                                    #{orderId}
                                                </span>
                                            </div>

                                            <div>
                                                <span className="mb-1 block text-xs font-bold text-[#737373] md:hidden">
                                                    {t("previousOrders.date")}
                                                </span>

                                                <span>
                                                    {formatDate(
                                                        getOrderDate(order)
                                                    )}
                                                </span>
                                            </div>

                                            <div>
                                                <span className="mb-1 block text-xs font-bold text-[#737373] md:hidden">
                                                    {t("previousOrders.products")}
                                                </span>

                                                <span>{products.length}</span>
                                            </div>

                                            <div>
                                                <span className="mb-1 block text-xs font-bold text-[#737373] md:hidden">
                                                    {t("previousOrders.total")}
                                                </span>

                                                <span className="font-bold">
                                                    $
                                                    {getOrderPrice(
                                                        order
                                                    ).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </button>

                                    {isOpen && (
                                        <div className="bg-[#fafafa] px-6 py-6">
                                            <h3 className="mb-5 text-xl font-bold">
                                                {t(
                                                    "previousOrders.orderDetails"
                                                )}
                                            </h3>

                                            {products.length === 0 ? (
                                                <p>
                                                    {t(
                                                        "previousOrders.noProductDetails"
                                                    )}
                                                </p>
                                            ) : (
                                                <div className="overflow-x-auto">
                                                    <table className="w-full border-collapse">
                                                        <thead>
                                                            <tr className="border-b bg-white text-left">
                                                                <th className="p-3 font-bold">
                                                                    {t(
                                                                        "previousOrders.product"
                                                                    )}
                                                                </th>

                                                                <th className="p-3 font-bold">
                                                                    {t(
                                                                        "previousOrders.count"
                                                                    )}
                                                                </th>

                                                                <th className="p-3 font-bold">
                                                                    {t(
                                                                        "previousOrders.detail"
                                                                    )}
                                                                </th>

                                                                <th className="p-3 font-bold">
                                                                    {t(
                                                                        "previousOrders.price"
                                                                    )}
                                                                </th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {products.map(
                                                                (
                                                                    product,
                                                                    productIndex
                                                                ) => (
                                                                    <tr
                                                                        key={
                                                                            product?.id ??
                                                                            product?.product_id ??
                                                                            productIndex
                                                                        }
                                                                        className="border-b bg-white"
                                                                    >
                                                                        <td className="p-3">
                                                                            {getProductName(
                                                                                product,
                                                                                t
                                                                            )}
                                                                        </td>

                                                                        <td className="p-3">
                                                                            {Number(
                                                                                product?.count ??
                                                                                    product?.quantity ??
                                                                                    0
                                                                            )}
                                                                        </td>

                                                                        <td className="p-3">
                                                                            {product?.detail ||
                                                                                "-"}
                                                                        </td>

                                                                        <td className="p-3">
                                                                            $
                                                                            {getProductPrice(
                                                                                product
                                                                            ).toFixed(
                                                                                2
                                                                            )}
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}
