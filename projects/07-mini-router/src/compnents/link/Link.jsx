import { BUTTONS } from "../../utils/const";
import { navigate } from "../../utils/navigation";

const Link = ({ target, to, ...props }) => {
  const handleClick = (event) => {
    const isMainEvent = event.button === BUTTONS.primary; // primary click
    const isModifiedEvent =
      event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
    const isManageableEvent = target === undefined || target === "_self";

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault();
      navigate(to); // navigation with SPA
    }
  };

  return <a onClick={handleClick} href={to} target={target} {...props} />;
};

export default Link;
