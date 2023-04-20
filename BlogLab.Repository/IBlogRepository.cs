using BlogLab.Models.Blog;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
namespace BlogLab.Repository
{
    /// <summary>
    /// Blog interface class.
    /// Adding, updating, deleting a blog, etc. is the interface class where the functions are located.
    /// </summary>
    public interface IBlogRepository
    {
        /// <summary>
        /// Add blog signature function. It takes two parameters. Async works.
        /// </summary>
        /// <param name="blogCreate">Blog information to add.</param>
        /// <param name="applicationUserId">Added userId information.</param>
        /// <returns></returns>
        public Task<Blog> UpsertAsync(BlogCreate blogCreate, int applicationUserId);
        /// <summary>
        /// Get all blog signature function. It takes a parameters. Async works.
        /// </summary>
        /// <param name="blogPaging">Pagination information</param>
        /// <returns></returns>
        public Task<PagedResults<Blog>> GetAllAsync(BlogPaging blogPaging);
        /// <summary>
        /// Returns the record that equals blogId. signature function. It takes a parameters. Async works.
        /// </summary>
        /// <param name="blogId">Requested blogId ID.</param>
        /// <returns></returns>
        public Task<Blog> GetAsync(int blogId);
        /// <summary>
        /// All blog information of the requested user.
        /// </summary>
        /// <param name="applicationUserId">Requested userID</param>
        /// <returns></returns>
        public Task<List<Blog>> GetAllByUserIdAsync(int applicationUserId);
        /// <summary>
        /// Brings all the famous blogs requested.
        /// </summary>
        /// <returns></returns>
        public Task<List<Blog>> GetAllFamousAsync();
        /// <summary>
        /// It is used to delete a blog.
        /// Deletes the record with a blogId equal.
        /// </summary>
        /// <param name="blogId">Requested blogId</param>
        /// <returns></returns>
        public Task<int> DeleteAsync(int blogId);
    }
}