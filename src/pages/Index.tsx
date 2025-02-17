
import { useState } from "react";
import { MoodSelector } from "@/components/MoodSelector";
import { TaskList } from "@/components/TaskList";
import { PomodoroTimer } from "@/components/PomodoroTimer";

const Index = () => {
  const [currentMood, setCurrentMood] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/5 p-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">MomentumTasks</h1>
          <p className="text-muted-foreground">Mindful productivity for better focus</p>
        </header>

        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold">How are you feeling today?</h2>
            <MoodSelector onMoodSelect={setCurrentMood} selectedMood={currentMood} />
          </div>

          <div className="grid md:grid-cols-[1fr_auto] gap-8">
            <TaskList currentMood={currentMood} />
            <PomodoroTimer />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
