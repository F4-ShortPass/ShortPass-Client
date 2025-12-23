import samsungLogo from '@assets/images/samsung-logo.svg';
import Badge from '@components/Badge';

const CompanyOverview = ({ result }) => {
  if (!result) return null;

  return (
    <div className='mb-8 pb-6 border-b border-gray-200'>
      <div className='flex items-start gap-4 mb-4'>
        <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0'>
          <img src={samsungLogo} alt='Company Logo' className='w-8 h-8' />
        </div>
        <div className='flex-1'>
          <div className='flex items-center gap-2 mb-1'>
            <h2 className='text-xl font-bold text-gray-900'>{result.company_name}</h2>
            <Badge variant='ghost' classname='text-xs font-medium bg-gray-200 px-2'>
              {result.employment_type}
            </Badge>
            <Badge classname='text-xs font-medium bg-green-100 text-green-700 px-2 rounded-full'>
              {result.hiring_status}
            </Badge>
          </div>
          <h3 className='text-base font-medium text-gray-700'>{result.job_title}</h3>
        </div>
      </div>
      <div className='flex gap-6 text-sm text-gray-600 pl-16'>
        <div>
          <span className='text-gray-500'>모집 기간:</span>{' '}
          <span className='font-medium text-gray-900'>{result.interview_period}</span>
        </div>
        <div>
          <span className='text-gray-500'>전체 지원자:</span>{' '}
          <span className='font-medium text-gray-900'>{result.total_applicants}명</span>
        </div>
      </div>
    </div>
  );
};

export default CompanyOverview;