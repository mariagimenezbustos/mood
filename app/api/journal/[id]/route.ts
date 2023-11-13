import { getUserFromClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";
import { analyze } from "@/utils/ai";

export const PATCH = async (request: Request, { params }) => {
    const { content } = await request.json()
    const user = await getUserFromClerkID();
    const updatedEntry = await prisma.journalEntry.update({
        where: {
            userId_id: {
                userId: user.id,
                id: params.id
            }
        },
        data: {
            content,
        }
    })

    const analysis = await analyze(updatedEntry.content);
    const updated = await prisma.analysis.upsert({
        where: {
            entryId: updatedEntry.id,
        },
        create: {
            userId: user.id,
            entryId: updatedEntry.id,
            ...analysis,
        },
        update: analysis,
    })

    return NextResponse.json({ data: { ...updatedEntry, analysis: updated } })
}