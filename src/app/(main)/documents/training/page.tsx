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
import dayjs from 'dayjs';
import { MdDeleteForever } from 'react-icons/md';
import { useState } from 'react';
import { SelectColumn } from 'react-data-grid';

const { Title, Text } = Typography;

type ModalStage = 'view' | 'new' | 'edit' | null;

interface Row {
  id: string;
  schemaId: string;
  name: string;
  dataValues: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

// MOCK DATA
const mockRows: Row[] = [
  {
    id: 'd0b01266-190e-47db-9b60-567645b6da9f',
    schemaId: 'a8ed71a7-bd5b-424f-82b8-06497e1f84d2',
    name: 'LTT 1',
    dataValues: {
      coSo: 'Công ty TNHH Kỹ Thuật Tạo Khuôn LONGFA Việt Nam',
      canBo: 'Đại úy Nguyễn Đức Anh',
      chiHuy: 'Trung tá Văn Hoàng Hân',
      diaBan: 'phường Tân Hiệp và phường Tân Khánh',
      sources: {
        docx: {
          files: ['/LTT/templates/02. Mẫu danh sach diem danh.docx'],
        },
        excel: {
          file: '/LTT/excel/LTT.xlsx',
        },
      },
      daiDienCoSo: 'HE JINPING',
      ngayHuanLuyen: ['19/10/2026', '20/10/2026', '21/10/2026'],
      canBoHuanLuyen: 'Huỳnh Như An',
    },
    createdAt: new Date('2026-11-01T07:40:26.886Z'),
    updatedAt: new Date('2026-11-01T07:40:26.886Z'),
  },
  {
    id: 'd0b01266-190e-47db-9b60-567645b6da92',
    schemaId: 'a8ed71a7-bd5b-424f-82b8-06497e1f84d2',
    name: 'LTT 1',
    dataValues: {
      coSo: 'Công ty TNHH Kỹ Thuật Tạo Khuôn LONGFA Việt Nam',
      canBo: 'Đại úy Nguyễn Đức Anh',
      chiHuy: 'Trung tá Văn Hoàng Hân',
      diaBan: 'phường Tân Hiệp và phường Tân Khánh',
      sources: {
        docx: {
          files: ['/LTT/templates/02. Mẫu danh sach diem danh.docx'],
        },
        excel: {
          file: '/LTT/excel/LTT.xlsx',
        },
      },
      daiDienCoSo: 'HE JINPING',
      ngayHuanLuyen: ['19/10/2026', '20/10/2026', '21/10/2026'],
      canBoHuanLuyen: 'Huỳnh Như An',
    },
    createdAt: new Date('2026-11-01T07:40:26.886Z'),
    updatedAt: new Date('2026-11-01T07:40:26.886Z'),
  },
];

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
                color="lime-inverse"
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

const TranningPage = () => {
  const [openModal, setOpenModal] = useState<ModalStage>(null);
  const [selectedRows, setSelectedRows] = useState(
    (): ReadonlySet<string> => new Set(),
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

  const handleModalChange = (stage: ModalStage) => {
    setOpenModal(stage);
  };

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
            <Text type="secondary">Tổng cộng {mockRows.length} hồ sơ</Text>
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
              <Button icon={<ReloadOutlined />} color="cyan" variant="outlined">
                Làm mới
              </Button>

              <Divider
                orientation="vertical"
                style={{ height: 24, marginInline: 8 }}
              />

              <Button
                icon={<EyeOutlined />}
                color="cyan"
                variant="filled"
                onClick={() => handleModalChange('view')}
              >
                Chi tiết
              </Button>

              <Button
                icon={<PlusOutlined />}
                color="blue"
                variant="filled"
                onClick={() => handleModalChange('new')}
              >
                Thêm mới
              </Button>

              <Button
                icon={<RiEdit2Fill />}
                color="volcano"
                variant="filled"
                onClick={() => handleModalChange('edit')}
              >
                Chỉnh sửa
              </Button>

              <Button
                color="danger"
                variant="filled"
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
          rows={mockRows}
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
      <Modal
        title="Modal 1000px width"
        centered
        open={openModal != null}
        onOk={() => handleModalChange(null)}
        onCancel={() => handleModalChange(null)}
        width={1000}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
};

export default TranningPage;
