import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const CouponContext = createContext();

const coupons = {
  SAVE10: 10,
  WELCOME20: 20,
  FESTIVE50: 50,
};

export function CouponProvider({ children }) {
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");

  function applyCoupon(code) {
    const upperCode = code.toUpperCase();

    if (coupons[upperCode]) {
      setDiscountPercent(coupons[upperCode]);
      setAppliedCoupon(upperCode);
      toast.success(`${upperCode} applied!`);
    } else {
      setDiscountPercent(0);
      setAppliedCoupon("");
      toast.error("Invalid coupon code!");
    }
  }

  function clearCoupon() {
    setDiscountPercent(0);
    setAppliedCoupon("");
  }

  return (
    <CouponContext.Provider
      value={{
        discountPercent,
        appliedCoupon,
        applyCoupon,
        clearCoupon,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
}

export function useCoupon() {
  return useContext(CouponContext);
}