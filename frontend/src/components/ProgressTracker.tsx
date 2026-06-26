import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';

export default function ProgressTracker() {
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(300);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.random() * 10, 100));
      setTimeRemaining((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5" />
        Build Progress
      </h2>

      <div className="space-y-4">
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-accent/50 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Time Estimate */}
        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Estimated Time Remaining</p>
          <p className="text-lg font-semibold">
            {minutes}:{seconds.toString().padStart(2, '0')}
          </p>
        </div>
      </div>
    </div>
  );
}
