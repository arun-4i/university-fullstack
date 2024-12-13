import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { T_COURSE } from "@/types/student";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  course: T_COURSE | null;
  onDelete: (course: T_COURSE) => void;
};

const DeleteModal = ({
  isOpen,
  onClose,
  course,
  onDelete,
}: DeleteModalProps) => {

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Course</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete<span className="font-semibold"> {course?.course_name} </span> Course ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              if (course) {
                onDelete(course);
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
