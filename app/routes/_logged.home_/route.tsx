import { Typography, Card, Row, Col, Statistic, List, Alert, Space } from 'antd'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const { user } = useUserContext()

  // Fetch recent activity logs
  const { data: activityLogs } = Api.activityLog.findMany.useQuery({
    where: { userId: user?.id },
    include: {
      hashtag: true,
      socialAccount: true,
      template: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  // Fetch social accounts for API limits
  const { data: socialAccounts } = Api.socialAccount.findMany.useQuery({
    where: { userId: user?.id },
  })

  // Fetch statistics
  const { data: hashtagStats } = Api.hashtag.findMany.useQuery({
    where: { userId: user?.id },
  })

  const { data: commentStats } = Api.activityLog.findMany.useQuery({
    where: {
      userId: user?.id,
      actionType: 'COMMENT',
    },
  })

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-home" style={{ marginRight: 8 }}></i>
          Dashboard
        </Title>
        <Text type="secondary">
          Welcome back! Here's an overview of your automation activity.
        </Text>

        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Active Hashtags"
                value={hashtagStats?.length || 0}
                prefix={<i className="las la-hashtag"></i>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Comments Posted"
                value={commentStats?.length || 0}
                prefix={<i className="las la-comment"></i>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Connected Accounts"
                value={socialAccounts?.length || 0}
                prefix={<i className="las la-user-circle"></i>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Success Rate"
                value={
                  commentStats?.filter(log => log.status === 'SUCCESS')
                    .length || 0
                }
                suffix="%"
                prefix={<i className="las la-chart-line"></i>}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} lg={16}>
            <Card
              title={
                <>
                  <i className="las la-history"></i> Recent Activity
                </>
              }
            >
              <List
                dataSource={activityLogs}
                renderItem={log => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <i
                          className={`las ${
                            log.status === 'SUCCESS'
                              ? 'la-check-circle'
                              : 'la-exclamation-circle'
                          }`}
                          style={{
                            fontSize: 24,
                            color:
                              log.status === 'SUCCESS' ? '#52c41a' : '#ff4d4f',
                          }}
                        ></i>
                      }
                      title={`${log.actionType} on ${log.socialAccount?.platform}`}
                      description={
                        <Space direction="vertical">
                          <Text>Hashtag: #{log.hashtag?.name}</Text>
                          <Text type="secondary">
                            {dayjs(log.createdAt).format('MMMM D, YYYY HH:mm')}
                          </Text>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card
              title={
                <>
                  <i className="las la-bell"></i> Notifications
                </>
              }
            >
              {socialAccounts?.map(account =>
                account.apiLimitCount && account.apiLimitCount > 80 ? (
                  <Alert
                    key={account.id}
                    message="API Limit Warning"
                    description={`${
                      account.platform
                    } account is approaching API limit (${account.apiLimitCount?.toString()}%)`}
                    type="warning"
                    showIcon
                    style={{ marginBottom: 16 }}
                  />
                ) : null,
              )}
              {socialAccounts?.map(account =>
                account.status === 'INACTIVE' ? (
                  <Alert
                    key={account.id}
                    message="Account Status"
                    description={`${account.platform} account needs attention`}
                    type="error"
                    showIcon
                    style={{ marginBottom: 16 }}
                  />
                ) : null,
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}
