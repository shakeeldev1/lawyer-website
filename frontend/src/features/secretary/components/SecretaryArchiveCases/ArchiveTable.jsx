import React, { useEffect, useState } from 'react'
import { Eye, Trash2, ChevronRight, FileText } from 'lucide-react'

const ArchiveTable = ({ cases, onView, onDelete }) => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024)
  // ✅ Sync with sidebar state
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024
      setSidebarOpen(desktop)
    }

    const handleSidebarToggle = () => {
      // Listen for sidebar state changes from the sidebar component
      const sidebar = document.querySelector('aside')
      if (sidebar) {
        const isOpen = sidebar.classList.contains('w-64')
        setSidebarOpen(isOpen)
      }
    }

    window.addEventListener('resize', handleResize)

    // Check sidebar state periodically (you can use a better state management approach)
    const interval = setInterval(handleSidebarToggle, 100)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearInterval(interval)
    }
  }, [])

  const TableRow = ({ c, idx }) => (
    <tr
      className={`transition-all duration-200 hover:bg-slate-50 ${
        idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
      }`}
    >
      <td className='p-4 font-semibold text-slate-800 whitespace-nowrap'>
        {c.id}
      </td>
      <td className='p-4 text-slate-800 whitespace-nowrap'>{c.client}</td>
      <td className='p-4 text-slate-800 whitespace-nowrap'>{c.clientNumber}</td>
      <td className='p-4 font-medium text-slate-800 whitespace-nowrap'>
        {c.caseNumber}
      </td>
      <td className='p-4 whitespace-nowrap'>
        <span className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold whitespace-nowrap'>
          {c.caseType}
        </span>
      </td>
      <td className='p-4 text-slate-800 whitespace-nowrap'>{c.lawyer}</td>
      <td className='p-4 text-slate-600 whitespace-nowrap'>{c.date}</td>
      <td className='p-4'>
        <div className='space-y-1'>
          {c.stages.map((s, i) => (
            <div
              key={i}
              className='flex items-center gap-2 text-sm text-slate-700 whitespace-nowrap'
            >
              <ChevronRight size={14} className='text-slate-500' />
              <span>{s.stage}</span>
              <span className='text-slate-500 text-xs'>
                ({s.documents.length} doc{s.documents.length > 1 ? 's' : ''})
              </span>
            </div>
          ))}
        </div>
      </td>
      <td className='p-4 text-right flex justify-end mt-4 gap-2'>
        <button
          className='inline-flex items-center justify-center w-8 h-8 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition-colors duration-200 shadow-sm'
          onClick={() => onView(c)}
        >
          <Eye size={14} />
        </button>
        <button
          className='inline-flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 shadow-sm'
          onClick={() => onDelete(c)}
        >
          <Trash2 size={14} />
        </button>
      </td>
    </tr>
  )

  if (!cases.length)
    return (
      <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center'>
        <FileText className='w-10 h-10 text-blue-500 mx-auto mb-3' />
        <h3 className='text-lg font-semibold text-gray-900 mb-2'>
          No Archived Cases
        </h3>
        <p className='text-gray-500 text-sm'>
          Completed cases will appear here once archived.
        </p>
      </div>
    )

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300
    ${sidebarOpen ? 'md:w-[510px] lg:w-[980px]' : 'md:w-[700px] lg:w-[1160px]'}
  `}
    >
      {/* ✅ Responsive container width based on sidebar */}
      <div className='overflow-x-auto scrollbar-thin scrollbar-thumb-slate-400/40 scrollbar-track-transparent w-full text-left border-collapse'>
        <table className='w-full min-w-[1000px] text-left border-collapse'>
          <thead className='bg-gradient-to-r from-slate-800 to-slate-700 text-white sticky top-0 z-10'>
            <tr>
              {[
                'Archive ID',
                'Case Number',
                'Client Name',
                'Phone',
                'Email',
                'National ID',
                'Address',
                'Additional Info',
                'Case Type',
                'Lawyer',
                'Date',
                'Stages',
                'Actions'
              ].map(h => (
                <th
                  key={h}
                  className='p-4 text-sm font-semibold tracking-wide text-white uppercase whitespace-nowrap'
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-200'>
            {cases.map((c, idx) => (
              <tr
                key={c.id}
                className={`transition-all duration-200 hover:bg-slate-50 ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                }`}
              >
                <td className='p-4 font-semibold text-slate-800 whitespace-nowrap'>
                  {c.id}
                </td>
                <td className='p-4 font-semibold text-slate-800 whitespace-nowrap'>
                  {c.caseNumber}
                </td>
                <td className='p-4 text-slate-800 whitespace-nowrap'>
                  {c.client}
                </td>
                <td className='p-4 text-slate-800 whitespace-nowrap'>
                  {c.clientNumber}
                </td>
                <td className='p-4 text-slate-800 whitespace-nowrap'>
                  {c.email}
                </td>
                <td className='p-4 text-slate-800 whitespace-nowrap'>
                  {c.nationalId}
                </td>
                <td className='p-4 text-slate-800 whitespace-nowrap'>
                  {c.address}
                </td>
                <td className='p-4 text-slate-800 whitespace-nowrap'>
                  {c.additionalInfo}
                </td>
                <td className='p-4 whitespace-nowrap'>
                  <span className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold whitespace-nowrap'>
                    {c.caseType}
                  </span>
                </td>
                <td className='p-4 text-slate-800 whitespace-nowrap'>
                  {c.lawyer}
                </td>
                <td className='p-4 text-slate-600 whitespace-nowrap'>
                  {c.date}
                </td>
                <td className='p-4'>
                  <div className='space-y-1'>
                    {c.stages.map((s, i) => (
                      <div
                        key={i}
                        className='flex items-center gap-2 text-sm text-slate-700 whitespace-nowrap'
                      >
                        <ChevronRight size={14} className='text-slate-500' />
                        <span>{s.stage}</span>
                        <span className='text-slate-500 text-xs'>
                          ({s.documents.length} doc
                          {s.documents.length > 1 ? 's' : ''})
                        </span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className='p-4 text-right flex justify-end mt-4 gap-2'>
                  <button
                    className='inline-flex items-center justify-center w-8 h-8 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition-colors duration-200 shadow-sm'
                    onClick={() => onView(c)}
                  >
                    <Eye size={14} />
                  </button>
                  <button
                    className='inline-flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 shadow-sm'
                    onClick={() => onDelete(c)}
                  >
                    <Trash2 size={14} />
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

export default ArchiveTable
