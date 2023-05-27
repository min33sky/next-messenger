import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { prisma } from "@/libs/db";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { message, conversationId, image } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return NextResponse.json(
        { error: "You must be logged in to send a message" },
        { status: 401 }
      );
    }

    const newMessage = await prisma.message.create({
      include: {
        sender: true,
        seen: true,
      },
      data: {
        body: message,
        image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: currentUser.id,
          },
        },
        seen: {
          connect: {
            id: currentUser.id, //? conversationId 여야 하는거 아님????
          },
        },
      },
    });

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    // await pusherServer.trigger(conversationId, 'messages:new', newMessage);
    //
    // const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];
    //
    // updatedConversation.users.map((user) => {
    //   pusherServer.trigger(user.email!, 'conversation:update', {
    //     id: conversationId,
    //     messages: [lastMessage]
    //   });
    // });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.log("### error : ", error);
    return NextResponse.json(
      {
        error: "Something went wrong while sending your message",
      },
      { status: 500 }
    );
  }
}
