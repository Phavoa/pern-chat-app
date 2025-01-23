import { LogOut } from "lucide-react";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {

	const { logout } = useLogout();

	return (
		<div className='mt-auto'>
			<LogOut className='w-6 h-6 cursor-pointer text-[#8EBEFF]' onClick={logout} />
		</div>
	);
};
export default LogoutButton;
