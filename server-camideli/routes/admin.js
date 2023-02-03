const adminController = require("../controllers/adminController");
const { uploadMultiple } = require("../middleware/multer");

const router = require("express").Router();

router.get("/dashboard", adminController.viewDashboard);

// endpoint untuk item
router.get("/item", adminController.viewItem);
router.post("/item", uploadMultiple, adminController.addItem);

// endpoint untuk category
router.get("/category", adminController.viewCategory);
router.post("/category", adminController.addCategory);
router.put("/category", adminController.editCategory);
router.delete("/category/:id", adminController.deleteCategory);
// router.post("/item", adminController.addItem);

// endpoint untuk bank
router.get("/bank", adminController.viewBank);
router.post("/bank", adminController.addBank);
router.put("/bank", adminController.editBank);
router.delete("/bank/:id", adminController.deleteBank);

// endpoint untuk feature
router.get("/order", adminController.viewOrder);

module.exports = router;
