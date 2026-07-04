import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-700 via-cyan-600 to-emerald-600 text-white">
      <div className="max-w-7xl mx-auto px-6 py-28 flex flex-col items-center text-center">

        <p className="uppercase tracking-[5px] text-sm font-medium mb-6">
          Online Complaint Registration & Management
        </p>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight max-w-5xl">
          Register, Track & Resolve
          <br />
          Complaints — Fast.
        </h1>

        <p className="mt-8 max-w-3xl text-lg md:text-xl text-gray-100 leading-8">
          A transparent platform for citizens to submit complaints,
          monitor resolution progress, and communicate directly with
          assigned officers.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-5">

          <Link
            to="/signup"
            className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold shadow-lg hover:scale-105 transition duration-300"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="border border-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition duration-300 flex items-center gap-2"
          >
            Login
            <FaArrowRight />
          </Link>

        </div>

      </div>
    </section>
  );
}

export default Hero;