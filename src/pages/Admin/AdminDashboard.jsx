import {useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '@components/Button';
import Badge from '@components/Badge';
import FeedbackLoop from '@components/FeedbackLoop';
import personaSamsungFashion from '@mock/personaSamsungFashion';
import candidateListMock from '@mock/candidateListMock';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [feedbackSaved, setFeedbackSaved] = useState(false);

  const personas = personaSamsungFashion.personas || [];
  const topApplicants = candidateListMock.applicants.slice(0, 3);

  const pipeline = useMemo(
    () => [
      {
        stage: 'Stage 1 · Batch Evaluation',
        desc: '10개 역량을 병렬 평가하고 핵심 근거를 수집했습니다.',
        status: '완료',
      },
      {
        stage: 'Stage 2 · Aggregator',
        desc: 'Resume 검증과 Confidence 재계산이 반영되었습니다.',
        status: '검증 완료',
      },
      {
        stage: 'Stage 3 · Final Integration',
        desc: '가중치 기반 최종 점수/신뢰도 산출이 끝났습니다.',
        status: '대시보드 반영',
      },
      {
        stage: 'Stage 4 · Presentation',
        desc: '프론트 표시용 Evidences/요약이 정돈되었습니다.',
        status: '프론트 변환 완료',
      },
    ],
    []
  );

  const handleFeedbackSave = (payload) => {
    console.log('HR feedback submitted:', payload);
    setFeedbackSaved(true);
    setTimeout(() => setFeedbackSaved(false), 2200);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#f6f8ff] via-white to-white">
      <div className="mx-auto max-w-6xl px-6 py-10 space-y-8">
        {/* 헤더 */}
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-tight text-blue">
              Enterprise Admin
            </p>
            <h1 className="text-3xl font-bold text-gray-900">
              기업용 Admin 콘솔
            </h1>
            <p className="mt-1 text-gray-600">
              페르소나·지원자·에이전트 로그를 한곳에서 확인하고 바로 이동하세요.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="primary"
              className="h-11 rounded-full px-5"
              onClick={() => navigate('/company/info')}>
              페르소나 생성/수정
            </Button>
            <Button
              variant="ghost"
              className="h-11 rounded-full border border-gray-200 px-5 text-grey hover:border-blue hover:text-blue"
              onClick={() => navigate('/company/result')}>
              결과 화면 바로가기
            </Button>
          </div>
        </header>

        {/* 요약 카드 */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">현재 페르소나</p>
            <h3 className="mt-2 text-xl font-semibold text-gray-900">
              {personaSamsungFashion.company.name}
            </h3>
            <p className="text-sm text-gray-600">
              포지션: {candidateListMock.job_title}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {personaSamsungFashion?.common_competencies?.slice(0, 3).map((item) => (
                <Badge
                  key={item.id}
                  variant="secondary"
                  classname="border border-blue-100">
                  {item.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">지원자 진행 현황</p>
            <div className="mt-2 text-3xl font-bold text-blue">
              {candidateListMock.completed_evaluations}명
            </div>
            <p className="text-sm text-gray-600">
              총 {candidateListMock.total_applicants}명 / 평균 점수{' '}
              {candidateListMock.average_score.toFixed(1)}점
            </p>
            <div className="mt-4 flex gap-2">
              <Button
                variant="primary"
                className="rounded-full px-4 py-2 text-sm"
                onClick={() => navigate('/company/applicants/mock')}>
                전체 지원자 보기
              </Button>
              <Button
                variant="ghost"
                className="rounded-full border border-gray-200 px-4 py-2 text-sm text-grey hover:border-blue hover:text-blue"
                onClick={() => navigate('/evaluation/90001')}>
                최신 결과 열기
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Agent 로그</p>
            <div className="mt-2 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue/10 text-blue flex-center font-semibold">
                4단
              </div>
              <div>
                <p className="text-base font-semibold text-gray-900">
                  MAS 파이프라인 완료
                </p>
                <p className="text-sm text-gray-600">Presentation Formatter까지 통과</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="secondary" classname="bg-green-50 text-green border border-green/20">
                Resume 검증 반영
              </Badge>
              <Badge variant="secondary" classname="bg-blue-50 text-blue border border-blue/20">
                Confidence v2 업데이트
              </Badge>
            </div>
            <Button
              variant="ghost"
              className="mt-4 w-full rounded-lg border border-gray-200 py-2 font-semibold text-blue hover:border-blue"
              onClick={() => navigate('/agent-logs')}>
              Agent 로그로 이동
            </Button>
          </div>
        </div>

        {/* 페르소나 프리뷰 */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">구성된 면접 페르소나</h2>
              <p className="text-sm text-gray-600">
                생성된 페르소나와 초점 키워드를 확인하고 바로 수정하세요.
              </p>
            </div>
            <Button
              variant="ghost"
              className="rounded-full border border-gray-200 px-4 py-2 text-sm text-grey hover:border-blue hover:text-blue"
              onClick={() => navigate('/company/info')}>
              페르소나 관리
            </Button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            {personas.map((persona) => (
              <div
                key={persona.id}
                className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50/60 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-blue">{persona.id}</p>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {persona.persona_name}
                    </h3>
                    <p className="text-sm text-gray-600">{persona.role}</p>
                  </div>
                  <Badge variant="secondary" classname="text-xs bg-white text-blue border border-blue-100">
                    {persona.type}
                  </Badge>
                </div>
                <p className="text-sm text-gray-700">톤: {persona.tone}</p>
                <div className="flex flex-wrap gap-2">
                  {persona.focus_keywords.map((keyword) => (
                    <Badge
                      key={keyword}
                      variant="secondary"
                      classname="bg-white text-gray-700 border border-gray-200">
                      {keyword}
                    </Badge>
                  ))}
                </div>
                <div className="rounded-lg border border-dashed border-gray-200 bg-white p-3 text-sm text-gray-700">
                  {persona.questions[0]}
                  <div className="mt-2 text-gray-500">
                    · {persona.questions[1] || '추가 질문 편집 가능'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 지원자 스냅샷 + 로그/피드백 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">지원자 스냅샷</h2>
                <p className="text-sm text-gray-600">
                  상위 3명 하이라이트 · 전체 목록으로 이동 가능
                </p>
              </div>
              <Button
                variant="ghost"
                className="rounded-full border border-gray-200 px-3 py-2 text-sm text-grey hover:border-blue hover:text-blue"
                onClick={() => navigate('/company/applicants/mock')}>
                전체 지원자 보기
              </Button>
            </div>
            <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">지원자</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">트랙</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">총점</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {topApplicants.map((applicant) => (
                    <tr key={applicant.applicant_id} className="hover:bg-gray-50/80">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-gray-900">{applicant.applicant_name}</div>
                        <div className="text-xs text-gray-500">{applicant.ai_summary_comment}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{applicant.track}</td>
                      <td className="px-4 py-3 font-semibold text-blue">{applicant.total_score}점</td>
                      <td className="px-4 py-3">
                        <Badge variant="secondary" classname="bg-blue-50 text-blue border border-blue-100">
                          {applicant.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
              <span>AI 면접 결과 화면으로 이동해 상세 근거 확인</span>
              <Button
                variant="ghost"
                className="rounded-full border border-gray-200 px-3 py-2 text-xs font-semibold text-blue hover:border-blue"
                onClick={() => navigate('/company/result')}>
                결과 화면 이동
              </Button>
            </div>
          </section>

          <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Agent 로그 & 피드백</h2>
                <p className="text-sm text-gray-600">
                  MAS 파이프라인 상태와 HR 피드백을 함께 관리합니다.
                </p>
              </div>
              <Button
                variant="ghost"
                className="rounded-full border border-gray-200 px-3 py-2 text-sm text-grey hover:border-blue hover:text-blue"
                onClick={() => navigate('/agent-logs')}>
                로그 보기
              </Button>
            </div>

            <div className="space-y-3 rounded-xl border border-gray-200 bg-gray-50/60 p-4">
              {pipeline.map((item) => (
                <div
                  key={item.stage}
                  className="flex items-start justify-between gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-tight text-blue">
                      {item.stage}
                    </p>
                    <p className="text-sm text-gray-700">{item.desc}</p>
                  </div>
                  <Badge
                    variant="secondary"
                    classname="bg-green-50 text-green border border-green/30 text-xs">
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm font-semibold text-gray-800">
                HR 피드백 (모델 개선용)
              </p>
              <p className="text-xs text-gray-600">
                직무 기준이나 점수 가중치 조정을 원하는 내용을 남겨주세요.
              </p>
              <div className="mt-3">
                <FeedbackLoop
                  candidateId="CAND_001"
                  initialFeedback={{
                    hr_comment:
                      '고객 여정 마케팅 가중치를 5% 더 반영하고, 협업 역량은 면접 질문을 추가했으면 합니다.',
                    is_reviewed: false,
                    adjusted_score: null,
                    current_score: 82,
                  }}
                  onSaveFeedback={handleFeedbackSave}
                />
                {feedbackSaved && (
                  <div className="mt-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green">
                    피드백이 임시 저장되었습니다. 백엔드 연동 시 전달하도록 연결하면 됩니다.
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
