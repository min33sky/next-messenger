"use client";

import clsx from "clsx";
import EmptyState from "@/components/EmptyState";
import useConversation from "@/hooks/useConversation";

/**
 * 채팅방 페이지
 */
export default function ConversationsPage() {
  const { isOpen } = useConversation();

  console.log(`%c isOpen: ${isOpen}`, "color: #ff0000");

  return (
    <div
      className={clsx("h-full lg:block lg:pl-80", isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
}
