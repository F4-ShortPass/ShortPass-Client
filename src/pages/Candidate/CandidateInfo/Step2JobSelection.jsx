import { roleCategories, subRoles } from '@data/roles';
import { useState } from 'react';
import x_blue from '@assets/svg/x_blue.svg';

const Step2JobSelection = ({ formData, setFormData }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const toggleSubRole = (subRole) => {
    setFormData((prev) => {
      const exists = prev.subRoles.includes(subRole);
      return {
        ...prev,
        subRoles: exists
          ? prev.subRoles.filter((s) => s !== subRole)
          : [...prev.subRoles, subRole],
      };
    });
  };

  return (
    <div className='rounded-2xl border-[0.2px] border-gray-300 py-6 px-4'>
      <div className='grid md:grid-cols-3 gap-6 mb-8 h-[430px] overflow-y-scroll p-5'>
        {/* 분야 선택 */}
        <section>
          <h3 className='text-sm font-medium text-gray-700 mb-3'>직무 분야</h3>
          <div className='space-y-2'>
            {Object.keys(roleCategories).map((category) => (
              <button
                key={category}
                type='button'
                onClick={() => { setSelectedCategory(category); setSelectedRole(''); }}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-50 text-blue-700 font-medium border border-blue-200'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* 세부 직무 선택 */}
        <section>
          <h3 className='text-sm font-medium text-gray-700 mb-3'>세부 직무</h3>
          {selectedCategory ? (
            <div className='space-y-2'>
              {roleCategories[selectedCategory].map((role) => (
                <button
                  key={role}
                  type='button'
                  onClick={() => setSelectedRole(role)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${
                    selectedRole === role
                      ? 'bg-blue-50 text-blue-700 font-medium border border-blue-200'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          ) : (
            <p className='text-sm text-gray-400 py-4'>직무 분야를 선택해주세요</p>
          )}
        </section>

        {/* 상세 포지션 선택 */}
        <section>
          <h3 className='text-sm font-medium text-gray-700 mb-3'>상세 포지션</h3>
          {selectedRole && subRoles[selectedRole] ? (
            <div className='space-y-2'>
              {subRoles[selectedRole].map((subRole) => (
                <button
                  key={subRole}
                  type='button'
                  onClick={() => toggleSubRole(subRole)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${
                    formData.subRoles.includes(subRole)
                      ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {subRole}
                </button>
              ))}
            </div>
          ) : (
            <p className='text-sm text-gray-400 py-4'>세부 직무를 선택해주세요</p>
          )}
        </section>
      </div>

      {/* 선택된 태그 목록 */}
      <div className='mt-4 flex flex-wrap gap-2'>
        {formData.subRoles.map((subRole) => (
          <span key={subRole} className='inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-sm font-medium text-blue-700 rounded-lg px-3 py-1.5'>
            {subRole}
            <button type='button' onClick={() => toggleSubRole(subRole)}>
              <img src={x_blue} alt='제거' className='w-3 h-3' />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Step2JobSelection;