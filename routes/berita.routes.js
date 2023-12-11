const express = require("express");
const beritaRoutes = express.Router();
const { prisma } = require("../config/prisma");

// Get all berita
beritaRoutes.get("/", async (req, res) => {
    const berita = await prisma.berita.findMany();
    res.status(200).send(berita);
});

// Get a news by id
beritaRoutes.get("/:id", async (req, res) => {
    const berita = await prisma.berita.findUnique({
    where: {
        id: parseInt(req.params.id),
    },
});
if (!berita) {
    res.status(404).json({
        message: "berita not found",
    });
} else {
    res.status(200).json(berita);
}
});

// Update a berita
beritaRoutes.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { judul, tanggal, kategoriId, createdAt, updatedAt, namepenulis} = req.body;
    const updatedBerita = await prisma.berita.update({
    where: {
        id: parseInt(id),
    },
    data: {
        judul: judul || undefined,
        tanggal: tanggal || undefined, 
        kategoriId: kategoriId || undefined,
        createdAt: createdAt || undefined,
        updatedAt: updatedAt || undefined,
        namepenulis: namepenulis || undefined,
        
    },
});
res.status(200).json({
    message: `Berita with id: ${id} updated successfully`,
    data: updatedBerita,
});


// Post a berita
beritaRoutes.post("/", async (req, res) => {
	// const { judul, tanggal, kategoriId, createdAt,updatedAt,namepenulis} } = req.body
	const newBerita = await prisma.berita.create({
		data: {
        judul:  req.body.judul,
        tanggal: req.body.tanggal,
        kategoriId: parseInt(req.body.kategoriId),
        createdAt:  req.body.createdAt,
        updatedAt: req.body.updateAt,
        imageurl: parseInt(req.body.imageurl),
        sumberurl: parseInt(req.body.sumberurl),
        namepenulis: req.body.namepenulis,
			
		},
	});
	res.status(201).json({
		message: "Berita created",
		data: newBerita,
	});
});


});


module.exports = { beritaRoutes };
