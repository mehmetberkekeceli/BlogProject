using BlogLab.Models.Photo;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BlogLab.Repository
{
    /// <summary>
    /// Photo interface class.
    /// Adding, updating, deleting a photo, etc. is the interface class where the functions are located.
    /// </summary>
    public interface IPhotoRepository
    {
        /// <summary>
        /// Add photo signature function. It takes two parameters. Async works.
        /// </summary>
        /// <param name="photoCreate">Photo information to add.</param>
        /// <param name="applicationUserId">Added userId information.</param>
        /// <returns></returns>
        public Task<Photo> InsertAsync(PhotoCreate photoCreate, int applicationUserId);

        /// <summary>
        /// Get a photoId signature function. It takes a parameters. Async works.
        /// </summary>
        /// <param name="photoId">Pagination information</param>
        /// <returns></returns>
        public Task<Photo> GetAsync(int photoId);

        /// <summary>
        /// Get all user photo signature function. It takes a parameters. Async works.
        /// </summary>
        /// <param name="applicationUserId">Requested applicationUserId.</param>
        /// <returns></returns>
        public Task<List<Photo>> GetAllByUserIdAsync (int applicationUserId);

        /// <summary>
        /// It is used to delete a photo.
        /// Deletes the record with a photoId equal.
        /// </summary>
        /// <param name="photoId">Requested photoId</param>
        /// <returns></returns>
        public Task<int> DeletetAsync(int photoId);
    }
}
