import AuthGuard from "@/src/auth/components/AuthGuard";
import "./globals.css";
import ExercsiesProvider from "@/src/exercise/providers/ExercsiesProvider";
import "react-modern-drawer/dist/index.css";
import UserWorkoutsProvider from "@/src/workout/providers/fetch/UserWorkoutsProvider";

export const metadata = {
  title: "Agility",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body id="body">
        <AuthGuard>
          <ExercsiesProvider>
            <UserWorkoutsProvider>{children}</UserWorkoutsProvider>
          </ExercsiesProvider>
        </AuthGuard>
      </body>
    </html>
  );
}
