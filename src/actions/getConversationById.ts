import getCurrentUser from "@/actions/getCurrentUser";
import { prisma } from "@/libs/db";

/**
 * Get a conversation by id
 * @description 채팅방 id로 채팅방 정보를 가져옵니다
 * @param conversationId id of the conversation
 */
export default async function getConversationById(conversationId: string) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return null;
    }

    return await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });
  } catch (error: any) {
    console.error("Error in getConversationById", error);
    return null;
  }
}
