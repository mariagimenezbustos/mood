"use server"
import { revalidatePath } from "next/cache"

export const update = (paths = []) => paths.forEach((path) => revalidatePath(path))