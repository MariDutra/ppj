const express = require('express');
const router = express.Router();
const materialsController = require('../controllers/materialsController');

router.get('/', materialsController.getAllMaterials);
router.post('/', materialsController.createMaterial);
router.put('/:id', materialsController.updateMaterial);
router.delete('/:id', materialsController.deleteMaterial);

module.exports = router;
