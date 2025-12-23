import Webcam from 'react-webcam';

const DevicePreview = ({ cameraReady, isCheckingDevices, cameraError }) => {
  return (
    <section className='mb-10'>
      <h2 className='text-base font-semibold text-dark mb-4'>웹캠 미리보기</h2>
      <div className='relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-lg'>
        <Webcam
          className='w-full h-full object-cover rounded-lg'
          audio={false}
          mirrored={true}
          videoConstraints={{ width: 1280, height: 720, facingMode: 'user' }}
          muted
          playsInline
        />
        {!cameraReady && (
          <div className='absolute inset-0 flex items-center justify-center bg-gray-900'>
            <div className='text-center text-white'>
              {isCheckingDevices ? '카메라 연결 중...' : cameraError ? '카메라에 접근할 수 없습니다' : null}
            </div>
          </div>
        )}
      </div>
      <p className='text-sm text-gray-500 mt-3'>면접 중에는 화면이 녹화되지 않습니다.</p>
    </section>
  );
};

export default DevicePreview;