const RecommendedQuestions = ({ questions }) => (
  <div className='mb-8 pb-8 border-b border-gray-200'>
    <h2 className='text-lg font-semibold text-gray-900 mb-4'>추천 질문 목록</h2>
    <p className='text-sm text-gray-600 mb-4'>
      지원자의 답변을 바탕으로 AI가 생성한 심화 면접 질문입니다.
    </p>
    <ul className='space-y-3'>
      {questions.map((question, index) => (
        <li key={index} className='flex gap-3 text-sm text-gray-700'>
          <span className='text-blue-600 font-medium'>{index + 1}.</span>
          <span>{question}</span>
        </li>
      ))}
    </ul>
</div>
);

export default RecommendedQuestions;