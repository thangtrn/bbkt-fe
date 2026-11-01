import type { ReactNode } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { GrDocumentConfig } from 'react-icons/gr';
import { RiAiGenerate3dLine } from 'react-icons/ri';

export type NavigationItem = {
  id: string;
  label: string;
  path: string;
  icon?: ReactNode;
  children?: readonly NavigationItem[];
};

export const NAVIGATION_ITEMS = [
  {
    id: 'home',
    label: 'Trang chủ',
    path: '/',
    icon: <AiOutlineHome size={18} />,
  },
  {
    id: 'settings',
    label: 'Cấu hình',
    path: '/settings',
    icon: <GrDocumentConfig size={18} />,
  },
  {
    id: 'documents',
    label: 'Hồ sơ',
    path: '/documents',
    icon: <RiAiGenerate3dLine size={18} />,
    children: [
      {
        id: 'training',
        label: 'Lớp tập trung',
        path: '/documents/training',
      },
      {
        id: 'plan-drill',
        label: 'Thực tập phương án',
        path: '/documents/plan-drill',
      },
    ],
  },
] satisfies readonly NavigationItem[];
