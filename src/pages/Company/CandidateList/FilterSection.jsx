import InputField from '@components/InputField';
import Toggle from '@components/Toggle';

const FilterSection = ({ filters, setFilters, onReset }) => {
  return (
    <div className='mb-6 pb-6 border-b border-gray-200'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-sm font-semibold text-gray-700'>필터</h3>
        <button onClick={onReset} className='text-sm text-blue-600 hover:text-blue-700 font-medium'>
          초기화
        </button>
      </div>

      <div className='space-y-3'>
        <div className='flex items-center gap-3'>
          <span className='text-sm text-gray-600 w-20 shrink-0'>학력 정보</span>
          <div className='flex-1 flex gap-3'>
            <InputField
              placeholder='학교 (예: 숙명여자대학교)'
              value={filters.school}
              onChange={(e) => setFilters({ ...filters, school: e.target.value })}
              classname='w-100 text-sm'
            />
            <InputField
              placeholder='전공 (예: 경영학)'
              value={filters.major}
              onChange={(e) => setFilters({ ...filters, major: e.target.value })}
              classname='w-100 text-sm'
            />
            <InputField
              type='number'
              step='0.1'
              placeholder='최소 학점 (예: 3.5)'
              value={filters.minGpa}
              onChange={(e) => setFilters({ ...filters, minGpa: e.target.value })}
              classname='text-sm'
            />
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <span className='text-sm text-gray-600 w-20 shrink-0'></span>
          <Toggle
            id='highlight-toggle'
            label='주목 인재만 보기'
            checked={filters.showHighlightOnly}
            onChange={() => setFilters({ ...filters, showHighlightOnly: !filters.showHighlightOnly })}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSection;