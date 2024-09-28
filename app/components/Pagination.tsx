'use client'

import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes"
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
    itemCount: number, // the total number of item/record/data
    pageSize: number, // the total number of item/record/data that you want to display on the page
    currentPage: number, //the current page that you are in 
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams(); //to get the query string from the url. It returns readonly URLSearchParams object
  const pageCount = Math.ceil(itemCount / pageSize); //how many pages are there to display in this pagination
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const urlSearchParams = new URLSearchParams(searchParams);
    urlSearchParams.set('page',page.toString());
    router.push(`?${urlSearchParams}`); //only updating the query string of the current url. In this way, we push url with the url stated 
                                        //in the bracket
  }

  return (
    <Flex align="center" gap="2">
        <Text size="2">
            Page {currentPage} of {pageCount}
        </Text>
        <Button color="gray" variant="soft" disabled={currentPage === 1} onClick={() => changePage(1)}>
            <DoubleArrowLeftIcon />
        </Button>
        <Button color="gray" variant="soft" disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}>
            <ChevronLeftIcon />
        </Button>
        <Button color="gray" variant="soft" disabled={currentPage === pageCount} onClick={() => changePage(currentPage + 1)}>
            <ChevronRightIcon />
        </Button>
        <Button color="gray" variant="soft" disabled={currentPage === pageCount} onClick={() => changePage(pageCount)}>
            <DoubleArrowRightIcon />
        </Button>
    </Flex>
  )
}

export default Pagination