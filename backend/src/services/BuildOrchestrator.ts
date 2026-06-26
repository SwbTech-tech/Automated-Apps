import { Logger } from '../utils/logger';
import { BuildRequest, BuildProgress, BuildStatus } from '../types/Build';

export class BuildOrchestrator {
  private logger = new Logger();
  private buildProgress: Map<string, BuildProgress> = new Map();

  async startBuild(request: BuildRequest): Promise<string> {
    const buildId = this.generateBuildId();
    this.logger.info(`Starting build ${buildId}: ${request.projectPath}`);

    const progress: BuildProgress = {
      id: buildId,
      projectPath: request.projectPath,
      status: 'preparing',
      currentStep: 0,
      totalSteps: 5,
      currentStepName: 'Preparing...',
      progressPercentage: 0,
      estimatedTimeRemaining: 300,
      elapsedTime: 0,
      startTime: new Date(),
      lastUpdate: new Date(),
      logs: [
        {
          timestamp: new Date(),
          level: 'info',
          message: `Build started for ${request.projectPath}`,
          source: 'orchestrator'
        }
      ],
      errors: []
    };

    this.buildProgress.set(buildId, progress);
    return buildId;
  }

  async getBuildProgress(buildId: string): Promise<BuildProgress | null> {
    return this.buildProgress.get(buildId) || null;
  }

  async cancelBuild(buildId: string): Promise<void> {
    const progress = this.buildProgress.get(buildId);
    if (progress) {
      progress.status = 'cancelled';
      progress.lastUpdate = new Date();
      this.logger.info(`Build ${buildId} cancelled`);
    }
  }

  private generateBuildId(): string {
    return `build_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
