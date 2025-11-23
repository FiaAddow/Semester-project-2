import Header from "../components/header";
import Listings from "./listings";

export function meta({ }) {
  return [
    { title: "Home" },
    { name: "Home" },
  ];
}

export default function Home() {
  return (
    <div>
      <Header />
      <Listings />
    </div>
  )

}
