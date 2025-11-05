import RecentOrdersTable from "../components/dashboardoverview/RecentCasesTable"
import RevenueChart from "../components/dashboardoverview/CaseStageChart"
import StatsCard from "../components/dashboardoverview/StatsCard"

const AdminDashboard = () => {
  return (
    <div>
      <StatsCard />
      <RevenueChart />
      <RecentOrdersTable />
    </div>
  )
}

export default AdminDashboard
