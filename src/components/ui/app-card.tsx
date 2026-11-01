'use client';

import { Card, type CardProps } from 'antd';
import { createStyles } from 'antd-style';
import type { CSSProperties } from 'react';

const useStyles = createStyles(() => ({
  container: {
    '& .ant-card-body': {
      padding: 12,
    },
  },
}));

type AppCardProps = CardProps &
  CSSProperties & {
    children: React.ReactNode;
  };

const AppCard = ({ children, className, ...props }: AppCardProps) => {
  const { styles, cx } = useStyles();

  return (
    <Card
      className={cx(styles.container, className)}
      style={{
        ...props,
      }}
    >
      {children}
    </Card>
  );
};

export default AppCard;
