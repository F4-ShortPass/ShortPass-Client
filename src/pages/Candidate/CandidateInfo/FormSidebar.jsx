import check_green from '@assets/svg/check_green.svg';

const FormSidebar = ({ currentStep, steps }) => {
  return (
    <nav className='hidden lg:block mt-30 min-w-[200px]'>
      <h2 className='text-sm font-semibold text-gray-500 uppercase mb-6'>지원 단계</h2>
      <div className='space-y-6'>
        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <div key={step.id} className={`flex items-start gap-4 ${isCurrent ? 'opacity-100' : 'opacity-60'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold 
                ${isCompleted ? 'bg-green-100 text-green-600' : isCurrent ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                {isCompleted ? <img src={check_green} alt='완료' className='w-4 h-4' /> : step.id}
              </div>
              <div>
                <div className={`font-medium text-sm ${isCurrent ? 'text-blue-600' : 'text-gray-700'}`}>{step.title}</div>
                <div className='text-xs text-gray-500 mt-0.5'>{step.description}</div>
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default FormSidebar;