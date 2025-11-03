export interface EnrolledClass {
  id: string;
  name: string;
  description: string;
  instructor: {
    name: string;
    avatarUrl: string;
  };
  thumbnailUrl: string;
  joinedDate: string;
  progress: number; // 0 - 100
  numberOfLessons: number;
  status: "completed" | "ongoing";
  totalStudents: number;
  reviewRating: number;
}
