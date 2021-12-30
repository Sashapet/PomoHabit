import { UserProps } from './authTypes';

export interface PostProps {
  userId: string;
  title: string;
  createdAt: Date;
  style: string;
  sessions: number;
  description: string;
  postId: string;
  time: string;
  user?: UserProps;
  likeCount: number;
}
