import { useState, useEffect } from "react";

export function meta({ }) {
  return [
    { title: "New React Router Apps" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
const API = import.meta.env.VITE_API_URL;

export default function Listings() {
  const [listings, setListings] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API}/auction/listings`);
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

  if (!listings) {
    return <p>Loading...</p>;
  }

  console.log("Listings", listings);

  if (listings.length) {
    return (
      <div className="@container mx-auto">
        <div className="p-24">
          <h1 className="text-2xl font-bold mb-4">Listings</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white shadow-md rounded-lg p-4 border"
              >
                {
                  listing.media[0] && (
                    <img className="w-full h-32 object-cover object-center rounded-t-lg" src={listing?.media?.[0]?.url} alt="" />
                  )
                }
                <h2 className="text-xl truncate font-semibold mb-2">{listing.title}</h2>
                <p className="text-gray-700 truncate mb-2">{listing.description}</p>
                <p className="text-sm text-gray-500">ID: {listing.id}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
