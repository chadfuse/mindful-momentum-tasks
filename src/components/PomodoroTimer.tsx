
import { useState, useEffect } from "react";
import { Play, Pause, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setIsBreak(!isBreak);
      setTimeLeft(isBreak ? 25 * 60 : 5 * 60);
      toast({
        title: isBreak ? "Back to work!" : "Time for a break!",
        description: isBreak
          ? "Your break is over. Let's get back to being productive!"
          : "Great work! Take a short break to recharge.",
      });
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, isBreak]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(25 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Card className="p-6 w-full max-w-xs mx-auto text-center space-y-4 animate-fadeIn">
      <h3 className="text-lg font-semibold">{isBreak ? "Break Time" : "Focus Time"}</h3>
      <div className="text-4xl font-bold">
        {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
      </div>
      <div className="flex justify-center gap-4">
        <Button onClick={toggleTimer} size="icon">
          {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <Button onClick={resetTimer} size="icon" variant="outline">
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};
