import { useState } from 'react';

type FilterOption = 'all' | 'active' | 'completed';

interface FilterBlockProps {
  filter: FilterOption;
  setFilter: (filter: FilterOption) => void;
}

const FilterBlock: React.FC<FilterBlockProps> = ({ filter, setFilter }) => {
    return (
        <div className='filter__container'>
            <div 
                className={`filter__item ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
            >
                All
            </div>
            <div 
                className={`filter__item ${filter === 'active' ? 'active' : ''}`}
                onClick={() => setFilter('active')}
            >
                Active
            </div>
            <div 
                className={`filter__item ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => setFilter('completed')}
            >
                Completed
            </div>
        </div>
    )
}

export default FilterBlock;