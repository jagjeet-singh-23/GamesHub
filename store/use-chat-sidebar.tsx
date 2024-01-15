import { create } from "zustand";

export enum ChatVariant {
  CHAT = "CHAT",
  COMMUNITY = "COMMUNITY",
}
interface ChatSidebarStore {
  collapsed: boolean;
  variant: ChatVariant;
  onCollpase: () => void;
  onExpand: () => void;
  onChangeVariant: (variant: ChatVariant) => void;
}

export const useChatSidebar = create<ChatSidebarStore>((set) => ({
  collapsed: false,
  variant: ChatVariant.CHAT,
  onExpand: () => set(() => ({ collapsed: false })),
  onCollpase: () => set(() => ({ collapsed: true })),
  onChangeVariant: (variant: ChatVariant) => set(() => ({ variant })),
}));
