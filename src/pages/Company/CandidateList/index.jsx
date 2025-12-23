import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyOverview from './CompanyOverview';
import FilterSection from './FilterSection';
import ApplicantTable from './ApplicantTable';
import { fetchCandidateList } from './mock';

const InterviewResult = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    school: '', major: '', minGpa: '', showHighlightOnly: false
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchCandidateList(101);
      setResult(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const filteredApplicants = result?.applicants.filter((applicant) => {
    return (
      (!filters.school || applicant.school.includes(filters.school)) &&
      (!filters.major || applicant.major.includes(filters.major)) &&
      (!filters.minGpa || applicant.gpa >= Number(filters.minGpa)) &&
      (!filters.showHighlightOnly || applicant.is_highlighted)
    );
  });

  if (loading) return null;

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto px-12 py-8 max-w-[1800px]'>
        <div className='flex items-center justify-between mb-8 pb-6 border-b border-gray-200'>
          <h1 className='text-2xl font-bold text-blue'>면접 인사이트</h1>
        </div>

        <CompanyOverview result={result} />
        
        <FilterSection 
          filters={filters} 
          setFilters={setFilters} 
          onReset={() => setFilters({ school: '', major: '', minGpa: '', showHighlightOnly: false })} 
        />

        <div className='mb-4'>
          <p className='text-sm text-gray-600'>
            총 <span className='font-semibold text-gray-900'>{filteredApplicants?.length || 0}</span>명
          </p>
        </div>

        <ApplicantTable 
          applicants={filteredApplicants} 
          onRowClick={(id) => navigate(`/company/applicant/${id}`)} 
        />
      </div>
    </div>
  );
};

export default InterviewResult;