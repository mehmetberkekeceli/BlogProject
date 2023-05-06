using BlogLab.Models.Blog;
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
    /// Adding, deleting, updating, etc. The class in which the operations are encoded.
    /// The following class fields use an underscore prefix to distinguish them from local variables and method arguments.
    /// This is a common convention in C# programming.
    /// </summary>
    public class BlogRepository : IBlogRepository
    {
        private readonly IConfiguration _config;

        public BlogRepository(IConfiguration config)
        {
            _config = config;
        }
        /// <summary>
        /// It is the function that completes the delete operation.
        /// </summary>
        /// <param name="blogId">It requests the blogId information to be deleted.</param>
        /// <returns></returns>
        public async Task<int> DeleteAsync(int blogId)
        {
            int affectedRows = 0;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                affectedRows = await connection.ExecuteAsync(
                    "Blog_Delete",
                    new { BlogId = blogId },
                    commandType: CommandType.StoredProcedure);
            }
            return affectedRows;
        }
        /// <summary>
        /// Get all blog. It will fetch all blog entries.
        /// </summary>
        /// <param name="blogPaging">Pagination information</param>
        /// <returns></returns>
        public async Task<PagedResults<Blog>> GetAllAsync(BlogPaging blogPaging)
        {
            var results = new PagedResults<Blog>();

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                using (var multi = await connection.QueryMultipleAsync("Blog_GetAll",
                    new { 
                        Offset = (blogPaging.Page - 1) * blogPaging.PageSize,
                        PageSize = blogPaging.PageSize
                    }, 
                    commandType: CommandType.StoredProcedure))
                {
                    results.Items = multi.Read<Blog>();

                    results.TotalCount = multi.ReadFirst<int>();
                }
            }
            return results;
        }
        /// <summary>
        /// Returns all the blog information for an account.
        /// </summary>
        /// <param name="applicationUserId">user Id</param>
        /// <returns></returns>
        public async Task<List<Blog>> GetAllByUserIdAsync(int applicationUserId)
        {
            IEnumerable<Blog> blogs;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                blogs = await connection.QueryAsync<Blog>(
                    "Blog_GetByUserId",
                    new { ApplicationUserId = applicationUserId },
                    commandType: CommandType.StoredProcedure);
            }

            return blogs.ToList();
        }
        /// <summary>
        /// Brings all the famous blogs requested.
        /// </summary>
        /// <returns></returns>
        public async Task<List<Blog>> GetAllFamousAsync()
        {
            IEnumerable<Blog> famousBlogs;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                famousBlogs = await connection.QueryAsync<Blog>(
                    "Blog_GetAllFamous",
                    new { },
                    commandType: CommandType.StoredProcedure);
            }

            return famousBlogs.ToList();
        }
        /// <summary>
        /// Returns the record that equals blogId.
        /// </summary>
        /// <param name="blogId">req blogId</param>
        /// <returns></returns>
        public async Task<Blog> GetAsync(int blogId)
        {
            Blog blog;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                blog = await connection.QueryFirstOrDefaultAsync<Blog>(
                    "Blog_Get",
                    new { BlogId = blogId },
                    commandType: CommandType.StoredProcedure);
            }

            return blog;
        }
        /// <summary>
        /// It should be used for insertion operations.
        /// </summary>
        /// <param name="blogCreate">add blog info</param>
        /// <param name="applicationUserId">add userId info</param>
        public async Task<Blog> UpsertAsync(BlogCreate blogCreate, int applicationUserId)
        {
            var dataTable = new DataTable();
            dataTable.Columns.Add("BlogId", typeof(int));
            dataTable.Columns.Add("Title", typeof(string));
            dataTable.Columns.Add("Content", typeof(string));
            dataTable.Columns.Add("PhotoId", typeof(int));

            dataTable.Rows.Add(blogCreate.BlogId, blogCreate.Title, blogCreate.Content, blogCreate.PhotoId);

            int? newBlogId;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                newBlogId = await connection.ExecuteScalarAsync<int?>(
                    "Blog_Upsert",
                    new { Blog = dataTable.AsTableValuedParameter("dbo.BlogType"), ApplicationUserId = applicationUserId },
                    commandType: CommandType.StoredProcedure
                    );
            }

            newBlogId = newBlogId ?? blogCreate.BlogId;

            Blog blog = await GetAsync(newBlogId.Value);

            return blog;
        }
    }
}