import Link from "next/link";
import Image from "next/image";
import Navbar from "./Navbar";
import { getMe } from "@/app/actions/getme";



export default async function Navbars() {
  const user = await getMe(); // server side fetch

  return <Navbar user={user} />;
}
