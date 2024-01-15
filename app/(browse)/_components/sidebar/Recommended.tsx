"use client";

import { useSidebar } from "@/store/use-sidebar";
import { UserItem, UserItemSkeleton } from "./UserItem";

import { User } from "@prisma/client";

interface RecommendedProps {
  data: (User & {
    stream: { isLive: boolean } | null;
  })[];
}

export const Recommended = ({ data }: RecommendedProps) => {
  const { collapsed } = useSidebar((state) => state);
  const label = !collapsed && data.length > 0;
  return (
    <div>
      {label && (
        <div className="pl-6 mb-4">
          <p className="text-muted-foreground text-sm">Recommended</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user) => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={user.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};
