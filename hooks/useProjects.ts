import { useState, useEffect } from 'react';

interface Project {
  id: string;
  strId: string;
  name: string;
  description?: string;
  url?: string;
  createdAt: string;
  updatedAt: string;
}

interface UseProjectsReturn {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  retryCount: number;
  refetch: () => void;
}

export function useProjects(): UseProjectsReturn {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const fetchProjects = async (attempt = 1): Promise<void> => {
    try {
      setError(null);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';
      
      console.log(`Fetching projects from: ${apiUrl}/projects (attempt ${attempt})`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`${apiUrl}/projects`, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('API Response:', result);
      
      if (result.success && Array.isArray(result.data)) {
        setProjects(result.data);
        setRetryCount(0);
        setIsLoading(false);
        console.log(`Successfully loaded ${result.data.length} projects from API`);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error: any) {
      console.error(`Failed to fetch projects (attempt ${attempt}):`, error.message);
      
      if (attempt < maxRetries) {
        setRetryCount(attempt);
        console.log(`Retrying in 2 seconds... (${attempt}/${maxRetries})`);
        setTimeout(() => fetchProjects(attempt + 1), 2000);
        return;
      }
      
      // Max retries reached, show error state
      setError(`Failed to load projects after ${maxRetries} attempts: ${error.message}`);
      setProjects([]);
      setIsLoading(false);
      console.warn('API connection failed after maximum retries');
    }
  };

  const refetch = () => {
    setIsLoading(true);
    setRetryCount(0);
    fetchProjects();
  };

  // Load projects on hook initialization
  useEffect(() => {
    setIsLoading(true);
    fetchProjects();
  }, []);

  return {
    projects,
    isLoading,
    error,
    retryCount,
    refetch
  };
}
