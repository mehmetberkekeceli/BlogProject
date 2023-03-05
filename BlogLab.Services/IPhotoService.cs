using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace BlogLab.Services
{
    /// <summary>
    /// The interface where adding and deleting pictures is done.
    /// It is designed as two methods signature.
    /// There are insertion and deletion methods.
    /// </summary>
    public interface IPhotoService
    {
        /// <summary>
        /// It is the method of adding an image.
        /// </summary>
        /// <param name="file">File properties of type IFromFile are needed for image insertion.</param>
        /// <returns>The return of the operation result is required.</returns>
        public Task<ImageUploadResult> AddPhotoAsync(IFormFile file);

        /// <summary>
        /// It is the method by which image deletion is performed.
        /// </summary>
        /// <param name="publicId">The publicId information is needed to perform the deletion.</param>
        /// <returns>The return of the operation result is required.</returns>
        public Task<DeletionResult> DeletePhotoAsync(string publicId);
    }
}
