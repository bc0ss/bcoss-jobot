import Head from "next/head"
import Navbar from "@/components/Navbar";

export default function Login(){
    return (
    <>
    <Head>
        <title>Brobot - AI Thing</title>
     </Head>
    <div className="flex flex-col h-screen">
        {/* Navigation Bar */}
        <Navbar />
    </div>
  </>
    );
}