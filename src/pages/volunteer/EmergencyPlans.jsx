import DashboardLayout from "../../layouts/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { input } from "../../components/ui/input";
import {
  dialog,
  dialogContent,
  dialogDescription,
  dialogHeader,
  dialogTitle,
  dialogTrigger,
} from "../../components/ui/dialog";
import { useState } from "react";
import { useToast } from "../../hooks/use-toast";
import { Plus, FileText, Trash, CheckSquare } from "lucide-react";

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
  const [editingPlan, setEditingPlan] = useState(null);

  const createPlan = () => {
    if (newPlanName.trim()) {
      setPlans([
        ...plans,
        { id: Date.now().toString(), name: newPlanName, tasks: [] },
      ]);
      setNewPlanName("");
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
    <DashboardLayout role="volunteer">
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Emergency Plan Manager</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage your emergency response plans
            </p>
          </div>
          <dialog>
            <dialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Plan
              </Button>
            </dialogTrigger>
            <dialogContent>
              <dialogHeader>
                <dialogTitle>Create New Emergency Plan</dialogTitle>
                <dialogDescription>
                  Add a new emergency response plan
                </dialogDescription>
              </dialogHeader>
              <div className="space-y-4 py-4">
                <input
                  placeholder="Plan name (e.g., Earthquake Response)"
                  value={newPlanName}
                  onChange={(e) => setNewPlanName(e.target.value)}
                />
                <Button onClick={createPlan} className="w-full">
                  Create Plan
                </Button>
              </div>
            </dialogContent>
          </dialog>
        </div>

        <div className="grid gap-6">
          {plans.map((plan) => {
            const completedTasks = plan.tasks.filter((t) => t.completed).length;
            const totalTasks = plan.tasks.length;
            const progress =
              totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

            return (
              <Card key={plan.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle>{plan.name}</CardTitle>
                        <CardDescription>
                          {completedTasks} of {totalTasks} tasks completed
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <dialog>
                        <dialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingPlan(plan.id)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </dialogTrigger>
                        <dialogContent>
                          <dialogHeader>
                            <dialogTitle>Add Task to {plan.name}</dialogTitle>
                          </dialogHeader>
                          <div className="space-y-4 py-4">
                            <input
                              placeholder="Task description"
                              value={newTaskTitle}
                              onChange={(e) => setNewTaskTitle(e.target.value)}
                            />
                            <Button
                              onClick={() => addTask(plan.id)}
                              className="w-full"
                            >
                              Add Task
                            </Button>
                          </div>
                        </dialogContent>
                      </dialog>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deletePlan(plan.id)}
                      >
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  {totalTasks > 0 && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-success transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  {plan.tasks.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <CheckSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No tasks yet. Add tasks to get started.</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {plan.tasks.map((task) => (
                        <div
                          key={task.id}
                          className={`flex items-center justify-between p-3 rounded-lg border ${
                            task.completed
                              ? "bg-success/5 border-success/20"
                              : "bg-muted"
                          }`}
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <input
                              type="checkbox"
                              checked={task.completed}
                              onChange={() => toggleTask(plan.id, task.id)}
                              className="w-5 h-5 rounded cursor-pointer"
                            />
                            <span
                              className={
                                task.completed
                                  ? "line-through text-muted-foreground"
                                  : ""
                              }
                            >
                              {task.title}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteTask(plan.id, task.id)}
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
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg font-semibold">No Emergency Plans Yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Create your first plan to get started
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EmergencyPlans;
