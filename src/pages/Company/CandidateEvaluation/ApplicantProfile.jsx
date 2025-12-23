import React from 'react';
import Badge from '@components/Badge';
import Button from '@components/Button';
import download from '@assets/svg/download.svg';
import bookmarkActive from '@assets/svg/bookmark-blue.svg';
import bookmark from '@assets/svg/bookmark.svg';

const ApplicantProfile = ({ applicant, scoreBreakdown, bookmarked, onBookmark }) => {
  
  const infoItems = [
    { label: '이름', value: applicant.name },
    { label: '나이', value: `${applicant.age}세` },
    { label: '성별', value: applicant.gender },
    { label: '이메일', value: applicant.email },
    { label: '학교', value: applicant.school },
    { label: '전공', value: applicant.major },
    { label: '학점', value: `${applicant.gpa.toFixed(2)} / 4.5` },
    { label: '지원 직무', value: applicant.position },
  ];

  return (
    <div className='mb-8 pb-8 border-b border-gray-200'>
      {/* 제목 및 북마크 버튼 */}
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold text-gray-900 mb-4'>
          지원자 정보
        </h2>
        <button 
          className='cursor-pointer p-1 hover:bg-gray-50 rounded-full transition-colors' 
          onClick={onBookmark}
          aria-label="북마크 토글"
        >
          <img 
            src={bookmarked ? bookmarkActive : bookmark} 
            alt='북마크' 
            className='w-6 h-6' 
          />
        </button>
      </div>

      {/* 정보 그리드 영역 */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-4'>
        {/* 인적 사항 반복 렌더링 */}
        {infoItems.map((item, index) => (
          <div key={index}>
            <div className='text-sm text-gray-600 mb-1'>{item.label}</div>
            <div className='text-base font-medium text-gray-900'>
              {item.value}
            </div>
          </div>
        ))}

        {/* 점수 관련 정보 (강조 스타일 적용) */}
        <div>
          <div className='text-sm text-gray-600 mb-1'>최종 점수</div>
          <div className='text-base font-semibold text-blue'>
            {scoreBreakdown.final_score}%
          </div>
        </div>
        <div>
          <div className='text-sm text-gray-600 mb-1'>직무 역량 점수</div>
          <div className='text-base font-semibold text-[#50C878]'>
            {scoreBreakdown.job_score}%
          </div>
        </div>
        <div>
          <div className='text-sm text-gray-600 mb-1'>공통 역량 점수</div>
          <div className='text-base font-semibold text-[#FFA500]'>
            {scoreBreakdown.common_score}%
          </div>
        </div>

        {/* 주목 인재 배지 */}
        <div>
          <div className='text-sm text-gray-600 mb-1'>주목 인재 여부</div>
          <div className='text-base font-medium text-gray-900'>
            <Badge variant='secondary'>주목 인재</Badge>
          </div>
        </div>
      </div>

      {/* 하단 액션 버튼 */}
      <div className='mt-6 flex justify-end'>
        <Button variant='primary' className='flex items-center gap-2 text-sm'>
          <img src={download} alt='이력서 다운로드' className='w-4 h-4' />
          이력서 다운로드
        </Button>
      </div>
    </div>
  );
};

export default ApplicantProfile;