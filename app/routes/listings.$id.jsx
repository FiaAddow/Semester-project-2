import { useState, useEffect } from "react";

export function meta({}) {
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
        console.log("200");
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

  console.log("Lisings data", listing);

  if (listing) {
    return (
      <div className="p-4">
        <h1>Listing id</h1>
        <ul>
          {/* Make this a card component */}
          <div key={listing.id}>
            <div>
              <h1 className="text-3xl" key={listing.id}>
                {listing.title}
              </h1>
            </div>
            <div>
              <p>{listing.description}</p>
            </div>
            <div>
              <h1>Bids</h1>
              {listing.bids.map((bid) => (
                <div key={bid.id}>
                  <p>
                    Amount: {bid.amount} kr by {bid.bidder.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ul>
      </div>
    );
  }
}
