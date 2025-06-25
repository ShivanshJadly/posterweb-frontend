import useTheme from "../../context/theme";

import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
export default function ThemeBtn() {
  const { themeMode, lightTheme, darkTheme } = useTheme();

  const onChangeBtn = (e) => {
    const darkModeStatus = e.currentTarget.checked;

    darkModeStatus ? darkTheme() : lightTheme();
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer scale-125">
      <input
        type="checkbox"
        className="sr-only peer"
        onChange={onChangeBtn}
        checked={themeMode === "dark"}
      />
      <div className="transition-colors flex items-center justify-center">
        {themeMode === "dark" ? (
          <MoonIcon className="h-5 w-5 text-white" />
        ) : (
          <SunIcon className="h-5 w-5 text-yellow-500" />
        )}
      </div>
    </label>
  );
}
