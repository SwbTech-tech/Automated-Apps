import { useProjectContext } from '../context/ProjectContext';

export function useProjectAnalysis() {
  return useProjectContext();
}
