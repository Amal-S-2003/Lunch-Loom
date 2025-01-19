import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
function AdminDashboard() {

  const users = [
    { month: "January", totalUsers: 400, messOwners: 112 },
    { month: "February", totalUsers: 150, messOwners: 205 },
    { month: "March", totalUsers: 180, messOwners: 103 },
    { month: "April", totalUsers: 200, messOwners: 304 },
    { month: "May", totalUsers: 230, messOwners: 105 },
    { month: "June", totalUsers: 250, messOwners: 50 },
    { month: "July", totalUsers: 300, messOwners: 220 },
    { month: "August", totalUsers: 280, messOwners: 108 },
    { month: "September", totalUsers: 320, messOwners: 244 },
    { month: "October", totalUsers: 340, messOwners: 110 },
    { month: "November", totalUsers: 310, messOwners: 340 },
    { month: "December", totalUsers: 120, messOwners: 400 },
  ];
  
  const revenues = [
    { month: "January", revenue: 12000 },
    { month: "February", revenue: 10500 },
    { month: "March", revenue: 11200 },
    { month: "April", revenue: 13000 },
    { month: "May", revenue: 15500 },
    { month: "June", revenue: 14800 },
    { month: "July", revenue: 16200 },
    { month: "August", revenue: 17000 },
    { month: "September", revenue: 14500 },
    { month: "October", revenue: 13700 },
    { month: "November", revenue: 15300 },
    { month: "December", revenue: 18000 },
  ];
  
  const top_selled_foods = [
    {
        "image": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRgAu7AfV9Cj1O8205hwg8KyksuQ4HDLb3J1xzgmfKrs9WpIS9FrFOtf5HsrYrZ0TBbXsXQCKKwCFw5b0pWPXkB8VGU-3bTLIJY8pXG_MI",
        "name": "Cheeseburger",
        "count": 250,
        "total_amount": 1250.00
    },
    {
        "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSZXNYtOsmKfMSWOlOJ8uxVDQzSXNRWJrdmG4EzHJ3JKeZpZWMxL-p1YEcwg7j6SaxsO5Gd0VwujBEhWUJBUkUfFp7lEmYvgoTkBGi-4kbA",
        "name": "Pepperoni Pizza",
        "count": 200,
        "total_amount": 3000.00
    },
    {
        "image": "https://copykat.com/wp-content/uploads/2021/02/Creamy-Alfredo-Sauce-Pin-3.jpg",
        "name": "Creamy Alfredo Pasta",
        "count": 180,
        "total_amount": 2700.00
    }
  ]

  return (
    <>
      <div className="container p-5 d-grid gap-5">
        <div className="row">
          <div className="col-6">
            <div className="card shadow rounded p-2">
              {
                // users.map((user)=>(

                <Bar
                  data={{
                    labels: users.map((user) => user.month),

                    datasets: [
                      {
                        label: "New Users",
                        data: users.map((user) => user.totalUsers),
                        backgroundColor: "lightblue",
                        borderRadius: 1,
                      },
                      {
                        label: "New Mess",
                        data: users.map((user) => user.messOwners),
                        backgroundColor: "lightgreen",
                      },
                    ],
                  }}
                />
                // ))
              }
            </div>
          </div>

        </div>

        <div className="col-8 card shadow p-5">
          <Line
            data={{
              labels: revenues.map((revenue) => revenue.month),
              datasets: [
                {
                  label: "Revenue",
                  data: revenues.map((revenue) => revenue.revenue),
                  backgroundColor: "red",
                  borderColor: "red",
                },

              ],
            }}
          />
        </div>
      </div>
      <div className="container  flex items-center justify-center">
<div className="w-1/3 rounded-lg shadow">
<h1 className="text-2xl text-gray-600 fw-bolder">Top Selled Items</h1>
<div className="table-area" >
<table
  class="table table-striped "
>
  <thead className="bg-dark" style={{ background: "#29355f" }}>
    <tr className="table-dark ">
      <th scope="col">#</th>
      <th scope="col">Image</th>
      <th scope="col">Name</th>
      <th scope="col">Count</th>
      <th scope="col">Total revenue</th>
    </tr>
  </thead>
  <tbody className="p-5 ">
    {
      top_selled_foods.map((top_selled_food, index) => (
        <tr className="w-25" style={{ overflowX: "auto" }}>
          <th scope="row">{index + 1}</th>
          <td>
            <img
              src={top_selled_food.image}
              alt={top_selled_food.name}
              style={{ width: "150px" }}
            />
          </td>
          <td>{top_selled_food.name}</td>
          <td>{top_selled_food.count}</td>
          <td>{top_selled_food.total_amount}</td>

        
        </tr>
      ))
}
  </tbody>
</table>
</div>
</div>
</div>
    </>
  );
}

export default AdminDashboard;
// =========================
// const users = [
//   { month: "January", totalUsers: 400, messOwners: 112 },
//   { month: "February", totalUsers: 150, messOwners: 205 },
//   { month: "March", totalUsers: 180, messOwners: 103 },
//   { month: "April", totalUsers: 200, messOwners: 304 },
//   { month: "May", totalUsers: 230, messOwners: 105 },
//   { month: "June", totalUsers: 250, messOwners: 50 },
//   { month: "July", totalUsers: 300, messOwners: 220 },
//   { month: "August", totalUsers: 280, messOwners: 108 },
//   { month: "September", totalUsers: 320, messOwners: 244 },
//   { month: "October", totalUsers: 340, messOwners: 110 },
//   { month: "November", totalUsers: 310, messOwners: 340 },
//   { month: "December", totalUsers: 120, messOwners: 400 },
// ];

// const revenues = [
//   { month: "January", revenue: 12000 },
//   { month: "February", revenue: 10500 },
//   { month: "March", revenue: 11200 },
//   { month: "April", revenue: 13000 },
//   { month: "May", revenue: 15500 },
//   { month: "June", revenue: 14800 },
//   { month: "July", revenue: 16200 },
//   { month: "August", revenue: 17000 },
//   { month: "September", revenue: 14500 },
//   { month: "October", revenue: 13700 },
//   { month: "November", revenue: 15300 },
//   { month: "December", revenue: 18000 },
// ];

// const top_selled_foods = [
//   {
//       "image": "https://example.com/images/burger.jpg",
//       "name": "Cheeseburger",
//       "count": 250,
//       "total_amount": 1250.00
//   },
//   {
//       "image": "https://example.com/images/pizza.jpg",
//       "name": "Pepperoni Pizza",
//       "count": 200,
//       "total_amount": 3000.00
//   },
//   {
//       "image": "https://example.com/images/pasta.jpg",
//       "name": "Creamy Alfredo Pasta",
//       "count": 180,
//       "total_amount": 2700.00
//   }
// ]
{/* <div className="container bg-gray-400 flex items-center justify-center">
<div className="w-1/3 rounded-lg shadow">
<h1 className="text-2xl text-gray-600 fw-bolder">Top Selled Items</h1>
<div className="table-area" >
<table
  class="table table-striped "
>
  <thead className="bg-dark" style={{ background: "#29355f" }}>
    <tr className="table-dark ">
      <th scope="col">#</th>
      <th scope="col">Image</th>
      <th scope="col">Name</th>
      <th scope="col">Count</th>
      <th scope="col">Total revenue</th>
    </tr>
  </thead>
  <tbody className="p-5 ">
    {
      top_selled_foods.map((top_selled_food, index) => (
        <tr className="w-25" style={{ overflowX: "auto" }}>
          <th scope="row">{index + 1}</th>
          <td>
            <img
              src={top_selled_food.image}
              alt={top_selled_food.name}
              style={{ width: "150px" }}
            />
          </td>
          <td>{top_selled_food.name}</td>
          <td>{top_selled_food.count}</td>
          <td>{top_selled_food.total_amount}</td>

        
        </tr>
      ))
}
  </tbody>
</table>
</div>
</div>
</div> */}