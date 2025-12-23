import { useNavigate } from 'react-router-dom';
import Button from '@components/Button';
import CompanyCard from './CompanyCard';

const availableCompanies = [
  {
    id: 1,
    companyName: '삼성물산 패션부문',
    jobTitle: '상품기획(MD) 신입',
    deadline: '2025.12.15',
    matchedSubRoles: ['상품기획', '브랜드 기획', '마케팅'],
    requiredSkills: [
      '패션 트렌드 분석',
      '브랜드 기획',
      '시장 조사',
      '캠페인 기획',
      '소비자 분석',
    ],
    recommendationReason:
      '트렌드 기반의 상품 기획과 브랜드 운영 전략에 관심이 있다면 적합한 포지션입니다.',
    jobPostingUrl: 'https://www.samsungfashion.com/recruitGuide.do?TAB_ID=1',
  },
];

export default function CandidateJobs() {
  const navigate = useNavigate();

  const handleStartInterview = (id) => navigate('/candidate/start');
  const handleViewJobPosting = (url) => window.open(url, '_blank', 'noopener,noreferrer');
  const handleGoBack = () => navigate('/candidate/info');

  return (
    <div className='min-h-screen'>
      <div className='max-w-4xl mx-auto px-6 py-16'>
        {/* 헤더 */}
        <header className='text-center mb-12'>
          <h1 className='text-3xl md:text-4xl font-bold text-blue mb-4'>지원할 회사를 선택하세요</h1>
          <p className='text-base md:text-lg text-gray-600'>추천된 포지션을 확인하고 면접을 시작해 보세요.</p>
        </header>

        <div className='mb-6'>
          <p className='text-sm text-slate-500'>총 {availableCompanies.length}개 회사</p>
        </div>

        {/* 회사 카드 그리드 */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
          {availableCompanies.map((company) => (
            <CompanyCard 
              key={company.id} 
              company={company} 
              onStart={handleStartInterview} 
              onViewPosting={handleViewJobPosting} 
            />
          ))}
        </div>

        {/* 안내 및 하단 버튼 */}
        <footer className='space-y-8'>
          <div className='bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 text-sm text-blue-800'>
            면접 보기를 누르면 바로 면접 대기 화면으로 이동합니다.
          </div>
          <Button variant='ghost' onClick={handleGoBack}>이전</Button>
        </footer>
      </div>
    </div>
  );
}