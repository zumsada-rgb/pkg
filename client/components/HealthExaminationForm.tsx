import { useState } from "react";
import { IMaskInput } from "react-imask";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Combobox, ComboboxGroup } from "@/components/ui/combobox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Stethoscope,
  Heart,
  UserCheck,
  Calendar,
  MapPin,
  Mail,
  Phone,
  IdCard,
  GraduationCap,
  Building,
} from "lucide-react";

interface FormData {
  nama: string;
  kelasRuang: string;
  jurusan: string;
  nik: string;
  nisn: string;
  tempatLahir: string;
  tanggalLahir: string;
  email: string;
  nomorHp: string;
  alamat: string;
}

interface FormErrors {
  nama?: string;
  kelasRuang?: string;
  jurusan?: string;
  nik?: string;
  nisn?: string;
  tempatLahir?: string;
  tanggalLahir?: string;
  email?: string;
  nomorHp?: string;
  alamat?: string;
}

const kelasOptions = [
  {
    label: "Kelas X",
    options: [
      { value: "X-1", label: "X-1" },
      { value: "X-2", label: "X-2" },
      { value: "X-3", label: "X-3" },
      { value: "X-4", label: "X-4" },
      { value: "X-5", label: "X-5" },
      { value: "X-6", label: "X-6" },
    ],
  },
  {
    label: "Kelas XI",
    options: [
      { value: "XI-1", label: "XI-1" },
      { value: "XI-2", label: "XI-2" },
      { value: "XI-3", label: "XI-3" },
      { value: "XI-4", label: "XI-4" },
      { value: "XI-5", label: "XI-5" },
      { value: "XI-6", label: "XI-6" },
    ],
  },
];

const jurusanOptions = [
  { value: "TKR", label: "TKR" },
  { value: "TSM", label: "TSM" },
  { value: "DKV", label: "DKV" },
  { value: "TKJ", label: "TKJ" },
  { value: "BISDIG", label: "BISDIG" },
  { value: "DPB", label: "DPB" },
];

const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export default function HealthExaminationForm() {
  const [formData, setFormData] = useState<FormData>({
    nama: "",
    kelasRuang: "",
    jurusan: "",
    nik: "",
    nisn: "",
    tempatLahir: "",
    tanggalLahir: "",
    email: "",
    nomorHp: "",
    alamat: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Fungsi untuk capitalize
  const capitalize = (str: string) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Auto capitalize untuk nama dan tempat lahir
    if (name === "nama" || name === "tempatLahir") {
      processedValue = capitalize(value);
    }

    setFormData((prev) => ({ ...prev, [name]: processedValue }));

    // Clear error ketika user mulai mengetik
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error ketika user memilih
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Validasi real-time dengan kriteria yang lebih spesifik
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "nama":
        if (!value.trim()) return "Nama Lengkap wajib diisi";
        if (value.trim().length < 3) return "Nama Lengkap minimal 3 karakter";
        break;
      case "nik":
        if (!value) return "NIK wajib diisi";
        if (value.length !== 16) return "NIK harus 16 digit";
        break;
      case "nisn":
        if (!value) return "NISN wajib diisi";
        if (value.length !== 10) return "NISN harus 10 digit";
        break;
      case "email":
        if (!value.trim()) return "Email wajib diisi";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Format email tidak valid";
        break;
      case "nomorHp":
        if (!value.trim()) return "Nomor HP wajib diisi";
        if (value.trim().length < 11) return "Nomor HP minimal 11 digit";
        break;
      case "tempatLahir":
        if (!value.trim()) return "Tempat Lahir wajib diisi";
        break;
      case "tanggalLahir":
        if (!value) return "Tanggal Lahir wajib diisi";
        break;
      case "alamat":
        if (!value.trim()) return "Alamat Lengkap wajib diisi";
        if (value.trim().length < 10)
          return "Alamat Lengkap minimal 10 karakter";
        break;
      case "kelasRuang":
        if (!value) return "Kelas/Ruang wajib dipilih";
        break;
      case "jurusan":
        if (!value) return "Jurusan wajib dipilih";
        break;
    }
    return undefined;
  };

  // Handler untuk blur validation
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Validasi semua field
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatTTLPreview = () => {
    if (!formData.tempatLahir && !formData.tanggalLahir) return "";

    let preview = formData.tempatLahir || "[Tempat]";

    if (formData.tanggalLahir) {
      const date = new Date(formData.tanggalLahir);
      const day = date.getDate().toString().padStart(2, "0");
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      preview += `, ${day} ${month} ${year}`;
    } else {
      preview += ", [DD/MM/YYYY]";
    }

    return preview;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi form sebelum submit
    if (!validateForm()) {
      return; // Stop jika ada error
    }

    setIsSubmitting(true);

    try {
      // ✅ Google Apps Script Deployment URL - TERHUBUNG KE SPREADSHEET
      const GOOGLE_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycby7HjBAb263-H0OVsgKtqcP8ZCwqRrgA4UxhFxTS4lJxy2BhbbZUvAzNhJvhjGPRMWT/exec";

      // Tambahkan tanda kutip tunggal di depan nomor HP untuk menjaga angka 0
      const dataToSend = {
        ...formData,
        nomorHp: `'${formData.nomorHp}`, // Menambahkan ' di depan nomor HP
      };

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Important untuk Google Apps Script
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      // Karena mode 'no-cors', kita tidak bisa baca response
      // Jadi kita asumsikan berhasil jika tidak ada error
      setIsSubmitting(false);
      setSubmitted(true);
      console.log("Form submitted:", formData);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
      alert("Terjadi kesalahan saat mengirim data. Silakan coba lagi.");
    }
  };

  const resetForm = () => {
    setFormData({
      nama: "",
      kelasRuang: "",
      jurusan: "",
      nik: "",
      nisn: "",
      tempatLahir: "",
      tanggalLahir: "",
      email: "",
      nomorHp: "",
      alamat: "",
    });
    setSubmitted(false);
    setErrors({});
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <UserCheck className="w-8 h-8 text-emerald-600" />
            </div>
            <CardTitle className="text-2xl text-emerald-800">
              Pendaftaran Berhasil!
            </CardTitle>
            <CardDescription className="text-emerald-600">
              Data Anda telah berhasil didaftarkan untuk Pemeriksaan Kesehatan
              Gratis
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600 mb-6">
              Tim medis akan menghubungi Anda sesuai jadwal yang telah
              ditentukan.
            </p>
            <Button onClick={resetForm} className="w-full">
              Daftar Peserta Lain
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-emerald-600" />
            </div>
            <Heart className="w-8 h-8 text-emerald-500" />
          </div>
          <p className="text-emerald-600 text-lg">
            Formulir Pendataan Peserta PKG
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-2">
            Pemeriksaan Kesehatan Gratis
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Silakan lengkapi data diri Anda dengan benar untuk mendapatkan
            layanan pemeriksaan kesehatan gratis
          </p>
        </div>

        {/* Form */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
              <IdCard className="w-5 h-5 text-emerald-600" />
              Data Pribadi Peserta
            </CardTitle>
            <CardDescription>
              Pastikan semua informasi yang diisi sudah benar dan sesuai dengan
              dokumen resmi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Nama */}
              <div className="space-y-2">
                <Label
                  htmlFor="nama"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  Nama Lengkap *
                </Label>
                <Input
                  id="nama"
                  name="nama"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  value={formData.nama}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  className={`border-gray-200 focus:border-emerald-300 focus:ring-emerald-200 ${
                    errors.nama
                      ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                      : ""
                  }`}
                />
                {errors.nama && (
                  <p className="text-red-500 text-xs mt-1">{errors.nama}</p>
                )}
              </div>

              {/* Row 2: Kelas/Ruang, Jurusan */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="kelasRuang"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <Building className="w-4 h-4 text-emerald-600" />
                    Kelas/Ruang *
                  </Label>
                  <ComboboxGroup
                    groups={kelasOptions}
                    value={formData.kelasRuang}
                    onValueChange={(value) =>
                      handleSelectChange("kelasRuang", value)
                    }
                    placeholder="Pilih kelas/ruang"
                    emptyText="Kelas tidak ditemukan"
                    maxVisibleItems={6}
                    className={errors.kelasRuang ? "border-red-300" : ""}
                  />
                  {errors.kelasRuang && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.kelasRuang}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="jurusan"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <GraduationCap className="w-4 h-4 text-emerald-600" />
                    Jurusan *
                  </Label>
                  <Combobox
                    options={jurusanOptions}
                    value={formData.jurusan}
                    onValueChange={(value) =>
                      handleSelectChange("jurusan", value)
                    }
                    placeholder="Pilih jurusan"
                    emptyText="Jurusan tidak ditemukan"
                    maxVisibleItems={6}
                    className={errors.jurusan ? "border-red-300" : ""}
                  />
                  {errors.jurusan && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.jurusan}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 3: NIK, NISN */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="nik"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <IdCard className="w-4 h-4 text-emerald-600" />
                    NIK *
                  </Label>
                  <IMaskInput
                    mask="0000000000000000"
                    lazy={true}
                    placeholder="16 digit NIK"
                    value={formData.nik}
                    onAccept={(value: string) => {
                      setFormData((prev) => ({ ...prev, nik: value }));
                      if (errors.nik && value.length === 16) {
                        setErrors((prev) => ({ ...prev, nik: undefined }));
                      }
                    }}
                    onBlur={() => {
                      const error = validateField("nik", formData.nik);
                      setErrors((prev) => ({ ...prev, nik: error }));
                    }}
                    className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-200 focus:border-emerald-300 focus:ring-emerald-200 ${
                      errors.nik
                        ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                        : ""
                    }`}
                  />
                  {errors.nik && (
                    <p className="text-red-500 text-xs mt-1">{errors.nik}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="nisn"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <IdCard className="w-4 h-4 text-emerald-600" />
                    NISN *
                  </Label>
                  <IMaskInput
                    mask="0000000000"
                    lazy={true}
                    placeholder="10 digit NISN"
                    value={formData.nisn}
                    onAccept={(value: string) => {
                      setFormData((prev) => ({ ...prev, nisn: value }));
                      if (errors.nisn && value.length === 10) {
                        setErrors((prev) => ({ ...prev, nisn: undefined }));
                      }
                    }}
                    onBlur={() => {
                      const error = validateField("nisn", formData.nisn);
                      setErrors((prev) => ({ ...prev, nisn: error }));
                    }}
                    className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-200 focus:border-emerald-300 focus:ring-emerald-200 ${
                      errors.nisn
                        ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                        : ""
                    }`}
                  />
                  {errors.nisn && (
                    <p className="text-red-500 text-xs mt-1">{errors.nisn}</p>
                  )}
                </div>
              </div>

              {/* Row 4: TTL Group with Preview */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    Tempat Tanggal Lahir (TTL) *
                  </Label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="tempatLahir"
                      className="text-sm font-medium text-gray-600"
                    >
                      Tempat Lahir *
                    </Label>
                    <Input
                      id="tempatLahir"
                      name="tempatLahir"
                      type="text"
                      placeholder="Tempat Lahir"
                      value={formData.tempatLahir}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                      className={`border-gray-200 focus:border-emerald-300 focus:ring-emerald-200 ${
                        errors.tempatLahir
                          ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                          : ""
                      }`}
                    />
                    {errors.tempatLahir && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.tempatLahir}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2 flex flex-col">
                    <Label
                      htmlFor="tanggalLahir"
                      className="text-sm font-medium text-gray-600"
                    >
                      Tanggal Lahir *
                    </Label>
                    <Input
                      id="tanggalLahir"
                      name="tanggalLahir"
                      type="date"
                      value={formData.tanggalLahir}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                      className={`border-gray-200 focus:border-emerald-300 focus:ring-emerald-200 flex flex-col ${
                        errors.tanggalLahir
                          ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                          : ""
                      }`}
                    />
                    {errors.tanggalLahir && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.tanggalLahir}
                      </p>
                    )}
                  </div>
                </div>

                {/* Preview - Always visible and below inputs */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-md p-4 text-center">
                  <p className="text-sm text-emerald-700 font-medium mb-2">
                    Pratinjau TTL
                  </p>
                  <p className="text-emerald-800 font-semibold">
                    {formatTTLPreview()}
                  </p>
                </div>
              </div>

              {/* Row 5: Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-emerald-600" />
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="contoh@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  className={`border-gray-200 focus:border-emerald-300 focus:ring-emerald-200 ${
                    errors.email
                      ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                      : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Row 6: Nomor HP */}
              <div className="space-y-2">
                <Label
                  htmlFor="nomorHp"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  Nomor HP *
                </Label>
                <Input
                  id="nomorHp"
                  name="nomorHp"
                  type="tel"
                  inputMode="numeric"
                  placeholder="08xxxxxxxxxx"
                  value={formData.nomorHp}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  className={`border-gray-200 focus:border-emerald-300 focus:ring-emerald-200 ${
                    errors.nomorHp
                      ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                      : ""
                  }`}
                />
                {errors.nomorHp && (
                  <p className="text-red-500 text-xs mt-1">{errors.nomorHp}</p>
                )}
              </div>

              {/* Row 7: Alamat Lengkap */}
              <div className="space-y-2">
                <Label
                  htmlFor="alamat"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  Alamat Lengkap *
                </Label>
                <Textarea
                  id="alamat"
                  name="alamat"
                  placeholder="Alamat lengkap tempat tinggal (jalan, RT/RW, kelurahan, kecamatan, kota/kabupaten, provinsi)"
                  value={formData.alamat}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  rows={3}
                  className={`border-gray-200 focus:border-emerald-300 focus:ring-emerald-200 resize-none ${
                    errors.alamat
                      ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                      : ""
                  }`}
                />
                {errors.alamat && (
                  <p className="text-red-500 text-xs mt-1">{errors.alamat}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6 flex justify-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Mendaftarkan...
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-5 h-5" />
                      Daftar Pemeriksaan Kesehatan
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer Copyright */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 font-medium">
            Copyright © 2025 SMK NU 2 KEDUNGPRING
          </p>
        </div>
      </div>
    </div>
  );
}
