import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  // Add `id` as a parameter
  const [isLoading, setIsLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  useEffect(() => {
    const getMessages = async () => {
        if(!selectedConversation) return;
      try {
        setIsLoading(true);
        setMessages([]);
        const res = await fetch(`/api/messages/${selectedConversation.id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        setMessages(data);
      } catch (error: any) {
        console.error(error.message);
        toast.error("No messages found");
      } finally {
        setIsLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation, setMessages]);

  return { isLoading, messages };
};

export default useGetMessages;
