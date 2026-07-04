import {
  FaUserPlus,
  FaClipboardList,
  FaChartLine,
  FaComments,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaUserPlus size={35} className="text-blue-600" />,
      title: "Register & Login",
      description:
        "Create a secure account and access your complaint dashboard anytime.",
    },
    {
      icon: <FaClipboardList size={35} className="text-orange-500" />,
      title: "Lodge Complaint",
      description:
        "Submit complaints quickly with all necessary details and documents.",
    },
    {
      icon: <FaChartLine size={35} className="text-cyan-600" />,
      title: "Track in Real-Time",
      description:
        "Monitor complaint status from Pending to Resolved instantly.",
    },
    {
      icon: <FaComments size={35} className="text-green-600" />,
      title: "Chat with Officers",
      description:
        "Communicate directly with assigned officers for quicker resolution.",
    },
  ];

  return (
    <section
      id="features"
      className="py-24 bg-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          How It Works
        </h2>

        <p className="text-center text-gray-600 mt-3 mb-16">
          Three simple steps to get your complaint resolved.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >
              <div className="flex justify-center">
                {item.icon}
              </div>

              <h3 className="text-2xl font-semibold text-center mt-6">
                {item.title}
              </h3>

              <p className="text-center text-gray-600 mt-4 leading-7">
                {item.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Features;