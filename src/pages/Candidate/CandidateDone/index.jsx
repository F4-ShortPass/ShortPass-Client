import Button from '@components/Button';
import {useNavigate} from 'react-router-dom';

const CandidateDone = () => {
  const navigate = useNavigate();

  return (
    <div className='w-full min-h-screen flex justify-center pt-55 p-5'>
      <div className='md:w-1/2 flex flex-col gap-10'>
        <div className='flex flex-col items-center space-y-5 text-center'>
          <h1 className='text-4xl md:text-5xl font-bold text-blue'>
            면접이 종료되었습니다
          </h1>
          <p className='text-xl leading-relaxed font-medium text-gray-600'>
            귀한 시간 내어 참여해 주셔서 감사합니다 🙇‍♀️
          </p>
          <div>
            <p className='text-lg font-medium mt-3'>이번 인터뷰에 대한 AI 평가 리포트를 확인해 보시겠어요?</p>
            <p className='font-medium text-gray-400'>답변을 바탕으로 <span className='text-green'>강점과 </span><span className='text-red'>보완점</span>을 가볍게 정리해 드릴게요.</p>
          </div>
        </div>

        <div className='flex-center gap-6'>
          <Button
            asChild
            onClick={() => {
              navigate('/');
            }}
            variant='plain'
            className='text-gray-400'
            disabled
          >
            평가 리포트 볼래요
          </Button>
          <Button
            asChild
            onClick={() => {
              navigate('/');
            }}
            variant='primary'
          >
            괜찮아요
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CandidateDone;
