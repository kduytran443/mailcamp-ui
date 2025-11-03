import { IconButton, useTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useColorMode } from '@/contexts/ColorModeContext';
import { ThemeMode } from '@/enumeration/themeMode';

const ToggleThemeButton = () => {
  const theme = useTheme();
  const colorMode = useColorMode();

  return (
    <IconButton onClick={colorMode.toggleColorMode} color="inherit">
      {theme.palette.mode === ThemeMode.LIGHT ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default ToggleThemeButton;
