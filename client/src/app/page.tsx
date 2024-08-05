import AddWatch from "@/components/AddWatch ";
import GetWatch from "@/components/GetWatch ";
import Image from "next/image";

export default function Home() {
  return (
   <div className=" flex flex-col gap-4 p-5 ">
    <div className=" p-2">
    <AddWatch />
    </div>

    <div className=" p-2 ">
    <GetWatch />
  </div>
   </div>
  );
}
