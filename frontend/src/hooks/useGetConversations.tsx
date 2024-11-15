import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const useGetConversations = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [conversations, setConversations] = useState<ConversationType[]>([]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                setIsLoading(true);
                const res = await fetch("/api/messages/conversations");
                const data = await res.json();
                if (!res.ok || data.error) throw new Error(data.error);
                setConversations(data);
            } catch (error: any) {
                console.error(error.message);
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        getConversations();
    }, [])

    return {isLoading, conversations}
}

export default useGetConversations;