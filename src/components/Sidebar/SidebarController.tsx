'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
export function SidebarController() {
  const pathname = usePathname();

  function getDrawer() {
    return document.getElementById('my-drawer') as any;
  }
  const closeDrawer = React.useCallback(() => {
    getDrawer().checked = false;
  }, []);
  /* -------------------------------------------------------------------------- */
  React.useEffect(() => {
    closeDrawer();
  }, [pathname, closeDrawer]);
  /* -------------------------------------------------------------------------- */
  React.useEffect(() => {
    const btnclose = document.getElementById(
      'btn-close-sidebar'
    ) as HTMLElement;
    btnclose.removeEventListener('click', closeDrawer);
    btnclose.addEventListener('click', closeDrawer);
    return () => {
      btnclose.removeEventListener('click', closeDrawer);
    };
  }, [closeDrawer]);
  return <></>;
}
