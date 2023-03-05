using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace BlogLab.Models.Blog
{
    [Keyless]
    public class BlogPaging
    {
        public int Page { get; set; } = 1;

        public int PageSize { get; set; } = 6;
    }
}
