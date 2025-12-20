import React, { useState } from "react";
import { Button } from "../../components/ui/Button";
import { useToast } from "../../hooks/use-toast";
import { Plus, FileText, Trash, CheckSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/Dialog";

// Reusable styled components matching admin portal
const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl border-2 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm ${className}`}
    style={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
      borderColor: 'rgba(22, 83, 126, 0.2)'
    }}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div 
    className={`p-6 border-b-2 ${className}`}
    style={{
      background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
      borderColor: 'rgba(22, 83, 126, 0.3)',
      paddingTop: '1.75rem',
      paddingBottom: '1.75rem'
    }}
  >
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-xl font-black text-white ${className}`} style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)', lineHeight: '1.3', paddingBottom: '0.25rem' }}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-white/90 mt-2 font-semibold ${className}`} style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.2)' }}>{children}</p>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const Input = ({ ...props }) => (
  <input
    className="flex h-10 w-full rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
    style={{
      borderColor: 'rgba(22, 83, 126, 0.2)',
      focusRingColor: '#16537e'
    }}
    {...props}
  />
);

const EmergencyPlans = () => {
  const { toast } = useToast();
  const [plans, setPlans] = useState([
    {
      id: "1",
      name: "Flood Response Protocol",
      tasks: [
        { id: "1-1", title: "Check evacuation routes", completed: true },
        { id: "1-2", title: "Prepare rescue equipment", completed: true },
        {
          id: "1-3",
          title: "Coordinate with local authorities",
          completed: false,
        },
      ],
    },
    {
      id: "2",
      name: "Medical Emergency Response",
      tasks: [
        { id: "2-1", title: "Verify first aid supplies", completed: true },
        { id: "2-2", title: "Contact hospitals", completed: false },
      ],
    },
  ]);
  const [newPlanName, setNewPlanName] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [taskDialogOpen, setTaskDialogOpen] = useState({});

  const createPlan = () => {
    if (newPlanName.trim()) {
      setPlans([
        ...plans,
        { id: Date.now().toString(), name: newPlanName, tasks: [] },
      ]);
      setNewPlanName("");
      setCreateDialogOpen(false);
      toast({
        title: "Plan Created",
        description: "New emergency plan has been created.",
      });
    }
  };

  const deletePlan = (planId) => {
    setPlans(plans.filter((p) => p.id !== planId));
    toast({
      title: "Plan Deleted",
      description: "Emergency plan has been removed.",
    });
  };

  const addTask = (planId) => {
    if (newTaskTitle.trim()) {
      setPlans(
        plans.map((plan) =>
          plan.id === planId
            ? {
                ...plan,
                tasks: [
                  ...plan.tasks,
                  {
                    id: Date.now().toString(),
                    title: newTaskTitle,
                    completed: false,
                  },
                ],
              }
            : plan
        )
      );
      setNewTaskTitle("");
      setTaskDialogOpen({...taskDialogOpen, [planId]: false});
      toast({
        title: "Task Added",
        description: "Task has been added to the plan.",
      });
    }
  };

  const toggleTask = (planId, taskId) => {
    setPlans(
      plans.map((plan) =>
        plan.id === planId
          ? {
              ...plan,
              tasks: plan.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              ),
            }
          : plan
      )
    );
  };

  const deleteTask = (planId, taskId) => {
    setPlans(
      plans.map((plan) =>
        plan.id === planId
          ? { ...plan, tasks: plan.tasks.filter((task) => task.id !== taskId) }
          : plan
      )
    );
  };

  return (
    <div 
      className="p-6 space-y-6 relative overflow-hidden min-h-screen"
      style={{
        background: 'radial-gradient(circle at 20% 50%, rgba(106, 168, 79, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(22, 83, 126, 0.15) 0%, transparent 50%), linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)'
      }}
    >
      <div className="flex justify-between items-start animate-fade-in">
        <div>
          <h1 
            className="text-5xl md:text-6xl font-black mb-3"
            style={{
              background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 50%, #38761d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 4px 20px rgba(22, 83, 126, 0.2)',
              lineHeight: '1.2',
              paddingBottom: '0.5rem'
            }}
          >
            Emergency Plan Manager
          </h1>
          <p className="text-xl md:text-2xl font-bold mt-3" style={{ color: '#16537e' }}>
            Create and manage your emergency response plans
          </p>
        </div>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button
              style={{
                background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                color: '#ffffff',
                boxShadow: '0 4px 15px rgba(22, 83, 126, 0.4)'
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="font-black text-xl" style={{ color: '#16537e' }}>Create New Emergency Plan</DialogTitle>
              <DialogDescription className="font-semibold">
                Add a new emergency response plan
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                placeholder="Plan name (e.g., Earthquake Response)"
                value={newPlanName}
                onChange={(e) => setNewPlanName(e.target.value)}
              />
              <Button 
                onClick={createPlan} 
                className="w-full"
                style={{
                  background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                  color: '#ffffff',
                  boxShadow: '0 4px 15px rgba(22, 83, 126, 0.4)'
                }}
              >
                Create Plan
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {plans.map((plan, idx) => {
          const completedTasks = plan.tasks.filter((t) => t.completed).length;
          const totalTasks = plan.tasks.length;
          const progress =
            totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

          return (
            <Card key={plan.id} className="animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-3 rounded-xl transition-all duration-300 hover:scale-110"
                      style={{
                        background: 'linear-gradient(135deg, rgba(22, 83, 126, 0.2) 0%, rgba(106, 168, 79, 0.2) 100%)'
                      }}
                    >
                      <FileText className="h-6 w-6" style={{ color: '#16537e' }} />
                    </div>
                    <div>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>
                        {completedTasks} of {totalTasks} tasks completed
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Dialog open={taskDialogOpen[plan.id]} onOpenChange={(open) => setTaskDialogOpen({...taskDialogOpen, [plan.id]: open})}>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          style={{
                            background: 'transparent',
                            color: '#16537e',
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle className="font-black text-xl" style={{ color: '#16537e' }}>Add Task to {plan.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <Input
                            placeholder="Task description"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                          />
                          <Button
                            onClick={() => addTask(plan.id)}
                            className="w-full"
                            style={{
                              background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                              color: '#ffffff',
                              boxShadow: '0 4px 15px rgba(22, 83, 126, 0.4)'
                            }}
                          >
                            Add Task
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deletePlan(plan.id)}
                      style={{
                        background: 'transparent',
                        color: '#ff3535',
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {totalTasks > 0 && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2 font-bold">
                      <span style={{ color: '#16537e' }}>Progress</span>
                      <span style={{ color: '#6aa84f' }}>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-500 rounded-full"
                        style={{
                          width: `${progress}%`,
                          background: 'linear-gradient(90deg, #6aa84f 0%, #38761d 100%)',
                          boxShadow: '0 2px 8px rgba(106, 168, 79, 0.4)'
                        }}
                      />
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                {plan.tasks.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckSquare className="h-12 w-12 mx-auto mb-2" style={{ color: '#16537e', opacity: 0.5 }} />
                    <p className="font-bold" style={{ color: '#666' }}>No tasks yet. Add tasks to get started.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {plan.tasks.map((task) => (
                      <div
                        key={task.id}
                        className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
                          task.completed
                            ? ""
                            : ""
                        }`}
                        style={{
                          background: task.completed
                            ? 'linear-gradient(135deg, rgba(106, 168, 79, 0.1) 0%, rgba(56, 118, 29, 0.05) 100%)'
                            : 'linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(226, 232, 240, 0.9) 100%)',
                          borderColor: task.completed ? 'rgba(106, 168, 79, 0.3)' : 'rgba(22, 83, 126, 0.2)'
                        }}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(plan.id, task.id)}
                            className="w-5 h-5 rounded cursor-pointer"
                            style={{ accentColor: '#6aa84f' }}
                          />
                          <span
                            className={`font-semibold ${
                              task.completed
                                ? "line-through"
                                : ""
                            }`}
                            style={{
                              color: task.completed ? '#999' : '#333'
                            }}
                          >
                            {task.title}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteTask(plan.id, task.id)}
                          style={{
                            background: 'transparent',
                            color: '#ff3535',
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {plans.length === 0 && (
        <Card className="animate-fade-in">
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4" style={{ color: '#16537e', opacity: 0.5 }} />
            <p className="text-lg font-black" style={{ color: '#16537e' }}>No Emergency Plans Yet</p>
            <p className="text-sm font-semibold mt-1" style={{ color: '#666' }}>
              Create your first plan to get started
            </p>
          </CardContent>
        </Card>
      )}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default EmergencyPlans;
