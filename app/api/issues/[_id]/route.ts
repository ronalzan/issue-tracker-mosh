import { PatchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function PATCH (request:NextRequest, {params}:{params: {_id: string}}){
    const session = await auth();
    if (!session) return NextResponse.json({}, {'status':401});

    const body = await request.json();
    const validation = PatchIssueSchema.safeParse(body);
    if(!validation.success) return NextResponse.json(validation.error.format(), {'status': 400});

    const { assignedToUserId, title, description } = body;

    if (assignedToUserId) {
        const user = await prisma.user.findUnique({
            where: {
                id: assignedToUserId,
            }
        })

        if(!user)
            return NextResponse.json({ 'error': 'Invalid user!'}, { 'status': 400 }) //bad request
    }

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params._id),
        }
    })
    if(!issue) return NextResponse.json({'error':'Issue not found'}, {'status':404});

    const updatedIssue = await prisma.issue.update({
        where: {
            id: issue.id,
        },
        data: {
            title,
            description,
            assignedToUserId,
        }
    });
    return NextResponse.json(updatedIssue);
}

export async function DELETE (request: NextRequest, {params}:{params: {_id: string}}) {
    const session = await auth();
    if (!session) return NextResponse.json({}, {'status':401});

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params._id)
        }
    });

    if (!issue) return NextResponse.json({'error':'Invalid Issue!'}, {'status': 404});

    await prisma.issue.delete({
        where: {
            id: parseInt(params._id)
        }
    })

    return NextResponse.json({});
}