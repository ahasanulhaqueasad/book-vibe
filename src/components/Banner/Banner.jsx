import bannerImg from "../../assets/books.jpg";
const Banner = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse w-full">
        <img
          alt="Tailwind CSS hero component"
          src={bannerImg}
          className="w-full lg:w-1/2 rounded-lg shadow-2xl"
        />
        <div className="w-full lg:w-1/2 text-center">
          <h1 className="text-5xl font-bold">
            Books to freshen up <br /> your bookshelf
          </h1>
          <button className="btn btn-accent mt-8">View The List</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
