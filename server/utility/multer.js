import multer from "multer"

export const uploadSingle = multer({storage: multer.memoryStorage()}).single("file"); 
export const uploadMultiple = multer({storage: multer.memoryStorage()}).array("file");