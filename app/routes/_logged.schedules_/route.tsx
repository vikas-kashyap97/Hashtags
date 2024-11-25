import {
  Typography,
  Table,
  Button,
  Modal,
  Form,
  Select,
  Input,
  Space,
  message,
} from 'antd'
import { useState } from 'react'
import type { Prisma } from '@prisma/client'
const { Title, Text } = Typography
type ScheduleRuleWithRelations = Prisma.ScheduleRuleGetPayload<{
  include: {
    hashtag: true
    template: true
    socialAccount: true
  }
}>
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ScheduleManagerPage() {
  const { user } = useUserContext()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [editingId, setEditingId] = useState<string | null>(null)

  // Fetch all necessary data
  const { data: scheduleRules, refetch } = Api.scheduleRule.findMany.useQuery({
    where: { userId: user?.id },
    include: {
      hashtag: true,
      template: true,
      socialAccount: true,
    },
  })

  const { data: hashtags } = Api.hashtag.findMany.useQuery({
    where: { userId: user?.id },
  })

  const { data: templates } = Api.commentTemplate.findMany.useQuery({
    where: { userId: user?.id },
  })

  const { data: socialAccounts } = Api.socialAccount.findMany.useQuery({
    where: { userId: user?.id },
  })

  // Mutations
  const { mutateAsync: createRule } = Api.scheduleRule.create.useMutation()
  const { mutateAsync: updateRule } = Api.scheduleRule.update.useMutation()
  const { mutateAsync: deleteRule } = Api.scheduleRule.delete.useMutation()

  const handleSubmit = async (values: any) => {
    try {
      const frequency = {
        interval: values.interval,
        time: values.time,
      }

      if (editingId) {
        await updateRule({
          where: { id: editingId },
          data: {
            frequency,
            hashtagId: values.hashtagId,
            templateId: values.templateId,
            socialAccountId: values.socialAccountId,
            status: 'ACTIVE',
          },
        })
      } else {
        await createRule({
          data: {
            frequency,
            hashtagId: values.hashtagId,
            templateId: values.templateId,
            socialAccountId: values.socialAccountId,
            status: 'ACTIVE',
            userId: user?.id,
          },
        })
      }

      message.success(
        `Schedule rule ${editingId ? 'updated' : 'created'} successfully`,
      )
      setIsModalVisible(false)
      form.resetFields()
      setEditingId(null)
      refetch()
    } catch (error) {
      message.error('An error occurred')
    }
  }

  const handleEdit = (record: ScheduleRuleWithRelations) => {
    setEditingId(record.id)
    const frequency = record.frequency as any
    form.setFieldsValue({
      interval: frequency.interval,
      time: frequency.time,
      hashtagId: record.hashtagId,
      templateId: record.templateId,
      socialAccountId: record.socialAccountId,
    })
    setIsModalVisible(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteRule({ where: { id } })
      message.success('Schedule rule deleted successfully')
      refetch()
    } catch (error) {
      message.error('An error occurred')
    }
  }

  const columns = [
    {
      title: 'Hashtag',
      dataIndex: ['hashtag', 'name'],
      key: 'hashtag',
    },
    {
      title: 'Template',
      dataIndex: ['template', 'content'],
      key: 'template',
      ellipsis: true,
    },
    {
      title: 'Social Account',
      dataIndex: ['socialAccount', 'platform'],
      key: 'socialAccount',
    },
    {
      title: 'Frequency',
      key: 'frequency',
      render: (record: ScheduleRuleWithRelations) => {
        const freq = record.frequency as any
        return `Every ${freq.interval} hours at ${freq.time}`
      },
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: ScheduleRuleWithRelations) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            <i className="las la-edit" /> Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            <i className="las la-trash" /> Delete
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
            <Title level={2}>Schedule Manager</Title>
            <Text>Create and manage your comment scheduling rules</Text>
          </div>
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            <i className="las la-plus" /> New Schedule Rule
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={scheduleRules}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />

        <Modal
          title={editingId ? 'Edit Schedule Rule' : 'Create Schedule Rule'}
          open={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false)
            setEditingId(null)
            form.resetFields()
          }}
          footer={null}
        >
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              name="hashtagId"
              label="Hashtag"
              rules={[{ required: true, message: 'Please select a hashtag' }]}
            >
              <Select placeholder="Select hashtag">
                {hashtags?.map(hashtag => (
                  <Select.Option key={hashtag.id} value={hashtag.id}>
                    {hashtag.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="templateId"
              label="Template"
              rules={[{ required: true, message: 'Please select a template' }]}
            >
              <Select placeholder="Select template">
                {templates?.map(template => (
                  <Select.Option key={template.id} value={template.id}>
                    {template.content}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="socialAccountId"
              label="Social Account"
              rules={[
                { required: true, message: 'Please select a social account' },
              ]}
            >
              <Select placeholder="Select social account">
                {socialAccounts?.map(account => (
                  <Select.Option key={account.id} value={account.id}>
                    {account.platform}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="interval"
              label="Interval (hours)"
              rules={[{ required: true, message: 'Please input interval' }]}
            >
              <Input type="number" min={1} />
            </Form.Item>

            <Form.Item
              name="time"
              label="Time"
              rules={[{ required: true, message: 'Please input time' }]}
            >
              <Input type="time" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                {editingId ? 'Update' : 'Create'}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
