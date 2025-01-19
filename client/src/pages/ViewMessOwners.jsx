import React, { useContext, useState } from "react";
import { MessContext } from "../context/MessContext";
import { useNavigate } from "react-router-dom";

function ViewMessOwners() {
  const [query, setQuery] = useState("");
  const { allMesses, setAllMesses } = useContext(MessContext);
  const filteredMesses = allMesses.filter((mess) =>
    Object.values(mess).some((value) =>
      value.toString().toLowerCase().includes(query.toLowerCase())
    )
  );
  const navigate = useNavigate();
  return (
    <div className="w-100 h-[550px] overflow-auto">
      <div className=" d-flex  ">
        <div className="w-2/3 bg-gray-100 m-4 ms-5 border-b-gray-600 border-b-2 text-xl flex justify-between items-center px-3">
          <input
            type="text"
            placeholder="Search User"
            className="border-0 outline-none w-5/6 bg-transparent"
            onChange={(e) => setQuery(e.target.value)}
          />
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className="w-1/3 p-3 rounded-lg me-9 shadow  m-3 flex justify-center items-center  ">
          <h3 className="">
            Total Mess :
            <span className="text-3xl text-gray-700">{allMesses.length}</span>
          </h3>
        </div>
      </div>
      <div className="table px-5 ">
        <table
          class="table table-striped w-100"
          //   style={{ overflowY: "auto", maxHeight: "40vh" }}
        >
          <thead className="bg-dark" style={{ background: "#29355f" }}>
            <tr className="table-dark ">
              <th scope="col">#</th>
              <th scope="col">MessName</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">City</th>
              <th scope="col">View</th>
              {/* <th scope="col">Delete</th> */}
            </tr>
          </thead>
          <tbody className="p-5 ">
            {filteredMesses && filteredMesses.length > 0 ? (
              filteredMesses.map((mess, index) => (
                <tr className="w-25" style={{ overflowX: "auto" }}>
                  <th scope="row">{index + 1}</th>
                  <td>{mess.messName}</td>
                  <td>{mess.phoneNumber}</td>
                  <td>{mess.address}</td>
                  <td>{mess.location}</td>
                  <td>
                    <a href={`mess-details/${mess._id}`}>
                    <i
                    // onClick={() => navigate()}
                    class="fa-solid fa-eye text-slate-800 cursor-pointer"
                    ></i>
                    </a>
                  </td>
                  {/* <td>
                    <i class="fa-solid fa-trash text-danger"></i>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colspan="6">
                  <h1 className="text-danger text-center">Users Not Found!</h1>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewMessOwners;
