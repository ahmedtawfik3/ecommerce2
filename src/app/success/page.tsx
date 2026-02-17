"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";

export default function SuccessPage() {
  const router = useRouter();
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    setTimeout(() => {
      router.push("/");
    }, 1500);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen text-2xl font-bold">
      Payment Successful ✅
    </div>
  );
}
