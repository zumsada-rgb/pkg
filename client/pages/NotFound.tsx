import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home, Stethoscope } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <Stethoscope className="w-8 h-8 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl text-emerald-800">404</CardTitle>
          <CardDescription className="text-emerald-600">
            Halaman tidak ditemukan
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-gray-600 mb-6">
            Halaman yang Anda cari tidak tersedia. Silakan kembali ke formulir
            pendaftaran.
          </p>
          <Button asChild className="w-full">
            <Link to="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Kembali ke Formulir PKG
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
