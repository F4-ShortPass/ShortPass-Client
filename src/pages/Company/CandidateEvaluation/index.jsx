import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import applicantA from '@mock/applicantA';
import applicantB from '@mock/applicantB';

import EvaluationHeader from './EvaluationHeader';
import ApplicantProfile from './ApplicantProfile';
import AISummary from './AISummary';
import CompetencySection from './CompetencySection';
import TranscriptSidebar from './TranscriptSidebar';
import Keywords from './Keywords';
import HRMemo from './HRMemo';
import FeedbackModal from './FeedbackModal';
import Toast from './Toast';
import RecommendedQuestions from './RecommendedQuestions';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export default function CandidateEvaluation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const applicantData = (id === '1') ? applicantA : applicantB;

  // States
  const [scores, setScores] = useState(applicantData?.competency_scores || {});
  const [bookmarked, setBookmarked] = useState(false);
  const [memo, setMemo] = useState('');
  const [toast, setToast] = useState(null);
  const [feedbackModal, setFeedbackModal] = useState({
    open: false, competencyKey: null, adjustedScore: '', reasoning: '', submitting: false,
  });

  if (!applicantData) return null;

  const { applicant, score_breakdown, overall_summary, competency_details, recommendedQuestions, keywords, transcript } = applicantData;

  const showToast = (message, variant = 'success') => {
    setToast({ message, variant });
    setTimeout(() => setToast(null), 2500);
  };

  const openFeedbackModal = (key) => {
    setFeedbackModal({
      open: true,
      competencyKey: key,
      adjustedScore: scores[key] || '',
      reasoning: competency_details[key]?.connected_summary?.slice(0, 180) || '',
      submitting: false,
    });
  };

  const handleSubmitFeedback = async () => {
    // ... 기존 API 호출 로직과 동일 ...
    setFeedbackModal(prev => ({ ...prev, submitting: true }));
    try {
      await fetch(`${API_BASE}/feedback/`, { /* ... fetch options ... */ });
      showToast('피드백이 저장됐습니다.');
      setScores(prev => ({ ...prev, [feedbackModal.competencyKey]: Number(feedbackModal.adjustedScore) }));
      setFeedbackModal(prev => ({ ...prev, open: false }));
    } catch (e) {
      showToast('저장에 실패했습니다.', 'error');
      setFeedbackModal(prev => ({ ...prev, submitting: false }));
    }
  };

  return (
    <div className='min-h-screen'>
      <div className='flex-1 overflow-y-auto'>
        <EvaluationHeader onBack={() => navigate('/company/result')} />
        
        <div className='max-w-7xl mx-auto px-8 py-8'>
          <ApplicantProfile 
            applicant={applicant} 
            scoreBreakdown={score_breakdown} 
            bookmarked={bookmarked} 
            onBookmark={() => setBookmarked(!bookmarked)} 
          />
          
          <AISummary summary={overall_summary.overall_evaluation_summary} />
          
          <div className='mb-8 pb-8 border-b border-gray-200'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
              <div className='lg:col-span-2'>
                <CompetencySection 
                  scores={scores} 
                  details={competency_details} 
                  breakdown={score_breakdown} 
                  onEdit={openFeedbackModal}
                />
              </div>
              <div className='lg:col-span-1'>
                <TranscriptSidebar transcript={transcript} />
              </div>
            </div>
          </div>

          <Keywords keywords={keywords} />
          <RecommendedQuestions questions={recommendedQuestions} />
          <HRMemo memo={memo} setMemo={setMemo} onSave={() => showToast('메모가 저장되었습니다.')} />
        </div>
      </div>

      <FeedbackModal 
        modalState={feedbackModal} 
        setModalState={setFeedbackModal}
        onClose={() => setFeedbackModal(p => ({ ...p, open: false }))} 
        onSubmit={handleSubmitFeedback} 
      />
      {toast && <Toast message={toast.message} variant={toast.variant} />}
    </div>
  );
}