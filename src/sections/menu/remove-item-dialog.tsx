import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

interface RemoveItemDialogProps {
  itemName: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const RemoveItemDialog = ({
  itemName,
  open,
  onClose,
  onConfirm,
}: RemoveItemDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to remove this?</DialogTitle>
          <DialogDescription>
            You are about to remove the last <strong>{itemName}</strong> from
            your cart. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-red-600 hover:bg-red-700" onClick={onConfirm}>
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
