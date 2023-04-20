using BlogLab.Models.BlogComment;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BlogLab.Repository
{
    /// <summary>
    /// Adding, updating, deleting blog comments, etc. is the interface class where the functions are located.
    /// </summary>
    public interface IBlogCommentRepository
    {
        /// <summary>
        /// Add blog comment signature function. It takes two parameters. Async works.
        /// </summary>
        /// <param name="blogCommentCreate">Blog comment information to add.</param>
        /// <param name="applicationUserId">Added userId information.</param>
        /// <returns></returns>
        public Task<BlogComment> UpsertAsync(BlogCommentCreate blogCommentCreate, int applicationUserId);
        /// <summary>
        /// Get all blog comment signature function. It takes a parameters. Async works.
        /// </summary>
        /// <param name="blogId">Returns the record that equals blogId.</param>
        /// <returns></returns>
        public Task<List<BlogComment>> GetAllAsync(int blogId);
        /// <summary>
        /// Returns the record that equals blogCommentId. signature function. It takes a parameters. Async works.
        /// </summary>
        /// <param name="blogCommentId">Requested blogCommentId ID.</param>
        /// <returns></returns>
        public Task<BlogComment> GetAsync(int blogCommentId);
        /// <summary>
        /// It is used to delete a blog comment.
        /// Deletes the record with a blogId equal.
        /// </summary>
        /// <param name="blogCommentId">Requested blogCommentId</param>
        /// <returns></returns>
        public Task<int> DeleteAsync(int blogCommentId);
    }
}