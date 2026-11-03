'use client';

import AppDataGrid from '@/components/data-grid/app-data-grid';
import { AppColumnOrColumnGroup } from '@/components/data-grid/app-data-grid.type';
import { RowNumberColumn } from '@/components/data-grid/colums';

import {
  Button,
  Card,
  Divider,
  Flex,
  Input,
  message,
  Modal,
  Row,
  Space,
  Tag,
  Typography,
} from 'antd';

import {
  PlusOutlined,
  SearchOutlined,
  ReloadOutlined,
  EyeOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { RiEdit2Fill } from 'react-icons/ri';
import { MdDeleteForever } from 'react-icons/md';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SelectColumn } from 'react-data-grid';
import RecordSchemaService from '@/services/record-schema.service';
import RecordDataService from '@/services/record-data.service';
import { RecordData } from '@/types/record-data.type';
import { RecordSchema } from '@/types/record-schema.type';
import AppLoading from '@/components/ui/app-loading';

const { Title, Text } = Typography;

interface Row {
  id: string;
  schemaId: string;
  name: string;
  dataValues: Record<string, any>;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// COLUMNS
const columns: readonly AppColumnOrColumnGroup<Row>[] = [
  SelectColumn,
  RowNumberColumn,
  {
    key: 'name',
    name: 'Tên hồ sơ',
    frozen: true,
    renderCell: ({ row }) => <Text strong>{row.name}</Text>,
  },
  {
    key: 'daiDienCoSo',
    name: 'Đại diện cơ sở',
    renderCell: ({ row }) => <Text>{row.dataValues.daiDienCoSo}</Text>,
  },
  {
    key: 'coSo',
    name: 'Cơ sở',
    renderCell: ({ row }) => <Text>{row.dataValues.coSo}</Text>,
  },
  {
    key: 'diaBan',
    name: 'Địa bàn',
    renderCell: ({ row }) => <Text>{row.dataValues.diaBan}</Text>,
  },
  {
    key: 'canBo',
    name: 'Cán bộ phụ trách',
    renderCell: ({ row }) => <Text>{row.dataValues.canBo}</Text>,
  },
  {
    key: 'chiHuy',
    name: 'Chỉ huy',
    renderCell: ({ row }) => <Text>{row.dataValues.chiHuy}</Text>,
  },
  {
    key: 'canBoHuanLuyen',
    name: 'Cán bộ huấn luyện',
    renderCell: ({ row }) => <Text>{row.dataValues.canBoHuanLuyen}</Text>,
  },
  {
    key: 'ngayHuanLuyen',
    name: 'Ngày huấn luyện',
    width: 310,
    renderCell: ({ row }) => {
      const dates = row.dataValues.ngayHuanLuyen ?? [];

      return (
        <Flex gap={4} align="center" wrap="nowrap">
          {dates.length > 0 ? (
            dates.map((date: string, index: number) => (
              <Tag
                key={`${date}-${index}`}
                variant="solid"
                color="cyan"
                style={{
                  margin: 0,
                  flexShrink: 0,
                  borderRadius: 6,
                }}
              >
                <CalendarOutlined style={{ marginRight: 4 }} />
                {date}
              </Tag>
            ))
          ) : (
            <Text type="secondary">Chưa có lịch</Text>
          )}
        </Flex>
      );
    },
  },
];

// ------------------------- MAIN -------------------------

const TranningPage = () => {
  const [selectedRows, setSelectedRows] = useState(
    (): ReadonlySet<string> => new Set(),
  );

  const [recordSchema, setRecordSchema] = useState<RecordSchema | null>(null);
  const [recordData, setRecordData] = useState<RecordData[]>([]);
  const [loading, setLoading] = useState(false);

  const selectedRecord = useMemo(
    () => recordData.find((record) => selectedRows.has(record.id)),
    [recordData, selectedRows],
  );

  const handleSelectedRowsChange = (newSelectedRows: ReadonlySet<string>) => {
    if (newSelectedRows.size === 0) {
      setSelectedRows(new Set());
      return;
    }

    const selectedId = [...newSelectedRows].find((id) => !selectedRows.has(id));

    setSelectedRows(
      new Set(selectedId ? [selectedId] : [...selectedRows].slice(0, 1)),
    );
  };

  const fetchRecordSchemaData = async () => {
    setLoading(true);
    try {
      const result = await RecordSchemaService.getOne<RecordSchema | null>(
        `?filter[0][field]=code&filter[0][type]=Eq&filter[0][value]=LTT`,
      );

      setRecordSchema(result);
    } catch (error) {
      console.log('ERROR', error);
      message.error('Tải schema thất bại');
    } finally {
      setLoading(false);
    }
  };

  const fetchRecordData = useCallback(async () => {
    if (!recordSchema?.id) return;

    setLoading(true);

    try {
      // await new Promise((resolve) => setTimeout(resolve, 3000));

      const result = await RecordDataService.getWithParams<RecordData[]>(
        `?filter[0][field]=schemaId&filter[0][type]=Eq&filter[0][value]=${recordSchema.id}`,
      );

      setRecordData(result ?? []);
      message.open({
        type: result ? 'success' : 'warning',
        content: result ? 'Tải dữ liệu thành công' : 'Không có dữ liệu',
      });
    } catch (error) {
      console.log('ERROR', error);
      message.error('Tải dữ liệu thất bại');
    } finally {
      setLoading(false);
    }
  }, [recordSchema]);

  // Fetch schema khi component mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRecordSchemaData();
  }, []);

  // Fetch recordData khi schema thay đổi
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRecordData();
  }, [fetchRecordData]);

  return (
    <>
      <Flex orientation="vertical" gap={12}>
        <Card
          styles={{
            body: {
              padding: 10,
            },
          }}
          title={
            <Flex vertical gap={2}>
              <Title level={5} style={{ margin: 0 }}>
                Danh sách hồ sơ
              </Title>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Quản lý toàn bộ hồ sơ huấn luyện
              </Text>
            </Flex>
          }
          extra={
            <Text type="secondary">
              Tổng cộng {recordData?.length || 0} hồ sơ
            </Text>
          }
        >
          {/* TOOLBAR */}
          <Flex justify="space-between" align="center" gap={12} wrap="wrap">
            <Space wrap>
              <Input
                placeholder="Tìm kiếm hồ sơ..."
                prefix={<SearchOutlined />}
                style={{ width: 260 }}
                allowClear
              />
            </Space>

            <Flex align="center" gap={8} wrap="wrap">
              <Button
                icon={<ReloadOutlined />}
                color="cyan"
                variant="outlined"
                loading={loading}
                onClick={fetchRecordData}
              >
                Làm mới
              </Button>

              <Divider
                orientation="vertical"
                style={{ height: 24, marginInline: 8 }}
              />

              <Button
                icon={<PlusOutlined />}
                color="blue"
                variant="filled"
                loading={loading}
              >
                Thêm mới
              </Button>

              <Button
                icon={<EyeOutlined />}
                color="cyan"
                variant="filled"
                disabled={!selectedRows.size}
                loading={loading}
              >
                Chi tiết
              </Button>

              <Button
                icon={<RiEdit2Fill />}
                color="volcano"
                variant="filled"
                disabled={!selectedRows.size}
                loading={loading}
              >
                Chỉnh sửa
              </Button>

              <Button
                color="danger"
                variant="filled"
                disabled={!selectedRows.size}
                loading={loading}
                icon={<MdDeleteForever />}
              >
                Xóa
              </Button>
            </Flex>
          </Flex>
        </Card>
        <AppDataGrid
          rowKeyGetter={(row) => row.id}
          columns={columns}
          rows={recordData}
          selectedRows={selectedRows}
          onSelectedRowsChange={handleSelectedRowsChange}
          defaultColumnOptions={{
            textAlign: 'center',
            resizable: true,
          }}
          style={{
            height: 555,
          }}
        />
      </Flex>
      <AppLoading loading={loading} />
    </>
  );
};

export default TranningPage;
