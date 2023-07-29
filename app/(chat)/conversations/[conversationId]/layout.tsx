export default async function ConversationLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { conversationId: string }
}) {
  return (
    <>
      {children}
    </>
  );
};
