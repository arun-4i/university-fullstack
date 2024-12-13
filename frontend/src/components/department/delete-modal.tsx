import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { T_DEPARTMENT } from "@/types/student";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  department: T_DEPARTMENT | null;
  onDelete: (department: T_DEPARTMENT) => void;
};

const DeleteModal = ({
  isOpen,
  onClose,
  department,
  onDelete,
}: DeleteModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Department</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <span className="font-semibold">{department?.department_name}</span> Course ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              if (department) {
                onDelete(department);
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
