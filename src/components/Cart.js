import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToItem,
  decrementItem,
  incrementItem,
} from "../reducer/CartSlice";

export default function ShoppingCart() {
  const { products, cartItems, currency } = useSelector(
    state => state?.cart
  );

  const dispatch = useDispatch(); 

  const getPrice = (price) => {
    return `${currency}${price.toFixed(2)}`;
  };

  const handleIncrement = (productId) => {
    dispatch(incrementItem(productId));
  };

  const handleDecrement = (productId) => {
    dispatch(decrementItem(productId));
  };

  const handleAddToCart = (product) => {
    dispatch(addToItem(product));
  };
  const isProductAddedIntoCart = (productId) => {
    const obj = cartItems.find(
      (item) => item?.productId === productId
    );    
    return obj?.quantity;
  };  

  const subTotal = () => {
    const amount = cartItems.reduce(
      (item, { salePrice, quantity }) =>
        item + salePrice * quantity,
      0
    );
    return amount;
  };

  const getSavings = () => {
    let savings = 0
    cartItems.map((item) => {
      savings += applyOffer(item);
    });

    return savings;
  };

  const applyOffer = (product) => {
    switch(product.offer) {
      case 1: {
        
        const cartData = cartItems.find((item)=> item.productId === product.productId)
        if(cartData?.quantity === 1) {
          return 0  
        }
        if(cartData?.quantity % 2 === 0) {
          return product.salePrice * (cartData?.quantity/2)
        } else {        
          return product.salePrice * ((cartData.quantity - 1)/2)
        }
      }
      case 2: {
        if(product.isDepend) {
          const hasItem = cartItems.some((item) => item.productId == product.dependentProduct?.productId)
          if(hasItem) {
            return (product.salePrice / 2) * Math.floor(product.quantity);
          }
        } else {
          return (product.salePrice / 2) * Math.floor(product.quantity);
        }
        return 0
      }
      case 3: {
        return (product.salePrice / 3) * Math.floor(product.quantity);;
      }
      default: {
        return 0;
      }
    }
  };
  return (
    <div className="container-lg  sm:m-3 m-10">
      <div className="flex sm:flex-col shadow-md my-10">   
        <div className="w-3/4 md:w-2/4 sm:w-full  bg-white px-6 py-5">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-3xl font-bold leading-none text-gray-900 dark:text-white">
                  My Smart Basket
              </h5>
            </div>
            <div className="flow-root">
              <ul
                role="list"
                className="flex flex-wrap justify-center gap-7 lg:gap-4 "
              >
                {products.map(
                  (
                    product,
                    index
                  ) => {
                    const isDisabled = isProductAddedIntoCart(product.productId);
                    return (
                      <li className="card basis-1/6 sm:basis-full border-sm py-2 sm:py-4" key={index}>
                        <div className="flex flex-col w-full items-center ">
                          <div className="flex-shrink-0 border rounded-lg p-3">
                            <img
                              className="w-20 h-20 rounded-sm"
                              src={product.image}
                              alt={`${product.name}`}
                            />
                          </div>
                          <div className="flex items-end gap-7 py-3 w-full">
                            <div className="flex w-full flex-col">
                              <div className="flex gap-1 w-full items-center">
                                  <img className="w-5 object-contain h-5"
                                    src="/images/veg.png"
                                    alt="Veg"
                                  />
                                  <p className="text-sm font-light text-gray-500 truncate dark:text-white">
                                  Fresho</p>
                                </div>
                              <p className="text-xl font-bold text-teal-900 truncate dark:text-white">
                              {product.name}
                            </p>
                            </div>
                          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            {getPrice(product.salePrice)}
                          </div>
                          </div>
                          <button
                            type="button"
                            className={`text-white ${
                              isDisabled
                                ? "bg-gray-300"
                                : "bg-teal-600 hover:bg-teal-700"
                            }  focus:ring-3 focus:outline-none focus:ring-teal-200 dark:focus:ring-teal-900 font-medium rounded-md text-sm px-3 py-2 inline-flex justify-center items-center text-center`}
                            onClick={() => handleAddToCart(product)}
                            disabled={isDisabled}
                          >
                           <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="#ffffff" className="me-2"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20h44v44c0 11 9 20 20 20s20-9 20-20V180h44c11 0 20-9 20-20s-9-20-20-20H356V96c0-11-9-20-20-20s-20 9-20 20v44H272c-11 0-20 9-20 20z"/></svg>
                            Add
                          </button>
                        </div>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
        </div>
        <div className="w-1/4 md:w-2/4 sm:w-full   bg-gray-100 py-5 px-3 ">
            <div className="flex justify-between items-center px-2 pb-2">
              <h1 className="font-semibold text-2xl">Order Summary</h1>
              <div className="cart-icon relative">
                <svg  xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
              <span className="font-semibold text-xl absolute z-50 ">  {cartItems.length} </span>
              </div>
            </div>
            {cartItems.length ? (
              <>
                <div className="flex items-center justify-center my-5 py-3 border-y">
                  <h3 className="font-semibold text-xs uppercase w-2/5">
                    Product
                  </h3>
                  <h3 className="font-semibold text-xs uppercase w-1/5 text-center">
                    Qty
                  </h3>
                  <h3 className="font-semibold text-center text-xs uppercase w-1/5 text-center">
                    Price
                  </h3>
                  <h3 className="font-semibold text-center text-xs uppercase w-1/5 text-center">
                    Total
                  </h3>
                </div>
                <div className="h-72 overflow-auto">
                {cartItems?.map((cartItem, index) => {
                  const quantity = cartItem?.offer === 1 ? cartItem.quantity /2 : cartItem.quantity
                  return (
                    <div
                      key={index}
                      className=" py-5 "
                    >
                      <div className="flex items-center  ">
                        <div className="flex w-2/5 items-center">
                          <div className="flex-shrink-0">
                            <img
                              className="w-10 h-10 rounded-sm"
                              src={cartItem.image}
                              alt={cartItem.name}
                            />
                          </div>
                          <div className="flex flex-col justify-between ml-4 flex-grow">
                            <span className="font-bold text-sm">
                              {cartItem.name}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-center w-1/5 ">
                          <svg
                            className="fill-current w-5 cursor-pointer"
                            viewBox="0 0 448 512"
                            onClick={() => handleDecrement(cartItem)}
                          >
                            <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                          </svg>
                          
                          <input
                            className="mx-2 border text-center w-10 h-10 text-black"
                            type="text"
                            value={quantity}
                          />

                          <svg
                            className="fill-current w-5 cursor-pointer"
                            viewBox="0 0 448 512"
                            onClick={() => handleIncrement(cartItem)}
                          >
                            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                          </svg>
                        </div>
                        <span className="text-center w-1/5 font-semibold text-sm">
                          {getPrice(cartItem.salePrice)}
                        </span>
                        <span className="text-center w-1/5 font-semibold text-sm">
                          {getPrice(cartItem.salePrice * cartItem.quantity)}{" "}
                        </span>
                      </div>
                      {Boolean(applyOffer(cartItem)) && (
                        <>
                          <div className="flex justify-between mb-2 text-red-400">
                            {cartItem?.offer === 1 ? <div>Buy one get one : {quantity}</div> : <div></div>}
                            <div>Savings: {getPrice(applyOffer(cartItem))}</div>
                          </div>
                          <div className="flex justify-between mb-2">
                            <div></div>
                            <div>
                              Item price:{" "}
                              {getPrice(
                                cartItem.salePrice * cartItem.quantity -
                                  applyOffer(cartItem)
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
                </div>
              </>
            ) : (
              <div className="flex  mt-10 mb-5 justify-center items-center">
                <img className=" w-full" src="/images/empty.jpeg" alt="empty cart" />
              </div>
            )}
            {Boolean(cartItems.length) && (
              <>
                <div className="flex justify-between border-t pt-5 mb-5">
                  <div className="font-semibold">Sub Total:</div>
                  <div className="">{getPrice(subTotal())}</div>
                </div>
                <div className="flex justify-between border-t pt-5 mb-5 text-red-400">
                  <div className="font-semibold">Savings:</div>
                  <div className="">{getPrice(getSavings())}</div>
                </div>
                <div className="flex justify-between border-t pt-5">
                  <div className="mb-5 font-bold">Total Amount:</div>
                  <div className="mb-5 pb-2 font-bold">
                    {getPrice(subTotal() - getSavings())}
                  </div>
                </div>
              </>
            )}
          </div>
      </div>
    </div>
  );
}
