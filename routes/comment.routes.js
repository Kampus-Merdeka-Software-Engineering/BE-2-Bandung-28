const express = require("express");
const commentRoutes = express.Router();
const { prisma } = require("../config/prisma");

// Get all comments
commentRoutes.get("/", async (req, res) => {
    const comments = await prisma.comment.findMany();
    res.status(200).send(comments);
});

// Get a comment by id
commentRoutes.get("/:id", async (req, res) => {
    const comment = await prisma.comment.findUnique({
    where: {
        id: parseInt(req.params.id),
    },
});
if (!comment) {
    res.status(404).json({
        message: "Comment not found",
    });
} else {
    res.status(200).json(comment);
}
});

// Create a new comment
commentRoutes.post("/", async (req, res) => {
    const { name, comment } = req.body;
    if (!name || !comment) {
    return res.status(400).json({
        message: "Missing required fields: name and comment",
    });
}
const newComment = await prisma.comment.create({
    data: {
        name,
        comment,
    },
});
res.status(201).json({
    message: "Comment created successfully",
    data: newComment,
});
});

// Update a comment
commentRoutes.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, comment } = req.body;
    const updatedComment = await prisma.comment.update({
    where: {
        id: parseInt(id),
    },
    data: {
        name: name || undefined,
        comment: comment || undefined,
    },
});
res.status(200).json({
    message: `Comment with id: ${id} updated successfully`,
    data: updatedComment,
});
});

// Delete a comment
commentRoutes.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await prisma.comment.delete({
    where: {
        id: parseInt(id),
    },
});
res.status(200).json({
    message: `Comment with id: ${id} deleted successfully`,
});
});

module.exports = { commentRoutes };
