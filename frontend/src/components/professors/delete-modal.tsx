import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { T_PROFESSOR } from "@/types/student";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  professor: T_PROFESSOR | null;
  onDelete: (professor: T_PROFESSOR) => void;
};

const DeleteModal = ({
  isOpen,
  onClose,
  professor,
  onDelete,
}: DeleteModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Professor</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            {professor
              ? `${professor.first_name} ${professor.last_name}`
              : "this professor"}
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
              if (professor) {
                onDelete(professor);
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
