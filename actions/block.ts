"use server";

import { getSelf } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
    const roomService = new RoomServiceClient(
        process.env.LIVEKIT_API_URL!,
        process.env.LIVEKIT_API_KEY!,
        process.env.LIVEKIT_API_SECRET!
    );

    const self = await getSelf();
    try {
        const blockedUser = await blockUser(id);
    } catch (error) {
        //This means user is a guest
        console.log(error)
    }

    try {
        await roomService.removeParticipant(self.id, id);
    } catch {
        // This means user is not in the room
    }

    revalidatePath(`/u/${self.username}/community`);

    return blockUser;
}

export const onUnblock = async (id: string) => {
    try {
        const unblockedUser = await unblockUser(id);

        if(unblockedUser) {
            revalidatePath(`/${unblockedUser.blocked.username}`);
        };

        return unblockedUser;
    } catch (error) {
        console.log(error)
    }
}