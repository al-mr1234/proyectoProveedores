const express = require('express');
const router = express.Router();
const proController = require("../controllers/proController");

router.get('/', proController.getPros);
router.get('/:id', proController.getProById);
router.post('/', proController.createPro);
router.put('/:id', proController.updatePro);
router.delete('/:id', proController.deletePro);

module.exports = router;
