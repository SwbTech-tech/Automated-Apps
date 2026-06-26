import { Router, Request, Response } from 'express';
import { BuildOrchestrator } from '../services/BuildOrchestrator';
import { Logger } from '../utils/logger';

const router = Router();
const logger = new Logger();
const orchestrator = new BuildOrchestrator();

// Start a build
router.post('/start', async (req: Request, res: Response) => {
  try {
    const { projectPath, strategy, targetPlatform } = req.body;

    if (!projectPath || !strategy || !targetPlatform) {
      return res.status(400).json({ 
        error: 'projectPath, strategy, and targetPlatform are required' 
      });
    }

    logger.info(`Starting build: ${projectPath} (${strategy})`);
    const buildId = await orchestrator.startBuild({
      projectPath,
      strategy,
      targetPlatform
    });

    res.json({
      success: true,
      buildId
    });
  } catch (error) {
    logger.error('Failed to start build', error as Error);
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get build progress
router.get('/progress/:buildId', async (req: Request, res: Response) => {
  try {
    const { buildId } = req.params;
    logger.info(`Fetching progress for build: ${buildId}`);

    const progress = await orchestrator.getBuildProgress(buildId);

    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    logger.error('Failed to fetch build progress', error as Error);
    res.status(500).json({ error: (error as Error).message });
  }
});

// Cancel build
router.post('/:buildId/cancel', async (req: Request, res: Response) => {
  try {
    const { buildId } = req.params;
    logger.info(`Cancelling build: ${buildId}`);

    await orchestrator.cancelBuild(buildId);

    res.json({
      success: true,
      message: 'Build cancelled'
    });
  } catch (error) {
    logger.error('Failed to cancel build', error as Error);
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
