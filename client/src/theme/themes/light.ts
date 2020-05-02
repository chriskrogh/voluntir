import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        background: {
            default: '#fff'
        },
        text: {
            primary: 'rgb(30, 30, 30)',
            secondary: 'rgb(86, 86, 86)'
        },
        primary: {
            main: 'rgb(245, 245, 245)'
        },
        secondary: {
            main: '#eeeeee'
        },
        success: {
            main: '#2ed573'
        },
        error: {
            main: '#ff4757'
        }
    }
});