const multer = require("multer");

// ✅ Call memoryStorage() to create the storage engine
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

module.exports = upload;
