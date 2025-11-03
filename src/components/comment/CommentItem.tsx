import {
  Avatar,
  Box,
  Typography,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/FavoriteBorder";
import ThumbUpIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ReplyIcon from "@mui/icons-material/Reply";
import { CommentForm } from "./CommentForm";
import { useState } from "react";

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
  comment: Comment;
  depth?: number;
}

export const CommentItem = ({ comment, depth = 0 }: Props) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReply = (text: string) => {
    console.log("Reply to", comment.id, ":", text);
    setShowReplyForm(false);
  };

  return (
    <Box sx={{
        width: "100%",
				marginTop: "12px"
    }}>
      <Stack sx={{width: "100%"}} direction="row" spacing={2}>
        <Avatar src={comment.user.avatarUrl} alt={comment.user.name} />
        <Box sx={{width: "100%"}}>
          <Typography variant="subtitle2">{comment.user.name}</Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(comment.createdAt).toLocaleString()}
          </Typography>
          <Typography variant="body2" mt={1}>
            {comment.content}
          </Typography>

          <Stack direction="row" spacing={1} mt={1}>
            <Tooltip title="Like">
              <IconButton size="small">
                <ThumbUpIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Heart">
              <IconButton size="small">
                <FavoriteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Trả lời">
              <IconButton
                size="small"
                onClick={() => setShowReplyForm(!showReplyForm)}
              >
                <ReplyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>

          {showReplyForm && (
            <Box sx={{width: "100%"}} mt={1}>
              <CommentForm
                onSubmit={handleReply}
                placeholder="Viết phản hồi..."
              />
            </Box>
          )}

          {comment.replies &&
            comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
            ))}
        </Box>
      </Stack>
    </Box>
  );
};
