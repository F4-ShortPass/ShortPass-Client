const AISummary = ({ summary }) => (
    <div className='mb-8 pb-8 border-b border-gray-200'>
      <h2 className='text-lg mb-4 font-semibold text-gray-900'>
        AI 심층 분석 심사평
      </h2>
      <p className='text-sm text-gray-700 leading-relaxed whitespace-pre-line'>
        {summary}
      </p>
    </div>
  );
  
  export default AISummary;