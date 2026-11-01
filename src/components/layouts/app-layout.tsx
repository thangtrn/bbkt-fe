'use client';

import { useMemo } from 'react';
import { Avatar, Dropdown, Flex, Layout, Menu, Typography } from 'antd';
import { LogoutOutlined, UsergroupDeleteOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { getActiveRoute, getMenuItems } from '@/lib/route-utils';

const { Header, Content } = Layout;
const { Text } = Typography;

const userData = {
  profileImage:
    'https://i.pinimg.com/736x/9d/44/e8/9d44e8cea3432c943a11c88ce9cd28ca.jpg',
  firstName: 'Thắng',
  lastName: 'Trần',
  emailId: 'thangtrn01@gmail.com',
};

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const pathname = usePathname();

  const menuItems = useMemo(() => getMenuItems(), []);

  const activeRoute = useMemo(() => getActiveRoute(pathname), [pathname]);

  const settingItems = useMemo(
    () => [
      {
        key: 'profile',
        icon: <UsergroupDeleteOutlined />,
        label: <Link href="/account/settings">Cài đặt tài khoản</Link>,
      },
      {
        type: 'divider' as const,
      },
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: 'Đăng xuất',
        danger: true,
      },
    ],
    [],
  );

  return (
    <Layout className="app-layout">
      <Header>
        {/* Logo */}
        <Flex></Flex>
        <Link href="/" className="app-logo">
          <Image
            src="/images/pccc-logo.png"
            alt="app logo"
            width={48}
            height={48}
            loading="eager"
          />

          <Text>PCCC&CNCH</Text>
        </Link>

        {/* User */}
        <Dropdown
          menu={{
            items: settingItems,
          }}
          // trigger={['click']}
          arrow
        >
          <Flex align="center" gap={6} className="setting">
            <Avatar size={40} src={userData.profileImage} />

            <Flex vertical gap={4}>
              <Text className="setting-title">
                {userData.firstName} {userData.lastName}
              </Text>

              <Text type="secondary" className="setting-subtitle">
                {userData.emailId}
              </Text>
            </Flex>
          </Flex>
        </Dropdown>
      </Header>

      {/* Navigation */}
      <Menu
        className="app-menu"
        mode="horizontal"
        items={menuItems}
        selectedKeys={activeRoute.selectedKeys}
        style={{ height: 40 }}
      />

      <Content>{children}</Content>
    </Layout>
  );
};

export default AppLayout;
