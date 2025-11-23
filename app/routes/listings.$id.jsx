import { useState, useEffect } from "react";
import Bids from "../components/bids.jsx";


export function meta({ }) {
  return [
    { title: "New React Router Apps" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
const API = import.meta.env.VITE_API_URL;

export default function Listing({ params }) {
  const [listing, setListing] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${API}/auction/listings/${params.id}?_bids=true`,
      );

      if (response.status === 200) {
        const data = await response.json();
        setListing(data.data);
      } else if (response.status === 404) {
        setListing({ error: "Listings not found" });
      } else {
        setListing({ error: "Error " + response.status });
      }
    };

    fetchData();
  }, []);

  if (!listing) {
    return <p>Loading...</p>;
  }

  if (listing.error) {
    console.error(listing.error);

    return <p>{listing.error}</p>;
  }
  console.log(listing);
  if (listing) {
    return (
      <div className="@container p-10 mt-42 mx-6 md:mx-12 lg:mx-24 border border-fairy-4 bg-white">

        {/* Make this a card component */}
        <div className="flex flex-col items-center gap-8"
          key={listing.id}>
          <div className="lg:w-2/3 -mt-42">
            {
              listing.media[0] && (
                <img className="w-full object-cover object-center rounded-lg" src={listing?.media?.[0]?.url} alt="" />
              )
            }
          </div>
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-2xl font-fairy-2 text-fairy-5 text-center capitalize" key={listing.id}>
              {listing.title}
            </h1>
            {listing.description &&
              <div className="max-w-xl text-center rounded p-5 border border-fairy-2">
                <p className="text-fairy-5 text-md">{listing.description}</p>
              </div>
            }
          </div>
          <hr className="w-full text-center" />
          <div className="">
            <h1 className="font-fairy text-2xl text-fairy-4 text-center">Bids:</h1>
            <div>
              <Bids bids={listing.bids} listingId={listing.id} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
