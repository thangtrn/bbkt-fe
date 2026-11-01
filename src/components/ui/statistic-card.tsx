import { ReactNode } from 'react';
import { Flex, Typography } from 'antd';

interface StatisticCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

export const StatisticCard = ({ title, value, icon }: StatisticCardProps) => {
  return (
    <Flex
      flex={1}
      style={{
        padding: '12px 16px',
        backgroundColor: '#fff',
        borderRadius: '12px',
      }}
      gap={20}
      align="center"
    >
      <Flex
        style={{
          borderRadius: '50%',
          backgroundColor: '#F4F7FE',
          width: '52px',
          height: '52px',
          flexShrink: 0,
        }}
        align="center"
        justify="center"
      >
        {icon}
      </Flex>

      <Flex vertical>
        <Typography
          style={{
            fontSize: '14px',
            color: '#94A3B8',
          }}
        >
          {title}
        </Typography>

        <Typography
          style={{
            fontSize: '22px',
            color: '#003C71',
            fontWeight: 600,
            letterSpacing: '1.5px',
          }}
        >
          {value}
        </Typography>
      </Flex>
    </Flex>
  );
};
