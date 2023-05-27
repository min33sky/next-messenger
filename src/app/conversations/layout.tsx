import getUsers from "@/actions/getUsers";
import Wrapper from "@/components/wrapper/Wrapper";
import getConversations from "@/actions/getConversations";
import ConversationList from "@/app/conversations/components/ConversationList";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    // @ts-expect-error Server Component
    <Wrapper>
      <div className="h-full">
        <ConversationList
          users={users}
          title="Messages"
          initialItems={conversations}
        />
        {children}
      </div>
    </Wrapper>
  );
}
