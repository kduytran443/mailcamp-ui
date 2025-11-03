import { Box, Typography, Stack, Divider, Button } from "@mui/material";
import { CommentItem } from "./CommentItem";
import { CommentForm } from "./CommentForm";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Comment {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  content: string;
  createdAt: string;
  replies?: Comment[];
}

interface Props {
  classId: string;
  initialVisible?: boolean;
}

const mockComments: Comment[] = [
  {
    id: "c1",
    user: { name: "Học viên A", avatarUrl: "/avatars/user1.png" },
    content: "Khóa học rất bổ ích và dễ hiểu!",
    createdAt: "2025-07-17T08:30:00",
    replies: [
      {
        id: "c1-r1",
        user: { name: "Giảng viên", avatarUrl: "/avatars/teacher.png" },
        content: "Cảm ơn bạn đã ủng hộ!",
        createdAt: "2025-07-17T09:00:00",
      },
    ],
  },
  {
    id: "c2",
    user: { name: "Học viên B", avatarUrl: "/avatars/user2.png" },
    content: "Mình thích cách giảng dạy của thầy A.",
    createdAt: "2025-07-16T19:45:00",
  },
  {
    id: "c3",
    user: { name: "Học viên C", avatarUrl: "/avatars/user3.png" },
    content: "Bài giảng có ví dụ thực tế rất dễ hiểu.",
    createdAt: "2025-07-15T14:20:00",
    replies: [
      {
        id: "c3-r1",
        user: { name: "Giảng viên", avatarUrl: "/avatars/teacher.png" },
        content: "Mình luôn cố gắng gắn lý thuyết với thực hành, cảm ơn bạn!",
        createdAt: "2025-07-15T15:00:00",
      },
    ],
  },
  {
    id: "c4",
    user: { name: "Học viên D", avatarUrl: "/avatars/user4.png" },
    content: "Hy vọng sẽ có thêm bài tập nâng cao!",
    createdAt: "2025-07-14T11:10:00",
    replies: [
      {
        id: "c4-r1",
        user: { name: "Giảng viên", avatarUrl: "/avatars/teacher.png" },
        content: "Cảm ơn góp ý, mình sẽ bổ sung thêm!",
        createdAt: "2025-07-14T11:30:00",
      },
    ],
  },
  {
    id: "c5",
    user: { name: "Học viên E", avatarUrl: "/avatars/user5.png" },
    content: "Video hơi dài nhưng nội dung chất lượng.",
    createdAt: "2025-07-13T16:50:00",
  },
  {
    id: "c6",
    user: { name: "Học viên F", avatarUrl: "/avatars/user6.png" },
    content: "Giá như có thêm phần tổng kết sau mỗi chương thì tốt hơn.",
    createdAt: "2025-07-12T09:15:00",
    replies: [
      {
        id: "c6-r1",
        user: { name: "Giảng viên", avatarUrl: "/avatars/teacher.png" },
        content: "Cảm ơn bạn, mình sẽ cân nhắc thêm phần này.",
        createdAt: "2025-07-12T10:00:00",
      },
    ],
  },
  {
    id: "c7",
    user: { name: "Học viên G", avatarUrl: "/avatars/user7.png" },
    content: "Chương 3 hơi khó hiểu, mong thầy giải thích thêm.",
    createdAt: "2025-07-11T20:00:00",
    replies: [
      {
        id: "c7-r1",
        user: { name: "Giảng viên", avatarUrl: "/avatars/teacher.png" },
        content: "Mình sẽ bổ sung video giải thích rõ hơn, cảm ơn bạn.",
        createdAt: "2025-07-11T21:00:00",
      },
    ],
  },
  {
    id: "c8",
    user: { name: "Học viên H", avatarUrl: "/avatars/user8.png" },
    content: "Rất thích các ví dụ minh họa của khóa học!",
    createdAt: "2025-07-10T18:10:00",
  },
];

export default function Comments({ initialVisible }: Props) {
  const [visible, setVisible] = useState(initialVisible);
  const [visibleCount, setVisibleCount] = useState(3); // ví dụ: mỗi lần load 3 cmt

  const handleShowComments = () => {
    setVisible(true);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visibleComments = mockComments.slice(0, visibleCount);
  const hasMore = visibleCount < mockComments.length;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        width: "100%",
        flexGrow: 1,
        gap: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Bình luận
      </Typography>

      <Box sx={{ width: "100%" }} mb={2}>
        <CommentForm
          onSubmit={(text) => console.log("New comment:", text)}
        />
      </Box>

      {!visible ? (
        <Button
          variant="outlined"
          onClick={handleShowComments}
          endIcon={<ExpandMoreIcon />}
        >
          Hiển thị bình luận ({mockComments.length})
        </Button>
      ) : (
        <>
          <Stack
            sx={{ width: "100%" }}
            spacing={2}
            divider={<Divider />}
          >
            {visibleComments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </Stack>

          {hasMore && (
            <Button
              onClick={handleLoadMore}
              endIcon={<ExpandMoreIcon />}
              sx={{ mt: 2, alignSelf: "flex-start" }}
            >
              Xem thêm
            </Button>
          )}
        </>
      )}
    </Box>
  );
}
