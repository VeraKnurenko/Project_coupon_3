import "./DashBoard.css";
import React, {SyntheticEvent, useState} from "react";
import {Box} from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {authStore} from "../../../Redux/OurStore";
import {NavLink} from "react-router-dom";




function DashBoard(): JSX.Element {


        const [value, setValue] = useState('1');

        const handleChange = (event: SyntheticEvent, newValue: string) => {
            setValue(newValue);
        }

    const isAdmin = authStore.getState().user.role === "ADMIN";
    return (
        <div className="DashBoard">
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Company Control" value="1" />
                            <Tab label="Customer Control" value="2" />
                            {/*<Tab label="Item Three" value="3" />*/}
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <NavLink className={"navlink"} to={"/AllCompanies"}>All Companies</NavLink>
                    </TabPanel>
                    <TabPanel value="2">
                        <NavLink className={"navlink"} to={"/AllCustomers"}>All Customers</NavLink>

                    </TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
                </TabContext>
            </Box>
			
        </div>
    );
}

export default DashBoard;
