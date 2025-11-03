import { Typography } from '@mui/material';

interface Props {
  description: string;
}

export default function ClassOverview({ description }: Props) {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Introduction
      </Typography>
      <p className="text-sm leading-relaxed">{description}</p>
    </div>
  );
}
