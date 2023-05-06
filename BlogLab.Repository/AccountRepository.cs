using BlogLab.Models.Account;
using Dapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
namespace BlogLab.Repository
{
    /// <summary>
    /// The account creation class.
    /// It is derived from the class IAccountRepository.
    /// The following class fields use an underscore prefix to distinguish them from local variables and method arguments.
    /// This is a common convention in C# programming.
    /// </summary>
    public class AccountRepository : IAccountRepository
    {
        private readonly IConfiguration _config;
        public AccountRepository(IConfiguration config)
        {
            _config = config;
        }
        /// <summary>
        /// It is the user account creation function. Async works.
        /// It takes two parameters.
        /// </summary>
        /// <param name="user">user info</param>
        /// <param name="cancellationToken">token info</param>
        /// <returns>returns user info</returns>
        public async Task<IdentityResult> CreateAsync(ApplicationUserIdentity user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var dataTable = new DataTable();
            dataTable.Columns.Add("Username", typeof(string));
            dataTable.Columns.Add("NormalizedUsername", typeof(string));
            dataTable.Columns.Add("Email", typeof(string));
            dataTable.Columns.Add("NormalizedEmail", typeof(string));
            dataTable.Columns.Add("Fullname", typeof(string));
            dataTable.Columns.Add("PasswordHash", typeof(string));

            dataTable.Rows.Add(
                user.Username,
                user.NormalizedUsername,
                user.Email,
                user.NormalizedEmail,
                user.Fullname,
                user.PasswordHash
                );
            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync(cancellationToken);

                await connection.ExecuteAsync("Account_Insert",
                    new { Account = dataTable.AsTableValuedParameter("dbo.AccountType") }, commandType: CommandType.StoredProcedure);
            }
            return IdentityResult.Success;
        }
        /// <summary>
        /// This is the function that returns the account username.
        /// </summary>
        /// <param name="normalizedUsername">normalized user name info</param>
        /// <param name="cancellationToken">token info</param>
        /// <returns>returns normalizedUsername info </returns>
        public async Task<ApplicationUserIdentity> GetByUsernameAsync(string normalizedUsername, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            ApplicationUserIdentity applicationUser;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync(cancellationToken);

                applicationUser = await connection.QuerySingleOrDefaultAsync<ApplicationUserIdentity>(
                    "Account_GetByUsername", new { NormalizedUsername = normalizedUsername },
                    commandType: CommandType.StoredProcedure
                    );
            }
            return applicationUser;
        }
    }
}