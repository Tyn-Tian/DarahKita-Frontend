"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import GoogleLoginComponent from "@/components/google-login";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { postLogin } from "@/services/auth/authService";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";

const FormSchema = z.object({
  email: z.string().email({ message: "Email tidak valid" }),
  password: z.string(),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { toast } = useToast();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof FormSchema>) => {
      return await postLogin(data);
    },
    onSuccess: (response) => {
      if (response.success && response.token) {
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        Cookies.set("token", response.token, {
          expires: endOfDay,
        });

        toast({
          title: "Login Berhasil",
          description: "Anda berhasil login.",
        });
        router.push("/overview");
      }
    },
    onError: () => {
      toast({
        title: "Login Gagal",
        description: "Email dan password salah.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) =>
    mutation.mutate(data);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Masuk menggunakan email atau dengan akun Google
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukan Email Anda" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Masukan Password Anda"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Memproses..." : "Login"}
              </Button>

              <GoogleLoginComponent />

              <div className="mt-4 text-center text-sm">
                Belum punya akun?{" "}
                <Link
                  href="/registrasi"
                  className="underline underline-offset-4"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
