const FeedbackModal = ({ modalState, setModalState, onClose, onSubmit }) => {
  if (!modalState.open) return null;

  return (
    <div className='fixed inset-0 z-40 flex items-center justify-center bg-black/30 px-4'>
      <div className='bg-white rounded-lg shadow-xl w-full max-w-lg p-6 space-y-4'>
        <div className='flex items-start justify-between'>
          <div>
            <p className='text-xs text-gray-500 mb-1'>역량 피드백 저장</p>
            <h3 className='text-lg font-semibold text-gray-900'>{modalState.competencyKey}</h3>
            <p className='text-sm text-gray-600 mt-1'>AI 점수 대비 HR 점수와 사유를 입력해주세요.</p>
          </div>
          <button onClick={onClose} className='text-gray-400 hover:text-gray-600'>✕</button>
        </div>

        <div className='space-y-3'>
          <label className='block'>
            <span className='text-sm font-medium text-gray-700'>조정 점수</span>
            <input
              type='number'
              className='mt-1 w-full border rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500'
              value={modalState.adjustedScore}
              onChange={(e) => setModalState(prev => ({ ...prev, adjustedScore: e.target.value }))}
              min={0} max={100}
            />
          </label>
          <label className='block'>
            <span className='text-sm font-medium text-gray-700'>수정 사유</span>
            <textarea
              rows={4}
              className='mt-1 w-full border rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500'
              value={modalState.reasoning}
              onChange={(e) => setModalState(prev => ({ ...prev, reasoning: e.target.value }))}
              placeholder='사유를 입력해주세요.'
            />
          </label>
        </div>

        <div className='flex justify-end gap-2 pt-2'>
          <button onClick={onClose} className='px-4 py-2 text-sm text-gray-600 hover:text-gray-800'>취소</button>
          <button
            onClick={onSubmit}
            disabled={modalState.submitting}
            className='px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-60'
          >
            {modalState.submitting ? '저장 중...' : '피드백 저장'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;