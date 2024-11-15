import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const { selectedConversation, setMessages, messages } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async (message: string) => {
      if (!selectedConversation) return;
      try {
        setIsLoading(true);
        const res = await fetch(`api/messages/send/${selectedConversation.id}`, {
          method: "POST",
          body: JSON.stringify({ message }),
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        setMessages([...messages, data]);
      } catch (error: any) {
        console.error(error);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };


  return {sendMessage, isLoading};
};


export default useSendMessage;