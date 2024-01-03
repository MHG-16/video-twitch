"use client";

import { onBlock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
    isFollowing: boolean;
    userId: string;
}

export const Actions = ({isFollowing, userId} : ActionsProps) => {
    const [isPending, startTransition ] = useTransition();
    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
            .then((data) => toast.success("Followed the user : " + data.following.username))
            .catch(() => toast.error("Something went wrong"))
        })
    }

    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(userId)
            .then((data) => toast.success(`You're now unfollowing ` + data.following.username))
            .catch(() => toast.error("Something went wrong"))
        })
    }

    const handleBlock = () => {
        startTransition(() => {
            onBlock(userId)
            .then((data) => toast.success(`${data?.blocked.username} is blocked yet`))
            .catch(() => toast.error("Something went wrong"))
        })
    }


    const onClick = () => {
        if(isFollowing) {
            handleUnfollow();
        }
        else {
            handleFollow();
        }
    }
    return (
        <>
            <Button disabled={isPending} variant="primary" onClick={onClick}>
                {isFollowing ? "Unfollow" : "Follow"}
            </Button>
            <Button onClick={handleBlock} disabled={isPending}>
                Block User
            </Button>
        </>
    )
}