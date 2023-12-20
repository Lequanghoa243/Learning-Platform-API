const {cloudinaryUploadImg} = require('../utils/cloudiary')
const asyncHandler = require('express-async-handler');
const Course = require('../models/courses.model');
const { sendError } = require('../utils/restware');
const fs = require("fs");


module.exports = {
    uploadImages: asyncHandler(async (req, res) => {
        try {
            const uploader = (path) => cloudinaryUploadImg(path, "images");
            const urls = [];
            console.log(req.files);
            const files = req.files;
            for (const file of files) {
              const { path } = file;
              const newpath = await uploader(path);
              console.log(newpath);
              urls.push(newpath);
              fs.unlinkSync(path);
            }
            const images = urls.map((file) => {
              return file;
            });
            res.json(images);
          } catch (error) {
            throw new Error(error);
          }
    }),
}