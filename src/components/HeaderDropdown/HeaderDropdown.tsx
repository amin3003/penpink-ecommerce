'use client';
import React, { useState } from 'react';
import Link from '@/navigation';
import { Category } from '@codespase/core';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  FloatingFocusManager,
  useId,
} from '@floating-ui/react';
interface HeaderDropdownContentProps {}

const categories: Category[] = [
  new Category({ _id: '1', name: 'لوازم التحریر' }),
  new Category({ _id: '12', name: 'کتاب ها' }),
  new Category({ _id: '13', name: 'زونکن و کلاسورجدید' }),
  new Category({ _id: '14', name: 'اکسپندینگ و کلیربوک' }),
  new Category({ _id: '15', name: 'زیر دستی و آلبوم' }),
  new Category({ _id: '16', name: 'کیف و کوله پشتی' }),
  new Category({ _id: '17', name: 'ست محصول ها' }),
  new Category({ _id: 'zir1', parentid: '1', name: 'zir محصول ها' }),
  new Category({ _id: '3123232', parentid: 'zir1', name: 'subsub' }),
];

const mainCategories = categories.filter((s) => !s.parentid);

const HeaderDropdown: React.FC<HeaderDropdownContentProps> = ({}) => {

  
  const [currentItemId, setCurrentItemId] = useState('');
  const isOpen = Boolean(currentItemId);
 const { refs, floatingStyles, context } = useFloating({
   open: isOpen,
   onOpenChange: (open) => {
     if (!open) setCurrentItemId('');
   },
  
 });

 const click = useClick(context);
 const dismiss = useDismiss(context);
 const role = useRole(context);

 const { getReferenceProps, getFloatingProps } = useInteractions([
   click,
   dismiss,
   role,
 ]);

 const headingId = useId();




  const handleMouseEnter = (id: string) => {
    console.log(id)
    setCurrentItemId(id);
  
  };

  const handleMouseLeave = () => {
    setCurrentItemId("");
  };

  const currentItemSubCategories = React.useMemo(
    () => categories.filter((s) => s.parentid === currentItemId),
    [categories, currentItemId]
  );

  return (
    <>
      {mainCategories.map((v, i) => (
        <li
          key={i}
          className="mr-2 mt-2 p-2 list-none"
          onMouseEnter={() => handleMouseEnter(v._id)}
        >
          <Link href={`#${v.name}`}>
            <b>{v.name}</b>
          </Link>
        </li>
      ))}
      <div ref={refs.setReference} {...getReferenceProps()}></div>
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            className="Popover mx-auto"
            ref={refs.setFloating}
            style={{ ...floatingStyles, left: '35%' }}
            aria-labelledby={headingId}
            {...getFloatingProps()}
          >
            <ul className="menu xl:menu-horizontal lg:min-w-max bg-base-200 rounded-box">
              <li>
                <a>Solutions</a>
                <ul>
                  <li>
                    <a>Design</a>
                  </li>
                  <li>
                    <a>Development</a>
                  </li>
                  <li>
                    <a>Hosting</a>
                  </li>
                  <li>
                    <a>Domain register</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Enterprise</a>
                <ul>
                  <li>
                    <a>CRM software</a>
                  </li>
                  <li>
                    <a>Marketing management</a>
                  </li>
                  <li>
                    <a>Security</a>
                  </li>
                  <li>
                    <a>Consulting</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Products</a>
                <ul>
                  <li>
                    <a>UI Kit</a>
                  </li>
                  <li>
                    <a>Wordpress themes</a>
                  </li>
                  <li>
                    <a>Wordpress plugins</a>
                  </li>
                  <li>
                    <a>Open source</a>
                    <ul>
                      <li>
                        <a>Auth management system</a>
                      </li>
                      <li>
                        <a>VScode theme</a>
                      </li>
                      <li>
                        <a>Color picker app</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <a>Company</a>
                <ul>
                  <li>
                    <a>About us</a>
                  </li>
                  <li>
                    <a>Contact us</a>
                  </li>
                  <li>
                    <a>Privacy policy</a>
                  </li>
                  <li>
                    <a>Press kit</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
};

export default HeaderDropdown;
