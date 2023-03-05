using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace BlogLab.Models.Settings
{
    [Keyless]
    public class CloudinaryOptions
    {
        public string CloudName { get; set; }

        public string ApiKey { get; set; }

        public string ApiSecret { get; set; }
    }
}
