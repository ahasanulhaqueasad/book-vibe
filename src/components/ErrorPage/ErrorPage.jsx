
import { Link } from "react-router-dom";
import { FiHome, FiArrowLeft, FiBookOpen } from "react-icons/fi";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-base-100 rounded-3xl shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2 items-center">

          {/* Left Side */}
          <div className="p-8 md:p-12 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <FiBookOpen size={18} />
              BoiPoka
            </div>

            <h1 className="text-8xl md:text-9xl font-extrabold text-green-600 tracking-tighter">
              404
            </h1>

            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-base-content">
              Oops! Page Not Found
            </h2>

            <p className="text-base-content/60 mt-4 leading-7 max-w-md mx-auto md:mx-0">
              Looks like this page has gone on a reading adventure!
              The page you're looking for doesn't exist or has been moved.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center md:justify-start">
              <Link
                to="/"
                className="btn bg-green-600 hover:bg-green-700 text-white border-none rounded-xl px-6"
              >
                <FiHome size={18} />
                Back to Home
              </Link>

              <button
                onClick={() => window.history.back()}
                className="btn btn-outline rounded-xl px-6"
              >
                <FiArrowLeft size={18} />
                Go Back
              </button>
            </div>

            <p className="text-sm text-base-content/40 mt-8">
              Don't worry, your next great read is waiting.
            </p>
          </div>

          {/* Right Side Illustration */}
          <div className="relative bg-green-50 min-h-[350px] md:min-h-[550px] flex items-center justify-center overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute w-72 h-72 bg-green-200/50 rounded-full -top-20 -right-20" />
            <div className="absolute w-52 h-52 bg-emerald-200/50 rounded-full -bottom-16 -left-10" />

            {/* Floating book illustration */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative">
                <div className="absolute -top-10 -right-12 text-5xl animate-bounce">
                  ✨
                </div>
                <div className="absolute -top-8 -left-12 text-4xl">
                  ⭐
                </div>

                <div className="w-44 h-56 bg-green-700 rounded-r-2xl rounded-l-md shadow-2xl -rotate-6 flex flex-col items-center justify-center border-l-8 border-green-900">
                  <FiBookOpen className="text-white" size={65} />
                  <span className="text-white text-2xl font-bold mt-4">
                    Lost?
                  </span>
                  <span className="text-green-100 text-sm mt-2">
                    Find your way
                  </span>
                </div>

                <div className="absolute -bottom-5 -right-12 w-40 h-52 bg-amber-100 rounded-r-xl shadow-xl rotate-12 -z-10 border-l-8 border-amber-300 flex items-center justify-center">
                  <span className="text-5xl">📖</span>
                </div>
              </div>

              <div className="mt-16 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md">
                <p className="text-green-800 font-semibold">
                  Every page has a story!
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ErrorPage;