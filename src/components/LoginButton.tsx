import { Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const LoginButton = () => {

  const loginUrl = process.env.REACT_APP_LOGIN_URL || "http://localhost:8180/realms/online-learning-platform-dev/protocol/openid-connect/auth?client_id=olp-microservices&response_type=code&scope=openid&redirect_uri=http://localhost:3000/about";
  console.log("loginUrl", loginUrl);

  return (
    <div className='p-4 w-full'>
      <Button onClick={e => window.location.assign(loginUrl)} className='w-full' variant="outlined" startIcon={<AccountCircleIcon />}>
        Login
      </Button>
    </div>
  );
}

export default LoginButton;
