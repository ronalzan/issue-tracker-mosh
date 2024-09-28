'use client';

import { AlertDialog, Button, Flex, Spinner } from '@radix-ui/themes'
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { useState } from 'react';

const DeleteIssueButton = ({_id}:{_id:number}) => {
    const router = useRouter();
    const [ error, setError ] = useState(false);
    const [ isDeleting, setDeleting ] = useState(false);

    const DeleteIssue = async () => {
        try {
            setDeleting(true);
            await axios.delete('/api/issues/' + _id);

            //here no need to set the isDeleting state to false becaus we are routed to another page!
            router.push('/issues');
            router.refresh(); //invalidate cache of the client cache when useRouter cache visited page!
        }catch (error) {
            setDeleting(false);
            setError(true);
        }
    }

  return (
    <>
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button disabled={isDeleting} color='red'>
                    <Spinner loading={isDeleting} />
                    Delete Issue
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>
                    Delete Issue?
                </AlertDialog.Title>
                <AlertDialog.Description>
                    This can't be undone
                </AlertDialog.Description>
                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant='soft' color='gray'>
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button color='red' onClick={DeleteIssue}>
                            Delete
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
        <AlertDialog.Root open={error}>
            <AlertDialog.Content>
                <AlertDialog.Title>
                    Error
                </AlertDialog.Title>
                <AlertDialog.Description>
                    This issue could not be deleted!
                </AlertDialog.Description>
                <Flex justify="end" mt="4">
                    <AlertDialog.Cancel>
                        <Button color='gray' variant='soft' onClick={() => setError(false)}>
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton
