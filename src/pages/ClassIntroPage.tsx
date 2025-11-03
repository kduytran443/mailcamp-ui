import ClassComments from '@/components/comment/Comments';
import ClassIntroHeader from '@/components/class/ClassIntroHeader';
import ClassOverview from '@/components/class/ClassOverview';
import { EnrolledClassDetails } from '@/models/EnrolledClassDetails';
import { useParams } from 'react-router-dom';
import RelatedPublicClasses from '@/components/class/RelatedPublicClasses';

const classData: EnrolledClassDetails = {
  id: 'class-001',
  name: 'Web Development Bootcamp',
  description:
    'Khóa học này sẽ hướng dẫn bạn từ những kiến thức căn bản đến nâng cao về phát triển web.',
  instructor: {
    name: 'Nguyễn Văn A',
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  thumbnailUrl:
    'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiz8D-sFeAY249WfDJNSWanrKF3ZoF5V03xrnEm_EDbAM1zcSufZjhxbhsmAFiMB0fPhoBwDbeyObzIYvSE59XHvfUdJVCyn5G6VK4KQLbaCARiMpW5J8o2y2vgc5qB1jXxIEoGNgUc5vo/w1200-h630-p-k-no-nu/image.png',
  joinedDate: '2025-07-10',
  progress: 40,
  numberOfLessons: 24,
  status: 'ongoing',
  totalStudents: 128,
  reviewRating: 4.5,
};

const getClassData = (id: string | undefined): EnrolledClassDetails => {
  const testName = `${classData.name} - ${id}`;
  return { ...classData, name: testName };
};

export default function ClassIntroPage() {
  const { classId } = useParams<{ classId: string }>();
  const data = getClassData(classId);

  // You can replace this with real API fetch
  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-6 px-6 py-4">
      <ClassIntroHeader classData={data} />
      <ClassOverview description={data.description} />
      <ClassComments classId={data.id} />
      <RelatedPublicClasses />
    </div>
  );
}
