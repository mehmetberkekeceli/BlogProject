using BlogLab.Models.Account;
using System;
using System.Collections.Generic;
using System.Text;

namespace BlogLab.Services
{
    /// <summary>
    /// It is the class where the token creation interface is defined.
    /// It consists of a single function signature.
    /// </summary>
    public interface ITokenService
    {
        /// <summary>
        /// It is used as a token generation function signuture.
        /// </summary>
        /// <param name="user">The token takes the user information to be created as an input parameter.</param>
        /// <returns>The generated token information is returned as a string.</returns>
        public string CreateToken(ApplicationUserIdentity user);
    }
}
