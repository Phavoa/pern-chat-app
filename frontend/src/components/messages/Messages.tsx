import useChatScroll from "../../hooks/useChatScroll";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";

const Messages = () => {
	const { isLoading, messages } = useGetMessages();
	useListenMessages();
	const ref = useChatScroll(messages) as React.LegacyRef<HTMLDivElement>;

	return (
		<div className='px-4 flex-1 overflow-auto' ref={ref}>
			{isLoading && [...Array(5)].map((_, idx) => <MessageSkeleton key={idx} />)}

			{!isLoading && messages.map((message) => <Message key={message.id} message={message} />)}

			{!isLoading && messages.length === 0 && (
				<p className='text-center text-white'>Send a message to start the conversation</p>
			)}
		</div>
	);
};
export default Messages;