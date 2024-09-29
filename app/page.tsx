import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import LatestIssue from "./LatestIssue";
import { Metadata } from "next";


export default async function Home() {
  const openIssues = await prisma.issue.count({where: {status: 'OPEN'}});
  const inProgressIssues = await prisma.issue.count({where: {status: 'IN_PROGRESS'}});
  const closedIssues = await prisma.issue.count({where: {status: 'CLOSED'}});

  return (
    <Grid columns={{initial: "1", sm: "2"}} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary open={openIssues} inProgress={inProgressIssues} closed={closedIssues} />
        <IssueChart open={openIssues} inProgress={inProgressIssues} closed={closedIssues} />
      </Flex>
      <LatestIssue />
    </Grid>
  );
}

//the constant name must be correct because this is the convention in nextjs.
//export metadata for every page is to improve SEO. At minimal, we should provide the title and description
//we can include open graph and twitter properties so that people can easily share our content on social media
export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues'
}
