import { api } from '@/api/axios';

export const WorkspaceService = {
  getMyWorkspaces: async () => {
    const { data } = await api.get('workspace/my-workspaces');
    return [];
  },
};
