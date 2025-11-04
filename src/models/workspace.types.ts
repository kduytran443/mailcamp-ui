export interface Workspace {
  id: string;
  name: string;
  description?: string | null;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateWorkspacePayload {
  name: string;
  description?: string;
  image?: string;
}

export interface UpdateWorkspacePayload {
  name?: string;
  description?: string;
  image?: string;
}
