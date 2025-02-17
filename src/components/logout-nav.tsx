import { useRouter } from "next/navigation";
import { SidebarMenuButton } from "./ui/sidebar";
import Cookies from "js-cookie";
import { LogOut } from "lucide-react";
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
import { useQueryClient } from "@tanstack/react-query";

export default function LogoutNav() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/");
    queryClient.clear();
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <SidebarMenuButton>
            <LogOut className="text-red-500" />
            <span className="text-red-500">Logout</span>
          </SidebarMenuButton>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Keluar</AlertDialogTitle>
            <AlertDialogDescription>
              Anda akan keluar dari akun anda.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Keluar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
