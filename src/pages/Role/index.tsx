import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spin, Alert, Button, Modal, Form, Input, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';

interface Role {
  createdAt: string;
  name: string;
  description: string;
}

const RolesTable: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:7777/roles');
        setRoles(response.data.results);
      } catch (err: unknown) {
        console.error('Error fetching roles:', err);
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleCreate = async (values: any) => {
    try {
      await axios.post('http://localhost:7777/roles', values);
      const response = await axios.get('http://localhost:7777/roles');
      setRoles(response.data.results);
      setIsModalVisible(false);
      form.resetFields();
    } catch (err: unknown) {
      console.error('Error creating role:', err);
      if (axios.isAxiosError(err)) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  const handleEdit = (role: Role) => {
    setEditingRole(role);
    form.setFieldsValue(role);
    setIsModalVisible(true);
  };

  const handleDelete = async (roleName: string) => {
    try {
      await axios.delete(`http://localhost:7777/roles/${roleName}`);
      const response = await axios.get('http://localhost:7777/roles');
      setRoles(response.data.results);
    } catch (err: unknown) {
      console.error('Error deleting role:', err);
      if (axios.isAxiosError(err)) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  const handlePermissionModify = (role: Role) => {
    // Implement the functionality for modifying permissions
    console.log('Modify permissions for:', role);
    // You can create a new modal or page to handle permissions
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: ( record: Role) => (
        <span>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)} 
            style={{ marginRight: 8 }} 
          />
          <Popconfirm
            title="Are you sure to delete this role?"
            onConfirm={() => handleDelete(record.name)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} style={{ marginRight: 8 }} />
          </Popconfirm>
          <Button 
            icon={<SettingOutlined />} 
            onClick={() => handlePermissionModify(record)} 
          />
        </span>
      ),
    },
  ];

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return (
      <Alert message="Error fetching roles" description={error} type="error" showIcon />
    );
  }

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Create Role
      </Button>
      <Table
        dataSource={roles}
        columns={columns}
        rowKey="name"
        pagination={{ pageSize: 10 }}
      />
      
      <Modal
        title={editingRole ? "Edit Role" : "Create Role"}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingRole(null);
        }}
        footer={null}
      >
        <Form 
          form={form} 
          layout="vertical" 
          onFinish={editingRole ? handleCreate : handleCreate}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter the role name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter a description' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingRole ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RolesTable;
