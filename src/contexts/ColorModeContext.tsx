import { createContext, useMemo, useState, useContext } from "react";
import { ThemeProvider, createTheme, PaletteMode, CssBaseline } from "@mui/material";
import { amber, deepOrange, grey } from "@mui/material/colors";
import { AppStorage } from "utils/AppStorage";
import { StorageKey } from "enumeration/storageKey";
import { ThemeMode } from "enumeration/themeMode";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

// The new hook for using color mode context
export const useColorMode = () => useContext(ColorModeContext);

// Provider
export const ColorModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>(() => {
    return (localStorage.getItem(StorageKey.THEME_MODE) as PaletteMode) || ThemeMode.LIGHT;
  });

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;
          AppStorage.setThemeMode(newMode);
          return newMode;
        });
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === ThemeMode.LIGHT
            ? {
                primary: amber,
                background: {
                  default: "#f5f5f5",
                  paper: "#fff",
                },
              }
            : {
                primary: deepOrange,
                background: {
                  default: "#121212",
                  paper: grey[900],
                },
              }),
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
