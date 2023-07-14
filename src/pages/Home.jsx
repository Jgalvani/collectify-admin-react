import { useEffect } from "react";
import { redirect } from "react-router-dom";

export default function Home() {
  return redirect("/user");
}
