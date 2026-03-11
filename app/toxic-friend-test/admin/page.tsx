import { Metadata } from "next";
import AdminDashboard from "./_components/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin | Toxic Friendship Diagnostics",
  robots: "noindex, nofollow"
};

export default function ToxicFriendAdminPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <AdminDashboard />
    </div>
  );
}
