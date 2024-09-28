'use client'

import { Card } from '@radix-ui/themes'
import {ResponsiveContainer, BarChart, XAxis, YAxis, Bar} from 'recharts'

//this interface is the same as the one from the Issue Summary component. But we duplicate it because we do not want this component to
//be dependant on another component
interface Props{
    open: number;
    inProgress: number;
    closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: 'Open', value: open },
    { label: 'In Progress', value: inProgress },
    { label: 'Closed', value: closed },
  ]
  return (
    <Card>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey="label" /> {/* the label property of data above */}
                <YAxis />
                {/* the value property of data above */}
                {/* var(--accent-5) gets from the root theme where all the computed custom css property located in the inspect mode */}
                <Bar dataKey="value" barSize={60} style={{fill: 'var(--accent-5)'}}/> 
            </BarChart>
        </ResponsiveContainer>
    </Card>
  )
}

export default IssueChart