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


// -------------------


// import { update } from '@/utils/actions'
// import { analyze } from '@/utils/ai'
// import { getUserFromClerkID } from '@/utils/auth'
// import { prisma } from '@/utils/db'
// import { NextResponse } from 'next/server'

// export const DELETE = async (request: Request, { params }) => {
//     const user = await getUserFromClerkID()

//     await prisma.journalEntry.delete({
//         where: {
//             userId_id: {
//                 id: params.id,
//                 userId: user.id,
//             },
//         },
//     })

//     update(['/journal'])

//     return NextResponse.json({ data: { id: params.id } })
// }

// export const PATCH = async (request: Request, { params }) => {
//     const { updates } = await request.json()
//     const user = await getUserFromClerkID()

//     const entry = await prisma.journalEntry.update({
//         where: {
//             userId_id: {
//                 id: params.id,
//                 userId: user.id,
//             },
//         },
//         data: updates,
//     })

//     const analysis = await analyze(entry)
//     const savedAnalysis = await prisma.analysis.upsert({
//         where: {
//             entryId: entry.id,
//         },
//         update: { ...analysis },
//         create: {
//             entryId: entry.id,
//             userId: user.id,
//             ...analysis,
//         },
//     })

//     update(['/journal'])

//     return NextResponse.json({ data: { ...entry, analysis: savedAnalysis } })
// }
