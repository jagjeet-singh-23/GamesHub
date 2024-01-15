"use client";

import { useMemo } from "react";
import { Info } from "lucide-react";

import { Hint } from "../hint";

interface ChatInfoProps {
  isDelayed: boolean;
  isFollowersOnly: boolean;
}

export const ChatInfo = ({ isDelayed, isFollowersOnly }: ChatInfoProps) => {
  if (!isDelayed && !isFollowersOnly) return null;

  const hint = useMemo(() => {
    if (isFollowersOnly) {
      return !isDelayed
        ? "Only followers can chat"
        : "Only followers can chat. Messages will appear after 3 seconds";
    } else return isDelayed ? "Messages will appear after 3 seconds." : "";
  }, [isFollowersOnly, isDelayed]);

  const label = useMemo(() => {
    if (isFollowersOnly) {
      return !isDelayed ? "Followers Only" : "Followers only and slow mode";
    } else return isDelayed ? "Slow mode" : "";
  }, [isDelayed, isFollowersOnly]);
  return (
    <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rouned-t-md flex items-center gap-x-2">
      <Hint label={hint}>
        <Info className="h-4 w-4" />
      </Hint>
      <p className="text-xs font-semibold">{label}</p>
    </div>
  );
};
