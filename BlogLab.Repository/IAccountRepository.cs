using BlogLab.Models.Account;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace BlogLab.Repository
{
    /// <summary>
    /// Account creation interface class. It contains two functions.
    /// </summary>
    public interface IAccountRepository
    {
        /// <summary>
        /// It is the account function to be created. This function works Async way.
        /// It takes two parameters.
        /// </summary>
        /// <param name="user">user info</param>
        /// <param name="cancellationToken">token info</param>
        /// <returns></returns>
        public Task<IdentityResult> CreateAsync(ApplicationUserIdentity user, 
            CancellationToken cancellationToken);

        /// <summary>
        /// It is the asnc function that performs the normalized username.This function works Async way.
        ///  It takes two parameters.
        /// </summary>
        /// <param name="normalizedUsername">normalizedUsername info</param>
        /// <param name="cancellationToken">token info</param>
        /// <returns></returns>
        public Task<ApplicationUserIdentity> GetByUsernameAsync(string normalizedUsername, 
            CancellationToken cancellationToken);
    }
}
