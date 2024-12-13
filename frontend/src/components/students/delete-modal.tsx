import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { T_STUDENT } from "@/types/student";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  student: T_STUDENT | null;
  onDelete: (student: T_STUDENT) => void;
};

const DeleteModal = ({
  isOpen,
  onClose,
  student,
  onDelete,
}: DeleteModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Student</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            {student
              ? `${student.first_name} ${student.last_name}`
              : "this student"}
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              if (student) {
                onDelete(student);
              }
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
