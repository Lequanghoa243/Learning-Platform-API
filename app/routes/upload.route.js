
const express = require("express");
const uploadService = require("../services/upload.service")
const { isAdmin, authMiddleware } = require("../middleware/authmiddleware");
const { uploadPhoto } = require("../middleware/uploadImage");

module.exports = function (app) {
    app.put( "/upload/:id",
    authMiddleware,
    isAdmin,
    uploadPhoto.array("images", 10),
    uploadService.uploadImages);

}