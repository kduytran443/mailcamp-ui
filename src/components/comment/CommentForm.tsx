import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

interface Props {
  onSubmit: (text: string) => void;
  placeholder?: string;
}

export const CommentForm = ({ onSubmit, placeholder = "Nhập bình luận..." }: Props) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit(text.trim());
    setText("");
  };

  return (
    <Box sx={{
      width: "100%"
    }}>
      <TextField
        fullWidth
        multiline
        minRows={2}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        variant="outlined"
        size="small"
      />
      <Box mt={1}>
        <Button endIcon={<SendIcon />} variant="contained" size="small" onClick={handleSubmit}>
          Gửi
        </Button>
      </Box>
    </Box>
  );
};
