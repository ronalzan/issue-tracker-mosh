import { Table } from '@radix-ui/themes'
import React from 'react'
import IssueActions from './IssueActions'
import { Skeleton } from '@/app/components'

const IssueLoadingPage = () => {
    const issues = [1, 2, 3, 4, 5]; //dummy issues object in order to display 5 rows of skeleton
  return (
    <div>
        <IssueActions />
        <Table.Root variant='surface'>
            <Table.Header>
            <Table.Row>
                <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
            </Table.Row>
            </Table.Header>
            <Table.Body>
            {
                issues.map((issue) => (
                <Table.Row key={issue}>
                    <Table.Cell>
                        <Skeleton />
                        <div className='block md:hidden'> {/* md is stands for medium device that cover table and desktop size. This classname means to display the status in block when viewport is mobile size and dont display when the viewport is tablet or desktop*/}
                            <Skeleton />
                        </div>
                    </Table.Cell>
                    <Table.Cell className='hidden md:table-cell'>
                        <Skeleton />
                    </Table.Cell>
                    <Table.Cell className='hidden md:table-cell'>
                        <Skeleton />
                    </Table.Cell>
                </Table.Row>
                ))
            }
            </Table.Body>
        </Table.Root>
    </div>
  )
}

export default IssueLoadingPage
