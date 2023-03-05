﻿using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace BlogLab.Models.Exception
{
    [Keyless]
    public class ApiException
    {
        public int StatusCode { get; set; }

        public string Message { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
