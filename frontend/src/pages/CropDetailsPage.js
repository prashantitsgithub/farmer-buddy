import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import "../cropDetailsPage.css";
import { useNavigate, useParams } from "react-router-dom";

// Simple icon components using SVG
const LeafIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M11 20A7 7 0 0 1 4 13c0-7 9-11 9-11s9 4 9 11a7 7 0 0 1-7 7h-4z" />
    <path d="M12 10v6" />
    <path d="m8 14 4-4 4 4" />
  </svg>
);

const CloudSunIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="M20 12h2" />
    <path d="m19.07 4.93-1.41 1.41" />
    <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" />
    <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
  </svg>
);

const AlertTriangleIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

const BugIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m8 2 1.88 1.88" />
    <path d="M14.12 3.88 16 2" />
    <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
    <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
    <path d="M12 20v-9" />
    <path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
    <path d="M6 13H2" />
    <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
    <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
    <path d="M22 13h-4" />
    <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
  </svg>
);

const FlaskIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 2h6" />
    <path d="M12 2v7" />
    <path d="M8.236 13H5a1 1 0 0 0-.857 1.5l3.77 6.859A2 2 0 0 0 9.599 22h4.803a2 2 0 0 0 1.685-.641l3.77-6.859A1 1 0 0 0 19 13h-3.236" />
    <path d="M7.5 13c.413-1.248 2.5-2 4.5-2s4.087.752 4.5 2" />
  </svg>
);

const CheckCircleIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const WrenchIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const TractorIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <path d="M7 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <path d="M19 17h-6" />
    <path d="M7 17H4v-5h16v.17" />
    <path d="M4 12V6h4" />
    <path d="M4 6h16" />
    <path d="M19 17h2v-5" />
  </svg>
);

const SproutIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M7 20h10" />
    <path d="M10 20c5.5-2.5.8-6.4 3-10" />
    <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
    <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
  </svg>
);

const HelpCircleIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
);

const LoaderIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${className} animate-spin`}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

// Toast notification component
const Toast = ({ message, type = "error", onClose }) => {
  return (
    <div
      className={`fixed top-4 right-4 ${
        type === "error" ? "bg-red-500" : "bg-green-500"
      } text-white p-4 rounded shadow-lg z-50 flex items-center`}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-white hover:text-gray-200"
        aria-label="Close notification"
      >
        &times;
      </button>
    </div>
  );
};

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error("Error in CropDetailsPage:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
            <AlertTriangleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">
              We're sorry, an error occurred while displaying this page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export const CropDetailsPage = () => {
  const [cropData, setCropData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [isMobile, setIsMobile] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const sectionRefs = useRef({});
  const { searchQuery } = useParams();
  const navigate = useNavigate();

  // Check for mobile viewport on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch crop data on component mount
  useEffect(() => {
    const loadCropData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `http://localhost:5000/crop?name=${encodeURIComponent(searchQuery)}`
        );

        // Properly handle response data
        if (response.data) {
          if (response.data?.error) {
            setError(response.data.error);
            setShowToast(true);
          }
          setCropData(response.data);
        } else {
          setCropData({ error: "No data found" });
        }
      } catch (error) {
        console.error("Failed to fetch crop data:", error);
        setError(
          error.response?.data?.message ||
            "Failed to load crop data. Please try again later."
        );
        setShowToast(true);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      loadCropData();
    } else {
      setError("No crop specified");
      setLoading(false);
    }
  }, [searchQuery]);

  // Define sections based on the crop data
  const getSections = () => {
    if (!cropData) return [];

    return [
      {
        id: "overview",
        title: "Overview",
        content: cropData.overview,
        icon: LeafIcon,
      },
      {
        id: "soil_and_climate",
        title: "Soil & Climate",
        content: cropData.soil_and_climate_requirements,
        icon: CloudSunIcon,
      },
      {
        id: "challenges",
        title: "Common Challenges",
        content: cropData.common_challenges,
        icon: AlertTriangleIcon,
      },
      {
        id: "diseases",
        title: "Diseases & Prevention",
        content: cropData.diseases_and_prevention,
        icon: BugIcon,
      },
      {
        id: "pesticides",
        title: "Pesticides & Fertilizers",
        content: cropData.pesticides_and_fertilizers,
        icon: FlaskIcon,
      },
      {
        id: "best_practices",
        title: "Best Practices",
        content: cropData.best_practices,
        icon: CheckCircleIcon,
      },
      {
        id: "tools",
        title: "Tools & Machinery",
        content: cropData.tools_and_machinery_used,
        icon: WrenchIcon,
      },
      {
        id: "harvesting",
        title: "Harvesting Tips",
        content: cropData.harvesting_tips,
        icon: TractorIcon,
      },
      {
        id: "post_harvest",
        title: "Post-Harvest Handling",
        content: cropData.post_harvest_handling,
        icon: SproutIcon,
      },
      {
        id: "expert_advice",
        title: "Expert Advice",
        content: cropData.expert_advice,
        icon: HelpCircleIcon,
      },
    ];
  };

  // Scroll to section when tab changes
  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    if (!isMobile && sectionRefs.current[sectionId]) {
      sectionRefs.current[sectionId].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const sections = getSections();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoaderIcon className="h-12 w-12 mx-auto text-green-600 mb-4" />
          <p className="text-gray-600">Loading crop information...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !cropData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="flex justify-center mb-6">
            <AlertTriangleIcon className="h-16 w-16 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
            Crop Not Found
          </h2>
          <p className="text-gray-600 text-center mb-6">
            {error || "Unable to load crop data. Please try again later."}
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/")}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Content for mobile (tabs)
  if (isMobile) {
    return (
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50 p-4 pb-16">
          {showToast && (
            <Toast message={error} onClose={() => setShowToast(false)} />
          )}

          <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
            {cropData?.crop_name || "Crop Details"}
          </h1>

          {/* Mobile tabs navigation */}
          <div className="sticky top-0 z-10 bg-white pb-2 shadow-sm -mx-4 px-4 pt-2">
            <div className="overflow-x-auto pb-2">
              <div className="flex space-x-2" role="tablist">
                {sections.map((section) => (
                  <button
                    style={{
                      fontSize: "1rem",
                      fontWeight: "500",
                      color:
                        activeSection === section.id ? "#4A5568" : "#718096",
                      backgroundColor:
                        activeSection === section.id ? "#F0FFF4" : "#FFFFFF",
                      border:
                        activeSection === section.id
                          ? "1px solid #68D391"
                          : "1px solid #E2E8F0",
                      borderRadius: "0.375rem",
                      padding: "0.5rem 1rem",
                      width: "100%",
                      textAlign: "left",
                      transition: "background-color 0.2s ease, color 0.2s ease",
                    }}
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-1 p-2 rounded-md whitespace-nowrap ${
                      activeSection === section.id
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    role="tab"
                    aria-selected={activeSection === section.id}
                    aria-controls={`panel-${section.id}`}
                    id={`tab-${section.id}`}
                  >
                    <section.icon className="h-4 w-4" aria-hidden="true" />
                    <span className="text-sm">{section.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="mt-6">
            {sections.map((section) => (
              <div
                key={section.id}
                className={`${
                  activeSection === section.id ? "block" : "hidden"
                }`}
                role="tabpanel"
                id={`panel-${section.id}`}
                aria-labelledby={`tab-${section.id}`}
              >
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
                    <section.icon
                      className="mr-2 h-5 w-5 text-green-600"
                      aria-hidden="true"
                    />
                    {section.title}
                  </h2>
                  {section.content ? (
                    <p
                      style={{ fontSize: "1rem" }}
                      className="text-gray-600 crop-content leading-relaxed"
                    >
                      {section.content}
                    </p>
                  ) : (
                    <p className="text-gray-400">No information available</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  // Desktop layout with sidebar
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
        {showToast && (
          <Toast message={error} onClose={() => setShowToast(false)} />
        )}

        {/* Sidebar Navigation (Desktop) */}
        <div className="lg:w-1/4 p-6 bg-white shadow-md">
          <div className="sticky top-6">
            <h1 className="text-2xl font-bold mb-8 text-green-700">
              {cropData?.crop_name || "Crop Details"}
            </h1>
            <nav aria-label="Crop sections">
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      style={{
                        fontSize: "1rem",
                        fontWeight: "500",
                        color:
                          activeSection === section.id ? "#4A5568" : "#718096",
                        backgroundColor:
                          activeSection === section.id ? "#F0FFF4" : "#FFFFFF",
                        border:
                          activeSection === section.id
                            ? "1px solid #68D391"
                            : "1px solid #E2E8F0",
                        borderRadius: "0.375rem",
                        padding: "0.5rem 1rem",
                        width: "100%",
                        textAlign: "left",
                        transition:
                          "background-color 0.2s ease, color 0.2s ease",
                      }}
                      onClick={() => handleSectionChange(section.id)}
                      className={`flex items-center w-full p-2 rounded-md transition-colors ${
                        activeSection === section.id
                          ? "bg-green-100 text-green-700"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                      aria-current={
                        activeSection === section.id ? "page" : undefined
                      }
                    >
                      <section.icon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      <span>{section.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Main Content (Desktop) */}
        <main className="lg:w-3/4 p-6 lg:p-10">
          <h1 className="text-4xl font-bold mb-10 text-green-700 lg:hidden">
            {cropData?.crop_name || "Crop Details"}
          </h1>

          <div className="space-y-16">
            {sections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                ref={(el) => (sectionRefs.current[section.id] = el)}
                className="scroll-mt-10"
              >
                <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-l-green-500">
                  <h2 className="flex items-center text-2xl font-semibold text-gray-800 mb-4">
                    <section.icon
                      className="mr-2 h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                    {section.title}
                  </h2>
                  {section.content ? (
                    <p
                      style={{ fontSize: "1.2rem" }}
                      className="text-gray-600 crop-content leading-relaxed"
                    >
                      {section.content}
                    </p>
                  ) : (
                    <p className="text-gray-400">No information available</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
};
