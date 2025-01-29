import Navbar from "../UserFlow/NavBar";
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <div className="flex-grow flex flex-col justify-center items-center">
          <div className="max-w-screen-lg mx-auto p-8 bg-white rounded-lg ">
          <h2 className="text-5xl p-navbar font-bold text-center">
                  About <span className="text-blue-500">Us</span>
                </h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Welcome to our website! We are a team of passionate individuals
              dedicated to providing the best services and products to our
              customers.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Our journey began in [Year], with the goal of [Your Company Goal
              or Mission]. Since then, we've been committed to [What You Do
              Best], continuously improving and adapting to the ever-changing
              market.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Our team consists of experts in various fields, including [Field
              1], [Field 2], and [Field 3]. Together, we strive to deliver
              exceptional value and exceed our customers' expectations.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Thank you for visiting our site. We look forward to serving you!
            </p>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
