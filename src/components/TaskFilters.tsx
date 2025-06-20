
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter } from 'lucide-react';

interface TaskFiltersProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { key: 'all', label: 'All Tasks', color: 'bg-slate-100 text-slate-800' },
    { key: 'pending', label: 'Pending', color: 'bg-slate-100 text-slate-800' },
    { key: 'in-progress', label: 'In Progress', color: 'bg-yellow-100 text-yellow-800' },
    { key: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' }
  ];

  return (
    <div className="flex items-center gap-2">
      <Filter className="h-4 w-4 text-slate-500" />
      <div className="flex gap-2">
        {filters.map((filter) => (
          <Badge
            key={filter.key}
            className={`cursor-pointer transition-all hover:opacity-80 ${
              currentFilter === filter.key 
                ? filter.color + ' ring-2 ring-blue-500 ring-offset-1' 
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
            onClick={() => onFilterChange(filter.key)}
          >
            {filter.label}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default TaskFilters;
