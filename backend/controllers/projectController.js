// // controllers/projectController.js
// const Project = require('../models/projectModel');

// exports.createProject = async (req, res) => {
//     console.log('Request Body:', req.body);
//     const { name } = req.body;

//     try {
//         if (!name) {
//             return res.status(400).json({ message: 'Name is required' });
//         }

//         const project = new Project({ name });
//         await project.save();
//         res.status(201).json(project);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.getProjects = async (req, res) => {
//     try {
//         const projects = await Project.find();
//         res.status(200).json(projects);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.updateProject = async (req, res) => {
//     try {
//         const project = await Project.findById(req.params.id);
//         if (!project) {
//             return res.status(404).json({ message: 'Project not found' });
//         }

//         project.name = req.body.name || project.name;
//         await project.save();
//         res.status(200).json(project);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.deleteProject = async (req, res) => {
//     try {
//         const project = await Project.findById(req.params.id);
//         if (!project) {
//             return res.status(404).json({ message: 'Project not found' });
//         }

//         await project.remove();
//         res.status(200).json({ message: 'Project deleted' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
const Project = require('../models/projectModel');

exports.createProject = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const project = new Project({ name });
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const project = await Project.findByIdAndUpdate(id, { name }, { new: true });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findByIdAndDelete(id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        await Speech.deleteMany({ projectId: id });
        res.status(200).json({ message: 'Project deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
