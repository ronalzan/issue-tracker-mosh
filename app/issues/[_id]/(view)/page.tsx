import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from '../edit/EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import AssigneeSelect from './AssigneeSelect'
import { cache } from 'react'

interface Props {
    params: {
        _id: string
    }
}

//this cache function can only be used in server component only 
//It is to cache asynchronous operation like fetching data. The result of the fetching will be cached at the server side.
//the lifespan of the cache is within the single request only. Meaning that when the browser makes the request to the backend for eg:
//navigating to a page, the server process the request and execute the async function in the cache function. The result is cached and
//if the same cache function called within the same request, the result will be re-used instead of making another query to the database
//Then once the server responds, the cache is invalidated.
//The main purpose of this cache is to avoid making multiple query to the database for the same piece of data.
//If you notice, we do not use await and async keyword here because we do not need to wait for the promise to be resolved.
//we just need to return the promise immediately and let the caller handle the promise.
//essentially, this is to avoid overload on teh database
const fetchIssue = cache((issueId: number) => prisma.issue.findUnique({where: {id: issueId}}));

const IssueDetailPage = async ({params: {_id}}: Props) => {
  if (isNaN(parseInt(_id))) notFound(); //if the parameter is not a number, redirect to the not found error page

  //server will cache the result of this fetching and it will be re-used if this cache function is called again
  const issue = await fetchIssue(parseInt(_id));

  if(!issue) notFound();

  //await delay(2000);

  return (
    /* initial is for mobile breakpoint and md is for laptop breakpoint. You can check more details in the radix-ui doc.
       gap is to set the distance between the childs under the Grid.
       sm is for tablet in radix-ui
    */
    <Grid columns={{initial: "1", sm: "5"}} gap="5">
        {/*
            md is for tablet in tailwind. tailwind md = radix-ui sm
        */}
        <Box className='md:col-span-4'>
            <IssueDetails issue={issue} />
        </Box>

                <Box> 
                    <Flex direction="column" gap="4">
                        <AssigneeSelect issue={issue} />
                        <EditIssueButton _id={issue.id} />
                        <DeleteIssueButton _id={issue.id} />
                    </Flex>
                </Box>

    </Grid>
  )
}

//make sure the function name is correct. it is another convection name from nextjs.
//generateMetadata is to generate dynamic metadata instead of static metadata that is provided by constant metadata
export async function generateMetadata ({params}: Props) {

    //server will fetch the data from the cache insted of making another query to the database because the first time this cache 
    //function is called was inside the component function above.
    const issue = await fetchIssue(parseInt(params._id));

    //return an object directly. the properties also are convention from nextjs. must be correct spelling
    return {
        title: issue?.title,
        description: `Details of issue ${issue?.description}`
    }
}

export default IssueDetailPage
