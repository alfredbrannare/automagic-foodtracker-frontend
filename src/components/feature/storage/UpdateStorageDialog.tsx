import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Input,
    Label
} from "../../ui/index.ts"
import type { StorageResponse, UpdateStorageRequest } from "@/types/storage";
import {formatDateForInput, formatInputToInstant} from "@/utils/date-utils.ts";

interface UpdateStorageDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    item: StorageResponse;
    onUpdate: (id: string, data: UpdateStorageRequest) => Promise<void>;
}

export const UpdateStorageDialog = ( { open, onOpenChange, item, onUpdate }: UpdateStorageDialogProps ) => {
  return (
      <Dialog>
          <form>
              <DialogTrigger asChild>
                  <Button variant="outline">Update</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                      <DialogTitle>Update {item.name}</DialogTitle>
                      <DialogDescription>
                          This change can&apos;t be undone.
                      </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4">
                      <div className="grid gap-3">
                          <Label htmlFor="storage-1">Storage</Label>
                          <Input id="storage-1" name="storage" />
                      </div>

                      <div className="grid gap-3">
                          <Label htmlFor="name-1">Name</Label>
                          <Input id="name-1" name="name" defaultValue={item.name} required={true} />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="grid gap-3">
                              <Label htmlFor="weight-1">Total Weight (g)</Label>
                              <Input id="weight-1" name="weight" type="number" defaultValue={item.totalWeight} required={true}/>
                          </div>
                          <div className="grid gap-3">
                              <Label htmlFor="date-1">Date</Label>
                              <Input id="date-1" name="date" type="datetime-local" defaultValue={formatDateForInput(item.createdAt)} required={true}/>
                          </div>
                      </div>

                      {item.nutritionPer100g && (
                          <>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div className="grid gap-3">
                                      <Label htmlFor="protein-1">Protein (g)</Label>
                                      <Input id="protein-1" name="protein" type="number" defaultValue={item.nutritionPer100g.protein} required={true}/>
                                  </div>
                                  <div className="grid gap-3">
                                      <Label htmlFor="calories-1">Calories</Label>
                                      <Input id="calories-1" name="calories" type="number" defaultValue={item.nutritionPer100g.kcal} required={true}/>
                                  </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div className="grid gap-3">
                                      <Label htmlFor="carbs-1">Carbs (g)</Label>
                                      <Input id="carbs-1" name="carbs" type="number" defaultValue={item.nutritionPer100g.carbs} required={true}/>
                                  </div>
                                  <div className="grid gap-3">
                                      <Label htmlFor="fat-1">Fat (g)</Label>
                                      <Input id="fat-1" name="fat" type="number" defaultValue={item.nutritionPer100g.fat} required={true}/>
                                  </div>
                              </div>
                          </>
                      )}
                  </div>
                  <DialogFooter>
                      <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit" onClick={console.log(item.createdAt)}>Save changes</Button>
                  </DialogFooter>
              </DialogContent>
          </form>
      </Dialog>
  );
};