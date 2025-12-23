const EvaluationHeader = ({ onBack }) => (
    <div className='border-b border-gray-200'>
      <div className='max-w-7xl mx-auto px-8 py-6'>
        <button
          onClick={onBack}
          className='text-sm text-gray-600 hover:text-gray-900 mb-4'
        >
          ← 목록으로 돌아가기
        </button>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-semibold text-blue'>지원자 인사이트</h1>
        </div>
      </div>
    </div>
  );
  
  export default EvaluationHeader;