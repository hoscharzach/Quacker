
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    overrides: {
        // Applied to the <ul> element
        MuiMenu: {
            list: {
                backgroundColor: "red",
            },
        },
        // Applied to the <li> elements
        MuiMenuItem: {
            root: {
                fontSize: 12,
            },
        },
    },
});

export default theme;
