using BlogLab.Models.BlogComment;
using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace BlogLab.Repository
{
    /// <summary>
    /// The blog comment creation class.
    /// It is derived from the class IBlogCommentRepository.
    /// </summary>
    public class BlogCommentRepository : IBlogCommentRepository
    {
        private readonly IConfiguration _config;

        public BlogCommentRepository(IConfiguration config)
        {
            _config = config;
        }
        /// <summary>
        /// Blog comment deletion operation function.
        /// </summary>
        /// <param name="blogCommentId">Comment Id information to be deleted.</param>
        /// <returns></returns>
        public async Task<int> DeleteAsync(int blogCommentId)
        {
            int affectedRows = 0;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                affectedRows = await connection.ExecuteAsync(
                    "BlogComment_Delete",
                    new { BlogCommentId = blogCommentId },
                    commandType: CommandType.StoredProcedure);
            }
            return affectedRows;
        }
        /// <summary>
        ///  Get all blog comment. Returns all comments equal to Blog Id.
        /// </summary>
        /// <param name="blogId">Blog Id for which comments are requested.</param>
        /// <returns></returns>
        public async Task<List<BlogComment>> GetAllAsync(int blogId)
        {
            IEnumerable<BlogComment> blogComments;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                blogComments = await connection.QueryAsync<BlogComment>(
                    "BlogComment_GetAll",
                    new { BlogId = blogId},
                    commandType: CommandType.StoredProcedure);
            }

            return blogComments.ToList();
        }
        /// <summary>
        /// Returns the comment that is equal to blogCommentId.
        /// </summary>
        /// <param name="blogCommentId">Requested comment ID</param>
        /// <returns></returns>
        public async Task<BlogComment> GetAsync(int blogCommentId)
        {
            BlogComment blogComment;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                blogComment = await connection.QueryFirstOrDefaultAsync<BlogComment>(
                    "BlogComment_Get",
                    new { BlogCommentId = blogCommentId },
                    commandType: CommandType.StoredProcedure);
            }

            return blogComment;
        }
        /// <summary>
        /// Blog comment insertion operation function.
        /// </summary>
        /// <param name="blogCommentCreate">Comment information to add.</param>
        /// <param name="applicationUserId">Id of the user who added the comment.</param>
        /// <returns></returns>
        public async Task<BlogComment> UpsertAsync(BlogCommentCreate blogCommentCreate, int applicationUserId)
        {
            var dataTable = new DataTable();
            dataTable.Columns.Add("BlogCommentId", typeof(int));
            dataTable.Columns.Add("ParentBlogCommentId", typeof(int));
            dataTable.Columns.Add("BlogId", typeof(int));
            dataTable.Columns.Add("Content", typeof(string));

            dataTable.Rows.Add(
                blogCommentCreate.BlogCommentId,
                blogCommentCreate.ParentBlogCommentId, 
                blogCommentCreate.BlogId,
                blogCommentCreate.Content);

            int? newBlogCommentId;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                newBlogCommentId = await connection.ExecuteScalarAsync<int?>(
                    "BlogComment_Upsert",
                    new { 
                        BlogComment = dataTable.AsTableValuedParameter("dbo.BlogCommentType"),
                        ApplicationUserId = applicationUserId
                    },
                    commandType: CommandType.StoredProcedure);
            }

            newBlogCommentId = newBlogCommentId ?? blogCommentCreate.BlogCommentId;

            BlogComment blogComment = await GetAsync(newBlogCommentId.Value);

            return blogComment;
        }
    }
}