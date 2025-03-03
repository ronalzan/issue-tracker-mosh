import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const EditIssueButton = ({_id}:{_id:number}) => {
  return (
    <Button>
        <Pencil2Icon />
        <Link href={`/issues/${_id}/edit`}>
            Edit Issue
        </Link>
    </Button>
  )
}

export default EditIssueButton
