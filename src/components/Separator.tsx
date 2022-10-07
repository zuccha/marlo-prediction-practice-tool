import "./Separator.css";

type SeparatorProps = {
  text: string;
};

const Separator = ({ text }: SeparatorProps) => {
  return (
    <div className="separator">
      <div className="separator-line" />
      <span className="separator-text">{text}</span>
      <div className="separator-line" />
    </div>
  );
};

export default Separator;
