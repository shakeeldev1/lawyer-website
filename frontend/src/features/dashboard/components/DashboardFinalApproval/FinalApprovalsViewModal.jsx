import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, Loader2, XCircle } from 'lucide-react'

const FinalApprovalsViewModal = ({
  caseItem,
  onClose,
  onApprove,
  onRequestChanges
}) => {
  const [loading, setLoading] = useState(false)

  const handleApprove = () => {
    setLoading(true)
    setTimeout(() => {
      onApprove(caseItem)
      setLoading(false)
    }, 800)
  }

  return (
    <div className='px-4 fixed inset-0 bg-black/50 backdrop-blur z-[9999] flex justify-center items-center'>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className='relative bg-white/60 text-white rounded-2xl shadow-2xl w-full max-w-lg p-8 border border-[#fe9a00]/20'
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-500 hover:text-slate-800 transition-colors'
        >
          <XCircle className='w-5 h-5' />
        </button>

        {/* Header */}
        <div className='flex items-center gap-3 mb-6'>
          <ArrowLeft
            onClick={onClose}
            className='cursor-pointer text-gray-800 hover:text-[#fe9a00] w-5 h-5 transition'
          />
          <h3 className='text-xl font-semibold text-[#162030]'>
            Case Details —{' '}
            <span className='text-slate-800'>{caseItem.caseNumber}</span>
          </h3>
        </div>

        {/* Memorandum */}
        <div className=' bg-white/60 border border-[#fe9a00]/20 rounded-xl p-4 mb-5'>
          <p className='text-[#162030] text-sm whitespace-pre-wrap leading-relaxed'>
            {caseItem.memorandum}
          </p>
        </div>

        {/* Last Updated */}
        <div className='text-xs text-gray-800 mb-6 text-right'>
          Last Updated: {caseItem.lastUpdated}
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row justify-end gap-3 mt-6 w-full sm:w-auto'>
          <button
            onClick={() => onRequestChanges(caseItem)}
            disabled={loading}
            className='flex-1 sm:flex-none md:px-5 px-6 md:py-2.5 py-2 rounded-full flex items-center justify-center gap-2 
               bg-[#fe9a00]/10 text-[#162030] font-medium hover:bg-[#fe9a00]/20 
               border border-[#162030] transition-all duration-200 text-sm sm:text-base'
          >
            <XCircle className='w-4 h-4' />
            Request Changes
          </button>

          <button
            onClick={handleApprove}
            disabled={loading}
            className={`flex-1 sm:flex-none px-6 py-2.5 rounded-full font-semibold flex items-center justify-center gap-2 
               transition-all duration-200 shadow-md text-sm sm:text-base
               ${
                 loading
                   ? 'bg-gray-600 cursor-wait text-white'
                   : 'bg-[#fe9a00] text-[#1c283c] hover:bg-[#ffb733] shadow-[#fe9a00]/30'
               }`}
          >
            {loading ? (
              <Loader2 className='animate-spin w-4 h-4' />
            ) : (
              <CheckCircle className='w-4 h-4' />
            )}
            {loading ? 'Signing...' : 'Approve & Sign'}
          </button>
        </div>

      
      </motion.div>
    </div>
  )
}

export default FinalApprovalsViewModal
