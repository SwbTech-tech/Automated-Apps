import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { Logger } from './utils/logger';
import { ProjectController } from './api/ProjectController';
import { BuildController } from './api/BuildController';
import { AnalysisController } from './api/AnalysisController';

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Logger
const logger = new Logger();

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`[${req.method}] ${req.path}`);
  next();
});

// API Routes
app.use('/api/projects', ProjectController);
app.use('/api/builds', BuildController);
app.use('/api/analysis', AnalysisController);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Error: ${err.message}`, err);
  res.status(500).json({
    error: {
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
  logger.info(`📝 API Documentation: http://localhost:${PORT}/api-docs`);
});

export default app;
