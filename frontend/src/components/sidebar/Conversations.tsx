import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
  const { conversations, isLoading } = useGetConversations();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation) => (
        <Conversation key={conversation.id} conversation={conversation} emoji={getRandomEmoji()} />
      ))}
      {isLoading ? <span className="loading loading-spinner mx-auto" /> : null}
    </div>
  );
};
export default Conversations;
