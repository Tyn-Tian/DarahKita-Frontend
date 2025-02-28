"use client";
import { useToast } from "@/hooks/use-toast";
import {
  CredentialResponse,
  GoogleLogin,
  useGoogleOneTapLogin,
} from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { postLoginGoogle } from "@/services/auth/authService";

const GoogleLoginComponent: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();

  const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    const token = credentialResponse.credential;

    if (!token) {
      toast({
        title: "Login Gagal",
        description: "Tidak ada kredensial yang diterima. Silakan coba lagi.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    try {
      const response = await postLoginGoogle(token);

      if (response.success && response.token) {
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        Cookies.set("token", response.token, {
          expires: endOfDay,
        });

        toast({
          title: "Login Berhasil",
          description: "Anda berhasil login.",
          duration: 3000,
        });

        router.push("/overview");
      } else if (response.error === "Email not found") {
        toast({
          title: "Login Gagal",
          description:
            "Sepertinya email Anda belum terdaftar. Pastikan Anda menggunakan email yang benar dan coba lagi.",
          variant: "destructive",
          duration: 3000,
        });
      } else if (response.error === "Invalid token") {
        toast({
          title: "Login Gagal",
          description: "Token tidak valid. Silakan coba lagi.",
          variant: "destructive",
          duration: 3000,
        });
      } else {
        toast({
          title: "Login Gagal",
          description: "Terjadi kesalahan saat login. Silakan coba lagi.",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 500) {
        console.error("Server Error:", error.response.data);
      }
      toast({
        title: "Login Gagal",
        description: "Terjadi kesalahan saat login. Silakan coba lagi.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleLoginError = () => {
    toast({
      title: "Login Gagal",
      description: "Kesalahan terjadi saat login. Silakan coba lagi.",
      variant: "destructive",
      duration: 3000,
    });
  };

  useGoogleOneTapLogin({
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
    cancel_on_tap_outside: false,
    prompt_parent_id: "oneTapLogin",
  });

  return (
    <>
      <div id="oneTapLogin" />
      <div className="w-full flex justify-center -mt-7">
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
          type="standard"
          theme="outline"
          size="large"
        />
      </div>
    </>
  );
};

export default GoogleLoginComponent;
