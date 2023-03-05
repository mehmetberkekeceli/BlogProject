using BlogLab.Models.Account;
using BlogLab.Models.Blog;
using BlogLab.Models.BlogComment;
using BlogLab.Models.Exception;
using BlogLab.Models.Photo;
using BlogLab.Models.Settings;
using Microsoft.EntityFrameworkCore;

namespace BlogLab.Web.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<ApplicationUserCreate> ApplicationUserCreates { get; set; }
        public DbSet<ApplicationUserIdentity> ApplicationUserIdentitys { get; set; }
        public DbSet<ApplicationUserLogin> ApplicationUserLogins { get; set; }

        public DbSet<Blog> Blogs { get; set; }
        public DbSet<BlogCreate> BlogCreates { get; set; }
        public DbSet<BlogPaging> BlogPagings { get; set; }
    public DbSet<BlogComment> BlogComments{ get; set; }
        public DbSet<BlogCommentCreate> BlogCommentCreates  { get; set; }
        public DbSet<ApiException> ApiExceptions { get; set; }
        public DbSet<Photo> Photos  { get; set; }
        public DbSet<PhotoCreate> PhotoCreates  { get; set; }
        public DbSet<CloudinaryOptions> CloudinaryOptionss  { get; set; }

}

}
