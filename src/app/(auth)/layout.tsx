import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    console.error("Google Client ID is not defined in environment variables");
    return null;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="h-screen w-full flex items-center justify-center">
    <div id="oneTapLogin" className="fixed top-0 right-0 z-[9999]" />
        {children}
      </div>
    </GoogleOAuthProvider>
  );
};

export default Layout;
