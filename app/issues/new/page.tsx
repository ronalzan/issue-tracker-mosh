import ServerDynamicImporter from '@/app/components/ServerDynamicImporter'
import { Issue } from '@prisma/client'

const NewIssuePage = () => {
  return (
    <ServerDynamicImporter<{issue?: Issue}>
      component='IssueForm'
    />
  )
}

export default NewIssuePage
