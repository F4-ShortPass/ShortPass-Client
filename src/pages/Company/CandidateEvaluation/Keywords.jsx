const Keywords = ({ keywords }) => (
    <div className='mb-8 pb-8 border-b border-gray-200'>
      <h2 className='text-lg font-semibold mb-4'>요약 평가 키워드</h2>
      {['positive', 'negative'].map(type => (
        <div key={type} className='mb-4'>
          <div className='text-sm text-gray-500 mb-2'>{type === 'positive' ? '긍정' : '부정'}</div>
          <div className='flex flex-wrap gap-2'>
            {keywords[type].map((word, i) => (
              <span key={i} className={`px-3 py-1 text-xs rounded-full border ${type === 'positive' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                {word}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

export default Keywords;