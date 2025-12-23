const InterviewTips = () => {
  const tips = [
    "조용한 환경에서 면접을 진행해 주세요",
    "인터넷 연결이 안정적인지 확인해 주세요",
    "카메라를 정면으로 바라보며 답변해 주세요",
    "면접 도중 나가기를 누르면 진행 상황이 저장되지 않을 수 있습니다"
  ];

  return (
    <div className='border border-slate-200 rounded-xl p-6 mb-8'>
      <h3 className='font-semibold text-gray-900 mb-3'>면접 팁</h3>
      <ul className='space-y-2 text-sm text-gray-700'>
        {tips.map((tip, index) => (
          <li key={index} className='flex gap-2'>
            <span>-</span>
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InterviewTips;