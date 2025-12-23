export const STEPS = [
    { id: 1, title: '기본 인적 사항', description: 'Basic Information' },
    { id: 2, title: '희망 직무', description: 'Desired Role' },
    { id: 3, title: '문서 업로드', description: 'Document Upload' },
  ];
  
  export const STEP_CONTENT = {
    1: { title: '기본 인적 사항', desc: '면접을 시작하기 위해 필요한 정보를 입력해주세요' },
    2: { title: '희망 직무', desc: '희망하는 직무를 선택해주세요' },
    3: { title: '문서 업로드', desc: '면접과 기업 검토에 활용될 자료를 업로드해 주세요' },
  };
  
  export const GENDER_OPTIONS = [
    { id: 0, name: '남성' }, { id: 1, name: '여성' }, { id: 2, name: '기타' },
  ];
  
  export const EDUCATION_OPTIONS = [
    { id: 0, name: '고등학교 졸업' }, { id: 1, name: '전문학사' },
    { id: 2, name: '학사' }, { id: 3, name: '석사' }, { id: 4, name: '박사' },
  ];