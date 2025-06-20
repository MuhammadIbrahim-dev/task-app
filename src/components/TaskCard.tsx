
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Calendar, User, Clock, CheckCircle, Circle, PlayCircle, Trash2, Edit } from 'lucide-react';
import { Task } from '@/types/task';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate, onDelete }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress':
        return <PlayCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Circle className="h-4 w-4 text-slate-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'completed': 'bg-green-100 text-green-800 border-green-200',
      'in-progress': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'pending': 'bg-slate-100 text-slate-800 border-slate-200'
    };

    return (
      <Badge className={cn('text-xs font-medium', variants[status as keyof typeof variants])}>
        {status.replace('-', ' ')}
      </Badge>
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-slate-300';
    }
  };

  const handleStatusChange = (newStatus: string) => {
    setIsAnimating(true);
    onUpdate(task.id, { status: newStatus });
    setTimeout(() => setIsAnimating(false), 300);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className={cn(
      'border-l-4 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer',
      getPriorityColor(task.priority),
      isAnimating && 'animate-pulse'
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon(task.status)}
            <CardTitle className="text-lg font-semibold text-slate-900 line-clamp-2">
              {task.title}
            </CardTitle>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => handleStatusChange('pending')}>
                <Circle className="h-4 w-4 mr-2" />
                Mark as Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('in-progress')}>
                <PlayCircle className="h-4 w-4 mr-2" />
                Mark as In Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('completed')}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Completed
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" onClick={() => onDelete(task.id)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <p className="text-sm text-slate-600 line-clamp-3 mt-2">
          {task.description}
        </p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            {getStatusBadge(task.status)}
            <Badge variant="outline" className="text-xs">
              {task.priority} priority
            </Badge>
          </div>

          {task.dueDate && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Calendar className="h-4 w-4" />
              <span>Due {formatDate(task.dueDate)}</span>
            </div>
          )}

          {task.assignee && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <User className="h-4 w-4" />
              <span>{task.assignee}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Clock className="h-3 w-3" />
            <span>Created {formatDate(task.createdAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
