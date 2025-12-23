import { useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import ChevronDown from '@assets/svg/chevron-down.svg';
import ChevronUp from '@assets/svg/chevron-up.svg';

const CompetencySection = ({ scores, details, breakdown, onEdit }) => {
  const [activeTab, setActiveTab] = useState('common');
  const [expanded, setExpanded] = useState({});

  const toggle = (key) => setExpanded(p => ({ ...p, [key]: !p[key] }));
  
  const currentKeys = activeTab === 'common' ? breakdown.common_competencies : breakdown.job_competencies;
  const chartData = currentKeys.map(key => ({ subject: key, score: scores[key], fullMark: 100 }));

  return (
    <div className='border border-gray-200 rounded-lg bg-white p-6'>
      <div className='flex gap-8 border-b mb-6'>
        {['common', 'job'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`pb-3 text-base font-medium transition-colors relative ${activeTab === tab ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
            {tab === 'common' ? '공통 역량' : '직무 역량'}
            {activeTab === tab && <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900' />}
          </button>
        ))}
      </div>

      <ResponsiveContainer width='100%' height={400}>
        <RadarChart data={chartData}>
          <PolarGrid stroke='#e5e7eb' />
          <PolarAngleAxis dataKey='subject' tick={{ fill: '#4b5563', fontSize: 13 }} />
          <Radar dataKey='score' stroke={activeTab === 'common' ? '#ec4899' : '#06b6d4'} fill={activeTab === 'common' ? '#ec4899' : '#06b6d4'} fillOpacity={0.3} strokeWidth={2} />
        </RadarChart>
      </ResponsiveContainer>

      <div className='mt-6 space-y-2'>
        {currentKeys.map(key => (
          <div key={key} className='border-b border-gray-100 pb-2'>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-700 font-medium'>{key}</span>
              <div className='flex items-center gap-3'>
                <span className='font-medium text-sm text-gray-900'>{scores[key]}%</span>
                <button onClick={() => onEdit(key)} className='px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 rounded-full'>수정</button>
                <button onClick={() => toggle(key)}>
                  <img src={expanded[key] ? ChevronUp : ChevronDown} className='w-4 h-4' />
                </button>
              </div>
            </div>
            {expanded[key] && (
              <div className='mt-2 pl-4 text-sm text-gray-600 leading-relaxed'>
                <p>{details[key].connected_summary}</p>
                {/* 강점 리스트 */}
                <div className='mt-4'>
                  <p className='font-semibold text-gray-900 mb-2'>강점</p>
                  <ul className='space-y-1.5'>
                    {details[key].strengths.map((strength, index) => (
                      <li key={`strength-${index}`} className='flex gap-2'>
                        <span className='font-bold'>{index + 1}.</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 약점 리스트 */}
                <div className='mt-4'>
                  <p className='font-semibold text-gray-900 mb-2'>약점</p>
                  <ul className='space-y-1.5'>
                    {details[key].weaknesses.map((weakness, index) => (
                      <li key={`weakness-${index}`} className='flex gap-2'>
                        <span className='font-bold'>{index + 1}.</span>
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetencySection;