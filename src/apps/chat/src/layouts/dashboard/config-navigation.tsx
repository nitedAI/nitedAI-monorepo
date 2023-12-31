import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import SvgColor from 'src/components/svg-color';
import { useGetChannelsByWorkspaceSlug } from '@hooks/useGetChannelsByWorkspaceSlug';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  hashtag: icon('ic_hashtag'),
  design: icon('ic_design'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const channels = useGetChannelsByWorkspaceSlug();

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: 'Channels',
        items: channels?.map((channel) => ({
          title: channel.name,
          path: channel.id,
          icon: channel.is_private ? ICONS.lock : ICONS.hashtag,
        })),
      },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        subheader: 'Teams (Coming soon)',
        items: [
          {
            title: 'design',
            path: paths.dashboard.group.root,
            icon: ICONS.design,
            children: [
              { title: 'ideas', path: paths.dashboard.group.root, icon: ICONS.hashtag },
              { title: 'concepts', path: paths.dashboard.group.five, icon: ICONS.hashtag },
              { title: 'decisions', path: paths.dashboard.group.six, icon: ICONS.lock },
            ],
          },
          {
            title: 'finance',
            path: paths.dashboard.group.root,
            icon: ICONS.banking,
            children: [
              { title: 'payroll', path: paths.dashboard.group.root, icon: ICONS.hashtag, info: '5' },
              { title: 'invoices', path: paths.dashboard.group.five, icon: ICONS.hashtag },
              { title: 'banking', path: paths.dashboard.group.six, icon: ICONS.lock },
            ],
          },
        ],
      },
    ],
    [channels],
  );

  return data;
}
