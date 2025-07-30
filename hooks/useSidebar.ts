import { useState, useCallback } from 'react';

export function useSidebar() {
  const [open, setOpen] = useState(false);
  const openSidebar = useCallback(() => setOpen(true), []);
  const closeSidebar = useCallback(() => setOpen(false), []);
  const toggleSidebar = useCallback(() => setOpen((v) => !v), []);
  return { open, openSidebar, closeSidebar, toggleSidebar };
} 