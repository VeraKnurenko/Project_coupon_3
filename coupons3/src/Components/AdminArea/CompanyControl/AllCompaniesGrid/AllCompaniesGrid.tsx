import "./AllCompaniesGrid.css";
import {Button, Card, Menu, MenuItem} from "@mui/material";
import {useEffect, useState} from "react";
import Company from "../../../../Models/Company";
import {useNavigate} from "react-router-dom";
import adminService from "../../../../services/AdminService";
import errorHandler from "../../../../services/ErrorHandler";
import {DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport} from "@mui/x-data-grid";

function AllCompaniesGrid(): JSX.Element {

    const [companies, setCompanies] = useState<Company[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        adminService
            .getAllCompanies()
            .then((c) => setCompanies(c))
            .catch((err) => errorHandler.showError(err));
    }, []);

    const handleDetailsClick = (event: React.MouseEvent<HTMLElement>, company: Company) => {
        setAnchorEl(event.currentTarget);
        setSelectedCompany(company);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedCompany(null);
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Company Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'password', headerName: 'Password', width: 150 },
        {
            field: 'details',
            headerName: 'Actions',
            width: 300,
            renderCell: (params) => (


                        <div className="ButtonContainer">
                        <Button variant="contained" onClick={() => navigate(`/updateCompany/${params.row.id}
                        `)}>
                            Update
                        </Button>
                        <Button variant="outlined" onClick={() => navigate(`/deleteCompany/${params.row.id}`)}>
                            Delete
                        </Button>
                        <Button variant="contained" onClick={(e) => handleDetailsClick(e, params.row as Company)}>
                            Details
                        </Button>
                    </div>


                // <>
                //     <Button
                //         variant="contained"
                //         onClick={() => navigate(`/oneCompany/${params.row.id}`)}
                //     >
                //         Details
                //     </Button>
                //     <Button
                //         variant="contained"
                //         onClick={() => navigate(`/updateCompany/${params.row.id}`)}
                //     >
                //         Update
                //     </Button>
                //     <Button
                //         variant="outlined"
                //         onClick={() => navigate(`/deleteCompany/${params.row.id}`)}
                //     >
                //         Delete
                //     </Button>
                // </>
            ),
        },
    ];



    return (
        <div className="AllCompaniesGrid">

            <div className="DataGridContainer">
                <DataGrid
                    rows={companies}
                    columns={columns}
                    components={{
                        Toolbar: () => (
                             <GridToolbarContainer>

                                <Button variant="contained" onClick={() => navigate('/AddCompany')}>
                                    Add Company
                                </Button>
                    //         </GridToolbarContainer>
                        ),
                    }}
                    // pageSize={5}
                    // checkboxSelection
                    disableRowSelectionOnClick
                />

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                >
                    {selectedCompany && (
                        <>
                            <MenuItem>
                                <strong>ID:</strong> {selectedCompany.id}
                            </MenuItem>
                            <MenuItem>
                                <strong>Name:</strong> {selectedCompany.name}
                            </MenuItem>
                            <MenuItem>
                                <strong>Email:</strong> {selectedCompany.email}
                            </MenuItem>
                            <MenuItem>
                                <strong>Password:</strong> {selectedCompany.password}
                            </MenuItem>
                        </>
                    )}
                </Menu>
            </div>


            {/*<Button variant="contained" onClick={() => navigate('/AddCompany')}>*/}
            {/*    Add Company*/}
            {/*</Button>*/}
            {/*<div className="DataGridContainer">*/}
            {/*    <DataGrid*/}
            {/*        rows={companies}*/}
            {/*        columns={columns}*/}
            {/*        // pageSize={5}*/}
            {/*        // checkboxSelection*/}
            {/*        disableRowSelectionOnClick*/}
            {/*    />*/}
            {/*</div>*/}
			
        </div>
    );
}

export default AllCompaniesGrid;
