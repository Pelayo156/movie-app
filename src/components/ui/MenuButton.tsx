type Props = {
  text: string;
  url: string;
};
function MenuButton(props: Props) {
  return (
    <a href={props.url} className="font-medium text-white text-lg px-2 py-3">
      {props.text}
    </a>
  );
}
export default MenuButton;
