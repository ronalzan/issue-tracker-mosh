import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import LatestIssue from "./LatestIssue";


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
