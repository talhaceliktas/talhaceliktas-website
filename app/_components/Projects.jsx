import { projects } from "@/app/portfolio/constants";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const Projects = ({ projectRefs }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
      {projects.map((project, index) => (
        <div
          key={project.id}
          ref={(el) => (projectRefs.current[index] = el)}
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br shadow-xl ${project.gradient} p-1`}
        >
          <div className="h-full rounded-2xl bg-white p-6 dark:bg-gray-900">
            <div className="mb-4 flex items-start justify-between">
              <div
                className={`rounded-xl bg-gradient-to-br p-3 ${project.gradient} text-white shadow-lg`}
              >
                {project.icon}
              </div>
              <div className="flex space-x-2">
                <a
                  href={project.github}
                  className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  <FaGithub className="text-xl" />
                </a>
                <a
                  href={project.live}
                  className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  <FaExternalLinkAlt className="text-lg" />
                </a>
              </div>
            </div>

            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              {project.title}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {project.description}
            </p>

            <div className="mb-4">
              <h4 className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                Key Features:
              </h4>
              <div className="flex flex-wrap gap-1">
                {project.features.map((feature, i) => (
                  <span
                    key={i}
                    className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex space-x-3 text-gray-500">
                {project.techIcons.map((icon, i) => (
                  <span key={i} className="text-lg">
                    {icon}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap justify-end gap-1 md:justify-start">
                {project.tags.slice(0, 2).map((tag, i) => (
                  <span
                    key={i}
                    className={`bg-gradient-to-r px-2 py-1 text-xs ${project.gradient} rounded-full text-white`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
