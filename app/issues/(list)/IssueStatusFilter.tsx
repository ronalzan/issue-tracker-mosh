'use client'

import { Status } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import IssueConstants from "@/app/constants/issues"
import { useRouter, useSearchParams } from "next/navigation"

//we annotate the type for statuses array declarion using the symbol ':' 
//we annotate the type because we want to set the value with the correct spelling and the type that we set help the ide to do checking
//and autocomplete. It help the compiler to do type checking as well. Therefore having type or interface is good for type safe
//development
const statuses: { label: string, value: Status | string }[] = [
    { label: 'All', value: IssueConstants.All},
    { label: 'Open', value: 'OPEN'},
    { label: 'In Progress', value: 'IN_PROGRESS'},
    { label: 'Close', value: 'CLOSED'},
]

const IssueStatusFilter = () => {
  const router = useRouter();
  const params = useSearchParams(); //to get the query parameters from the URL

  return (
    <Select.Root defaultValue={params.get('status') || IssueConstants.All} onValueChange={(status) => {
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.append('status', status);
        if (params.get('orderBy')) urlSearchParams.append('orderBy', params.get('orderBy')!);

        const query = urlSearchParams.size ? `?${urlSearchParams.toString()}` : ''
        router.push(`/issues${query}`);
    }}>
        <Select.Trigger placeholder="Filter by status..." />
        <Select.Content position="popper">
            {
                statuses.map((status) => (
                    <Select.Item key={status.value} value={ status.value }>
                        { status.label }
                    </Select.Item>
                ))
            }
        </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter