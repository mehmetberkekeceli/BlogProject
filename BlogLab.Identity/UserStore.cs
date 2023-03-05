using BlogLab.Models.Account;
using BlogLab.Repository;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace BlogLab.Identity
{
    /// <summary>
    /// It is the class in which the general operations related to the user are made. You can access user-based functions such as deleting, adding, searching.
    /// </summary>
    public class UserStore :
        IUserStore<ApplicationUserIdentity>,
        IUserEmailStore<ApplicationUserIdentity>,
        IUserPasswordStore<ApplicationUserIdentity>
    {
        private readonly IAccountRepository _accountRepsoitory;

        public UserStore(IAccountRepository accountRepository)
        {
            _accountRepsoitory = accountRepository;
        }

        /// <summary>
        /// Asnc is a function that somehow creates a user.
        /// It takes two parameters.
        /// </summary>
        /// <param name="user">The user information to be created.</param>
        /// <param name="cancellationToken">Token</param>
        /// <returns></returns>
        public async Task<IdentityResult> CreateAsync(ApplicationUserIdentity user, CancellationToken cancellationToken)
        {
            return await _accountRepsoitory.CreateAsync(user, cancellationToken);
        }

        /// <summary>
        /// It is the asnc function that performs the user name search.
        /// It takes two parameters.
        /// </summary>
        /// <param name="normalizedUserName">Username to search.</param>
        /// <param name="cancellationToken">token information</param>
        /// <returns></returns>
        public async Task<ApplicationUserIdentity> FindByNameAsync(string normalizedUserName, CancellationToken cancellationToken)
        {
            return await _accountRepsoitory.GetByUsernameAsync(normalizedUserName, cancellationToken);
        }
        /// <summary>
        /// It is the async function that will be used for the user to be deleted.
        /// It takes two parameters.
        /// </summary>
        /// <param name="user">User information to be deleted.</param>
        /// <param name="cancellationToken">token information</param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public Task<IdentityResult> DeleteAsync(ApplicationUserIdentity user, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// It is the asnc function that performs the email search.
        /// It takes two parameters.
        /// </summary>
        /// <param name="normalizedEmail">user email name</param>
        /// <param name="cancellationToken">token information</param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public Task<ApplicationUserIdentity> FindByEmailAsync(string normalizedEmail, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// It is the asnc function that performs the userId search.
        /// It takes two parameters.
        /// </summary>
        /// <param name="userId">User Id information to be searched.</param>
        /// <param name="cancellationToken">token information</param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public Task<ApplicationUserIdentity> FindByIdAsync(string userId, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// Function that returns the user's email information.
        /// It takes two parameters.
        /// </summary>
        /// <param name="user">the user whose email information will be received.</param>
        /// <param name="cancellationToken">token information</param>
        /// <returns></returns>
        public Task<string> GetEmailAsync(ApplicationUserIdentity user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.Email);
        }
        /// <summary>
        /// Function that returns verified email information.
        /// </summary>
        /// <param name="user">user info</param>
        /// <param name="cancellationToken">token info</param>
        /// <returns></returns>
        public Task<bool> GetEmailConfirmedAsync(ApplicationUserIdentity user, CancellationToken cancellationToken)
        {
            return Task.FromResult(true);
        }
        /// <summary>
        /// Function returning normalized email information
        /// </summary>
        /// <param name="user">user info</param>
        /// <param name="cancellationToken">token info</param>
        /// <returns></returns>
        public Task<string> GetNormalizedEmailAsync(ApplicationUserIdentity user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.NormalizedEmail);
        }
        /// <summary>
        /// Function returning normailized user name information
        /// </summary>
        /// <param name="user">user info</param>
        /// <param name="cancellationToken">token info</param>
        /// <returns></returns>
        public Task<string> GetNormalizedUserNameAsync(ApplicationUserIdentity user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.NormalizedUsername);
        }

        /// <summary>
        /// Password information returned in hash type.
        /// </summary>
        /// <param name="user">user info</param>
        /// <param name="cancellationToken">token info</param>
        /// <returns></returns>
        public Task<string> GetPasswordHashAsync(ApplicationUserIdentity user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.PasswordHash);
        }
        /// <summary>
        /// Function returning UserId information
        /// </summary>
        /// <param name="user">user info</param>
        /// <param name="cancellationToken">token info</param>
        /// <returns></returns>
        public Task<string> GetUserIdAsync(ApplicationUserIdentity user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.ApplicationUserId.ToString());
        }
        /// <summary>
        /// Function returning  username information
        /// </summary>
        /// <param name="user">user info</param>
        /// <param name="cancellationToken">token info</param>
        /// <returns></returns>
        public Task<string> GetUserNameAsync(ApplicationUserIdentity user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.Username);
        }

        public Task<bool> HasPasswordAsync(ApplicationUserIdentity user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.PasswordHash != null);
        }

        public Task SetEmailAsync(ApplicationUserIdentity user, string email, CancellationToken cancellationToken)
        {
            user.Email = email;
            return Task.FromResult(0);
        }

        public Task SetEmailConfirmedAsync(ApplicationUserIdentity user, bool confirmed, CancellationToken cancellationToken)
        {
            return Task.FromResult(0);
        }

        public Task SetNormalizedEmailAsync(ApplicationUserIdentity user, string normalizedEmail, CancellationToken cancellationToken)
        {
            user.NormalizedEmail = normalizedEmail;
            return Task.FromResult(0);
        }

        public Task SetNormalizedUserNameAsync(ApplicationUserIdentity user, string normalizedName, CancellationToken cancellationToken)
        {
            user.NormalizedUsername = normalizedName;
            return Task.FromResult(0);
        }

        public Task SetPasswordHashAsync(ApplicationUserIdentity user, string passwordHash, CancellationToken cancellationToken)
        {
            user.PasswordHash = passwordHash;
            return Task.FromResult(0);
        }

        public Task SetUserNameAsync(ApplicationUserIdentity user, string userName, CancellationToken cancellationToken)
        {
            user.Username = userName;
            return Task.FromResult(0);
        }

        public Task<IdentityResult> UpdateAsync(ApplicationUserIdentity user, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            // Nothing to dispose
        }

    }
}
