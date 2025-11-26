import { useEffect, useState } from 'react'
import { FiChevronRight, FiTrash2 } from 'react-icons/fi'
import StatusPill from './StatusPill'

export default function ApprovedLawyerCasesTable ({
  cases,
  openModal,
  openDeleteModal
}) {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024)

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024)
    }

    const handleSidebarToggle = () => {
      const sidebar = document.querySelector('aside')
      if (sidebar) {
        const isOpen = sidebar.classList.contains('w-64')
        setSidebarOpen(isOpen)
      }
    }

    window.addEventListener('resize', handleResize)
    const interval = setInterval(handleSidebarToggle, 120)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearInterval(interval)
    }
  }, [])

  // Stage conversion (0,1,2 → Main, Appeal, Cassation)
  const convertStage = (stageNum) => {
    const stages = ["Main", "Appeal", "Cassation"]
    return stages[stageNum] || "Unknown"
  }

  return (
    <div
      className={`bg-white w-full rounded-2xl w-[330px] shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 overflow-x-auto`}
    >
      <div className='overflow-x-auto scrollbar-thin scrollbar-thumb-slate-400/40 scrollbar-track-transparent w-full text-left border-collapse'>
        <table className='w-full min-w-[1000px] text-left border-collapse'>
          <thead className='bg-gradient-to-r from-slate-800 to-slate-700 text-white sticky top-0 z-10'>
            <tr>
              {[
                'Case #',
                'Client Name',
                'Phone',
                'Case Type',
                'Stage',
                'Secretary',
                'Lawyer',
                'Status',
                'Actions'
              ].map(h => (
                <th
                  key={h}
                  className='p-4 text-sm font-semibold uppercase whitespace-nowrap'
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className='divide-y divide-slate-200'>
            {cases.map((c, idx) => (
              <tr
                key={c._id}
                className={`${
                  idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                } hover:bg-slate-100 transition`}
              >
                {/* Case number */}
                <td className='p-4 font-semibold whitespace-nowrap'>
                  {c.caseNumber}
                </td>

                {/* Client Name */}
                <td className='p-4 whitespace-nowrap'>
                  {c.clientId?.name}
                </td>

                {/* Phone */}
                <td className='p-4 whitespace-nowrap'>
                  {c.clientId?.contactNumber || '—'}
                </td>

                {/* Case Type */}
                <td className='p-4 whitespace-nowrap'>{c.caseType}</td>

                {/* Stage */}
                <td className='p-4 whitespace-nowrap'>
                  <StatusPill status={convertStage(c.currentStage)} />
                </td>

                {/* Secretary */}
                <td className='p-4 whitespace-nowrap'>
                  {c.secretary?.name}
                </td>

                {/* Lawyer */}
                <td className='p-4 whitespace-nowrap'>
                  {c.assignedLawyer?.name}
                </td>

                {/* Status */}
                <td className='p-4 whitespace-nowrap'>
                  <StatusPill status={c.status} />
                </td>

                {/* Actions */}
                <td className='p-4 whitespace-nowrap flex justify-end gap-2'>
                  <button
                    onClick={() => openModal(c)}
                    className='inline-flex items-center px-3 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 gap-1'
                  >
                    <FiChevronRight /> Open
                  </button>

                  <button
                    onClick={() => openDeleteModal(c)}
                    className='inline-flex items-center px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 gap-1'
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}
