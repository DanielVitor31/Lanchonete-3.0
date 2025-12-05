type Props = {
  open: (value: null) => void;
};



export default function SelectMenu({ open }: Props) {
  return (
    <button onClick={() => open(null)}>
      Aumentar
    </button>
  );
}
