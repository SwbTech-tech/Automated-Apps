import { Router, Request, Response } from 'express';
import { LanguageDetector } from '../services/LanguageDetector';
import { DependencyResolver } from '../services/DependencyResolver';
import { Logger } from '../utils/logger';

const router = Router();
const logger = new Logger();
const languageDetector = new LanguageDetector();
const dependencyResolver = new DependencyResolver();

// Detect language
router.post('/detect-language', async (req: Request, res: Response) => {
  try {
    const { projectPath } = req.body;

    if (!projectPath) {
      return res.status(400).json({ error: 'projectPath is required' });
    }

    logger.info(`Detecting language for: ${projectPath}`);
    const languages = await languageDetector.detectLanguages(projectPath);

    res.json({
      success: true,
      data: languages
    });
  } catch (error) {
    logger.error('Failed to detect language', error as Error);
    res.status(500).json({ error: (error as Error).message });
  }
});

// Resolve dependencies
router.post('/resolve-dependencies', async (req: Request, res: Response) => {
  try {
    const { projectPath, language } = req.body;

    if (!projectPath || !language) {
      return res.status(400).json({ 
        error: 'projectPath and language are required' 
      });
    }

    logger.info(`Resolving dependencies for: ${projectPath} (${language})`);
    const dependencies = await dependencyResolver.resolveDependencies(
      projectPath,
      language
    );

    res.json({
      success: true,
      data: dependencies
    });
  } catch (error) {
    logger.error('Failed to resolve dependencies', error as Error);
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
