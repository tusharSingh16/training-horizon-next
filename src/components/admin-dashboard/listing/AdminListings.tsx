import { ColDef, ICellRendererParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "../sideBar/SideBar";
import Link from "next/link";

const  AdminListings: React.FC = () => {
   
  const [rowData, setRowData] = useState<
    { title: string; price: string; location: string; mode: string }[]
  >([]);
  const [colDefs, setColDefs] = useState<ColDef[]>([
    {
      headerName: "Title",
      field: "title",
      headerClass: "font-bold border p-2 font-bold  text-md",
    },
    {
      headerName: "Price",
      field: "price",
      headerClass: "font-bold border p-2 font-bold  text-md",
    },
    {
      headerName: "Location",
      field: "location",
      headerClass: "font-bold border p-2 font-bold  text-md",
    },
    // { headerName:"Mode" , field: "mode" , headerClass:"font-bold border p-2 font-bold  text-md" },
    {
      headerName: "Mode",
      field: "mode",
      headerClass: "font-bold border p-2 font-bold  text-md",
    },
    {
      headerName: "Age Group",
      field: "ageGroup",
      headerClass: "font-bold border p-2 font-bold  text-md",
    },
    { headerName:"Action" , field: "" ,  headerClass:"font-bold border p-2 font-bold  text-md",
      cellRenderer:(data:ICellRendererParams)=> <div className="flex gap-8">
      <Link href='/userflow/addListing' className='text-red-500 font-bold' >Edit</Link>
      </div>
    },
  ]);


const handleEditListing = (listingId:string) => {
  // onClick={() => handleEditListing(data.data._id)
};



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3005/api/v1/admin/listings"
        );
        // const res = await axios.get('http://localhost:3005/api/v1/admin/pending-listings');
        // console.log(response.data.pendingTrainers);
        // if(Array.isArray(response.data.data))
        setRowData(response.data.listings);
        // setRowData2(res.data.pendingListings);
        // else{ console.log("not an array")}
      } catch (error) {
        console.log("error");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {/* <Sidebar /> */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="col-span-3 bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Listing</h3>
          <div className="overflow-y-auto h-64">
            <div
              className="ag-theme-quartz "
              style={{ height: "100%", width: "100%" }}
            >
              <AgGridReact rowData={rowData || []} columnDefs={colDefs} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminListings;
