import externalLink from '@assets/svg/external_link.svg';

const CompanyCard = ({ company, onStart, onViewPosting }) => {
  return (
    <div className='bg-transparent border border-slate-200 rounded-2xl px-5 py-4 flex flex-col'>
      {/* 헤더: 회사명 및 마감일 */}
      <div className='flex items-start justify-between mb-2.5'>
        <h3 className='font-semibold text-base md:text-lg text-blue'>
          {company.companyName}
        </h3>
        <div className='text-dark text-sm font-semibold px-3 py-1.5 whitespace-nowrap ml-2'>
          ~ {company.deadline}
        </div>
      </div>

      {/* 포지션명 */}
      <p className='font-medium text-gray-800 mb-3'>{company.jobTitle}</p>

      {/* 매칭된 직무 */}
      <div className='mb-3'>
        <p className='text-xs text-slate-600 mb-1.5'>매칭된 직무</p>
        <div className='flex flex-wrap gap-1.5'>
          {company.matchedSubRoles.map((role, idx) => (
            <span key={idx} className='bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full'>
              {role}
            </span>
          ))}
        </div>
      </div>

      {/* 주요 요구 스킬 */}
      <div className='mb-3'>
        <p className='text-xs text-slate-600 mb-1.5'>주요 요구 스킬</p>
        <div className='flex flex-wrap gap-1.5'>
          {company.requiredSkills.slice(0, 4).map((skill, idx) => (
            <span key={idx} className='bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-full'>
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* 추천 이유 */}
      <p className='text-xs text-slate-600 leading-relaxed mb-4 flex-grow'>
        {company.recommendationReason}
      </p>

      {/* 액션 버튼 */}
      <div className='flex gap-2 mt-auto'>
        <button
          onClick={() => onViewPosting(company.jobPostingUrl)}
          className='flex-1 flex items-center justify-center gap-1.5 border border-slate-300 text-slate-700 text-sm font-medium py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors'
          disabled={company.id !== 1}
        >
          <img src={externalLink} alt='공고' className='w-3.5 h-3.5' />
          채용공고
        </button>
        <button
          onClick={() => onStart(company.id)}
          className='flex-1 cursor-pointer bg-blue-100 hover:bg-blue text-dark hover:text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors'
          disabled={company.id !== 1}
        >
          면접 보기
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;