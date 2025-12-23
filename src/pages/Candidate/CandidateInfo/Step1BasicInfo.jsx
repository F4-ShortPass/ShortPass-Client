import InputField from '@components/InputField';
import Select from '@components/Select';
import { GENDER_OPTIONS, EDUCATION_OPTIONS } from './constants';

const Step1BasicInfo = ({ formData, onChange }) => {
  return (
    <div className='w-full grid gap-6'>
      <InputField
        label='이름'
        value={formData.name}
        onChange={onChange('name')}
        placeholder='홍길동'
        required
      />

      <InputField
        label='전화번호'
        type='tel'
        value={formData.phone}
        onChange={onChange('phone')}
        placeholder='010-0000-0000'
        required
      />

      <InputField
        label='이메일'
        type='email'
        value={formData.email}
        onChange={onChange('email')}
        placeholder='example@email.com'
        required
      />

      <div className='w-full grid grid-cols-1 gap-6 md:grid-cols-2'>
        <Select
          label='성별'
          options={GENDER_OPTIONS}
          value={formData.gender}
          onChange={onChange('gender')}
          placeholder='성별 선택'
        />
        <InputField
          label='생년월일'
          type='date'
          value={formData.birthdate}
          onChange={onChange('birthdate')}
        />
      </div>

      <Select
        label='최종학력'
        options={EDUCATION_OPTIONS}
        value={formData.education}
        onChange={onChange('education')}
        placeholder='최종학력 선택'
      />

      <InputField
        label='학교명'
        value={formData.school}
        onChange={onChange('school')}
        placeholder='학교명을 입력하세요.'
      />

      <InputField
        label='전공'
        value={formData.major}
        onChange={onChange('major')}
        placeholder='전공학과를 입력하세요.'
      />
    </div>
  );
};

export default Step1BasicInfo;