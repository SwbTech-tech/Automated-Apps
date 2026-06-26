import { Router, Request, Response } from 'express';
import { ProjectAnalyzer } from '../services/ProjectAnalyzer';
import { Logger } from '../utils/logger';

const router = Router();
const logger = new Logger();
const analyzer = new ProjectAnalyzer();

// Analyze a project
router.post('/analyze', async (req: Request, res: Response) => {
  try {
    const { projectPath } = req.body;

    if (!projectPath) {
      return res.status(400).json({ error: 'projectPath is required' });
    }

    logger.info(`Analyzing project at: ${projectPath}`);
    const analysis = await analyzer.analyzeProject(projectPath);

    res.json({
      success: true,
      data: analysis
    });
  } catch (error) {
    logger.error('Failed to analyze project', error as Error);
    res.status(500).json({
      error: {
        message: (error as Error).message
      }
    });
  }
});

// Get project info
router.get('/:projectId', async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    logger.info(`Fetching project info for: ${projectId}`);

    res.json({
      success: true,
      data: {
        id: projectId,
        message: 'Project info endpoint'
      }
    });
  } catch (error) {
    logger.error('Failed to fetch project', error as Error);
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
