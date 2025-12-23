import Badge from '@components/Badge';

const ApplicantTable = ({ applicants, onRowClick }) => {
  return (
    <div className='border border-gray-200 rounded-lg overflow-hidden'>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-gray-200 bg-white'>
              {['지원자명', '학교 / 전공', '학점', '면접일', '최종 점수', '직무 역량', '핵심 역량', 'AI 한줄 평가', '주목/북마크'].map((head) => (
                <th key={head} className='px-4 py-3 text-left text-xs font-medium text-gray-600 first:text-left last:text-center text-center'>
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {applicants?.map((applicant) => (
              <tr
                key={applicant.applicant_id}
                className='border-b border-gray-100 bg-white hover:bg-gray-50 transition-colors cursor-pointer'
                onClick={() => onRowClick(applicant.applicant_id)}
              >
                <td className='px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900'>
                  {applicant.applicant_name}
                </td>
                <td className='px-4 py-3'>
                  <div className='text-sm'>
                    <div className='font-medium text-gray-900'>{applicant.school}</div>
                    <div className='text-gray-500 text-xs'>{applicant.major}</div>
                  </div>
                </td>
                <td className='px-4 py-3 text-center text-sm font-medium'>{applicant.gpa.toFixed(1)}</td>
                <td className='px-4 py-3 text-center text-sm text-gray-600'>{applicant.interview_date}</td>
                <td className='px-4 py-3 text-center text-sm font-semibold text-blue'>{applicant.scores.final_score}</td>
                <td className='px-4 py-3 text-center text-sm font-semibold text-[#50C878]'>{applicant.scores.job_overall}</td>
                <td className='px-4 py-3 text-center text-sm font-semibold text-[#FFA500]'>{applicant.scores.common_overall}</td>
                <td className='px-4 py-3 max-w-xs text-sm text-gray-700 line-clamp-2'>{applicant.ai_one_line_summary}</td>
                <td className='px-3 py-3 text-center whitespace-nowrap'>
                  <div className='flex items-center justify-center gap-2'>
                    {applicant.is_highlighted && <Badge variant='secondary'>주목 인재</Badge>}
                    {applicant.is_bookmarked && (
                      <Badge variant='ghost' classname='px-2 py-1 rounded-lg border border-amber-200 bg-amber-50 text-amber-700 text-xs font-medium'>
                        북마크
                      </Badge>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicantTable;