import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  TextField,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Grid,
} from '@mui/material';
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  createdAt: string;
}

export default function ClassroomPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: 'Nguyễn Văn A',
      avatar: 'https://i.pravatar.cc/150?img=3',
      content: 'Chào mừng các bạn đến với lớp học Java!',
      createdAt: '2 giờ trước',
    },
    {
      id: '2',
      author: 'Trần Thị B',
      avatar: 'https://i.pravatar.cc/150?img=4',
      content: 'Nhớ nộp bài tập chương 1 trước thứ 6 nhé 👩‍💻',
      createdAt: '1 ngày trước',
    },
  ]);

  const [newPost, setNewPost] = useState('');

  const handleAddPost = () => {
    if (!newPost.trim()) return;
    const post: Post = {
      id: Math.random().toString(),
      author: 'Bạn',
      avatar: 'https://i.pravatar.cc/150?img=5',
      content: newPost,
      createdAt: 'Vừa xong',
    };
    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <>
      {/* Content with sidebar */}
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Sidebar: thông báo */}
          <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                📢 Thông báo
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Bài kiểm tra giữa kỳ vào ngày 15/10" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Cập nhật slide chương 2" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Sẽ có buổi học bù thứ 7 tuần này" />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Main feed: bài đăng */}
          <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
            {/* Ô nhập bài đăng */}
            <Paper sx={{ p: 2, mb: 3, display: 'flex', alignItems: 'center' }}>
              <Avatar src="https://i.pravatar.cc/150?img=5" sx={{ mr: 2 }} />
              <TextField
                fullWidth
                placeholder="Đăng gì đó cho lớp học…"
                variant="outlined"
                size="small"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />
              <Button variant="contained" sx={{ ml: 2 }} onClick={handleAddPost}>
                Đăng
              </Button>
            </Paper>

            {/* Danh sách bài đăng */}
            {posts.map((post) => (
              <Card key={post.id} sx={{ mb: 2 }}>
                <CardHeader
                  avatar={<Avatar src={post.avatar} />}
                  action={
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={post.author}
                  subheader={post.createdAt}
                />
                <CardContent>
                  <Typography>{post.content}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Thích</Button>
                  <Button size="small">Bình luận</Button>
                </CardActions>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
