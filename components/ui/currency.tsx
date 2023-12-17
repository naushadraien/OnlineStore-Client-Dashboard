"use client";

import { useEffect, useState } from "react";

interface CurrencyProps {
  value?: string | number;
}

const PriceFormatter = new Intl.NumberFormat("en-Us", {
  style: "currency",
  currency: "USD",
});
const Currency: React.FC<CurrencyProps> = ({ value }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="font-semibold">{PriceFormatter.format(Number(value))}</div>
  );
};

export default Currency;
