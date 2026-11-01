import { ROUTES } from '@/config/routes';
import Link from 'next/link';
import type { MenuProps } from 'antd';

export interface ActiveRoute {
  selectedKeys: string[];
  openKeys: string[];
}

const isRouteMatch = (pathname: string, route: string): boolean => {
  if (route === '/') {
    return pathname === '/';
  }

  return pathname === route || pathname.startsWith(`${route}/`);
};

const flattenRoutes = () => {
  return ROUTES.flatMap((route) => {
    const parent = {
      id: route.id,
      url: route.url,
      parentId: undefined,
    };

    const children =
      route.children?.map((child) => ({
        id: child.id,
        url: child.url,
        parentId: route.id,
      })) ?? [];

    return [parent, ...children];
  });
};

export const getActiveRoute = (pathname: string): ActiveRoute => {
  const routes = flattenRoutes();

  const matchedRoute = routes
    .filter((route) => isRouteMatch(pathname, route.url))
    // Route cụ thể nhất được ưu tiên.
    // /reports/weekly > /reports
    .sort((a, b) => b.url.length - a.url.length)[0];

  if (!matchedRoute) {
    return {
      selectedKeys: [],
      openKeys: [],
    };
  }

  return {
    selectedKeys: [matchedRoute.id],

    openKeys: matchedRoute.parentId ? [matchedRoute.parentId] : [],
  };
};


export const getMenuItems = (): MenuProps['items'] => {
  return ROUTES.map((route) => ({
    key: route.id,
    icon: route.icon,
    label: route.children ? (
      route.label
    ) : (
      <Link href={route.url}>{route.label}</Link>
    ),
    children: route.children?.map((child) => ({
      key: child.id,
      label: <Link href={child.url}>{child.label}</Link>,
    })),
  }));
};
