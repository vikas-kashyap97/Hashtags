import {
  Typography,
  Card,
  Button,
  Row,
  Col,
  Space,
  Tag,
  Tooltip,
  message,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function SocialAccountsPage() {
  const { user } = useUserContext()
  const [loading, setLoading] = useState<Record<string, boolean>>({})

  // Fetch social accounts
  const { data: socialAccounts, refetch } = Api.socialAccount.findMany.useQuery(
    {
      where: { userId: user?.id },
      orderBy: { createdAt: 'desc' },
    },
  )

  // Mutations for connecting/disconnecting accounts
  const { mutateAsync: updateAccount } = Api.socialAccount.update.useMutation()
  const { mutateAsync: deleteAccount } = Api.socialAccount.delete.useMutation()
  const { mutateAsync: createAccount } = Api.socialAccount.create.useMutation()

  // Handle social media connection
  const handleConnect = async (platform: string) => {
    try {
      setLoading({ ...loading, [platform]: true })

      // Simulate OAuth flow (in real app, this would redirect to the platform's OAuth page)
      await createAccount({
        data: {
          platform,
          userId: user?.id,
          status: 'CONNECTED',
          accountId: `${platform}_${Math.random().toString(36).substring(7)}`,
          accessToken: 'mock_token',
          apiLimitCount: 1000,
          apiLimitReset: dayjs().add(1, 'day').toISOString(),
        },
      })

      message.success(`Successfully connected to ${platform}`)
      refetch()
    } catch (error) {
      message.error(`Failed to connect to ${platform}`)
    } finally {
      setLoading({ ...loading, [platform]: false })
    }
  }

  // Handle social media disconnection
  const handleDisconnect = async (accountId: string) => {
    try {
      await deleteAccount({ where: { id: accountId } })
      message.success('Account disconnected successfully')
      refetch()
    } catch (error) {
      message.error('Failed to disconnect account')
    }
  }

  const renderAccountCard = (platform: string) => {
    const account = socialAccounts?.find(acc => acc.platform === platform)

    return (
      <Col xs={24} sm={12} md={8} key={platform}>
        <Card>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Space align="center">
              <i
                className={`las la-${platform.toLowerCase()}`}
                style={{ fontSize: '24px' }}
              />
              <Text strong>{platform}</Text>
            </Space>

            {account ? (
              <>
                <Tag
                  color={account.status === 'CONNECTED' ? 'success' : 'error'}
                >
                  {account.status}
                </Tag>

                <Tooltip title="API Calls Remaining">
                  <Text>
                    <i className="las la-chart-line" />{' '}
                    {account.apiLimitCount?.toString() || '0'} calls
                  </Text>
                </Tooltip>

                <Tooltip title="Limit Reset Time">
                  <Text>
                    <i className="las la-clock" />{' '}
                    {account.apiLimitReset
                      ? dayjs(account.apiLimitReset).format(
                          'MMM D, YYYY h:mm A',
                        )
                      : 'N/A'}
                  </Text>
                </Tooltip>

                <Button
                  danger
                  onClick={() => handleDisconnect(account.id)}
                  icon={<i className="las la-unlink" />}
                >
                  Disconnect
                </Button>
              </>
            ) : (
              <Button
                type="primary"
                onClick={() => handleConnect(platform)}
                loading={loading[platform]}
                icon={<i className="las la-link" />}
              >
                Connect
              </Button>
            )}
          </Space>
        </Card>
      </Col>
    )
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <div>
            <Title level={2}>Social Media Accounts</Title>
            <Text type="secondary">
              Connect and manage your social media accounts to enable automatic
              interactions
            </Text>
          </div>

          <Row gutter={[16, 16]}>
            {['Facebook', 'Instagram', 'LinkedIn'].map(platform =>
              renderAccountCard(platform),
            )}
          </Row>
        </Space>
      </div>
    </PageLayout>
  )
}
