import React, { useContext } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { ThemeContext } from 'context/theme/state';

interface Props {
  children: React.ReactNode;
}

function CustomThemeProvider({ children }: Props) {
  const { theme } = useContext(ThemeContext);

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}

export default CustomThemeProvider;
