import multer from "multer";



const storage = multer.memoryStorage();






// Export middleware
export const upload = multer({
  storage,
});
