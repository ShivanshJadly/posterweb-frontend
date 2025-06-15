import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { getAllPoster } from "../../services/operations/posterDetailsAPI";
import { BiCategoryAlt } from "react-icons/bi";


const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);


  const token = useSelector((state) => state.auth?.token);
  const user = useSelector((state) => state.profile?.user);
  const cart = useSelector((state) => state.cart || []);
  const [isFocused, setIsFocused] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [posts, setPosts] = useState([]);
  const [showMidScreenSearch, setShowMidScreenSearch] = useState(false);


  async function fetchProductData() {
    try {
      const data = await getAllPoster();
      setPosts(data);
    } catch (error) {
      console.log("No data found");
      setPosts([]);
    }
  }
  useEffect(() => {
    fetchProductData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and passed threshold
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleClearInput = () => {
    setIsClearing(true); // Start rotation animation
    setTimeout(() => {
      setSearchInput(""); // Clear input value
      setIsClearing(false); // Reset animation
    }, 300); // Match the duration of the rotation animation
  };
  const [bgColor, setBgColor] = useState("rgba(229, 57, 53,0.9)");

  const generateRandomColor = () => {
    const colors = [
      "rgba(66, 165, 245, 0.9)",
      "rgba(255, 238, 88, 0.9)",
      "rgba(229, 57, 53,0.9)",
    ]; // Red, Yellow, Blue
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  };

  // Filter Products
  const filterProducts = posts.filter((post) => {
    return post.posterName.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      <div className="flex relative lg:justify-between text-black p-2 items-center h-[5rem]">

        {/* Hamburger Menu for Mobile */}
        <div className="absolute lg:hidden left-4">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex flex-col gap-[0.28rem] focus:outline-none"
          >
            <span
              className={`w-6 border border-black rounded transition-transform ${menuOpen ? "rotate-45 translate-y-[3px]" : ""
                }`}
            ></span>
            <span
              className={`w-6 border border-black rounded transition-opacity ${menuOpen ? "opacity-0" : ""
                }`}
            ></span>
            <span
              className={`w-6 border border-black rounded transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
            ></span>
          </button>
        </div>

        {/* Logo */}
        <NavLink to="/" className="absolute left-1/2 transform -translate-x-1/2 lg:relative lg:left-1 lg:transform-none">
          <img src='/additionalFile/logo.png' className="h-16 lg:h-20" alt="shopping app" />
        </NavLink>


        <div className="absolute right-4 flex gap-3 items-center lg:hidden">
          {!showMidScreenSearch ? (
            <img
              loading="lazy"
              src='/additionalFile/loupe.png'
              alt="Search Icon"
              className="h-6 hover:scale-110 cursor-pointer"
              onClick={() => setShowMidScreenSearch(true)}
            />
          ) : (
            <div className="flex items-center">
              <input
                type="text"
                id="search"
                autoComplete="off"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="border border-black rounded-xl p-1 focus:outline-none pl-2 pr-8 h-[3.5rem]"
                placeholder="Search"
                autoFocus
              />
              <button
                onClick={() => {
                  setShowMidScreenSearch(false);
                  setSearchInput("");
                }}
                className="ml-2 text-black hover:text-gray-700"
              >
                ✕
              </button>
            </div>

          )}
          {/* Cart Icon */}
          <Link to="/cart">
            <div className="relative hover:scale-110 active:scale-90 transition-transform duration-300 transform">
              <img loading="lazy" src='/additionalFile/shopping-bag.png' alt="Shopping Bag" className="h-6" />
              {cart.length > 0 && (
                <span
                  className="absolute -top-1 -right-2 bg-black text-xs w-5 h-5 flex 
        justify-center items-center animate-bounce rounded-full text-white"
                >
                  {cart.length}
                </span>
              )}
            </div>
          </Link>
        </div>
        {showMidScreenSearch && searchInput && filterProducts.length > 0 && (
          <div className="absolute top-20 left-0 right-0 mt-1 mx-4 bg-white shadow-lg border rounded-lg z-10 max-h-60 overflow-y-auto">
            {filterProducts.map((product) => (
              <Link
                to={`/poster/${product._id}`}
                key={product._id}
                className="flex items-center px-4 py-2 hover:bg-gray-200 transition-colors gap-4"
                onClick={() => setShowMidScreenSearch(false)}
              >
                <img
                  loading="lazy"
                  src={product.image || "default-placeholder-image.png"}
                  alt={product.posterName}
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-md object-cover"
                />
                <span className="text-sm sm:text-base truncate">
                  {product.posterName}
                </span>
              </Link>
            ))}
          </div>
        )}


        <div className="lg:flex lg:items-center lg:visible font-medium gap-4 invisible">
          {/* Categories */}
          <div className="transition-all duration-300 transform hover:scale-105">
            <Link
              to="/categories"
              className="relative inline-block px-8 py-1 text-black transition-all duration-300"
              style={{
                clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
                backgroundColor: bgColor,
              }}
              onMouseEnter={generateRandomColor} // Change color on hover
            >
              Categories
            </Link>
          </div>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              id="search"
              autoComplete="off"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className={`border border-black rounded-xl p-1 focus:outline-none pl-2 pr-8 transition-all duration-300 ${isFocused || searchInput ? "w-60" : "w-44"
                } font-normal`}
              placeholder="Search"
              onFocus={() => setIsFocused(true)} // Set focus state to true
              onBlur={() => setIsFocused(false)} // Set focus state to false
            />

            {!isFocused && !searchInput && (
              <img
                loading="lazy"
                src='/additionalFile/loupe.png'
                alt="Search Icon"
                className="h-6 absolute top-[0.3rem] right-3 opacity-100 transition-opacity duration-300"
              />
            )}
            {searchInput && (
              <button
                onMouseDown={(e) => e.preventDefault()} // Prevent losing focus
                onClick={handleClearInput} // Clear the input value
                className={`absolute right-2 text-base top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black hover:scale-110 transition-transform duration-200 ease-in-out ${isClearing ? "rotate-180" : "rotate-0"
                  }`}
              >
                ✕
              </button>
            )}

            {searchInput && filterProducts.length > 0 && (
              <div className="absolute left-0 mt-1 w-full max-w-md bg-white shadow-lg border rounded-lg z-10 max-h-screen overflow-y-auto">
                {filterProducts.map((product) => (
                  <Link
                    to={`/poster/${product._id}`}
                    key={product._id}
                    className="flex items-center px-4 py-2 hover:bg-gray-200 transition-colors gap-4"
                  >
                    {/* Poster Image */}
                    <img
                      loading="lazy"
                      src={product.image || "default-placeholder-image.png"} // Ensure a fallback image is provided
                      alt={product.posterName}
                      className="h-10 w-10 sm:h-12 sm:w-12 rounded-md object-cover"
                    />
                    {/* Poster Name */}
                    <span className="text-sm sm:text-base truncate">
                      {product.posterName}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link to="/cart">
            <div className="relative hover:scale-110 active:scale-90 transition-transform duration-300 transform">
              <img loading="lazy" src='/additionalFile/shopping-bag.png' alt="Shopping Bag" className="h-7" />
              {cart.length > 0 && (
                <span
                  className="absolute -top-1 -right-2 bg-black text-xs w-5 h-5 flex 
        justify-center items-center animate-bounce rounded-full text-white"
                >
                  {cart.length}
                </span>
              )}
            </div>
          </Link>

          {/* User Profile Icon */}
          <Link to={token ? "/dashboard" : "/login"}>
            <img
              loading="lazy"
              src={user?.image || '/additionalFile/user.png'}
              alt="User Icon"
              className="h-10 rounded-full aspect-square object-cover hover:scale-[1.1] active:scale-90 transition-all duration-300"
            />
          </Link>
        </div>
      </div>
      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute w-[50%] left-1 right-0 mt-1 bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out">
          <Link
            to="/categories"
            className="flex gap-2 items-center px-4 py-3 text-gray-800 hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            <BiCategoryAlt className="text-2xl"/>
            <span className="font-medium">Categories</span>
          </Link>
         
          {/* Profile or Login */}
          {token ? (
            <Link
              to="/dashboard"
              className="flex items-center px-4 py-2 text-black hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              <img
                loading="lazy"
                src={user?.image || '/additionalFile/user.png'}
                alt="User Icon"
                className="h-7 w-7 rounded-full mr-2 object-cover"
              />
              <span className="font-medium">Profile</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex items-center px-4 py-2 text-black hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              <img
                loading="lazy"
                src='/additionalFile/user.png'
                alt="User Icon"
                className="h-7 w-7 rounded-full mr-2 object-cover"
              />
              <span className="font-medium">Login</span>
            </Link>
          )}
        </div>
      )}

    </div>

  );
};

export default Navbar;
