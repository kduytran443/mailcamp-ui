import { api } from '@/api/axios';
import {
  Workspace,
  PaginatedResult,
  CreateWorkspacePayload,
  UpdateWorkspacePayload,
} from '@/models/workspace.types';

export const WorkspaceService = {
  /**
   * Fetch paginated list of workspaces
   * GET /workspaces
   */
  getMyWorkspaces: async (page = 1, limit = 10): Promise<PaginatedResult<Workspace>> => {
    const { data } = await api.get('/workspaces', {
      params: { page, limit },
    });

    return data;
  },

  /**
   * Fetch workspace details by ID
   * GET /workspaces/:id
   */
  getWorkspaceById: async (id: string): Promise<Workspace> => {
    const { data } = await api.get(`/workspaces/${id}`);
    return data;
  },

  /**
   * Create a new workspace
   * The creator becomes the OWNER automatically
   * POST /workspaces
   */
  createWorkspace: async (payload: CreateWorkspacePayload): Promise<Workspace> => {
    const { data } = await api.post('/workspaces', payload);
    return data;
  },

  /**
   * Update a workspace
   * PUT /workspaces/:id
   */
  updateWorkspace: async (id: string, payload: UpdateWorkspacePayload): Promise<Workspace> => {
    const { data } = await api.put(`/workspaces/${id}`, payload);
    return data;
  },

  /**
   * Delete a workspace
   * DELETE /workspaces/:id
   */
  deleteWorkspace: async (id: string): Promise<{ message: string }> => {
    const { data } = await api.delete(`/workspaces/${id}`);
    return data;
  },
};
