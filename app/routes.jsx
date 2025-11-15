import { route, index, layout, prefix } from "@react-router/dev/routes";

export default [
  index("./routes/home.jsx"),
  route("listings", "./routes/listings.jsx"),
  route("listings/:id", "./routes/listings.$id.jsx"),
  route("profile", "./routes/profile.jsx"),
  route("login", "./routes/login.jsx"),
  route("register", "./routes/register.jsx"),
];
