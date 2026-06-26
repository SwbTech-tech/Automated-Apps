import { Logger } from '../utils/logger';

export class ProgressTracker {
  private logger = new Logger();

  calculateProgress(
    completedSteps: number,
    totalSteps: number,
    currentStepProgress: number = 0
  ): number {
    const baseProgress = (completedSteps / totalSteps) * 100;
    const currentProgress = (currentStepProgress / 100) * (100 / totalSteps);
    return Math.min(100, baseProgress + currentProgress);
  }

  estimateTimeRemaining(
    elapsedTime: number,
    progressPercentage: number
  ): number {
    if (progressPercentage === 0) return 0;
    const totalEstimatedTime = (elapsedTime / progressPercentage) * 100;
    return Math.max(0, totalEstimatedTime - elapsedTime);
  }
}
