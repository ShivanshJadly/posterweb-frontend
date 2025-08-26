import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../additionalFile/logo.png";
import loupe from "../../additionalFile/loupe.png";
import bag from "../../additionalFile/shopping-bag.png";
import userIcon from "../../additionalFile/user.png";
import { searchPostersAPI } from "../../services/operations/posterDetailsAPI";
import ThemeBtn from "./themeButton";
import useTheme from "../../context/theme";
import iBag from "../../additionalFile/invert-bag.png";
import iLogo from "../../additionalFile/InvLogo.png";
import iUserIcon from "../../additionalFile/invert-user.png";
import { logout } from "../../services/operations/authAPI";
import { getCartItems } from "../../services/operations/cartAPI";
import { motion } from "framer-motion";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";


const HistoryIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);

const LogoutIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
);


const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [bgColor, setBgColor] = useState("rgba(66, 165, 245, 0.9)");


  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);


  const token = useSelector((state) => state.auth?.token);
  const user = useSelector((state) => state.profile?.user);
  const [posts, setPosts] = useState([]);
  
  const { themeMode, lightTheme, darkTheme } = useTheme();

  const fetchCartItems = async () => {
    if (!token) return;
    setPosts([]);
    try {
      const data = await getCartItems(token);
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
      setPosts([]);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [token]);

  useEffect(() => {
    const validateToken = () => {
      if (token) {

      }
    };
    validateToken();
  }, [token, dispatch, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      if (isSearchOpen || menuOpen) return;
      const currentScrollY = window.scrollY;
      setIsVisible(!(currentScrollY > lastScrollY && currentScrollY > 100));
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isSearchOpen, menuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-dropdown")) {
        setProfileMenuOpen(false);
      }
      if (!event.target.closest(".search-container")) {
        setSearchResults([]);
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

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (menuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen, isSearchOpen]);

  const handleClearInput = () => {
    setSearchInput("");
  };

  const generateRandomColor = () => {
    const colors = ["rgba(66, 165, 245, 0.9)", "rgba(255, 238, 88, 0.9)", "rgba(229, 57, 53,0.9)"];
    setBgColor(colors[Math.floor(Math.random() * colors.length)]);
  };

  const handleSearchLinkClick = () => {
    setSearchInput("");
    setSearchResults([]);
    setIsSearchOpen(false);
  };

  const closeMobileSearch = () => {
    setIsSearchOpen(false);
    setSearchInput("");
  };

  const handleMenuLinkClick = (callback) => {
    setMenuOpen(false);
    if (callback) callback();
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 shadow-md transition-transform duration-300 
        ${isVisible ? "translate-y-0" : "-translate-y-full"} 
        ${themeMode === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
      >
        <div className="flex justify-between p-3 items-center h-[5rem] text-black dark:text-white relative">

  
          <div className="lg:hidden flex justify-between items-center w-full">
            {isSearchOpen ? (
              <div className={`absolute top-0 left-0 w-full h-full flex items-center px-4 z-20 search-container ${themeMode === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full h-full bg-transparent focus:outline-none text-lg text-black dark:text-white"
                  placeholder="Search for posters..."
                />
                <button onClick={closeMobileSearch} className="text-2xl text-gray-500 hover:text-black dark:hover:text-white ml-4">
                  ✕
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-start flex-1">
                  <button onClick={() => setIsSearchOpen(true)}>
                    <img src={loupe} alt="Search" className="h-6" />
                  </button>
                </div>
                <div className="flex justify-center">
                  <NavLink to="/">{themeMode === "light" ? <img src={logo} className="h-16 mix-blend-darken" alt="Logo" /> : <img src={iLogo} className="h-16" alt="Logo" />}</NavLink>
                </div>
                <div className="flex items-center justify-end flex-1">
                  <Link to="/cart" className="relative mr-4">
                    {themeMode === "dark" ? <img src={iBag} alt="Cart" className="h-7" /> : <img src={bag} alt="Cart" className="h-7" />}
                    {posts.length > 0 && <span className={`absolute -top-1 -right-2 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full ${themeMode === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}>{posts.length}</span>}
                  </Link>
                  <button onClick={() => setMenuOpen(true)} className="flex flex-col gap-[0.26rem] focus:outline-none">
                    <span className={`w-6 border border-black dark:border-white rounded transition-transform`} />
                    <span className={`w-6 border border-black dark:border-white rounded transition-opacity`} />
                    <span className={`w-6 border border-black dark:border-white rounded transition-transform`} />
                  </button>
                </div>
              </>
            )}
          </div>

          <NavLink to="/" className="hidden lg:block">{themeMode === "light" ? <img src={logo} className="h-20 mr-2 mix-blend-darken" alt="Logo" /> : <img src={iLogo} className="h-20 mr-2" alt="Logo" />}</NavLink>
          <div className="hidden lg:flex items-center font-medium gap-4">
            <ThemeBtn />
            <div className="transition-all duration-300 transform hover:scale-105">
              <Link to="/categories" className="relative inline-block px-8 py-1 text-black dark:text-white transition-all duration-300" style={{ clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)", backgroundColor: bgColor, }} onMouseEnter={generateRandomColor}>Categories</Link>
            </div>
            <div className="relative search-container">
              <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className={`border dark:border-white dark:bg-gray-800 dark:text-white border-black rounded-xl p-1 focus:outline-none pl-2 pr-8 transition-all duration-300 ${isFocused || searchInput ? "w-60" : "w-44"} font-normal`} placeholder="Search" onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} />
              {!isFocused && !searchInput && <img src={loupe} alt="Search" className="h-6 absolute top-1/2 -translate-y-1/2 right-3" />}
              {searchInput && <button onMouseDown={(e) => e.preventDefault()} onClick={handleClearInput} className={`absolute right-2 text-base top-1/2 -translate-y-1/2 text-gray-500 hover:text-black`}>✕</button>}
            </div>
            <Link to="/cart" className="relative hover:scale-110 active:scale-90 transition-transform duration-300 transform">
              {themeMode === "dark" ? <img src={iBag} alt="Cart" className="h-7" /> : <img src={bag} alt="Cart" className="h-7" />}
              {posts.length > 0 && <span className={`absolute -top-1 -right-2 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full ${themeMode === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}>{posts.length}</span>}
            </Link>
            {token ? (
              <div className="relative profile-dropdown">
                <img src={user?.image || userIcon} alt="User" className="h-10 rounded-full aspect-square object-cover hover:scale-[1.1] active:scale-90 transition-all duration-300 cursor-pointer" onClick={() => setProfileMenuOpen((prev) => !prev)} />
                <div className={`absolute right-0 mt-4 w-56 bg-white dark:bg-gray-800 border dark:border-gray-200 dark:border-gray-700 shadow-xl rounded-lg z-20 transition-all duration-200 ease-in-out origin-top-right ${profileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-semibold text-black dark:text-white">Hello, {user?.fullName || 'User'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                  </div>
                  <div className="py-1">
                    <Link to="/order-history" className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setProfileMenuOpen(false)}>
                      <HistoryIcon className="h-5 w-5 mr-3" />
                      <span>Order History</span>
                    </Link>
                  </div>
                  <div className="py-1 border-t border-gray-200 dark:border-gray-700">
                    <button className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => { setProfileMenuOpen(false); dispatch(logout(navigate)); navigate("/login"); }}>
                      <LogoutIcon className="h-5 w-5 mr-3" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (<Link to="/login">
                  {themeMode === 'dark' 
                    ? <img src={iUserIcon} alt="Login" className="h-10 rounded-full aspect-square object-cover hover:scale-[1.1] active:scale-90" />
                    : <img src={userIcon} alt="Login" className="h-10 rounded-full aspect-square object-cover hover:scale-[1.1] active:scale-90" />
                  }
                 </Link>
            )}
          </div>
        </div>


        {searchInput && searchResults.length > 0 && (
          <div className="absolute top-[5rem] left-0 right-0 px-4 lg:left-auto lg:w-96 lg:px-0 search-container">
            <div className="w-full bg-white dark:bg-gray-800 dark:text-white shadow-lg border rounded-lg z-10 max-h-96 overflow-y-auto">
              {searchResults.map((product) => (
                <Link to={`/poster/${product._id}`} key={product._id} className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 gap-4" onClick={handleSearchLinkClick}>
                  <img src={product?.posterImage?.image || "default-placeholder-image.png"} alt={product.posterName} className="h-12 w-12 rounded-md object-cover" />
                  <span className="text-sm truncate">{product.title}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>


      <div className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setMenuOpen(false)}></div>
        <div className={`absolute top-0 right-0 h-full w-4/5 max-w-sm shadow-xl transition-transform duration-300 ease-in-out flex flex-col ${menuOpen ? 'translate-x-0' : 'translate-x-full'} ${themeMode === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-black dark:text-white">Menu</h2>
            <button onClick={() => setMenuOpen(false)} className="text-2xl text-gray-500 hover:text-black dark:hover:text-white">✕</button>
          </div>
          <nav className="flex flex-col p-4 space-y-2">
            {token ? (
              <>
                <Link to="/categories" className="text-lg text-black dark:text-white py-3 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => handleMenuLinkClick()}>Categories</Link>
                <Link to="/order-history" className="text-lg text-black dark:text-white py-3 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => handleMenuLinkClick()}>Order History</Link>
                <button className="w-full text-left text-lg text-red-500 py-3 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => handleMenuLinkClick(() => { dispatch(logout(navigate)); navigate("/login"); })}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/categories" className="text-lg text-black dark:text-white py-3 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => handleMenuLinkClick()}>Categories</Link>
                <Link to="/login" className="text-lg text-black dark:text-white py-3 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => handleMenuLinkClick()}>Login</Link>
              </>
            )}
          </nav>
          <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-black dark:text-white">Theme</span>
                <button
                    onClick={() => (themeMode === "light" ? darkTheme() : lightTheme())}
                    className={`relative w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${
                        themeMode === 'light' ? 'bg-blue-500' : 'bg-gray-700'
                    }`}
                >
                    <motion.div
                        layout
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="absolute w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
                        animate={{
                            x: themeMode === 'dark' ? '2rem' : '0.25rem',
                        }}
                    >
                        {themeMode === 'dark' 
                            ? <MoonIcon className="w-4 h-4 text-gray-800" />
                            : <SunIcon className="w-4 h-4 text-yellow-500" />
                        }
                    </motion.div>
                </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;