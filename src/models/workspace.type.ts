export interface WorkspaceDto {
  id: string;
  name: string;
  imageUrl?: string;
  campaignsCount?: number;
  membersCount?: number;
  role?: 'admin' | 'member';
}

export const workspacesMock: WorkspaceDto[] = [
  {
    id: 'ws-1',
    name: 'Marketing Team',
    imageUrl: 'https://picsum.photos/600/300?random=1?office',
    campaignsCount: 12,
    membersCount: 5,
    role: 'admin',
  },
  {
    id: 'ws-2',
    name: 'Sales Team',
    imageUrl: 'https://picsum.photos/600/300?random=1?team',
    campaignsCount: 8,
    membersCount: 3,
    role: 'member',
  },
  {
    id: 'ws-3',
    name: 'Product Launch',
    imageUrl: 'https://picsum.photos/600/300?random=1?workspace',
    campaignsCount: 5,
    membersCount: 4,
    role: 'admin',
  },
  {
    id: 'ws-4',
    name: 'Marketing Team',
    imageUrl: 'https://picsum.photos/600/300?random=3?office',
    campaignsCount: 12,
    membersCount: 5,
    role: 'admin',
  },
  {
    id: 'ws-5',
    name: 'Sales Team',
    imageUrl: 'https://picsum.photos/600/300?random=5?team',
    campaignsCount: 8,
    membersCount: 3,
    role: 'member',
  },
  {
    id: 'ws-6',
    name: 'Product Launch',
    imageUrl: 'https://picsum.photos/600/300?random=6?workspace',
    campaignsCount: 5,
    membersCount: 4,
    role: 'admin',
  },
];
