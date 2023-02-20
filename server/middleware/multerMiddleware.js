import multer from "multer"

export const uploadSingle = multer({storage: multer.memoryStorage()}); 
export const uploadMultiple = multer({storage: multer.memoryStorage()});