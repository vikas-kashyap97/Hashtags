import { Typography, Table, DatePicker, Select, Space, Card } from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
const { RangePicker } = DatePicker
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ActivityLogPage() {
  const { user } = useUserContext()
  const [platform, setPlatform] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(
    null,
  )

  const { data: activityLogs, isLoading } = Api.activityLog.findMany.useQuery({
    where: {
      userId: user?.id,
      ...(platform && { socialAccount: { platform } }),
      ...(status && { status }),
      ...(dateRange && {
        createdAt: {
          gte: dateRange[0].toISOString(),
          lte: dateRange[1].toISOString(),
        },
      }),
    },
    include: {
      socialAccount: true,
      template: true,
      hashtag: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  const columns = [
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Platform',
      dataIndex: ['socialAccount', 'platform'],
      key: 'platform',
    },
    {
      title: 'Action',
      dataIndex: 'actionType',
      key: 'actionType',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Text type={status === 'SUCCESS' ? 'success' : 'danger'}>
          <i
            className={`las ${
              status === 'SUCCESS' ? 'la-check-circle' : 'la-exclamation-circle'
            }`}
          ></i>{' '}
          {status}
        </Text>
      ),
    },
    {
      title: 'Details',
      key: 'details',
      render: (record: any) => (
        <Space direction="vertical" size="small">
          {record.postId && <Text>Post ID: {record.postId}</Text>}
          {record.commentId && <Text>Comment ID: {record.commentId}</Text>}
          {record.template?.content && (
            <Text>
              Comment:{' '}
              {record.template.content.length > 50
                ? `${record.template.content.substring(0, 50)}...`
                : record.template.content}
            </Text>
          )}
          {record.hashtag?.name && <Text>Hashtag: #{record.hashtag.name}</Text>}
          {record.errorMessage && (
            <Text type="danger">Error: {record.errorMessage}</Text>
          )}
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-history"></i> Activity Log
        </Title>
        <Text>
          Track and monitor all system activities, comments, and interactions
          across different platforms.
        </Text>

        <Card style={{ marginTop: 24, marginBottom: 24 }}>
          <Space size="large">
            <Select
              style={{ width: 200 }}
              placeholder="Filter by Platform"
              allowClear
              onChange={setPlatform}
              options={[
                { value: 'INSTAGRAM', label: 'Instagram' },
                { value: 'TWITTER', label: 'Twitter' },
                { value: 'FACEBOOK', label: 'Facebook' },
              ]}
            />
            <Select
              style={{ width: 200 }}
              placeholder="Filter by Status"
              allowClear
              onChange={setStatus}
              options={[
                { value: 'SUCCESS', label: 'Success' },
                { value: 'ERROR', label: 'Error' },
                { value: 'PENDING', label: 'Pending' },
              ]}
            />
            <RangePicker
              onChange={dates =>
                setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs])
              }
              style={{ width: 300 }}
            />
          </Space>
        </Card>

        <Table
          columns={columns}
          dataSource={activityLogs}
          loading={isLoading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: true }}
        />
      </div>
    </PageLayout>
  )
}
