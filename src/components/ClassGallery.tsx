import ResponsiveGrid from './ResponsiveGrid';
import ClassCard from './ClassCard';
import { SimpleClassDTO } from '@/models/SimpleClassDTO';
import withLoadingError from '@/hocs/withLoadingError';
import CircularLoading from './CircularLoading';
import { Pagination } from '@mui/material';

interface ClassGalleryProps {
  items: SimpleClassDTO[];
}

const ClassGallery = ({ items }: ClassGalleryProps) => {
  if (items == null) {
    return <CircularLoading />;
  }

  return (
    <>
      <ResponsiveGrid items={items} renderItem={(classItem) => <ClassCard data={classItem} />} />
      <Pagination className="mt-8" count={10} color="primary" />
    </>
  );
};

export default withLoadingError(ClassGallery);
