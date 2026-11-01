import type { ReactNode } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { GrDocumentConfig } from 'react-icons/gr';
import { RiAiGenerate3dLine } from 'react-icons/ri';

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
    id: 'configuation',
    label: 'Cấu hình',
    url: '/configuation',
    icon: <GrDocumentConfig size={18} />,
  },
  {
    id: 'documents',
    label: 'Hồ sơ',
    url: '/documents',
    icon: <RiAiGenerate3dLine size={18} />,
    children: [
      {
        id: 'training',
        label: 'Lớp tập trung',
        url: '/documents/training',
      },
      {
        id: 'plan-drill',
        label: 'Thực tập phương án',
        url: '/documents/plan-drill',
      },
    ],
  },
] satisfies readonly RouteItem[];
