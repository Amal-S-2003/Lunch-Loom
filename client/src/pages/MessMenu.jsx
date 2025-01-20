import React, { useContext, useEffect, useState } from "react";
import { assets, cities, plans, prices } from "../assets/assets";
import MessListing from "../components/MessListing";
import Footer from "../components/Footer";
import { MessContext } from "../context/MessContext";
import { getAllMesses } from "../services/all_api";

function MessMenu() {
  // const { messes, filteredMesses, setFilteredMesses } = useContext(MessContext);
  // const [selectedCities, setSelectedCities] = useState([]);
  // const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState([]);

    // =======================
    const [location, setLocation] = useState(''); // State to hold the location input
    const [query,setQuery]=useState("")
    const [messes, setMesses] = useState([]);
    // const [filteredMesses, setFilteredMesses] = useState(messes); // State for filtered messes
    const fetchAllMess = async () => {
      const result = await getAllMesses();
      console.log(result.data);
      setMesses(result.data);
      setFilteredMesses(result.data)
    };
  
  
    // Handle location input change
    // const handleLocationChange = (value) => {

      const filteredMesses = messes.filter((mess) =>
        Object.values(mess).some((value) =>
          value.toString().toLowerCase().includes(query.toLowerCase())
        )
      );
      // const searchLocation = e.target.value.toLowerCase();
      // setLocation(searchLocation);
  
      // // Filter the messes based on location input
      // const filtered = messes.filter((mess) => 
      //   mess.location.toLowerCase().includes(searchLocation)
      // );
  
      // setFilteredMesses(filteredMess);
      console.log("filteredMesses>>>>>>>>>",filteredMesses);
      
    // };
  
    useEffect(() => {
      fetchAllMess();
    }, []);

    // =======================
  // const handleCityChange = (city) => {
  //   setSelectedCities((prev) =>      
  //     prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
  //   );
  // };
  // const handlePriceRangeChange = (plan) => {
  //   setSelectedPriceRange((prev) =>
  //     prev.includes(plan) ? prev.filter((p) => p !== plan) : [...prev, plan]
  //   );

  // };
  // const handleCategoryChange = (plan) => {
  //   setSelectedCategory((prev) =>
  //     prev.includes(plan) ? prev.filter((p) => p !== plan) : [...prev, plan]
  //   );
  // };

  // useEffect(() => {
    
  //   // const filterMessesByPrice = (messes) => {
  //   //   return messes.filter((m) => {
  //   //     return  selectedPriceRange.length === 0 || selectedPriceRange.some((range) => {
  //   //       const [min, max] = range.includes("-")
  //   //         ? range.split("-").map(Number)
  //   //         : [Number(range.split(" ")[0]), Infinity]; // Handle "20000 and above"
  //   //       return m.price >= min && m.price <= max;
  //   //     });
  //   //   });
  //   // };
  //   const matchesCities = (mess) =>
  //     selectedCities.length === 0 || selectedCities.includes(mess.city);    
  //   const matchesPlans = (mess) =>{
  //     selectedPriceRange.length === 0 || selectedPriceRange.some((range) => {
  //       const [min, max] = range.includes("-")
  //         ? range.split("-").map(Number)
  //         : [Number(range.split(" ")[0]), Infinity]; 
  //       return mess.price >= min && mess.price <= max;
  //     })
  //   }
  //     // selectedPriceRange.length === 0 || selectedPriceRange.includes(mess.plan);}
  //   const matchesCategories = (mess) =>
  //     selectedCategory.length === 0 || selectedCategory.includes(mess.catogory);

  //   const newFilteredMesses = messes
  //     .slice()
  //     .reverse()
  //     .filter(
  //       (mess) =>
  //         matchesCities(mess) && matchesCategories(mess)&&matchesPlans(mess)
  //     );
  //   setFilteredMesses(newFilteredMesses);
  // }, [messes,selectedCategory,selectedPriceRange, selectedCities, setFilteredMesses])

  return (
    <>
      <section id="banner">
        <div className="container flex justify-between items-center lg:p-24 ">
          <div className="flex flex-col gap-y-3 p-4">
            <h1 className="text-4xl lg:text-6xl font-bold">Lunch-Loom</h1>
            <p className="text-gray-800 md:text-xl">
              "Weaving Delicious Connections, One Meal at a Time."
            </p>
            <div className="flex gap-3">
              <input
                className="bg-teal-50 p-2 border-teal-800 rounded w-100 outline-teal-500"
                type="text"
                // onChange={(e)=>handleLocationChange(e.target.value)}
                onChange={(e) => setQuery(e.target.value)}

                placeholder="Find Your Nearest Messes here..."
              />
              <button className="bg-teal-600 text-white px-3 py-2 mx-auto rounded flex items-center gap-2">
                <i class="fa-solid fa-magnifying-glass"></i> Search
              </button>
            </div>
          </div>
          <img
            src={assets.banner_bg}
            className="w-50 h-50 hidden md:block"
            alt="banner_image"
          />
        </div>
      </section>

      <section id="messes">
        {/* <div className="flex flex-col md:flex-row">
          <div
            id="filters "
            className="p-10 rounded-lg shadow-teal-900 mb-5 flex flex-col gap-y-4 mx-5 border-1  w-fit"
          >
            <div>
              <h1 className="text-teal-500 text-2xl font-semibold">
                Filter By Cites
              </h1>
              {cities.map((city, index) => (
                <div key={index} className="d-flex gap-2">
                  <input
                    type="checkbox"
                    onChange={() => handleCityChange(city)}
                    checked={selectedCities.includes(city)}
                  />
                  <p>{city}</p>
                </div>
              ))}
            </div>
            <div>
              <h1 className="text-teal-500 text-2xl font-semibold">
                Filter By Plans
              </h1>
              {plans.map((plan) => (
                <div className="d-flex gap-2">
                  <input
                    type="checkbox"
                    onChange={() => handleCategoryChange(plan)}
                    checked={selectedCategory.includes(plan)}
                  />
                  <p>{plan}</p>
                </div>
              ))}
            </div>
            <div>
              <h1 className="text-teal-500 text-2xl font-semibold">
                Filter By Price
              </h1>
              {prices.map((price) => (
                <div className="d-flex gap-2">
                  <input type="checkbox" 
                  onChange={() => handlePriceRangeChange(price)}
                  checked={selectedPriceRange.includes(price)}
                  />
                  <p>{price}</p>
                </div>
              ))}
            </div>
          </div>
          <div> */}
            <MessListing messes={filteredMesses}/>
          {/* </div>
        </div> */}
      </section>

      <Footer />
    </>
  );
}

export default MessMenu;
