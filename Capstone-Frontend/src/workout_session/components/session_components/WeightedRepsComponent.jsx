import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NumericInput from "@/src/ui/components/NumericInput";
import UpdateWeightDone from "../../actions/update/UpdateWeightDone";
import UpdateRepsDone from "../../actions/update/UpdateRepsDoneStrategy";

const WeightedRepsComponent = ({ component, updateDone }) => {
  const handleDoneRepetitions = (number) => {
    updateDone(new UpdateRepsDone(component, number));
  };

  const handleDoneWeight = (number) => {
    updateDone(new UpdateWeightDone(component, number));
  };

  return (
    <Table className="mx-auto w-[50%]">
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/3">Title</TableHead>
          <TableHead className="w-1/3">Expected</TableHead>
          <TableHead className="w-1/3">Actual</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Repetitions</TableCell>
          <TableCell className="font-medium">{component.reps}</TableCell>
          <TableCell>
            <NumericInput
              label="Done repetitions"
              value={component.repsDone}
              onChange={handleDoneRepetitions}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Weight</TableCell>
          <TableCell className="font-medium">{component.weight}lbs</TableCell>
          <TableCell>
            <NumericInput
              label="Done lbs"
              value={component.weightDone}
              onChange={handleDoneWeight}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default WeightedRepsComponent;
