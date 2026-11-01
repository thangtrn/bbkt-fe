import { Empty } from 'antd';

export function EmptyRowsRenderer() {
  return (
    <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '10px' }}>
      <Empty
        image={Empty.PRESENTED_IMAGE_DEFAULT}
        description="Không có dữ liệu"
      />
    </div>
  );
}
