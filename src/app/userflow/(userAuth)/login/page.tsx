import LoginCard from "@/components/UserFlow/LoginCard"; 
import Navbar from "@/components/UserFlow/NavBar";

export default function page() {
  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center h-screen bg-transparent">
      <LoginCard />
    </div>
    </>
  );
}
