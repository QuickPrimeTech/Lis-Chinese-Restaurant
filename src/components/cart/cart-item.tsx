"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useCart, CartItem as CartItemType } from "@/contexts/cart-provider";
import Image from "next/image";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      setShowDeleteConfirm(true);
    } else {
      updateQuantity(String(item.id), newQuantity);
    }
  };

  const handleDelete = () => {
    removeFromCart(String(item.id));
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div className="w-full flex flex-col gap-5 p-4 border rounded-lg bg-white border-gray-200">
        {/* Product Image */}
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              fill
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 truncate">
              {item.name}
            </h4>
            {/* <p className="text-sm text-gray-600 truncate mt-1">
              {item.description}
            </p> */}
            <p className="text-lg font-bold text-primary mt-2">
              Ksh {item.price}
            </p>
          </div>
        </div>
        {/* Quantity Controls & Actions */}
        <div className="flex flex-col gap-4 flex-shrink-0">
          {/* Quantity Controls */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="flex items-center gap-0 bg-gray-100 rounded-lg border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="h-10 w-10 p-0 hover:bg-gray-200 rounded-l-lg rounded-r-none"
                title="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </Button>

              <div className="h-10 w-12 flex items-center justify-center bg-white border-x border-gray-200">
                <span className="text-lg font-semibold text-gray-900">
                  {item.quantity}
                </span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="h-10 w-10 p-0 hover:bg-gray-200 rounded-r-lg rounded-l-none"
                title="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Item Total */}
            <div className="text-right flex gap-2 items-center">
              <p className="text-sm text-gray-500">Total: </p>
              <p className="text-lg font-bold text-gray-900">
                Ksh {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Delete Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDeleteConfirm(true)}
            className="h-9 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-red-500" />
              Remove Item?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove <strong>{item.name}</strong> from
              your cart? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
            >
              Yes, Remove Item
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
