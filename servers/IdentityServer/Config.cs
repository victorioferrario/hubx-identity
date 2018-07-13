using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer4.Models;
using System.Security.Claims;
namespace LocalIdentityServer
{
    public static class Config
    {
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("admin-api", "The Admin API"),
                new ApiResource("buyer-api", "The Buyer API"),
                new ApiResource("vendor-api", "The Vendor API")
            };
        }
        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId = "generic-client",
                    // no interactive user, use the clientid/secret for authentication
                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    // secret for authentication
                    ClientSecrets =
                    {
                        new Secret("generic-secret".Sha256())
                    },
                    // scopes that client has access to
                    AllowedScopes = {  "admin-api", "buyer-api", "vendor-api"}
                },
                new Client
                {
                    ClientId = "angular-client",
                    // no interactive user, use the clientid/secret for authentication
                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    // secret for authentication
                    ClientSecrets =
                    {
                        new Secret("angular-secret".Sha256())
                    },
                    // scopes that client has access to
                    AllowedScopes = { "admin-api", "buyer-api", "vendor-api" }
                },
                new Client
                {
                    ClientId = "admin-only-client",
                    // no interactive user, use the clientid/secret for authentication
                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    // secret for authentication
                    ClientSecrets =
                    {
                        new Secret("admin-secret".Sha256())
                    },
                    // scopes that client has access to
                    AllowedScopes = { "admin-api"}
                },
                new Client
                {
                    ClientId = "buyer-only-client",
                    // no interactive user, use the clientid/secret for authentication
                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    // secret for authentication
                    ClientSecrets =
                    {
                        new Secret("buyer-secret".Sha256())
                    },
                    // scopes that client has access to
                    AllowedScopes = { "buyer-api"}
                },
                new Client
                {
                    ClientId = "vendor-only-client",
                    // no interactive user, use the clientid/secret for authentication
                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    // secret for authentication
                    ClientSecrets =
                    {
                        new Secret("vendor-secret".Sha256())
                    },
                    // scopes that client has access to
                    AllowedScopes = { "vendor-api"}
                },               
                new Client
                {
                    ClientId = "ro.client",
                    // no interactive user, use the clientid/secret for authentication
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                    // secret for authentication
                    ClientSecrets =
                    {
                        new Secret("ro-secret".Sha256())
                    },
                    // scopes that client has access to
                    AllowedScopes = {  "admin-api", "buyer-api", "vendor-api"}
                },
            };
        }
        public static List<IdentityServer4.Test.TestUser> GetUsers()
        {
            return new List<IdentityServer4.Test.TestUser>
            {
                new IdentityServer4.Test.TestUser
                {
                    SubjectId = "1",
                    Username = "manny",
                    Password = "password",
                    Claims = new List<Claim>
                    {
                        new Claim("name", "Manny"),
                        new Claim("website", "http://www.manuelferrario.com")
                    }
                },
                new IdentityServer4.Test.TestUser
                {
                    SubjectId = "2",
                    Username = "motty",
                    Password = "password",
                     Claims = new List<Claim>
                    {
                        new Claim("name", "Motty"),
                        new Claim("website", "http://www.mottychen.com")
                    }
                }
            };
        }

    }
}
