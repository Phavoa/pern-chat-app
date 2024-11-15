import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";

const Messages = () => {
	const { isLoading, messages } = useGetMessages();


	return (
		<div className='px-4 flex-1 overflow-auto'>
			{isLoading && [...Array(5)].map((_, idx) => <MessageSkeleton key={idx} />)}

			{!isLoading && messages.map((message) => <Message key={message.id} message={message} />)}

			{!isLoading && messages.length === 0 && (
				<p className='text-center text-white'>Send a message to start the conversation</p>
			)}
		</div>
	);
};
export default Messages;