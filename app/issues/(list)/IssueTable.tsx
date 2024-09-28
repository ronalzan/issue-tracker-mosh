import { Link, IssueStatusBadge } from '@/app/components'
import { Issue, Status } from '@prisma/client'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Table, Flex } from '@radix-ui/themes'
import NextLink from 'next/link'
import React from 'react'

export interface IssueQuery {
    status: Status,
    orderBy: keyof Issue,
    page: string,
}

interface Props {
    searchParams: IssueQuery,
    issues: Issue[]
}

//position this declaration of the component at the top as this the Single Responsebility of this component. The interface can be at the top
const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {
              columns.map((column) => (
                <Table.ColumnHeaderCell key={column.value} className={column.className}>
                  <Flex align="center">
                    <NextLink href={{
                      query: {...searchParams, orderBy: column.value}
                    }}>
                      { column.label }
                    </NextLink> 
                    {
                      //inline used as the classname here is to make sure this button is inline with another item from the same context
                      column.value === searchParams.orderBy && <ArrowUpIcon className='inline' />
                    }
                  </Flex>
                </Table.ColumnHeaderCell>
              ))
            }
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link href={`/issues/${issue.id}`}>
                    {issue.title}
                  </Link>
                  <div className='block md:hidden'> {/* md is stands for medium device that cover table and desktop size. This classname means to display the status in block when viewport is mobile size and dont display when the viewport is tablet or desktop*/}
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>{issue.createAt.toDateString()}</Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
    </Table.Root>
  )
}

//annotate a type of object array
//keyof Issue is to return the property of Issue to a string and Union as value field need to be in string but certain value of string only
//thats why we use string with union
const columns: { label: string, value: keyof Issue, className?: string}[] = [
    { label: 'Issue', value: 'title'},
    { label: 'Status', value: 'status', className: 'hidden md:table-cell'},
    { label: 'Created', value: 'createAt', className: 'hidden md:table-cell'},
    ]
    
//export only the value of the columns instead the whole implementation of the columns
//this is to keep the encapsulation of the implemenation from other components or other file of this project
export const columnNames = columns.map((column) => column.value);

export default IssueTable