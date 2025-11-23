import Header from "../components/Header";
import Listings from "./Listings";

export function meta({}) {
  return [
    { title: "Home" },
    { name: "semesterprojet2", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div>
      <Header />
      <Listings />
    </div>
  );
}
