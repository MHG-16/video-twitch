import { db } from "./db";

export const getStreamByuserId = async( userId: string) => {
    const stream = await db.stream.findUnique({
        where: { userId }
    });

    return stream;
}