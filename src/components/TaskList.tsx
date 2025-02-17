
import { useState } from "react";
import { Check, Plus, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  mood: string;
}

interface TaskListProps {
  currentMood: string | null;
}

export const TaskList = ({ currentMood }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const { toast } = useToast();

  const addTask = () => {
    if (!newTask.trim()) return;
    if (!currentMood) {
      toast({
        title: "Select your mood first",
        description: "Please select your current mood before adding a task.",
      });
      return;
    }

    const task: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTask,
      completed: false,
      mood: currentMood,
    };

    setTasks([...tasks, task]);
    setNewTask("");
    
    toast({
      title: "Task added",
      description: "Your task has been added successfully.",
    });
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex gap-4">
        <Input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTask()}
          className="flex-1"
        />
        <Button onClick={addTask} size="icon">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <Card
            key={task.id}
            className={`p-4 flex items-center justify-between transition-all duration-200 animate-slideUp hover:shadow-md ${
              task.completed ? "opacity-50" : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => toggleTask(task.id)}
                className={`${task.completed ? "bg-green-100" : ""}`}
              >
                <Check className={`w-4 h-4 ${task.completed ? "text-green-500" : "text-gray-300"}`} />
              </Button>
              <span className={task.completed ? "line-through" : ""}>{task.title}</span>
            </div>
            <Button size="icon" variant="ghost">
              <Timer className="w-4 h-4" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
