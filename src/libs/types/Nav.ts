import { StackProps } from '@mui/material/Stack';
import { Theme, SxProps } from '@mui/material/styles';
import { ListItemButtonProps } from '@mui/material/ListItemButton';

// ----------------------------------------------------------------------

export type SlotProps = {
  gap?: number;
  rootItem?: SxProps<Theme>;
  subItem?: SxProps<Theme>;
  subheader?: SxProps<Theme>;
  currentRole?: string;
};

export type NavItemStateProps = {
  depth?: number;
  open?: boolean;
  active?: boolean;
  hasChild?: boolean;
  currentRole?: string;
  externalLink?: boolean;
};

export type NavItemBaseProps = {
  id: string;
  title: string;
  path: string;
  image?: string | null;
  info?: React.ReactElement | string;
  caption?: string;
  disabled?: boolean;
  roles?: string[];
  children?: any;
};

export type NavItemProps = ListItemButtonProps &
  NavItemStateProps &
  NavItemBaseProps & {
    slotProps?: SlotProps;
  };

export type NavListProps = {
  data: NavItemBaseProps;
  depth?: number;
  slotProps?: SlotProps;
};

export type NavSubListProps = {
  data: NavItemBaseProps[];
  depth: number;
  slotProps?: SlotProps;
};

export type NavGroupProps = {
  subheader?: string;
  items: NavItemBaseProps[];
  slotProps?: SlotProps;
};

export type NavProps = StackProps & {
  data: {
    subheader: string;
    items: NavItemBaseProps[];
  }[];
  slotProps?: SlotProps;
};

export type NavMiniProps = {
  data: NavItemBaseProps[];
  slotProps?: SlotProps;
};

export type NavAvatarProps = {
  title: string;
  image?: string | null;
  invisible?: boolean;
};
