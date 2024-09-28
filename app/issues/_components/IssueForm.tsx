'use client'; //need to use 'use client' directive here because of useForm hook

import { Button, Callout, Spinner, TextField } from '@radix-ui/themes'
//import dynamic from 'next/dynamic';
//for the time being, I believe that SimpleMDE can be import normally in the cliend side component. There is no need to use the dynamic function
//as there is no error occur for this particular module. But for the trainer case, he encountered an issue whereby this module requires
//lazy loading behavior to import it as he said that the first time render is server will render it, therefore you need to import it lazily. 
//However, ChatGpt says otherwise, when you use client side directive, all the javascript are bundled and sent to the client for the hydration
//and then the page is rendered. The server does not render the javascript, it send a minimal html shell and javascript bundle to the client for
//the client to render the page!! I will standby what Chatgpt says however, if I encounter the same error as the trainer in the future,
//remember to use the dynamic function. Meaning that what the trainer said is true which is the first time render is executed by server regardless
//of the directive!
import SimpleMDE from "react-simplemde-editor"; //cannot use in server side component as this component is server-side
import { useForm } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import { PatchIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import "easymde/dist/easymde.min.css";
import { ErrorMessage } from '@/app/components';
import { Issue } from '@prisma/client';
//import delay from 'delay'; //await and async keyword cannot be used in client side component


//you can get the type from the zod object directly so that you do not need to create 2 types separately from 
//zod and within the page file. Since the type zod validation is applied on every field of the form in the page, therefore the 
//type interface for both of them are the same. so no need to create separate type in the page file. just use the type from zod that 
//you can extract using the function infer<>
type IssueFormData = z.infer<typeof PatchIssueSchema>;

const IssueForm = ({issue}:{issue?: Issue}) => {
  const router = useRouter();

  //formState is one of the property return by the useForm. It contains the state of the form including submitted or errors or etc.
  //formState:{ errors } means that we do object destructuring. Thee formState property has its own properties which are errors and others...
  const { register, control, handleSubmit, formState:{ errors }} = useForm<IssueFormData>({
    resolver: zodResolver(PatchIssueSchema),
  });
  const [ error, setError ] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  //try to avoid inline function. declare it outside of the markup
  //besides that, you may consider to separte axios function into separate module to comply the separation of concern practice. This
  //is to allow the HTTP call from axios to be reusable in other components
  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (issue)
        await axios.patch('/api/issues/'+issue.id, data);
      else
        await axios.post('/api/issues',data);

      router.push('/issues');  
      router.refresh(); //to refresh the content of the current route which is the issue route. meaning the router refresh the page
                        //in order to invalidate the client side cache! 
    } catch (error) {
      setIsSubmitting(false);
      setError('An unexpected error occured!')
    }
  });

  return (
    <div className='max-w-xl'>
      {
        error &&
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>
            {error}
          </Callout.Text>
        </Callout.Root>
      }

      {/*try to avoid inline function. declare it outside of the markup*/}
      <form className='space-y-3' onSubmit={onSubmit}>
        <TextField.Root defaultValue={issue?.title} placeholder="Title" {...register('title')}/>
        <ErrorMessage>
          {errors.title?.message}
        </ErrorMessage>

        <Controller 
          name="description" 
          defaultValue={issue?.description}
          control={control} 
          render={({field}) => <SimpleMDE placeholder='Enter description here...' {...field} />} 
        />
        <ErrorMessage>
          {errors.description?.message}
        </ErrorMessage>

        <Button disabled={isSubmitting}>
          <Spinner loading={isSubmitting} />
          { issue ? 'Update Issue' : 'Submit New Issue'}
        </Button>
      </form>
    </div>
  )
}

export default IssueForm
