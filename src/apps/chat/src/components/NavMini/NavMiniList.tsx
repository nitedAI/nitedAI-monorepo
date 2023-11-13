import { useRef } from 'react';

import { useActiveLink } from 'src/routes/hooks/use-active-link';

import NavItem from './NavMiniItem';
import { NavListProps } from '@ts/Nav';

// ----------------------------------------------------------------------

export default function NavMiniList({ data, depth = 1, slotProps }: NavListProps) {
  const navRef = useRef<HTMLDivElement | null>(null);

  const active = useActiveLink(data.path, !!data.children);

  return (
    <>
      <NavItem
        ref={navRef}
        //
        title={data.title}
        path={data.path}
        image={data.image}
        info={data.info}
        disabled={data.disabled}
        //
        depth={depth}
        currentRole={slotProps?.currentRole}
        //
        active={active}
        className={active ? 'active' : ''}
        sx={depth === 1 ? slotProps?.rootItem : slotProps?.subItem}
      />
    </>
  );
}
