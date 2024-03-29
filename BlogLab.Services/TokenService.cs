﻿using BlogLab.Models.Account;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;

namespace BlogLab.Services
{
    /// <summary>
    /// The business service class where token creations are made.
    /// JWT is used as the token library.
    /// The following class fields use an underscore prefix to distinguish them from local variables and method arguments.
    /// This is a common convention in C# programming.
    /// </summary>
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;
        private readonly string _issuer;

        public TokenService(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            _issuer = config["Jwt:Issuer"];
        }
        /// <summary>
        /// JWT is used as the token library.
        /// User-based token creation function.
        /// </summary>
        /// <param name="user">user info</param>
        /// <returns>jwt token information</returns>
        public string CreateToken(ApplicationUserIdentity user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.ApplicationUserId.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.Username)
            };
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                _issuer,
                _issuer,
                claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}