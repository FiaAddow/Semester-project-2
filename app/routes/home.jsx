import Header from "../components/header";
import { Welcome } from "../welcome/welcome";
import Listings from "./listings";

export function meta({ }) {
  return [
    { title: "New React Router Apps" },
    { name: "description", content: "Welcome to React Router!" },
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
