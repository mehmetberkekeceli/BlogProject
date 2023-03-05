using BlogLab.Models.Settings;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace BlogLab.Services
{
    /// <summary>
    /// Adding and deleting images business class. In this class, methods derived from IPhotoService class are filled.
    /// </summary>
    public class PhotoService : IPhotoService
    {
        private readonly Cloudinary _cloudinary;

        public PhotoService(IOptions<CloudinaryOptions> config)
        {
            var account = new Account(config.Value.CloudName, config.Value.ApiKey, config.Value.ApiSecret);

            _cloudinary = new Cloudinary(account);
        }
        /// <summary>
        /// Image insertion job function.
        /// Works async way.
        /// </summary>
        /// <param name="file">Takes an image file as input parameter.</param>
        /// <returns>Requires transaction result return.</returns>
        public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(file.FileName, stream),
                        Transformation = new Transformation().Height(300).Width(500).Crop("fill")
                    };

                    uploadResult = await _cloudinary.UploadAsync(uploadParams);
                }
            }

            return uploadResult;
        }
        /// <summary>
        /// Image deletion job function.
        /// Works async way.
        /// </summary>
        /// <param name="file">The pictureId information to be deleted is required./param>
        /// <returns>Requires transaction result return.</returns>
        public async Task<DeletionResult> DeletePhotoAsync(string publicId)
        {
            var deletionParams = new DeletionParams(publicId);

            var result = await _cloudinary.DestroyAsync(deletionParams);

            return result;
        }
    }
}
