export const handleUserLogin = async (userCredentials) => {
    // Fungsi ini menyimulasikan proses verifikasi data pengguna ke peladen.
    // Anda bisa menggantinya dengan panggilan Fetch atau Axios ke peladen asli Anda nantinya.
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true, token: 'token-sesi-123' });
        }, 1500);
    });
};