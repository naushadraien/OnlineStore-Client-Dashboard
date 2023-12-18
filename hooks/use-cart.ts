import { create } from "zustand";
import { Product } from "@/types";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-toastify";

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          toast("Item already in Cart!");
        } else {
          set({ items: [...get().items, data] });
          toast.success("Item Added to Cart!");
        }
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success("Item Removed From Cart!");
      },
      removeAll: () => {
        set({ items: [] });
      },
    }),
    {
      name: "cart-Storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
