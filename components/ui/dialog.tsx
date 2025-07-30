'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils'; // если нет utils.ts — временно убери

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export function DialogContent({ children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50" />
      <DialogPrimitive.Content
        {...props}
        className="fixed inset-0 m-auto max-w-lg w-full bg-white p-6 rounded-md shadow-lg"
      >
        <button
          onClick={() => props.onClose?.()}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          <X />
        </button>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

