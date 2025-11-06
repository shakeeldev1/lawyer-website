import { Outlet } from "react-router-dom"
import Sidebar from "../../features/secretary/components/Sidebar"
import Topbar from "../../features/secretary/components/Topbar"

const SecretaryLayout = () => {
    return (
        <div className='flex h-screen bg-gray-100 gap-3'>
            <Sidebar />
            <div className='flex-1 flex flex-col'>
                <Topbar />
                <div className='flex-1 p-4 overflow-y-auto'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default SecretaryLayout
