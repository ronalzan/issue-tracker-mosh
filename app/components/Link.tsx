import { Link as RadixLink } from "@radix-ui/themes";
import NextLink from "next/link";

interface Props {
    href: string,
    children: string,
}

//we create this Link is because we want to combine the Link from Next and Link from Radix UI
//we want the styling of Link from radix-ui and we want the features of Link from Next
const Link = ({href,children}:Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
        <RadixLink>
            {children}
        </RadixLink>
    </NextLink>
  )
}

export default Link
