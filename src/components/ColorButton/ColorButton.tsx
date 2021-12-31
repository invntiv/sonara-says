import ButtonProps from "../../interface/ButtonProps";

export default function ColorButton({ color, flashing, onClick }: ButtonProps) {
    return (
      <div
        onClick={onClick}
        className={`simon-button ${color} ${flashing ? "flash" : ""}`} // we use the button props to set the color and whether or not its flashing
      ></div>
    );
  }