import { notFound } from "next/navigation";

import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";

interface UserPageProps {
    params: {
        username: string;
    }
}

const UserPage = async ({params} : UserPageProps) => {
    const user = await getUserByUsername(params.username);
    if (!user || !user.stream) {
        notFound();
    }

    const isFollowing = await isFollowingUser(user.id);
    const isBlockedByThisUser = await isBlockedByUser(user.id);
    if( isBlockedByThisUser ) {
        notFound();
    } 

    return (
        <StreamPlayer 
            user={user}
            stream={user.stream}
            isFollowing={isFollowing}
            isBlocking={isBlockedByThisUser}
        />
    )
}

export default UserPage;