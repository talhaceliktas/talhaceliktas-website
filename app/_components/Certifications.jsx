import { certificates } from "@/app/portfolio/constants";
import { FaCertificate } from "react-icons/fa";

const Certifications = ({ certRefs }) => {
  return (
    <section className="space-y-8">
      <div className="mb-12 text-center">
        <h2 className="mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
          Certifications
        </h2>
        <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-green-500 to-blue-500"></div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        {certificates.map((cert, index) => (
          <div
            key={cert.id}
            ref={(el) => (certRefs.current[index] = el)}
            className="group relative"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r ${cert.color} rounded-xl opacity-75 blur transition duration-300 group-hover:opacity-100`}
            ></div>
            <div className="relative rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
              <div className="flex items-center space-x-4">
                <div
                  className={`rounded-lg bg-gradient-to-r p-3 ${cert.color} text-white shadow-md`}
                >
                  {cert.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 md:text-base dark:text-white">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {cert.issuer}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    {cert.date}
                  </span>
                </div>
                <FaCertificate
                  className={`bg-gradient-to-r text-2xl ${cert.color} bg-clip-text text-transparent`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
