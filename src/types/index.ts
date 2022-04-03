export interface ContextProviderProps {
  children: React.ReactNode;
}

export interface Letter {
  display: string;
  status: 'unused' | 'wrongPlace' | 'rightPlace';
}
