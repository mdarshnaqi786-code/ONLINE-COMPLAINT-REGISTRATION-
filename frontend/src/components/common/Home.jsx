import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Features";
import Roles from "./Roles";
import Footer from "./Footer";

function Home() {
  return (
    <div className="bg-gray-50">
      <Navbar />
      <Hero />
      <Features />
      <Roles />
      <Footer />
    </div>
  );
}

export default Home;