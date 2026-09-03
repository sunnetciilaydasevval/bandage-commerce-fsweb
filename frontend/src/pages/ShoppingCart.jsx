import {
    useDispatch,
    useSelector,
} from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
    increaseCartItem,
    decreaseCartItem,
    removeFromCart,
    toggleCartItem,
} from "../redux/thunks/shoppingCartThunk";

export default function ShoppingCart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart =
        useSelector(
            (state) =>
                state.shoppingCart?.cart
        ) || [];

    const payment =
        useSelector(
            (state) =>
                state.shoppingCart?.payment
        ) || {};

    const selectedItems =
        cart.filter(
            (item) =>
                item.checked !== false
        );

    const productsTotal =
        selectedItems.reduce(
            (sum, item) =>
                sum +
                Number(
                    item?.product?.discountedPrice ??
                    item?.product?.price ??
                    0
                ) *
                Number(
                    item?.count || 0
                ),
            0
        );

    const shipping = Number(
        payment.shippingPrice ??
        payment.shipping ??
        payment.paymentPrice ??
        0
    );

    const discount = Number(
        payment.discountAmount ??
        payment.discount ??
        0
    );

    const grandTotal = Math.max(
        0,
        productsTotal +
        shipping -
        discount
    );

    const formatPrice = (price) =>
        `${Number(price).toFixed(2)} ₺`;

    const handleCreateOrder = () => {
        if (selectedItems.length === 0) {
            toast.info(
                "Please select at least one product."
            );

            return;
        }

        navigate(
            "/create-order"
        );
    };

    return (
        <main className="min-h-screen bg-white px-6 py-12 font-['Montserrat',sans-serif] text-[#252b42]">
            <div className="mx-auto max-w-[1200px]">
                <h1 className="mb-10 text-3xl font-bold">
                    Shopping Cart
                </h1>

                {cart.length === 0 ? (
                    <div className="py-20 text-center text-[#737373]">
                        Your shopping cart is
                        empty.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_350px] lg:items-start">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-[#eeeeee] text-left text-sm">
                                        <th className="p-4">
                                            Select
                                        </th>

                                        <th className="p-4">
                                            Product
                                        </th>

                                        <th className="p-4">
                                            Price
                                        </th>

                                        <th className="p-4">
                                            Quantity
                                        </th>

                                        <th className="p-4">
                                            Total
                                        </th>

                                        <th className="p-4">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {cart.map(
                                        (
                                            item
                                        ) => {
                                            const product =
                                                item.product;

                                            const price =
                                                Number(
                                                    product?.discountedPrice ??
                                                    product?.price ??
                                                    0
                                                );

                                            const count =
                                                Number(
                                                    item?.count ||
                                                    0
                                                );

                                            const itemTotal =
                                                price *
                                                count;

                                            return (
                                                <tr
                                                    key={
                                                        product.id
                                                    }
                                                    className="border-b border-[#eeeeee]"
                                                >
                                                    <td className="p-4">
                                                        <input
                                                            type="checkbox"
                                                            checked={
                                                                item.checked !==
                                                                false
                                                            }
                                                            onChange={() =>
                                                                dispatch(
                                                                    toggleCartItem(
                                                                        product.id
                                                                    )
                                                                )
                                                            }
                                                            aria-label={`Select ${product.name}`}
                                                        />
                                                    </td>

                                                    <td className="p-4">
                                                        <div className="flex items-center gap-4">
                                                            <img
                                                                src={
                                                                    product
                                                                        ?.images?.[0]
                                                                        ?.url
                                                                }
                                                                alt={
                                                                    product.name
                                                                }
                                                                className="h-20 w-16 object-cover"
                                                            />

                                                            <span className="font-bold">
                                                                {
                                                                    product.name
                                                                }
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="p-4">
                                                        {formatPrice(
                                                            price
                                                        )}
                                                    </td>

                                                    <td className="p-4">
                                                        <div className="flex items-center gap-3">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    dispatch(
                                                                        decreaseCartItem(
                                                                            product.id
                                                                        )
                                                                    )
                                                                }
                                                                className="h-8 w-8 border"
                                                                aria-label="Decrease quantity"
                                                            >
                                                                -
                                                            </button>

                                                            <span>
                                                                {
                                                                    count
                                                                }
                                                            </span>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    dispatch(
                                                                        increaseCartItem(
                                                                            product.id
                                                                        )
                                                                    )
                                                                }
                                                                className="h-8 w-8 border"
                                                                aria-label="Increase quantity"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </td>

                                                    <td className="p-4 font-bold">
                                                        {formatPrice(
                                                            itemTotal
                                                        )}
                                                    </td>

                                                    <td className="p-4">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                dispatch(
                                                                    removeFromCart(
                                                                        product.id
                                                                    )
                                                                )
                                                            }
                                                            className="text-sm font-bold text-red-500 hover:text-red-700"
                                                        >
                                                            Remove
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )}
                                </tbody>

                                <tfoot>
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="p-6 text-right"
                                        >
                                            <span className="mr-4 text-sm font-bold text-[#737373]">
                                                Selected
                                                Total:
                                            </span>

                                            <span className="text-xl font-bold text-[#23856d]">
                                                {formatPrice(
                                                    productsTotal
                                                )}
                                            </span>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        <aside className="w-full rounded-md border border-[#e6e6e6] bg-[#f9f9f9] p-8">
                            <h2 className="mb-8 text-2xl font-bold">
                                Order Summary
                            </h2>

                            <div className="space-y-5">
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-sm font-semibold text-[#737373]">
                                        Products
                                        Total
                                    </span>

                                    <span className="text-sm font-bold">
                                        {formatPrice(
                                            productsTotal
                                        )}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-sm font-semibold text-[#737373]">
                                        Shipping
                                    </span>

                                    <span className="text-sm font-bold">
                                        {formatPrice(
                                            shipping
                                        )}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-sm font-semibold text-[#737373]">
                                        Discount
                                    </span>

                                    <span className="text-sm font-bold">
                                        -
                                        {formatPrice(
                                            discount
                                        )}
                                    </span>
                                </div>

                                <div className="border-t border-[#dddddd] pt-5">
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-base font-bold">
                                            Grand
                                            Total
                                        </span>

                                        <span className="text-xl font-bold text-[#23856d]">
                                            {formatPrice(
                                                grandTotal
                                            )}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={
                                        handleCreateOrder
                                    }
                                    disabled={
                                        selectedItems.length ===
                                        0
                                    }
                                    className="mt-4 w-full rounded-md bg-[#23856d] px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-[#1d705c] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Create
                                    Order
                                </button>
                            </div>
                        </aside>
                    </div>
                )}
            </div>
        </main>
    );
}
