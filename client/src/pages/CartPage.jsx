import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeItem, clearCart } from '../store/cartSlice';

function CartPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.items);

    // Calculate the total price of all items in the cart
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

    const handleRemoveItem = (itemId) => {
        dispatch(removeItem(itemId));
    };

    const handleCheckout = () => {
        alert('Thank you for your order!');
        dispatch(clearCart());
        navigate('/'); // Redirect to home page after checkout
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Your Cart</h1>
            
            {cartItems.length === 0 ? (
                <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                    <p className="text-xl text-gray-600 dark:text-gray-400">Your cart is empty.</p>
                    <Link to="/" className="mt-4 inline-block px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700">
                        Find some food!
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item._id} className="p-4 bg-white dark:bg-gray-800 rounded-lg flex justify-between items-center shadow-md">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.name}</h3>
                                    <p className="text-lg font-semibold text-teal-600 dark:text-teal-400 mt-1">${item.price.toFixed(2)}</p>
                                </div>
                                <button onClick={() => handleRemoveItem(item._id)} className="px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600">
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-4">
                                <span>Taxes & Fees</span>
                                <span>$0.00</span>
                            </div>
                            <hr className="border-gray-200 dark:border-gray-700 mb-4" />
                            <div className="flex justify-between font-bold text-xl mb-6">
                                <span>Total</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <button 
                                onClick={handleCheckout} 
                                className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage;