import Header from "../components/header";
import { Welcome } from "../welcome/welcome";
import Listings from "./listings";

export function meta({ }) {
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
  )

}
