import getConversationById from "@/actions/getConversationById";
import getMessages from "@/actions/getMessages";
import EmptyState from "@/components/EmptyState";
import Header from "@/app/conversations/[conversationId]/components/Header";
import Form from "@/app/conversations/[conversationId]/components/Form";
import Body from "@/app/conversations/[conversationId]/components/Body";

interface ConversationIdPageProps {
  params: {
    conversationId: string;
  };
}

export default async function ConversationIdPage({
  params: { conversationId },
}: ConversationIdPageProps) {
  const conversation = await getConversationById(conversationId);
  const messages = await getMessages(conversationId);

  console.log("conversation: ", conversation);
  console.log("messages: ", messages);

  if (!conversation) {
    return (
      <div className={`h-full lg:pl-80`}>
        <div className={`flex h-full flex-col`}>
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full lg:pl-80`}>
      <div className={`flex h-full flex-col`}>
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
}
