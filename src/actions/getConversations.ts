import getCurrentUser from "./getCurrentUser";
import { prisma } from "@/libs/db";

/**
 * Get all conversations of current user
 * @description 현재 사용자의 모든 대화를 가져옵니다
 */
export default async function getConversations() {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return [];
  }

  try {
    return await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });
  } catch (error: any) {
    return [];
  }
}
