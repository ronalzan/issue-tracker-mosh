import prisma from "@/prisma/client"
import { notFound } from "next/navigation"
import React from "react";
import ServerDynamicImporter from "@/app/components/ServerDynamicImporter";
import { Issue } from "@prisma/client";


const IssueEditPage = async ({params}:{params: { _id: string}}) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params._id), 
    }
  })

  if (!issue) return notFound();

  return (
    <ServerDynamicImporter<{issue?: Issue}> 
      props={{issue: issue}}
      component="IssueForm"
    />
  )
}

export default IssueEditPage
