using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityModel;
using IdentityServer4.Test;
using System.Collections.Generic;
using IdentityServer4.Models;
using System.Security.Claims;

namespace IdentityServerAspNet
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };
        }
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
                new Client
                    {
                        ClientId = "mvc",
                        ClientName = "MVC Client",
                        AllowedGrantTypes = GrantTypes.HybridAndClientCredentials,
                        RequireConsent = false,

                        ClientSecrets =
                        {
                            new Secret("secret".Sha256())
                        },

                        RedirectUris           = { "http://localhost:5002/signin-oidc" },
                        PostLogoutRedirectUris = { "http://localhost:5002/signout-callback-oidc" },

                        AllowedScopes =
                        {
                            IdentityServer4.IdentityServerConstants.StandardScopes.OpenId,
                            IdentityServer4.IdentityServerConstants.StandardScopes.Profile,
                             "admin-api"
                        },
                        AllowOfflineAccess = true
                },
                new Client
                {
                    ClientId = "javascript-services",
                    ClientName = "JavaScript Client",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,

                    RedirectUris = { "http://localhost:4200/callback.html" },
                    PostLogoutRedirectUris = { "http://localhost:4200/index.html" },
                    AllowedCorsOrigins = { "http://localhost:4200" },

                    AllowedScopes =
                    {
                        IdentityServer4.IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServer4.IdentityServerConstants.StandardScopes.Profile,
                        "admin-api",
                        "buyer-api",
                        "vendor-api"
                    },
                }
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
                        new Claim(JwtClaimTypes.Name, "Manuel Ferrario"),
                        new Claim(JwtClaimTypes.GivenName, "Manuel"),
                        new Claim(JwtClaimTypes.FamilyName, "Ferrario"),
                        new Claim(JwtClaimTypes.Email, "victorio.ferrario@gmail.com"),
                        new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean),
                        new Claim(JwtClaimTypes.WebSite, "http://www.manuelferrario.com"),
                        new Claim(JwtClaimTypes.Address, @"{ 'street_address': 'One Hacker Way', 'locality': 'Heidelberg', 'postal_code': 69118, 'country': 'Germany' }", IdentityServer4.IdentityServerConstants.ClaimValueTypes.Json)
                    }
                },
                new IdentityServer4.Test.TestUser
                {
                    SubjectId = "2",
                    Username = "motty",
                    Password = "password",
                     Claims = new List<Claim>
                    {
                       new Claim(JwtClaimTypes.GivenName, "Motty"),
                        new Claim(JwtClaimTypes.FamilyName, "Chen"),
                        new Claim(JwtClaimTypes.Email, "motty@hubx.com"),
                        new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean),
                        new Claim(JwtClaimTypes.WebSite, "http://www.mottychen.com"),
                    }
                }
            };
        }

    }
}
