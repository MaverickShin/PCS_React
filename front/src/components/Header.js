import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {BrowserRouter as Router} from 'react-router-dom';
import { Button } from '@mui/material';
  

class Header extends React.Component {


    logoutAction = (e) => {

        window.location = 'http://localhost:8081/tpj/admin/logoutrequest';

    }


    render(){

        return(
            <Router>
                <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        <span className = "header_span">Pet Care System</span>
                    </Typography>
                    <Button color="inherit" style = {{fontWeight:'bolder'}} onClick={this.logoutAction}>Logout</Button>
                    </Toolbar>
                </AppBar>
                </Box>
            </Router>
        );
    }

}

export default Header;