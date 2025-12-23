import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@components/Button';
import DevicePreview from './DevicePreview';
import DeviceStatusList from './DeviceStatusList';
import InterviewTips from './InterviewTips';

const API_BASE = 'REDACTED';

export default function InterviewPrepare() {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  // 장비 상태 통합 관리
  const [deviceStatus, setDeviceStatus] = useState({
    cameraReady: false, cameraError: false,
    micReady: false, micError: false,
    isCheckingDevices: true
  });


  // 인터뷰 시작 요청
  useEffect(() => {
    const checkDevices = async () => {
      setDeviceStatus(prev => ({ ...prev, isCheckingDevices: true }));

      try {
        // 카메라 체크
        const videoStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = videoStream;
        }
        setDeviceStatus(prev => ({ ...prev, cameraReady: true, cameraError: false }));
      } catch (err) {
        console.error('Camera access error:', err);
        setDeviceStatus(prev => ({ ...prev, cameraReady: false, cameraError: true }));
      }

      try {
        // 마이크는 "권한만 요청"
        await navigator.mediaDevices.getUserMedia({audio: true});
        setDeviceStatus(prev => ({ ...prev, micReady: true, micError: false }));
      } catch (err) {
        console.error('Microphone access error:', err);
        setDeviceStatus(prev => ({ ...prev, micReady: false, micError: true }));
      }

      setDeviceStatus(prev => ({ ...prev, isCheckingDevices: false }));
    };

    checkDevices();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const handleStartInterview = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/v1/interviews/prepare`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          candidateId: '1',
          companyId: '1',
          personaInstanceIds: ['1', '2'],
        }),
      });

      const text = await res.text();
      console.log('prepare status:', res.status);
      console.log('prepare body:', text);

      const data = JSON.parse(text);

      // 인터뷰 페이지로 이동하며 websocketUrl 전달
      navigate('/candidate/interview', {
        state: {
          websocketUrl: data.websocketUrl,
          interviewId: data.interviewId,
        },
      });
    } catch (err) {
      console.error('인터뷰 준비 실패', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen max-w-4xl mx-auto px-6 py-15'>
      <header className='text-center mb-12'>
        <h1 className='text-3xl font-bold text-blue mb-4'>면접을 시작하기 전에</h1>
        <p className='text-gray-600 font-semibold'>삼성물산 패션부문 / 상품기획(MD) 신입 면접 준비 중</p>
      </header>

      <DevicePreview 
        cameraReady={deviceStatus.cameraReady} 
        cameraError={deviceStatus.cameraError} 
        isCheckingDevices={deviceStatus.isCheckingDevices} 
      />

      <DeviceStatusList states={deviceStatus} />

      <InterviewTips />

      <footer className='flex justify-between items-center mt-10'>
        <Button variant='ghost' onClick={() => navigate(-1)}>이전</Button>
        <Button 
          variant='primary' 
          onClick={handleStartInterview} 
          disabled={!deviceStatus.cameraReady || !deviceStatus.micReady}
        >
          {deviceStatus.isCheckingDevices ? '준비 중...' : '면접 시작하기'}
        </Button>
      </footer>
    </div>
  );
}