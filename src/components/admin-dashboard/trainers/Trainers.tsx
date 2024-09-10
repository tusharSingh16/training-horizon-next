import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { ColDef, ICellRendererParams } from "ag-grid-community";

function Trainers() {
  const [rowData, setRowData] = useState<{ fname: string; lname: string; email: string; phone: string; }[]>([]);
  const [colDefs, setColDefs] = useState<ColDef[]>([
    { headerName:"Name", valueGetter: params => `${params.data.fname} ${params.data.lname}`  ,  headerClass:"font-bold border p-2 font-bold  text-md"},
    { headerName:"Email" , field: "email" , headerClass:"font-bold border p-2 font-bold  text-md"},
    { headerName:"Phone" , field: "phone" , headerClass:"font-bold border p-2 font-bold  text-md" },
    { headerName:"Qualification" , field: "qualifications" ,  headerClass:"font-bold border p-2 font-bold  text-md",
      },
      { headerName:"Remove" , field: "" ,  headerClass:"font-bold border p-2 font-bold  text-md",
      },
  ])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3005/api/v1/admin/trainers"
        );
        // const res = await axios.get('http://localhost:3005/api/v1/admin/pending-listings');
        console.log(response);
        // if(Array.isArray(response.data.data))
        setRowData(response.data.trainer  );
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
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="col-span-3 bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Trainers</h3>
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

export default Trainers;
