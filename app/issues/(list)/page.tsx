import React from 'react'
import prisma from '@/prisma/client'
//import delay from 'delay'
import IssueActions from './IssueActions'
import { Status } from '@prisma/client'
import Pagination from '@/app/components/Pagination'
import IssueTable, { columnNames, IssueQuery } from './IssueTable'
import { Flex } from '@radix-ui/themes'
import { Metadata } from 'next'

interface Props {
  searchParams: IssueQuery,
}

const Issues = async ({ searchParams }: Props) => {

  const pageSize = 5; //number of records to be display in the issue table per page
  const page = parseInt(searchParams.page) || 1; //take the value of the page in the query url if have. if dont have, just show first page by default

  //this will return the property of the Status type object to an array. thus status is array object
  const statuses = Object.values(Status); 

  //we set undefined if the status from the searchParams is not among the status in the Status type.
  //when the status is undefined, the prisma will not use it in the where clause, it will ignore the field (status) 
  //in the where clause
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
  const where = {
    status,
  }

  //[searchParams.orderby] this square bracket [] actually to get the actual value of the variable and then convert it to normal code instead of 
  //any data type or object such as string, int, boolean. Same goes to the route segment parameter but its the other way around. The [id], 
  //square bracket convert the normal code or text into variable called id that can be an argument in the component function
  const orderBy = columnNames.includes(searchParams.orderBy) ? { [searchParams.orderBy]: 'asc' } : undefined;
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize, //this is to skip how many record
    take: pageSize, //this is the number of record we want to take
  });

  //to get the number of total issue to pass to pagination as an argument
  const totalIssue = await prisma.issue.count({
    where,
  })

  //await delay(2000); //to delay for 2 seconds
  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable issues={issues} searchParams={searchParams} />
      <Pagination itemCount={totalIssue} currentPage={page} pageSize={pageSize} />
    </Flex>
  )
}

//to opt out from static rendering because this page is statically rendered as it does not have parameter. When the page does not
// have parameter, it is by defaul considered as static page!
export const dynamic = 'force-dynamic';
//export const revalidate = 0; //same as constant above. You can set more than 0 seconds and it means that Nextjs will revalidate the page
                               //after every seconds that you have set. Revalidate means refresh the page by sending request to the backend
                               //to get the content of the page!

//the constant name must be correct because this is the convention in nextjs.
//export metadata for every page is to improve SEO. At minimal, we should provide the title and description
//we can include open graph and twitter properties so that people can easily share our content on social media
export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues'
}
                    

export default Issues
