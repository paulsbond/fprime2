export function IconButton(props: {
  icon: string;
  onClick: () => void;
  aria_label: string;
  className?: string;
}) {
  return (
    <button
      onClick={props.onClick}
      aria-label={props.aria_label}
      className={props.className}
    >
      <span aria-hidden="true" className="material-symbols-outlined">
        {props.icon}
      </span>
    </button>
  );
}
