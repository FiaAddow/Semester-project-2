import { useEffect, useState } from "react";
import CreateListing from "../components/createListing";
import { Link, useNavigate } from "react-router";


export function meta({ }) {
  return [
    { title: "Profile" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function profile() {
  const [profile, setprofile] = useState()
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;
  const APIKEY = import.meta.env.VITE_API_KEY;

  const BEARER = localStorage.getItem("token");

  useEffect(() => {
    // Check if user is logged in
    localStorage.getItem("token");
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }

    const fetchData = async () => {
      // Get profile from local storage
      const profile = localStorage.getItem("user");

      // Get users name from profile
      const name = JSON.parse(profile).name;

      const response = await fetch(`${API}/auction/profiles/${name}?_listings=true&_wins=true`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${BEARER}`,
            "X-Noroff-API-Key": APIKEY,
          },
        }
      );
      if (response.status === 200) {
        const data = await response.json();

        console.log("profile", data);

        setprofile(data.data);
      } else if (response.status === 404) {
        setprofile({ error: "Listings not found" });
      } else {
        setprofile({ error: "Error " + response.status });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="@container lg:w-2/3 px-4 mx-auto">
      <section className="pt-16">
        <h1 className="text-5xl font-fairy mb-4">Profile</h1>
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  <div className="relative">
                    <img src={profile?.avatar?.url} className="shadow-xl rounded-full h-auto align-middle mx-auto border-0 -m-16 max-w-10-px" />
                  </div>
                </div>
                <div className="text-center mt-24">
                  <h3 className="text-5xl font-fairy text-fairy-3 font-semibold leading-normal mb-2 capitalize">
                    {profile?.name}
                  </h3>
                </div>
                <div className="w-full px-4 text-center">
                  <div className="flex justify-center py-4 lg:pt-4 pt-4">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide">
                        {profile?.credits}
                      </span>
                      <span className="text-sm">Credit</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide">
                        {profile?._count?.listings}
                      </span>
                      <span className="text-sm">Listings</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide">
                        {profile?._count?.wins}
                      </span>
                      <span className="text-sm">Listings won</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 py-10 border-t text-center">
                <h1 className="text-2xl font-fairy mb-4">My listings</h1>
                <div>
                  {profile?.listings?.length ? (
                    <div className="gap-10 mb-4 ">
                      {profile.listings.map((listing) => (
                        <Link to={`/listings/${listing.id}`} key={listing.id} >
                          <div key={listing.id} className="bg-fairy-1 border border-fairy-5 rounded overflow-hidden flex flex-col pt">
                            <div key={listing.id} className="overflow-hidden rounded-lg p-5 text-xl">
                              Listing: {listing?.title} - Ends at {new Date(listing?.endsAt).toLocaleString()}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <p>No listings found.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg mt-10">
          <CreateListing />
        </div>
      </section>
    </div>
  )
}