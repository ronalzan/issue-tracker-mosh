import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from '../edit/EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import AssigneeSelect from './AssigneeSelect'

const IssueDetailPage = async ({params: {_id}}:{params: {_id: string}}) => {
  if (isNaN(parseInt(_id))) notFound(); //if the parameter is not a number, redirect to the not found error page
  const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(_id),
        }
    })

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

export default IssueDetailPage
