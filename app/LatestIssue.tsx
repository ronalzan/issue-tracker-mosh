import prisma from '@/prisma/client'
import { Avatar, Box, Card, Flex, Heading, Table } from '@radix-ui/themes'
import React from 'react'
import { IssueStatusBadge } from './components'
import Link from 'next/link'

const LatestIssue = async () => {
  const latestIssue = await prisma.issue.findMany({
    orderBy: {
        createAt: 'desc'
    },
    take: 5,
    include: {
        assignedToUser: true, //this is eager loading. load the related data immediately to avoid multiple queries
    }
  })
  return (
    <Card>
        <Heading size="4" mb="5">Latest Issues</Heading>
        <Table.Root>
            <Table.Body>
                {
                    latestIssue.map((issue) => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Flex justify="between">
                                    {/* by default the align is set to stretch */}
                                    <Flex direction="column" gap="2" align="start">
                                        <Link href={`/issues/${issue.id}`}>
                                            {issue.title}
                                        </Link>
                                        <IssueStatusBadge status={issue.status} />           
                                    </Flex>
                                    {
                                        issue.assignedToUser && (
                                            <Avatar src={issue.assignedToUser.image!} size="2" radius='full' fallback="?" />
                                        )
                                    }
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    ))
                }
            </Table.Body>
        </Table.Root>
    </Card>
  )
}

export default LatestIssue