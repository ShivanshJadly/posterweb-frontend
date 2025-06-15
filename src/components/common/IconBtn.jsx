export default function IconBtn({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
  }) {
    return (
      <button
        disabled={disabled}
        onClick={onclick}
        className={`flex items-center hover:scale-105 transition-all duration-300 ${
          outline ? "border border-yellow-50 bg-transparent" : "bg-red-600"
        } cursor-pointer gap-x-2 text-sm lg:text-base px-3 md:px-3 py-2 lg:px-8 font-semibold text-white ${customClasses}`}
        type={type}
      >
        {children ? (
          <>
            <span className={`${outline && "text-yellow-50"}`}>{text}</span>
            {children}
          </>
        ) : (
          text
        )}
      </button>
    )
  }
  