"use client";

import { useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { redirect, useRouter } from "next/navigation";
import { onFollow, onUnfollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";
import { onBlock, onUnblock } from "@/actions/block";

interface ActionProps {
    hostIdentity: string;
    isFollowing: boolean;
    isHost: boolean;
    isBlocking: boolean;
}

export const Actions = ({
    hostIdentity,
    isFollowing,
    isHost,
    isBlocking
}: ActionProps) => {
  const { userId } = useAuth();
  const router = useRouter();
  const [ isPending, startTransition ] = useTransition();
  
  if(isHost) return;
  const handleFollow = () => {
    startTransition(() => {
        onFollow(hostIdentity)
        .then((data) => toast.success(`You are now following ${data.following.username}`))
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
        onUnfollow(hostIdentity)
        .then((data) => toast.success(`You are now unfollowing ${data.following.username}`))
        .catch(() => toast.error("Something went wrong"));
    })
  }

  const handleBlock = () => {
    startTransition(() => {
        onBlock(hostIdentity)
        .then(() => router.push("/"))
        .catch(() => toast.error("Something went wrong"));
    })
  }

  const handleUnblock = () => {
    startTransition(() => {
        onUnblock(hostIdentity);
    })
  }

  const toggleBlock = () => {
    if(!userId) {
        return router.push("/sign-in");
    }

    if (isBlocking) {
        handleUnblock();
    } else {
        handleBlock();
    }
  }
  const toggleFollow = () => {
    if(!userId) {
        return router.push("/sign-in");
    }

    if (isFollowing) {
        handleUnfollow();
    } else {
        handleFollow();
    }
  }
  return (
    <>
        <Button
            onClick={toggleFollow}
            disabled={isPending || isHost}
            variant="primary"
            size="sm"
            className="w-full lg:w-auto"
        >
            <Heart className={cn(
                "h-4 w-4 mr-2",
                isFollowing ? "fill-white" : "fill-none"
            )}/>
            {
                isFollowing ? "Unfollow" : "Follow"
            }
        </Button>
        <Button
            onClick={toggleBlock}
            disabled={isPending || isHost}
            variant="destructive"
            size="sm"
            className="w-full lg:w-auto"
        >
            {
                isBlocking ? "Unblock this user" : "Block this user"
            }
        </Button>
    </>
  )
}

export const ActionsSkeleton = () => {
    return (
        <Skeleton className="h-10 w-full lg:w-24"/>
    )
}