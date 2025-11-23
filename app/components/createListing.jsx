import { useState } from "react";
import { useNavigate } from "react-router";

export function meta({ }) {
  return [
    { title: "New React Router Apps" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function CreateListing() {
  const [error, setError] = useState();
  let navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const BEARER = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const description = formData.get("description");
    const endsAt = formData.get("endsAt");
    const tags = formData
      .get("tags")
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    const imageArray = [];

    const mediaUrl1 = formData.get("mediaUrl1");
    const mediaAlt1 = formData.get("mediaAlt1");
    if (mediaUrl1) {
      imageArray.push({ url: mediaUrl1, alt: mediaAlt1 || "" });
    }
    const mediaUrl2 = formData.get("mediaUrl2");
    const mediaAlt2 = formData.get("mediaAlt2");
    if (mediaUrl2) {
      imageArray.push({ url: mediaUrl2, alt: mediaAlt2 || "" });
    }
    const mediaUrl3 = formData.get("mediaUrl3");
    const mediaAlt3 = formData.get("mediaAlt3");
    if (mediaUrl3) {
      imageArray.push({ url: mediaUrl3, alt: mediaAlt3 || "" });
    }

    const media = imageArray

    const response = await fetch(`${API}/auction/listings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
        Authorization: `Bearer ${BEARER}`,
      },
      body: JSON.stringify({
        title,
        description,
        endsAt,
        tags,
        media,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMsg = errorData.errors[0].message;
      setError(errorMsg);
      console.error(errorData);
    } else {
      const data = await response.json();
      console.log(data);
      const redirectUrl = `/listings/${data.data.id}`;

      navigate(redirectUrl);
    }
  };

  return (
    <div className="mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Create new listing</h1>
      <form onSubmit={handleSubmit} method="post" className="space-y-4 px-12">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter title"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="endsAt"
            className="block text-sm font-medium text-gray-700"
          >
            Ends At
          </label>
          <input
            type="datetime-local"
            name="endsAt"
            id="endsAt"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            placeholder="Enter description"
            rows="4"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700"
          >
            Tags
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            placeholder="tag1, tag2, tag3"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>


        <h2 className="mt-10 text-lg font-bold">Images</h2>
        <div className="grid grid-cols-2 gap-4 justify-around space-y-4">
          <div className="space-y-2">
            <div>
              <label
                htmlFor="mediaUrl"
                className="block text-sm font-medium text-gray-700"
              >
                Image URL 1
              </label>
              <input
                type="url"
                name="mediaUrl1"
                id="mediaUrl1"
                placeholder="https://example.com/image.jpg"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="mediaAlt"
                className="block text-sm font-medium text-gray-700"
              >
                Alt Text 1
              </label>
              <input
                type="text"
                name="mediaAlt1"
                id="mediaAlt1"
                placeholder="Alt text for media"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <label
                htmlFor="mediaUrl"
                className="block text-sm font-medium text-gray-700"
              >
                Image URL 2
              </label>
              <input
                type="url"
                name="mediaUrl2"
                id="mediaUrl2"
                placeholder="https://example.com/image.jpg"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="mediaAlt"
                className="block text-sm font-medium text-gray-700"
              >
                Alt Text 2
              </label>
              <input
                type="text"
                name="mediaAlt2"
                id="mediaAlt2"
                placeholder="Alt text for media"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>



          <div className="col-span-2 space-y-2">
            <div>
              <label
                htmlFor="mediaUrl"
                className="block text-sm font-medium text-gray-700"
              >
                Image URL 3
              </label>
              <input
                type="url"
                name="mediaUrl3"
                id="mediaUrl3"
                placeholder="https://example.com/image.jpg"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="mediaAlt"
                className="block text-sm font-medium text-gray-700"
              >
                Alt Text 3
              </label>
              <input
                type="text"
                name="mediaAlt3"
                id="mediaAlt3"
                placeholder="Alt text for media"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
      <div>{error && <p className="text-red-500">{error}</p>}</div>
    </div>
  );
}
