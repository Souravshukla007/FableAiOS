import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as Switch$1, a as SwitchThumb } from "../_libs/radix-ui__react-switch.mjs";
import { b as cn } from "./card-D1doNZif.mjs";
import { m as migrateLocalStorage } from "./router-bYr-bjNA.mjs";
const Switch = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Switch$1,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SwitchThumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = Switch$1.displayName;
const KEY = "fable-show-evidence";
const EVENT = "fable-show-evidence-change";
function read() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(KEY) === "true";
}
function setShowEvidencePref(value) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, String(value));
  window.dispatchEvent(new CustomEvent(EVENT));
}
function useShowEvidencePref() {
  const [value, setValue] = reactExports.useState(false);
  reactExports.useEffect(() => {
    migrateLocalStorage();
    setValue(read());
    const handler = () => setValue(read());
    window.addEventListener(EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return [value, setShowEvidencePref];
}
export {
  Switch as S,
  useShowEvidencePref as u
};
