type Props = {
  title: string;
  value: string | number | undefined;
};

function TextDetail(props: Props) {
  return (
    <div>
      <p className="text-black/85 font-bold text-lg">{props.title}</p>
      <p>{props.value != 0 ? props.value : "-"}</p>
    </div>
  );
}

export default TextDetail;
