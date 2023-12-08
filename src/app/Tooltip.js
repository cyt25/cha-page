export default function Tooltip({ effectiveTheme }) {
  const isLight = effectiveTheme === "light";
  const tooltipClass =
    "opacity-80 absolute top-6 right-6 sm:top-24 sm:right-36 sm:my-1 shadow-md rounded-lg p-2 transition-all ease-in-out duration-75";
  const colorClasses = isLight ? "bg-white" : "bg-gray-800";
  const themedTooltipClass = tooltipClass + " " + colorClasses;
  const textClasses = "text-xs font-normal";
  const textColorClasses = isLight ? "text-black" : "text-gray-100";
  const themedTextClass = textClasses + " " + textColorClasses;

  return (
    <div className={themedTooltipClass}>
      <p className={themedTextClass}>{"Matches your system theme!"}</p>
    </div>
  );
}
