import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    getOrders,
} from "../redux/thunks/clientThunks";

function formatDate(date) {
    if (!date) {
        return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return date;
    }

    return parsedDate.toLocaleString(
        "tr-TR"
    );
}

function getOrderId(order) {
    return (
        order?.id ??
        order?.order_id ??
        "-"
    );
}

function getOrderDate(order) {
    return (
        order?.order_date ??
        order?.created_at ??
        order?.createdAt
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
    return (
        order?.products ||
        order?.order_products ||
        order?.items ||
        []
    );
}

export default function PreviousOrders() {
    const dispatch = useDispatch();

    const orders =
        useSelector(
            (state) =>
                state.client?.orders || []
        );

    const [openOrderId, setOpenOrderId] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                await dispatch(
                    getOrders()
                );
            } catch (error) {
                console.error(
                    "Previous orders could not be loaded:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, [dispatch]);

    const toggleOrder = (orderId) => {
        setOpenOrderId(
            (current) =>
                current === orderId
                    ? null
                    : orderId
        );
    };

    return (
        <main className="min-h-screen bg-white px-6 py-12 font-['Montserrat',sans-serif] text-[#252b42]">

            <div className="mx-auto max-w-[1050px]">

                <h1 className="mb-10 text-3xl font-bold">
                    Previous Orders
                </h1>

                {loading ? (
                    <p>
                        Loading orders...
                    </p>
                ) : orders.length === 0 ? (
                    <div className="border p-8 text-center">
                        <p className="text-lg font-bold">
                            You have no previous orders.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-hidden border">

                        <div className="hidden grid-cols-4 gap-4 bg-[#252b42] px-6 py-4 font-bold text-white md:grid">
                            <span>
                                Order ID
                            </span>

                            <span>
                                Date
                            </span>

                            <span>
                                Products
                            </span>

                            <span>
                                Total
                            </span>
                        </div>

                        {orders.map(
                            (order, index) => {
                                const orderId =
                                    getOrderId(
                                        order
                                    );

                                const products =
                                    getProducts(
                                        order
                                    );

                                const uniqueId =
                                    String(
                                        orderId !==
                                            "-"
                                            ? orderId
                                            : index
                                    );

                                const isOpen =
                                    openOrderId ===
                                    uniqueId;

                                return (
                                    <div
                                        key={
                                            uniqueId
                                        }
                                        className="border-b last:border-b-0"
                                    >

                                        <button
                                            type="button"
                                            onClick={() =>
                                                toggleOrder(
                                                    uniqueId
                                                )
                                            }
                                            className="w-full px-6 py-5 text-left transition-colors hover:bg-[#f8f8f8]"
                                        >

                                            <div className="grid gap-4 md:grid-cols-4">

                                                <div>
                                                    <span className="mb-1 block text-xs font-bold text-[#737373] md:hidden">
                                                        Order ID
                                                    </span>

                                                    <span className="font-bold">
                                                        #{orderId}
                                                    </span>
                                                </div>

                                                <div>
                                                    <span className="mb-1 block text-xs font-bold text-[#737373] md:hidden">
                                                        Date
                                                    </span>

                                                    <span>
                                                        {formatDate(
                                                            getOrderDate(
                                                                order
                                                            )
                                                        )}
                                                    </span>
                                                </div>

                                                <div>
                                                    <span className="mb-1 block text-xs font-bold text-[#737373] md:hidden">
                                                        Products
                                                    </span>

                                                    <span>
                                                        {
                                                            products.length
                                                        }
                                                    </span>
                                                </div>

                                                <div>
                                                    <span className="mb-1 block text-xs font-bold text-[#737373] md:hidden">
                                                        Total
                                                    </span>

                                                    <span className="font-bold">
                                                        $
                                                        {getOrderPrice(
                                                            order
                                                        ).toFixed(
                                                            2
                                                        )}
                                                    </span>
                                                </div>

                                            </div>

                                        </button>

                                        {isOpen && (
                                            <div className="bg-[#fafafa] px-6 py-6">

                                                <h3 className="mb-5 text-xl font-bold">
                                                    Order Details
                                                </h3>

                                                {products.length ===
                                                    0 ? (
                                                    <p>
                                                        No product details available.
                                                    </p>
                                                ) : (
                                                    <div className="overflow-x-auto">
                                                        <table className="w-full border-collapse">

                                                            <thead>
                                                                <tr className="border-b bg-white text-left">
                                                                    <th className="p-3 font-bold">
                                                                        Product
                                                                    </th>

                                                                    <th className="p-3 font-bold">
                                                                        Count
                                                                    </th>

                                                                    <th className="p-3 font-bold">
                                                                        Detail
                                                                    </th>

                                                                    <th className="p-3 font-bold">
                                                                        Price
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
                                                                                {product?.name ||
                                                                                    product?.product_name ||
                                                                                    product?.product?.name ||
                                                                                    `Product #${product?.product_id ??
                                                                                    "-"
                                                                                    }`}
                                                                            </td>

                                                                            <td className="p-3">
                                                                                {
                                                                                    product?.count
                                                                                }
                                                                            </td>

                                                                            <td className="p-3">
                                                                                {
                                                                                    product?.detail ||
                                                                                    "-"
                                                                                }
                                                                            </td>

                                                                            <td className="p-3">
                                                                                $
                                                                                {Number(
                                                                                    product?.price ??
                                                                                    product?.product?.price ??
                                                                                    0
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
                            }
                        )}

                    </div>
                )}

            </div>

        </main>
    );
}
