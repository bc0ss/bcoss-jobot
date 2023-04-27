import Link from "next/link";

export default function Navbar(){
    return (      
    <nav className="bg-white shadow w-full">
    <div className="px-4 h-14 flex justify-between items-center">
      <div className="text-xl font-bold">BRObot</div>
      <div>
        <Link href="/login">Log in</Link>
      </div>
    </div>
  </nav>
    );
}