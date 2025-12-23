const Toast = ({ message, variant }) => (
    <div className='fixed bottom-6 right-6 z-50'>
      <div
        className={`px-4 py-3 rounded-lg shadow-lg text-sm font-medium ${
          variant === 'error' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
        }`}
      >
        {message}
      </div>
    </div>
  );
  
  export default Toast;