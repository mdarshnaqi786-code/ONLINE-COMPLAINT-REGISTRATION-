import { FaUser, FaUserTie, FaUserShield } from "react-icons/fa";

function Roles() {
  const roles = [
    {
      icon: <FaUser className="text-5xl text-blue-600 mb-5" />,
      title: "Citizen",
      description:
        "Register complaints, track complaint status, and communicate with officers.",
      border: "border-blue-500",
    },
    {
      icon: <FaUserTie className="text-5xl text-green-600 mb-5" />,
      title: "Agent / Officer",
      description:
        "Manage assigned complaints, update status, and chat with users.",
      border: "border-green-500",
    },
    {
      icon: <FaUserShield className="text-5xl text-purple-600 mb-5" />,
      title: "Admin",
      description:
        "Assign complaints, manage users & agents, and monitor the platform.",
      border: "border-purple-500",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          User Roles
        </h2>

        <p className="text-center text-gray-600 mt-3 mb-16">
          Every role has its own dedicated dashboard.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {roles.map((role, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg border-t-4 ${role.border}
              p-10 text-center hover:shadow-2xl hover:-translate-y-2 transition duration-300`}
            >
              <div className="flex justify-center">
                {role.icon}
              </div>

              <h3 className="text-2xl font-bold">
                {role.title}
              </h3>

              <p className="text-gray-600 mt-4 leading-7">
                {role.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Roles;