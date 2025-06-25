import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../additionalFile/logo.png";
import loupe from "../../additionalFile/loupe.png";
import bag from "../../additionalFile/shopping-bag.png";
import userIcon from "../../additionalFile/user.png";
import { getAllPoster, searchPostersAPI } from "../../services/operations/posterDetailsAPI";
import ThemeBtn from "./themeButton";
import { ThemeProvider } from "../../context/theme";
import iBag from "../../additionalFile/invert-bag.png";
import iLogo from "../../additionalFile/InvLogo.png";
import { logout } from "../../services/operations/authAPI";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [bgColor, setBgColor] = useState("rgba(229, 57, 53,0.9)");

  const token = useSelector((state) => state.auth?.token);
  const user = useSelector((state) => state.profile?.user);
  const cart = useSelector((state) => state.cart || []);

  const [themeMode, setThemeMode] = useState("light");
  const lightTheme = () => setThemeMode("light");
  const darkTheme = () => setThemeMode("dark");

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(!(currentScrollY > lastScrollY && currentScrollY > 100));
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-dropdown")) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchInput.trim() !== "") {
        const results = await searchPostersAPI({ query: searchInput });
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchInput]);
  // console.log("result",searchResults)
  // console.log("id",searchResults._id)

  const handleClearInput = () => {
    setIsClearing(true);
    setTimeout(() => {
      setSearchInput("");
      setIsClearing(false);
    }, 300);
  };

  const generateRandomColor = () => {
    const colors = [
      "rgba(66, 165, 245, 0.9)",
      "rgba(255, 238, 88, 0.9)",
      "rgba(229, 57, 53,0.9)",
    ];
    setBgColor(colors[Math.floor(Math.random() * colors.length)]);
  };

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <div
        className={`fixed top-0 left-0 right-0 z-50 shadow-md transition-transform duration-300 
        ${isVisible ? "translate-y-0" : "-translate-y-full"} 
        bg-white dark:bg-gray-900`}
      >
        <div className="flex relative lg:justify-between justify-center p-3 items-center h-[5rem] text-black dark:text-white">
          <NavLink to="/">
            {themeMode === "light" ? (
              <img src={logo} className="h-16 lg:h-20 mr-2 mix-blend-darken" alt="shopping app" />
            ) : (
              <img src={iLogo} className="h-16 lg:h-20 mr-2" alt="shopping app" />
            )}
          </NavLink>

          <div className="sm:block md:block lg:hidden absolute top-8 right-4">
            <button onClick={() => setMenuOpen((prev) => !prev)} className="flex flex-col gap-[0.26rem] focus:outline-none">
              <span className={`w-6 border border-black dark:border-white rounded transition-transform ${menuOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
              <span className={`w-6 border border-black dark:border-white rounded transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`w-6 border border-black dark:border-white rounded transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>

          <div className="lg:flex lg:items-center lg:visible font-medium gap-4 invisible">
            <ThemeBtn />
            <div className="transition-all duration-300 transform hover:scale-105">
              <Link
                to="/categories"
                className="relative inline-block px-8 py-1 text-black dark:text-white transition-all duration-300"
                style={{
                  clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
                  backgroundColor: bgColor,
                }}
                onMouseEnter={generateRandomColor}
              >
                Categories
              </Link>
            </div>

            <div className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className={`border dark:border-white dark:bg-gray-800 dark:text-white border-black rounded-xl p-1 focus:outline-none pl-2 pr-8 transition-all duration-300 ${isFocused || searchInput ? "w-60" : "w-44"} font-normal`}
                placeholder="Search"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              {!isFocused && !searchInput && (
                <img
                  src={loupe}
                  alt="Search Icon"
                  className="h-6 absolute top-[0.3rem] right-3 opacity-100 transition-opacity duration-300"
                />
              )}
              {searchInput && (
                <button
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleClearInput}
                  className={`absolute right-2 text-base top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black hover:scale-110 transition-transform duration-200 ease-in-out ${isClearing ? "rotate-180" : "rotate-0"}`}
                >
                  ✕
                </button>
              )}
              {searchInput && searchResults.length > 0 && (
                <div className="absolute left-0 mt-1 w-full max-w-md bg-white dark:bg-gray-800 dark:text-white shadow-lg border rounded-lg z-10">
                  {searchResults.map((product) => (
                    <Link
                      to={`/poster/${product._id}`}
                      key={product._id}
                      className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors gap-4"
                      onClick={() => {
                        setSearchInput("");
                        setSearchResults([]);
                      }}
                    >
                      <img
                        src={product?.posterImage?.image || "default-placeholder-image.png"}
                        alt={product.posterName}
                        className="h-10 w-10 sm:h-12 sm:w-12 rounded-md object-cover"
                      />
                      <span className="text-sm sm:text-base truncate">{product.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/cart">
              <div className="relative hover:scale-110 active:scale-90 transition-transform duration-300 transform">
                {themeMode === "dark" ? (
                  <img src={iBag} alt="Invert Shopping Bag" className="h-7" />
                ) : (
                  <img src={bag} alt="Shopping Bag" className="h-7" />
                )}
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-black text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-white">
                    {cart.length}
                  </span>
                )}
              </div>
            </Link>

            {token ? (
              <div className="relative hidden lg:block profile-dropdown">
                <img
                  src={user?.image || userIcon}
                  alt="User Icon"
                  className="h-10 rounded-full aspect-square object-cover hover:scale-[1.1] active:scale-90 transition-all duration-300 cursor-pointer"
                  onClick={() => setProfileMenuOpen((prev) => !prev)}
                />
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-lg rounded-md z-20">
                    <Link
                      to="/order-history"
                      className="block px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      Order History
                    </Link>
                    <button
                      className="w-full text-left px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        setProfileMenuOpen(false);
                        dispatch(logout(navigate));
                        navigate("/login");
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <img
                  src={userIcon}
                  alt="User Icon"
                  className="h-10 rounded-full aspect-square object-cover hover:scale-[1.1] active:scale-90 transition-all duration-300"
                />
              </Link>
            )}
          </div>
        </div>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-md rounded-md">
            <Link
              to="/categories"
              className="block px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              to="/cart"
              className="block px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              Cart
            </Link>
            {token ? (
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/login"
                className="block px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Navbar;
