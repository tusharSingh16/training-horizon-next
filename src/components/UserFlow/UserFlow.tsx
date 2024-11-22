import Categories from "@/components/UserFlow/Categories";
import Main from "@/components/UserFlow/Main";
import TopNavigationBar from "@/components/UserFlow/TopNavigationBar";
import Testimonials from "@/components/UserFlow/Testimonials";
import Footer from "@/components/UserFlow/Footer";
import Navbar from "./NavBar";
// import VacationCourses from "@/components/UserFlow/VacationCourses";

export default function UserFlow() {
  return (
    <div className='bg-[rgb(247,247,247)]'>
      <Navbar/>
      <Main/>
      <Categories /> 
      {/* <VacationCourses /> */}
      <Testimonials />
      <Footer />
    </div>
  );
}