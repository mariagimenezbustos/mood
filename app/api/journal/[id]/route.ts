import { getUserFromClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";
import { analyze } from "@/utils/ai";
import { update } from "@/utils/actions";

export const PATCH = async (request: Request, { params }) => {
    const { updates } = await request.json();
    const user = await getUserFromClerkID();

    const updatedEntry = await prisma.journalEntry.update({
        where: {
            userId_id: {
                userId: user.id,
                id: params.id
            },
        },
        data: updates,
    })

    const analysis = await analyze(updatedEntry);
    const updated = await prisma.entryAnalysis.upsert({
        where: {
            entryId: updatedEntry.id,
        },
        create: {
            userId: user.id,
            entryId: updatedEntry.id,
            ...analysis,
        },
        update: { ...analysis },
    })

    update(["/journal"])

    return NextResponse.json({ data: { ...updatedEntry, analysis: updated } })
}

export const DELETE = async (request: Request, { params }) => {
    const user = await getUserFromClerkID();

    await prisma.journalEntry.delete({
        where: {
            userId_id: {
                userId: user.id,
                id: params.id
            }
        }
    })

    update(["/journal"])

    return NextResponse.json({ data: { id: params.id } })
}
