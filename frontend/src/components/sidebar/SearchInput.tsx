import { Search } from "lucide-react";
import { useState } from "react";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";
import useGetConversations from "../../hooks/useGetConversations";
import { Input } from "../ui/input";

const SearchInput = () => {
	const [search, setSearch] = useState("");
	const {setSelectedConversation} = useConversation();
	const {conversations} = useGetConversations();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if(!search) return;
		if(search.length < 3) {
			return toast.error("Please enter a search term of at least 3 characters");
		}

		const conversation = conversations.find((conversation) => conversation.username.toLowerCase().includes(search.toLowerCase()));
		if(!conversation) {
			toast.error("No user found")
		} else{
			setSelectedConversation(conversation)
		}
	}

	return (
		<form className='flex items-center gap-2 relative' onSubmit={handleSubmit}>
			<Input
				type='search'
				placeholder='Search…'
				className='text-gray-200'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button type='submit' className='h-full w-8 text-white absolute right-0 '>
				<Search className='text-white w-3 h-3 md:w-5 md:h-5 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;
