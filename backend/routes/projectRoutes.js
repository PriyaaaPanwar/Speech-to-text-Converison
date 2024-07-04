// routes/projectRoutes.js
const express = require('express');
const multer = require('multer');
const router = express.Router();
const projectController = require('../controllers/projectController');
const upload = multer();
router.post('/',upload.array() ,projectController.createProject);
router.get('/', projectController.getProjects);
router.put('/:id',upload.array() ,projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;
