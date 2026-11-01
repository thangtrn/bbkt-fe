import type { ReactNode } from 'react';
import { AiOutlineHome, AiOutlineBarChart } from 'react-icons/ai';

export type RouteItem = {
  id: string;
  label: string;
  url: string;
  icon?: ReactNode;
  children?: readonly RouteItem[];
};

export const ROUTES = [
  {
    id: 'home',
    label: 'Trang chủ',
    url: '/',
    icon: <AiOutlineHome size={18} />,
  },
  {
    id: 'report',
    label: 'Báo cáo',
    url: '/reports',
    icon: <AiOutlineBarChart size={18} />,
    children: [
      {
        id: 'weekly-report',
        label: 'Báo cáo tuần',
        url: '/reports/weekly',
      },
      {
        id: 'monthly-report',
        label: 'Báo cáo tháng',
        url: '/reports/monthly',
      },
      {
        id: 'quarterly-report',
        label: 'Báo cáo quý',
        url: '/reports/quarterly',
      },
      {
        id: 'yearly-report',
        label: 'Báo cáo năm',
        url: '/reports/yearly',
      },
    ],
  },
] satisfies readonly RouteItem[];
