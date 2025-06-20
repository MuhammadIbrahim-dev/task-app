
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Bell, Users, Calendar, Filter } from 'lucide-react';
import TaskCard from './TaskCard';
import AddTaskModal from './AddTaskModal';
import TaskFilters from './TaskFilters';
import { useTaskStore } from '@/hooks/useTaskStore';

const TaskManager = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const { tasks, addTask, updateTask, deleteTask } = useTaskStore();

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    pending: tasks.filter(t => t.status === 'pending').length
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
              Task Manager
            </h1>
            <p className="text-slate-600 mt-2">Organize, collaborate, and get things done</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="relative">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-red-500">
                3
              </Badge>
            </Button>
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Team
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="text-2xl font-bold text-blue-900">{taskStats.total}</div>
            <div className="text-sm text-blue-700">Total Tasks</div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="text-2xl font-bold text-green-900">{taskStats.completed}</div>
            <div className="text-sm text-green-700">Completed</div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <div className="text-2xl font-bold text-yellow-900">{taskStats.inProgress}</div>
            <div className="text-sm text-yellow-700">In Progress</div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="text-2xl font-bold text-purple-900">{taskStats.pending}</div>
            <div className="text-sm text-purple-700">Pending</div>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <TaskFilters 
            currentFilter={filterStatus}
            onFilterChange={setFilterStatus}
          />
          
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdate={updateTask}
              onDelete={deleteTask}
            />
          ))}
          
          {filteredTasks.length === 0 && (
            <div className="col-span-full text-center py-12">
              <div className="text-slate-400 text-lg mb-2">No tasks found</div>
              <div className="text-slate-500 text-sm">
                {searchQuery || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Create your first task to get started'
                }
              </div>
            </div>
          )}
        </div>

        <AddTaskModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={addTask}
        />
      </div>
    </div>
  );
};

export default TaskManager;
