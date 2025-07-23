type Props = {
  text: string;
  url: string;
};
function MenuButton(props: Props) {
  return (
    <a
      href={props.url}
      className="font-bold text-white px-2 py-3 hover:scale-108 transition-transform duration-200 ease-in-out"
    >
      {props.text}
    </a>
  );
}
export default MenuButton;
