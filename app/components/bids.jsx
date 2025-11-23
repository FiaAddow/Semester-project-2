import { useState } from "react";

export default function Bids({ bids, listingId }) {
  const [error, setError] = useState();

  const API = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const BEARER = localStorage.getItem("token");

  /* 
    1. If no bids return no bids message
    2. If bids return list of bids
    3. Place option to place a bid
*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let bidAmount = formData.get("bid-amount");

    if (!bidAmount || bidAmount < 1) {
      setError("Bid amount must be greater than 0");
      return;
    }
    setError("");

    // Convert to number
    bidAmount = Number(bidAmount);

    await makeBid(bidAmount);
  };

  const makeBid = async (bid) => {
    const res = await fetch(`${API}/auction/listings/${listingId}/bids`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
        Authorization: "Bearer " + BEARER,
      },
      body: JSON.stringify({
        amount: bid,
      }),
    });

    if (res.status === 401) {
      setError("You must be logged in to place a bid");
      return;
    }

    if (!res.ok) {
      const errorData = await res.json();
      const errorMsg = errorData.errors[0].message;
      setError(errorMsg);
      console.error(errorData);
    }

    return await res.json();
  };

  return (
    <div className="text-center w-full">
      <div className="text-lg font-semibold mb-4">Current highest bids:</div>
      {bids.length > 0 ? (
        <div className="space-y-2">
          {bids.map((bid) => (
            <div key={bid.id} className="p-2 bg-gray-100 rounded">
              <p>
                Amount: {bid.amount} kr by {bid.bidder.name}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 italic">No bids yet</div>
      )}
      <div className="mt-4">
        <form onSubmit={handleSubmit} className="space-y-2">
          <label htmlFor="bid-amount" className="block text-sm font-medium">
            Bid amount:
          </label>
          <input
            type="number"
            id="bid-amount"
            min={1}
            name="bid-amount"
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
          <div className="mx-auto">
            <button
              type="submit"
              className="bg-fairy-4 text-white px-4 py-2 rounded hover:bg-fairy-5 disabled:opacity-50"
            >
              Place bid
            </button>
          </div>
        </form>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
