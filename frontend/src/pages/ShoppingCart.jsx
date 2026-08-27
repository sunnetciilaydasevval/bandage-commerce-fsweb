import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    increaseCartItem,
    decreaseCartItem,
    removeFromCart,
    toggleCartItem,
} from "../redux/thunks/shoppingCartThunk";

export default function ShoppingCart() {
    const dispatch = useDispatch();

    const cart =
        useSelector(
            (state) =>
                state.shoppingCart.cart
        ) || [];

    const selectedItems =
        cart.filter(
            (item) => item.checked
        );

    const total = selectedItems.reduce(
        (sum, item) =>
            sum +
            Number(item.product.price) *
            item.count,
        0
    );

    return (
        <div className="min-h-screen bg-white px-6 py-12 font-['Montserrat',sans-serif] text-[#252b42]">

            <div className="mx-auto max-w-[1050px]">

                <h1 className="mb-10 text-3xl font-bold">
                    Shopping Cart
                </h1>

                {cart.length === 0 ? (
                    <div className="py-20 text-center text-[#737373]">
                        Your shopping cart is empty.
                    </div>
                ) : (
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
                                    (item) => {
                                        const product =
                                            item.product;

                                        const itemTotal =
                                            Number(
                                                product.price
                                            ) *
                                            item.count;

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
                                                            item.checked
                                                        }
                                                        onChange={() =>
                                                            dispatch(
                                                                toggleCartItem(
                                                                    product.id
                                                                )
                                                            )
                                                        }
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
                                                    {Number(
                                                        product.price
                                                    ).toFixed(
                                                        2
                                                    )}{" "}
                                                    ₺
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
                                                        >
                                                            -
                                                        </button>

                                                        <span>
                                                            {
                                                                item.count
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
                                                        >
                                                            +
                                                        </button>

                                                    </div>

                                                </td>

                                                <td className="p-4 font-bold">
                                                    {itemTotal.toFixed(
                                                        2
                                                    )}{" "}
                                                    ₺
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
                                            Selected Total:
                                        </span>

                                        <span className="text-xl font-bold text-[#23856d]">
                                            {total.toFixed(
                                                2
                                            )}{" "}
                                            ₺
                                        </span>
                                    </td>
                                </tr>
                            </tfoot>

                        </table>
                    </div>
                )}

            </div>
        </div>
    );
}
