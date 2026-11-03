'use client';

import { Button, Col, Form, Modal, Row, Spin } from 'antd';

import { useEffect } from 'react';

import DynamicField, { DynamicFieldDefinition } from './dynamic-field';

export interface RecordSchema {
  id: string;
  name: string;
  code: string;

  fieldsDefinition: {
    fields: DynamicFieldDefinition[];
    sources?: Record<string, any>;
    version?: number;
  };
}

export type ModalStage = 'view' | 'new' | 'edit';

interface DynamicRecordModalProps {
  open: boolean;
  mode: ModalStage;
  schema: RecordSchema | null;
  initialValues?: Record<string, any>;

  loading?: boolean;

  onCancel: () => void;

  onSubmit: (values: Record<string, any>) => Promise<void> | void;
}

const DynamicRecordModal = ({
  open,
  mode,
  schema,
  initialValues,
  loading = false,
  onCancel,
  onSubmit,
}: DynamicRecordModalProps) => {
  const [form] = Form.useForm();

  const isView = mode === 'view';

  const title = {
    view: 'Chi tiết hồ sơ',
    new: 'Thêm mới hồ sơ',
    edit: 'Chỉnh sửa hồ sơ',
  }[mode];

  useEffect(() => {
    if (!open) return;

    form.resetFields();

    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [open, initialValues, form]);

  const handleSubmit = async () => {
    const values = await form.validateFields();

    await onSubmit(values);
  };

  return (
    <Modal
      title={title}
      centered
      open={open}
      onCancel={onCancel}
      width={1000}
      destroyOnHidden
      footer={
        isView
          ? [
              <Button key="close" onClick={onCancel}>
                Đóng
              </Button>,
            ]
          : [
              <Button key="cancel" onClick={onCancel}>
                Hủy
              </Button>,

              <Button
                key="submit"
                type="primary"
                loading={loading}
                onClick={handleSubmit}
              >
                {mode === 'new' ? 'Tạo hồ sơ' : 'Lưu thay đổi'}
              </Button>,
            ]
      }
    >
      <Spin spinning={loading}>
        {schema && (
          <Form
            form={form}
            layout="vertical"
            disabled={isView}
            preserve={false}
          >
            <Row gutter={[16, 0]}>
              {schema.fieldsDefinition.fields.map((field) => (
                <Col key={field.field} xs={24} sm={12} md={12} lg={12}>
                  <DynamicField field={field} disabled={isView} />
                </Col>
              ))}
            </Row>
          </Form>
        )}
      </Spin>
    </Modal>
  );
};

export default DynamicRecordModal;
