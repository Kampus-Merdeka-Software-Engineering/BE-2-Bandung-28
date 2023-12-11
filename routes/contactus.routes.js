const express = require("express");
const contactusRoutes = express.Router();
const { prisma } = require("../config/prisma");

// get all contactus
contactusRoutes.get("/", async (req, res) => {
	const cantactus = await prisma.contactus.findMany();
	res.status(200).json();
});

// get contactus  by id
contactusRoutes.get("/:id", async (req, res) => {
	const contactus = await prisma.contactus.findUnique({
		where: {
			id: parseInt(req.params.id),
		},
	});
	if (!contactus)
		res.status(404).json({
			message: "contactus not found",
		});
	else res.status(200).json(contactus);
});


contactusRoutes.post("/", async (req, res) => {
	// Extract data from request body
	const { firstname, lastname, country, subject } = req.body;
	if (!firstname || !lastname || !country || !subject) {
		return res.status(400).json({ message: "firstname, lastname, country, and subject are required" });
	}
	try {
		// Create new contactus
		const newContactus = await prisma.contactus.create({
		data: {
			firstname,
			lastname,
			country,
			subject,
		},
	});
	// Send successful response
	res.status(201).json({
	message: "Contactus created successfully",
	data: newContactus,
});
} catch (error) {
	// Handle errors
	res.status(500).json({ message: error.message });
	}
});


module.exports = { contactusRoutes };
