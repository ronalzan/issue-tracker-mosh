import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
    open: number;
    inProgress: number;
    closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: {label: string, value: number, status: Status}[] = [
    { label: 'Open', value: open, status: 'OPEN' },
    { label: 'In-progress', value: inProgress, status: 'IN_PROGRESS' },
    { label: 'Closed', value: closed, status: 'CLOSED' },
  ]

  return (
    <Flex gap="3">
        {
            containers.map((container) => (
                <Card key={container.label}>
                    <Flex direction="column" gap="1">
                        <Link href={`/issues?status=${container.status}`} className="font-medium text-sm">
                            {container.label}
                        </Link>
                        <Text size="5" className="font-bold">{container.value}</Text>
                    </Flex>
                </Card>
            ))
        }
    </Flex>
  )
}

export default IssueSummary