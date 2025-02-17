
import { Button } from "@/components/ui/button";
import { Sun, Cloud, Coffee, Moon } from "lucide-react";

type Mood = "happy" | "calm" | "focused" | "tired";

interface MoodSelectorProps {
  onMoodSelect: (mood: Mood) => void;
  selectedMood: Mood | null;
}

export const MoodSelector = ({ onMoodSelect, selectedMood }: MoodSelectorProps) => {
  const moods = [
    { type: "happy", icon: Sun, label: "Happy" },
    { type: "calm", icon: Cloud, label: "Calm" },
    { type: "focused", icon: Coffee, label: "Focused" },
    { type: "tired", icon: Moon, label: "Tired" },
  ] as const;

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {moods.map(({ type, icon: Icon, label }) => (
        <Button
          key={type}
          variant="outline"
          size="lg"
          className={`flex items-center gap-2 p-6 transition-all duration-200 ${
            selectedMood === type
              ? `bg-mood-${type} text-background shadow-lg scale-105`
              : "hover:bg-mood-" + type + "/10"
          }`}
          onClick={() => onMoodSelect(type)}
        >
          <Icon className="w-5 h-5" />
          <span>{label}</span>
        </Button>
      ))}
    </div>
  );
};
