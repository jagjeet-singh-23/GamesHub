"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./Recommended";
import { useIsClient } from "usehooks-ts";
import { FollowingSkeleton } from "./Following";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const isClient = useIsClient();
  const { collapsed } = useSidebar((state) => state);

  if (!isClient) {
    return (
      <aside className="w-[70px] lg:w-60 h-full left-0 fixed flex flex-col bg-background border-r border-[#2D2E35] z-50">
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        "w-60 h-full left-0 fixed flex flex-col bg-background border-r border-[#2D2E35] z-50",
        collapsed && "w-[70px]",
      )}
    >
      {children}
    </aside>
  );
};
