import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import Start from '@pages/Home';
import CandidateInfo from '@pages/Candidate/CandidateInfo';
import CandidateDone from '@pages/Candidate/CandidateDone';
import InterviewPage from '@pages/Interview/InterviewPage';
import Layout from '@layout/Layout';
import InterviewResult from '@pages/Company/CandidateList';
import PersonaGeneration from '@pages/Company/PersonaGeneration';
import CandidateJobs from '@pages/Candidate/CandidateJobs';
import InterviewPrepare from '@pages/Interview/InterviewPrepare';
import CandidateEvaluation from '@pages/Company/CandidateEvaluation';
import AgentLogs from '@pages/Admin/AgentLogs';
import AdminDashboard from '@pages/Admin/AdminDashboard';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route index element={<Start />} />
        <Route path='/candidate/info' element={<CandidateInfo />} />
        <Route path='/candidate/jobs' element={<CandidateJobs />} />
        <Route path='/candidate/start' element={<InterviewPrepare />} />
        <Route path='/candidate/interview' element={<InterviewPage />} />
        <Route path='/candidate/done' element={<CandidateDone />} />
        <Route path='/company/info' element={<PersonaGeneration />} />
        <Route path='/company/result' element={<InterviewResult />} />
        <Route path='/company/admin' element={<AdminDashboard />} />
        <Route
          path='/company/applicant/:id'
          element={<CandidateEvaluation />}
        />
        <Route path='/agent-logs' element={<AgentLogs />} />
        <Route path='/agent-logs/:evaluationId' element={<AgentLogs />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
