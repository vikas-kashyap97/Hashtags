import {
  Typography,
  Card,
  Button,
  Input,
  Select,
  Modal,
  Form,
  Space,
  Table,
  message,
} from 'antd'
import { useState } from 'react'
import type { CommentTemplate } from '@prisma/client'
const { Title, Text } = Typography
const { TextArea } = Input
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function CommentTemplatesPage() {
  const { user } = useUserContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] =
    useState<CommentTemplate | null>(null)
  const [form] = Form.useForm()

  const { data: templates, refetch } = Api.commentTemplate.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { createdAt: 'desc' },
  })

  const { mutateAsync: createTemplate } =
    Api.commentTemplate.create.useMutation()
  const { mutateAsync: updateTemplate } =
    Api.commentTemplate.update.useMutation()
  const { mutateAsync: deleteTemplate } =
    Api.commentTemplate.delete.useMutation()

  const handleSubmit = async (values: any) => {
    try {
      if (editingTemplate) {
        await updateTemplate({
          where: { id: editingTemplate.id },
          data: values,
        })
        message.success('Template updated successfully')
      } else {
        await createTemplate({
          data: {
            ...values,
            userId: user?.id,
          },
        })
        message.success('Template created successfully')
      }
      setIsModalOpen(false)
      form.resetFields()
      refetch()
    } catch (error) {
      message.error('An error occurred')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteTemplate({ where: { id } })
      message.success('Template deleted successfully')
      refetch()
    } catch (error) {
      message.error('An error occurred')
    }
  }

  const columns = [
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      width: '40%',
    },
    {
      title: 'Platform',
      dataIndex: 'platform',
      key: 'platform',
      width: '20%',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: '20%',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '20%',
      render: (_: any, record: CommentTemplate) => (
        <Space>
          <Button
            type="primary"
            onClick={() => {
              setEditingTemplate(record)
              form.setFieldsValue(record)
              setIsModalOpen(true)
            }}
          >
            <i className="las la-edit"></i> Edit
          </Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            <i className="las la-trash"></i> Delete
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <div
          style={{
            marginBottom: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <Title level={2}>
              <i className="las la-comment"></i> Comment Templates
            </Title>
            <Text>Create and manage your automated response templates</Text>
          </div>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              setEditingTemplate(null)
              form.resetFields()
              setIsModalOpen(true)
            }}
          >
            <i className="las la-plus"></i> New Template
          </Button>
        </div>

        <Card>
          <Table
            dataSource={templates}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </Card>

        <Modal
          title={editingTemplate ? 'Edit Template' : 'Create Template'}
          open={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false)
            form.resetFields()
          }}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="content"
              label="Content"
              rules={[
                { required: true, message: 'Please input template content' },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item
              name="platform"
              label="Platform"
              rules={[{ required: true, message: 'Please select a platform' }]}
            >
              <Select>
                <Select.Option value="instagram">Instagram</Select.Option>
                <Select.Option value="twitter">Twitter</Select.Option>
                <Select.Option value="facebook">Facebook</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: 'Please input a category' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  {editingTemplate ? 'Update' : 'Create'}
                </Button>
                <Button
                  onClick={() => {
                    setIsModalOpen(false)
                    form.resetFields()
                  }}
                >
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
