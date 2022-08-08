import { createTheme } from '@material-ui/core/styles';

export const theme = createTheme({
  palette: {
    primary:{
        main:"#fcc101",
        contrastText:"#ffffff"
    } ,
    secondary:{
        main:"#f4d160"
    },
    error:{
        main:"#e40017"
    },
    warning: {
        main: "#fcc101",
        light: "#fcc101",
        dark: "#fcc101",
    },
    info:{
        main:"#1687a7"
    },
    success:{
        main:"#00917c"
    }
  },
  props: {
    MuiInput: { inputProps: { spellCheck: 'false' } }
  }
});

