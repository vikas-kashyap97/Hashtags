import {
  Typography,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  message,
} from 'antd'
import { useState } from 'react'
import type { Prisma } from '@prisma/client'
const { Title, Text } = Typography
type HashtagWithRelations = Prisma.HashtagGetPayload<{
  include: { user: true }
}>
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HashtagManagerPage() {
  const { user } = useUserContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingHashtag, setEditingHashtag] =
    useState<HashtagWithRelations | null>(null)
  const [form] = Form.useForm()

  const { data: hashtags, refetch } = Api.hashtag.findMany.useQuery({
    where: { userId: user?.id },
    include: { user: true },
  })

  const { mutateAsync: createHashtag } = Api.hashtag.create.useMutation()
  const { mutateAsync: updateHashtag } = Api.hashtag.update.useMutation()
  const { mutateAsync: deleteHashtag } = Api.hashtag.delete.useMutation()

  const handleSubmit = async (values: any) => {
    try {
      if (editingHashtag) {
        await updateHashtag({
          where: { id: editingHashtag.id },
          data: {
            name: values.name,
            platform: values.platform,
            status: 'ACTIVE',
            monitoringSettings: values.monitoringSettings,
          },
        })
        message.success('Hashtag updated successfully')
      } else {
        await createHashtag({
          data: {
            name: values.name,
            platform: values.platform,
            status: 'ACTIVE',
            monitoringSettings: values.monitoringSettings,
            userId: user?.id,
          },
        })
        message.success('Hashtag created successfully')
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
      await deleteHashtag({ where: { id } })
      message.success('Hashtag deleted successfully')
      refetch()
    } catch (error) {
      message.error('An error occurred')
    }
  }

  const columns = [
    {
      title: 'Hashtag',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Text>#{text}</Text>,
    },
    {
      title: 'Platform',
      dataIndex: 'platform',
      key: 'platform',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: HashtagWithRelations) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              setEditingHashtag(record)
              form.setFieldsValue({
                name: record.name,
                platform: record.platform,
                monitoringSettings: record.monitoringSettings,
              })
              setIsModalOpen(true)
            }}
          >
            <i className="las la-edit" />
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            <i className="las la-trash-alt" />
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
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <div>
            <Title level={2}>Hashtag Manager</Title>
            <Text>
              Monitor and manage your hashtags across different social media
              platforms
            </Text>
          </div>
          <Button
            type="primary"
            onClick={() => {
              setEditingHashtag(null)
              form.resetFields()
              setIsModalOpen(true)
            }}
          >
            <i className="las la-plus" /> Add Hashtag
          </Button>
        </div>

        <Table dataSource={hashtags} columns={columns} rowKey="id" />

        <Modal
          title={editingHashtag ? 'Edit Hashtag' : 'Add New Hashtag'}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="name"
              label="Hashtag Name"
              rules={[
                { required: true, message: 'Please input the hashtag name!' },
              ]}
            >
              <Input prefix="#" placeholder="Enter hashtag without #" />
            </Form.Item>

            <Form.Item
              name="platform"
              label="Platform"
              rules={[{ required: true, message: 'Please select a platform!' }]}
            >
              <Select>
                <Select.Option value="TWITTER">Twitter</Select.Option>
                <Select.Option value="INSTAGRAM">Instagram</Select.Option>
                <Select.Option value="FACEBOOK">Facebook</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="monitoringSettings"
              label="Monitoring Settings"
              rules={[
                {
                  required: true,
                  message: 'Please input monitoring settings!',
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Enter monitoring settings in JSON format"
              />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  {editingHashtag ? 'Update' : 'Create'}
                </Button>
                <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
