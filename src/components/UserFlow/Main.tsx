
import Link from 'next/link';


const Main = () => {
  return (
    <div className=" bg-[#56C1FF] text-white sm:py-48 text-center p-10 w-full"
    >
      <h1 className="text-5xl sm:text-7xl font-bold mb-4 custom-shadow text-center">
        Get your skills <br /> upgraded with us
      </h1>
      <p className="mb-6 text-center custom-shadow2">
      Transform your productivity and deliver high-quality solutions customers <br /> want, and respond to threats and opportunities.
      </p>
      <Link href="/userflow/signup">
        <span className=" h-14 inline-block bg-[#FDCE29] hover:bg-yellow-500 text-black text-center font-medium p-5 w-96 rounded-sm">
          Register to get Exclusive offers
        </span>
      </Link>
      <p className="mt-4"><b>500+</b> Free and paid courses</p>
    </div>
  );
};

export default Main;



