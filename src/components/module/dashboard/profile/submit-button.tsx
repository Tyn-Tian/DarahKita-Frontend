import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  onSubmit: () => void;
  isLoading: boolean;
}

export default function SubmitButton({ onSubmit, isLoading }: SubmitButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" disabled={isLoading}>
          {isLoading ? "Menyimpan..." : "Simpan"}   
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Konfirmasi Simpan</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah anda yakin melakukan perubahan data?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={() => onSubmit()} disabled={isLoading}>
            {isLoading? "Menyimpan..." : "Simpan"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
