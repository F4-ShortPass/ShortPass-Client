import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { saveCandidate } from '@apis/applicant.js';
import Button from '@components/Button';
import alertIcon from '@assets/svg/alert-triangle.svg';

import FormSidebar from './FormSidebar';
import Step1BasicInfo from './Step1BasicInfo';
import Step2JobSelection from './Step2JobSelection';
import Step3DocumentUpload from './Step3DocumentUpload';
import { STEPS, STEP_CONTENT } from './constants';


const CandidateInfo = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', gender: '', birthdate: '',
    education: '', school: '', major: '',
    portfolioPdfs: [], subRoles: [],
  });

  // 유효성 검사 로직
  const isEmailValid = /\S+@\S+\.\S+/.test(formData.email);
  const isBasicInfoValid = formData.name.trim() && formData.phone.trim() && isEmailValid;
  const isFinalSubmitValid = isBasicInfoValid && formData.portfolioPdfs.length > 0;

  const handleChange = (key) => (value) => {
    const finalValue = value?.target ? value.target.value : value;
    setFormData(prev => ({ ...prev, [key]: finalValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFinalSubmitValid) { setIsSubmitted(true); return; }
    if (isLoading) return;

    setIsLoading(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        gender: formData.gender || undefined,
        education: [formData.school, formData.major].filter(Boolean).join(' ') || undefined,
        birthdate: formData.birthdate || undefined,
      };
      const savedCandidate = await saveCandidate(payload, formData.portfolioPdfs[0]);
      localStorage.setItem('currentCandidateId', savedCandidate.id);
      navigate('/candidate/jobs');
    } catch (error) {
      window.alert(`저장 실패: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full min-h-screen px-8 md:px-15 py-12'>
      <div className='max-w-6xl mx-auto flex items-start gap-10'>
        <FormSidebar currentStep={currentStep} steps={STEPS} />

        <main className='flex-1 max-w-[700px] mx-auto mt-10'>
          <header className='text-center mb-10'>
            <h1 className='text-3xl font-bold text-blue'>{STEP_CONTENT[currentStep].title}</h1>
            <p className='mt-2 text-grey'>{STEP_CONTENT[currentStep].desc}</p>
          </header>

          <form onSubmit={handleSubmit} className='w-full flex flex-col gap-6'>
            {currentStep === 1 && <Step1BasicInfo formData={formData} onChange={handleChange} />}
            {currentStep === 2 && <Step2JobSelection formData={formData} setFormData={setFormData} />}
            {currentStep === 3 && <Step3DocumentUpload formData={formData} setFormData={setFormData} />}

            {!isFinalSubmitValid && isSubmitted && currentStep === 3 && (
              <div className='px-4 py-4 border border-red/40 rounded-lg bg-red/7 flex items-center gap-3'>
                <img src={alertIcon} className='w-4.5 h-4.5' alt="경고" />
                <p className='text-red font-medium'>필수 항목을 모두 채워주세요!</p>
              </div>
            )}

            <div className='flex gap-5 justify-between items-center mt-4'>
              <Button type='button' variant='ghost' onClick={() => currentStep > 1 ? setCurrentStep(s => s - 1) : navigate('/')}>이전</Button>
              {currentStep < 3 ? (
                <Button type='button' onClick={() => setCurrentStep(s => s + 1)}>다음</Button>
              ) : (
                <Button type='submit' disabled={isLoading}>제출하기</Button>
              )}
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default CandidateInfo;