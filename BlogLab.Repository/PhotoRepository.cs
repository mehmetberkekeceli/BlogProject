using BlogLab.Models.Photo;
using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogLab.Repository
{
    /// <summary>
    /// The photo creation class.
    /// It is derived from the class IPhotoRepository.
    /// </summary>
    public class PhotoRepository : IPhotoRepository
    {
        private readonly IConfiguration _config;

        public PhotoRepository(IConfiguration config)
        {
            _config = config;
        }
        /// <summary>
        /// Photo deletion operation function.
        /// </summary>
        /// <param name="photoId">photoId information to be deleted.</param>
        /// <returns></returns>
        public async Task<int> DeletetAsync(int photoId)
        {
            int affectedRows = 0;

            using (var connection = new NpgsqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                affectedRows = await connection.ExecuteAsync(
                    "Photo_Delete",
                    new { PhotoId = photoId },
                    commandType: CommandType.StoredProcedure);
            }

            return affectedRows;
        }
        /// <summary>
        ///  Get all user photo. Returns all comments equal to applicationUserId.
        /// </summary>
        /// <param name="applicationUserId">applicationUserId for which photo are requested.</param>
        /// <returns></returns>
        public async Task<List<Photo>> GetAllByUserIdAsync(int applicationUserId)
        {
            IEnumerable<Photo> photos;

            using (var connection = new NpgsqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                photos = await connection.QueryAsync<Photo>(
                    "Photo_GetByUserId",
                    new { ApplicationUserId = applicationUserId },
                    commandType: CommandType.StoredProcedure);
            }

            return photos.ToList();

        }

        /// <summary>
        /// Returns the comment that is equal to photoId.
        /// </summary>
        /// <param name="photoId">Requested photoId</param>
        /// <returns></returns>
        public async Task<Photo> GetAsync(int photoId)
        {
            Photo photo;

            using (var connection = new NpgsqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                photo = await connection.QueryFirstOrDefaultAsync<Photo>(
                    "Photo_Get",
                    new { PhotoId = photoId},
                    commandType: CommandType.StoredProcedure);
            }

            return photo;
        }

        /// <summary>
        /// Photo insertion operation function.
        /// </summary>
        /// <param name="photoCreate">Photo information to add.</param>
        /// <param name="applicationUserId">Id of the user who added the photo.</param>
        /// <returns></returns>
        public async Task<Photo> InsertAsync(PhotoCreate photoCreate, int applicationUserId)
        {
            var dataTable = new DataTable();
            dataTable.Columns.Add("PublicId", typeof(string));
            dataTable.Columns.Add("ImageUrl", typeof(string));
            dataTable.Columns.Add("Description", typeof(string));

            dataTable.Rows.Add(photoCreate.PublicId, photoCreate.ImageUrl, photoCreate.Description);

            int newPhotoId;

            using (var connection = new NpgsqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                newPhotoId = await connection.ExecuteScalarAsync<int>(
                    "Photo_Insert",
                    new { 
                        Photo = dataTable.AsTableValuedParameter("dbo.PhotoType"),
                        ApplicationUserId = applicationUserId
                    },
                    commandType: CommandType.StoredProcedure);
            }

            Photo photo = await GetAsync(newPhotoId);

            return photo;
        }
    }
}
