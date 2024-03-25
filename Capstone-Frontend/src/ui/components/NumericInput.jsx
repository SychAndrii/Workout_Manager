import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const NumericInput = ({ label, value, onChange, placeholder }) => {
  const handleChange = (e) => {
    let val = e.target.value;

    // Remove leading zeros unless the value is exactly "0".
    val = val.replace(/^0+(?=\d)/, "") || (val === "0" ? "0" : "");

    if (val !== "") {
      // Convert the string to a number and update only if it's a valid number.
      const numericVal = parseInt(val, 10);
      if (!isNaN(numericVal)) {
        onChange(numericVal);
      }
    } else {
      // When the input is cleared, set it to 0.
      onChange(0);
    }
  };

  return (
    <div className="grid w-full max-w-xs items-center gap-1.5">
      <Label htmlFor="reps">{label}</Label>
      <Input
        type="text"
        id="reps"
        placeholder={placeholder}
        pattern="\d*"
        value={value.toString()}
        onChange={handleChange}
      />
    </div>
  );
};

export default NumericInput;
