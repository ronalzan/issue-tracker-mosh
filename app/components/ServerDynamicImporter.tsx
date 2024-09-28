'use client';

import dynamic from "next/dynamic";
import IssueFormSkeleton from "../issues/_components/IssueFormSkeleton";
import { Issue } from "@prisma/client";

interface Props<T> {
    props?: T,
    component: string,
}

const ServerDynamicImporter = <T,>({props,component}:Props<T>) => {
    switch(component){
        case 'IssueForm':
            const IssueForm = dynamic(
                () => import('@/app/issues/_components/IssueForm'),
                {
                    ssr: false,
                    loading: () => <IssueFormSkeleton />
                }
            );
            return <IssueForm {... (props as {issue?: Issue})} />
    }
}

export default ServerDynamicImporter
