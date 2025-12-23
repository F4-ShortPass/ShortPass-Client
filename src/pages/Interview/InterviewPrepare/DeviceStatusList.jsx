import check_circle from '@assets/svg/check-circle.svg';
import alert_circle from '@assets/svg/alert-circle.svg';

const StatusItem = ({ label, statusText, isReady, isError, isChecking }) => (
  <div className='flex items-center gap-3 mb-4 pb-4 border-b border-slate-100 last:border-0 last:mb-0 last:pb-0'>
    <div className='p-2 rounded-lg'>
      {isReady && <img src={check_circle} className='w-5 h-5' alt="OK" />}
      {isError && <img src={alert_circle} className='w-5 h-5' alt="Error" />}
    </div>
    <div className='flex-1'>
      <p className='font-medium text-gray-900'>{label}</p>
      <p className='text-sm text-gray-500'>
        {isChecking ? '확인 중...' : statusText}
      </p>
    </div>
  </div>
);

const DeviceStatusList = ({ states }) => {
  const { cameraReady, cameraError, micReady, micError, isCheckingDevices } = states;
  
  return (
    <div className='mb-6'>
      <h2 className='text-base font-semibold text-gray-900 mb-4'>장비 상태를 확인해 주세요.</h2>
      <div className='border border-slate-200 rounded-xl p-6'>
        <StatusItem 
          label="카메라" 
          isReady={cameraReady} isError={cameraError} isChecking={isCheckingDevices}
          statusText={cameraReady ? '정상 작동' : '연결 실패'}
        />
        <StatusItem 
          label="마이크" 
          isReady={micReady} isError={micError} isChecking={isCheckingDevices}
          statusText={micReady ? '정상 작동' : '연결 실패'}
        />
        <StatusItem 
          label="스피커" 
          isReady={true} statusText="질문을 들을 수 있습니다"
        />
      </div>
    </div>
  );
};

export default DeviceStatusList;