// src/components/ui/MenuButton.tsx
type Props = {
  text: string;
  url: string;
  onClick?: () => void;
};
function MenuButton(props: Props) {
  return (
    <a
      href={props.url}
      className="font-medium text-white text-2xl px-2 py-3"
      onClick={props.onClick}
    >
      {props.text}
    </a>
  );
}
export default MenuButton;