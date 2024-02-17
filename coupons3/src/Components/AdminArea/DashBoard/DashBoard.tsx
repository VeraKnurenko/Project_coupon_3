import "./DashBoard.css";
import React, {SyntheticEvent, useState} from "react";
import {Box, Button} from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {authStore} from "../../../Redux/OurStore";
import {NavLink, useNavigate} from "react-router-dom";
import spiderAdmin from '../../../assets/images/spiderAdmin.jpg'




function DashBoard(): JSX.Element {
        const [value, setValue] = useState('1');
        const navigate = useNavigate();
        const handleChange = (event: SyntheticEvent, newValue: string) => {
            setValue(newValue);
        }


    // const isAdmin = authStore.getState().user.role === "ADMIN";
    return (
        <div className="DashBoard">
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Company Control" value="1" />
                            <Tab label="Customer Control" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Button variant={"contained"} onClick={()=>navigate("/AllCompanies")}>All Companies</Button><br/>
                    </TabPanel>
                    <TabPanel value="2">
                        <Button variant={"contained"} onClick={()=>navigate("/AllCustomers")}>All Customers</Button><br/>
                    </TabPanel>
                </TabContext>
            </Box>

            <img src={spiderAdmin} alt={"spiderman at desk"}/>
			
        </div>
    );
}

export default DashBoard;
