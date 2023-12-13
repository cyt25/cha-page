export default function Tooltip({ showTooltip, effectiveTheme }) {
  const isLight = effectiveTheme === "light";
  const tooltipClass =
    "absolute top-7 right-20 -mx-2 sm:top-24 sm:right-36 sm:my-1 sm:mx-0 shadow-md rounded-lg p-2 transition-all ease-in-out duration-100";
  const colorClasses = isLight ? "bg-white" : "bg-gray-800";
  const opacityClasses = showTooltip ? "opacity-70" : "opacity-0";
  const themedTooltipClass = tooltipClass + " " + colorClasses + " " + opacityClasses;
  const textClasses = "text-xs font-normal";
  const textColorClasses = isLight ? "text-black" : "text-gray-100";
  const themedTextClass = textClasses + " " + textColorClasses;

  return (
    <div className={themedTooltipClass}>
      <p className={themedTextClass}>{"Matches your system theme!"}</p>
    </div>
  );
}
