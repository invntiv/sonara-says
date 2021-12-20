import ButtonProps from "../../interface/ButtonProps";

export default function ColorButton({ color, flashing, onClick }: ButtonProps) {
    return (
      <div
        onClick={onClick}
        className={`simon-button ${color} ${flashing ? "flash" : ""}`}
      ></div>
    );
  }