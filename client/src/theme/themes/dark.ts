import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        background: {
            default: '#1e1e1e'
        },
        text: {
            primary: '#f1f2f6',
            secondary: '#ced6e0'
        },
        primary: {
            main: '#2d2d2d'
        },
        secondary: {
            main: '#23272e'
        },
        success: {
            main: '#7bed9f'
        },
        error: {
            main: '#ff6b81'
        }
    },
    overrides: {
        MuiButton: {
            root: {
                textTransform: 'unset'
            }
        }
    }
});

export default { ...theme, name: 'dark' };
