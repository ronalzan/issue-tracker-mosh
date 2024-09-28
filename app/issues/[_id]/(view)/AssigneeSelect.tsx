'use client'

import { Issue, User } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Skeleton } from '@/app/components'
import { Toaster, toast } from 'react-hot-toast';
import IssueConstants from "@/app/constants/issues"

const AssigneeSelect = ({issue}: {issue: Issue}) => {

    const assignIssue = (userId: string) => {
        //no need to use await keyword because we do not need to wait for the promise to be resolved. The code will not wait for it to resolve
        //We dont care about the result of the promise
        //we just want to proceed to the next code. The axios patch function still triggered tho. however this is not a good practice as
        //errors can occur and you need to catch the error. If your next code logic is to use the result of the promise, then it will not work.
        //but if i use then and catch function, it will wait for the promise to resolve but the subsequent code is immediately executed.
        //but both way give you the same thing when you want to data from the resolved promised. If this is not the case,
        //use then and catch better as it can proceed to the next code immediately
        axios.patch(`/api/issues/${issue.id}` , { assignedToUserId: userId === IssueConstants.Unassigned ? null : userId })
            .then(() => toast.success('Assigned successfully!'))
            .catch(() => toast.error('Assigned failed!'))
    }

  //this hook is to store the data response from the fetch into the cache. It has a cache storage!
  //"data: users" this is to rename "data" to "users" 
  const { data: users, isLoading, error } = useUsers();

  if (error) return null;
  if (isLoading) return <Skeleton />

  return (
    <>
        <Select.Root defaultValue={issue.assignedToUserId || IssueConstants.Unassigned} onValueChange={assignIssue}>
            <Select.Trigger placeholder="Select assignee..." />
            <Select.Content position="popper">
                <Select.Item value={IssueConstants.Unassigned}>
                    Unassigned
                </Select.Item>
                <Select.Separator />
                <Select.Group>
                    <Select.Label>
                        Suggestions
                    </Select.Label>
                    {
                        users?.map((user) => (
                            <Select.Item key={user.id} value={user.id}>
                                {user.name}
                            </Select.Item>                    
                        ))
                    }
                </Select.Group>
            </Select.Content>
        
        </Select.Root>
        <Toaster />
    </>
  )
}

//custom hook. No need to refactor this logic into another function outside of this module because this logic only used in this component.
//we dont have the requirement to log the api currently so there is no need to take this logic out and place in one single file where we have all our
//API calls.
//for the axios function below, people might argue that it is better to place the function in one single file because he api endpoint might be
//changed in the future which will cause the need to change it in multiple files but the counter arguement is the api endpoint should not be changed
//as it is already establish a contract with the outside world
const useUsers = () => useQuery<User[]>({
    //give an id for the data response for this fetch so that it can uniquely identify the data in the cache
    queryKey: ['users'],
    //give this property a fetch function that can be from any library such as axios or fetch()
    //axios api function return a promise that resolve to a response which is data.
    queryFn: () => axios.get('/api/users').then((res) => res.data),
    //to set the fetch response data as stale data. Default value is 0 meaning that the fetch data is immediately become stale and the useQuery will 
    //fetch the data again when you come back to the page that has this component
    staleTime: 60 * 1000, //60secs //this one should be longer like 1 hour or 1 day because the frequency of new internal user for this app is low
    //retry for 3 times in addition for the first initial attempt
    retry: 3
  })

export default AssigneeSelect
