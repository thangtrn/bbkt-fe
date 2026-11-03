'use client';

import { Button, DatePicker, Form, Input, InputNumber, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export interface DynamicFieldDefinition {
  name: string;
  field: string;
  type: string;
  required?: boolean;
}

interface DynamicFieldProps {
  field: DynamicFieldDefinition;
  disabled?: boolean;
}

const DynamicField = ({ field, disabled = false }: DynamicFieldProps) => {
  const rules = field.required
    ? [
        {
          required: true,
          message: `Vui lòng nhập ${field.name.toLowerCase()}`,
        },
      ]
    : [];

  switch (field.type) {
    case 'number':
      return (
        <Form.Item name={field.field} label={field.name} rules={rules}>
          <InputNumber
            disabled={disabled}
            style={{ width: '100%' }}
            placeholder={`Nhập ${field.name.toLowerCase()}`}
          />
        </Form.Item>
      );

    case 'date':
      return (
        <Form.Item name={field.field} label={field.name} rules={rules}>
          <DatePicker
            disabled={disabled}
            style={{ width: '100%' }}
            format="DD/MM/YYYY"
          />
        </Form.Item>
      );

    case 'array':
      return (
        <Form.Item label={field.name} required={field.required}>
          <Form.List
            name={field.field}
            rules={
              field.required
                ? [
                    {
                      validator: async (_, values) => {
                        if (!values || values.length === 0) {
                          throw new Error(
                            `Vui lòng nhập ${field.name.toLowerCase()}`,
                          );
                        }

                        if (
                          values.some(
                            (value: string) => !value || !value.trim(),
                          )
                        ) {
                          throw new Error(`${field.name} không được để trống`);
                        }
                      },
                    },
                  ]
                : []
            }
          >
            {(fields, { add, remove }, { errors }) => (
              <Space direction="vertical" style={{ width: '100%' }}>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ width: '100%' }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={name}
                      style={{
                        flex: 1,
                        marginBottom: 0,
                      }}
                    >
                      <Input
                        disabled={disabled}
                        placeholder={`Nhập ${field.name.toLowerCase()}`}
                      />
                    </Form.Item>

                    {!disabled && (
                      <Button
                        danger
                        type="text"
                        icon={<MinusCircleOutlined />}
                        onClick={() => remove(name)}
                      />
                    )}
                  </Space>
                ))}

                {!disabled && (
                  <Button
                    type="dashed"
                    onClick={() => add('')}
                    icon={<PlusOutlined />}
                    block
                  >
                    Thêm {field.name.toLowerCase()}
                  </Button>
                )}

                <Form.ErrorList errors={errors} />
              </Space>
            )}
          </Form.List>
        </Form.Item>
      );

    case 'string':
    default:
      return (
        <Form.Item name={field.field} label={field.name} rules={rules}>
          <Input
            disabled={disabled}
            placeholder={`Nhập ${field.name.toLowerCase()}`}
          />
        </Form.Item>
      );
  }
};

export default DynamicField;
