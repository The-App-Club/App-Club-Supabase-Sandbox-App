import '@fontsource/inter';
import '@fontsource/noto-sans-jp';
import '@fontsource/kosugi';
import {extendTheme} from '@mui/joy/styles';

const customTheme = extendTheme({
  fontFamily: {
    body: 'Inter, sans-serif',
  },
});

export {customTheme};
