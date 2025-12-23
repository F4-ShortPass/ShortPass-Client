const TranscriptSidebar = ({ transcript }) => (
  <div className='border border-gray-200 rounded-lg bg-white overflow-hidden h-full'>
    <div className='bg-gray-50 border-b border-gray-200 px-4 py-3'>
      <h3 className='text-sm font-semibold text-gray-900'>면접 Transcript</h3>
      <p className='text-xs text-gray-600 mt-0.5'>전체 질문-답변 기록</p>
    </div>
    <div className='px-4 py-4 space-y-3 max-h-[710px] overflow-y-auto'>
      {transcript.map((item, index) => (
        <div key={index} className='pb-3 border-b border-gray-100 last:border-0'>
          <div className='flex items-center gap-2 mb-1.5'>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded ${
                item.type === 'question'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {item.type === 'question' ? 'Q' : 'A'}
            </span>
          </div>
          <p className='text-xs text-gray-700 leading-relaxed'>{item.text}</p>
        </div>
      ))}
    </div>
  </div>
);

export default TranscriptSidebar;