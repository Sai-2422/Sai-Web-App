import multer from "multer";

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 } });

export default upload;
