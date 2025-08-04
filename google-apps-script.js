function doPost(e) {
  try {
    // Parse data dari form
    const data = JSON.parse(e.postData.contents);

    // ID Spreadsheet "Formulir PKG" Anda
    const SHEET_ID = "1tRqTLDZA3iJ0WGPZaqixdO-onqE_vgBIbKlFOoDOTRs";
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

    // Setup header kolom - TEMPAT DAN TANGGAL LAHIR JADI SATU KOLOM
    const headers = [
      "Waktu Daftar",
      "Nama Lengkap",
      "Kelas/Ruang",
      "Jurusan",
      "NIK",
      "NISN",
      "Tempat, Tanggal Lahir (TTL)", // GABUNGAN JADI SATU KOLOM
      "Email",
      "Nomor HP",
      "Alamat",
    ];

    // Cek jika ini pertama kali (belum ada header)
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

      // Format header agar lebih bagus
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#10b981"); // Warna emerald
      headerRange.setFontColor("#ffffff");
      headerRange.setFontWeight("bold");
      headerRange.setHorizontalAlignment("center");
    }

    // Fungsi format TTL - SAMA SEPERTI DI FORM REACT
    const formatTTL = (tempatLahir, tanggalLahir) => {
      if (!tempatLahir && !tanggalLahir) return "";

      let ttl = tempatLahir || "[Tempat]";

      if (tanggalLahir) {
        const date = new Date(tanggalLahir);
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

        const day = date.getDate().toString().padStart(2, "0");
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        ttl += `, ${day} ${month} ${year}`;
      } else {
        ttl += ", [DD/MM/YYYY]";
      }

      return ttl;
    };

    // Data yang akan disimpan ke spreadsheet
    const rowData = [
      new Date().toLocaleString("id-ID"), // Waktu daftar
      data.nama || "",
      data.kelasRuang || "",
      data.jurusan || "",
      data.nik || "",
      data.nisn || "",
      formatTTL(data.tempatLahir, data.tanggalLahir), // TTL GABUNGAN
      data.email || "",
      data.nomorHp || "",
      data.alamat || "",
    ];

    // Tambahkan data ke baris baru
    sheet.appendRow(rowData);

    // Auto resize kolom agar rapi
    sheet.autoResizeColumns(1, headers.length);

    // Response sukses
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Pendaftaran berhasil! Data telah disimpan.",
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error("Error:", error);
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        message: "Terjadi kesalahan: " + error.toString(),
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Fungsi untuk testing (opsional)
function testFunction() {
  const testData = {
    nama: "Test User",
    kelasRuang: "XI-1",
    jurusan: "TKJ",
    nik: "1234567890123456",
    nisn: "1234567890",
    tempatLahir: "Jakarta",
    tanggalLahir: "2005-01-15",
    email: "test@email.com",
    nomorHp: "081234567890",
    alamat: "Jl. Test No. 123, Jakarta",
  };

  const e = {
    postData: {
      contents: JSON.stringify(testData),
    },
  };

  const result = doPost(e);
  console.log(result.getContent());

  // Test format TTL
  console.log("Format TTL:", formatTTL("Jakarta", "2005-01-15"));
  // Output: Jakarta, 15 Januari 2005
}

// Fungsi helper untuk format TTL (bisa dipanggil terpisah)
function formatTTL(tempatLahir, tanggalLahir) {
  if (!tempatLahir && !tanggalLahir) return "";

  let ttl = tempatLahir || "[Tempat]";

  if (tanggalLahir) {
    const date = new Date(tanggalLahir);
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

    const day = date.getDate().toString().padStart(2, "0");
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    ttl += `, ${day} ${month} ${year}`;
  } else {
    ttl += ", [DD/MM/YYYY]";
  }

  return ttl;
}
