import { useState, useEffect } from "react";
import { Link } from "react-router";


export function meta({ }) {
  return [
    { title: "Listings" },
    { name: "Semesterproject2"},
  ];
}
const API = import.meta.env.VITE_API_URL;


export default function Listings() {
  const [listings, setListings] = useState();
  const [searched, setSearched] = useState()


  const handleSearch = (e) => {
    e.preventDefault();

    const fetchSearched = async () => {
      const response = await fetch(`${API}/auction/listings/search?q=${e.target[0].value}&limit=6`);
      if (response.status === 200) {
        const data = await response.json();
        setSearched(data.data);
      } else if (response.status === 404) {
        setSearched({ error: "Listings not found" });
      } else {
        setSearched({ error: "Error " + response.status });
      }
    };
    fetchSearched();
  }


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API}/auction/listings?_active=true`);
      if (response.status === 200) {
        console.log("200");
        const data = await response.json();
        setListings(data.data);
      } else if (response.status === 404) {
        setListings({ error: "Listings not found" });
      } else {
        setListings({ error: "Error " + response.status });
      }
    };

    fetchData();
  }, []);

  if (listings) {
    return (
      <div className="@container mx-auto p-5 sm:p-10 md:p-16">
        <div className="mb-6 w-1/2 mx-auto">
          <form onSubmit={handleSearch} className="w-full inline-flex">
            <input
              type="text"
              placeholder="Search listings..."
              className="w-full p-2 border border-fairy-3 rounded-lg mb-4"
            />
            <button className="p-2 mb-4 font-fairy2 rounded-lg ml-4 text-fairy-1 bg-fairy-4 px-3 py-1.5 text-sm/6 font-semibold hover:bg-fairy-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fairy-3" type="submit">Search</button>
          </form>
        </div>
        {searched && (
          <div className="p-8 lg:24 mb-10">
            <h1 className="text-2xl font-fairy mb-4">Search Results</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 ">
              {searched.length ? searched.map((listing) => (
                <Link to={`/listings/${listing.id}`} key={listing.id} >
                  <div className="-rounded overflow-hidden shadow-lg flex flex-col ">
                    <div
                      key={listing.id}
                      className="bg-white overflow-hidden shadow-lg rounded-lg p-5  "
                    >
                      {
                        <img className="w-full max-h-60 object-cover" src={listing?.media?.[0] ? listing?.media?.[0].url : "../images/placeholder.png"} alt="" />
                      }
                      <div className=" px-6 py-4 mb-auto shadow-lg rounded-lg bg-f mt-4 bg-fairy-1 min-h-64">
                        <h2 className="font-medium text-lg  hover:text-fairy-3 transition duration-500 ease-in-out inline-block mb-2 capitalize">{listing.title}</h2>
                        <p className="text-fairy-5 mb-2 ">{listing.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              )) : <p>No results found</p>}
            </div>

          </div>
        )}

        <div className="p-8 lg:24">
          <h1 className="text-2xl font-fairy text-fairy-3 mb-4">Listings</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 ">
            {listings.map((listing) => (
              <Link to={`/listings/${listing.id}`} key={listing.id} >
                <div className="-rounded overflow-hidden shadow-lg flex flex-col ">
                  <div
                    key={listing.id}
                    className="bg-white overflow-hidden shadow-lg rounded-lg p-5  "
                  >
                    {
                      <img className="w-full max-h-60 object-cover" src={listing?.media?.[0] ? listing?.media?.[0].url : "../images/placeholder.png"} alt="" />
                    }
                    <div className=" px-6 py-4 mb-auto shadow-lg rounded-lg bg-f mt-4 bg-fairy-1 min-h-64">
                      <h2 className="font-medium text-lg  hover:text-fairy-3 transition duration-500 ease-in-out inline-block mb-2 capitalize">{listing.title}</h2>
                      <p className="text-fairy-5 mb-2 ">{listing.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>

      </div>
    );
  }
}
