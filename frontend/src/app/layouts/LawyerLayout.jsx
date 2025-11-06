import { Outlet } from "react-router-dom"
import SideBar from "../../features/lawyer/components/SideBar"
import TopBar from "../../features/lawyer/components/TopBar"

const LawyerLayout = () => {
    return (
        <div className='flex h-screen bg-gray-100 gap-3'>
            <SideBar />
            <div className='flex-1 flex flex-col'>
                <TopBar />
                <div className='flex-1 p-4 overflow-y-auto'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default LawyerLayout
