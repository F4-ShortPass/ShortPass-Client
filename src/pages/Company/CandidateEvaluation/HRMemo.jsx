import Button from '@components/Button';

const HRMemo = ({ memo, setMemo, onSave }) => (
  <div className='mb-8'>
    <h2 className='text-lg font-semibold text-gray-900 mb-4'>HR 메모</h2>
    <div className='bg-white rounded-lg'>
      <textarea
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        placeholder='지원자에 대한 특이사항이나 의견을 작성해주세요.'
        className='w-full h-32 p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm text-gray-900 placeholder-gray-400'
      />
      <div className='mt-3 flex justify-end'>
        <Button variant='primary' className='text-sm px-6' onClick={onSave}>
          저장
        </Button>
      </div>
    </div>
  </div>
);

export default HRMemo;