using System;
using IdentityModel.Client;
using Newtonsoft.Json.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Hubx.Net.Identity.Models;

namespace Client
{
    class Program
    {
        public static void Main(string[] args) => MainAsync().GetAwaiter().GetResult();

        public static async Task MainAsync()
        {
            Console.Title = "Console Client Credentials Flow";
            var identityAdminClient = new Hubx.Net.Identity.Models.IdentityClient()
            {
                ClientId = "generic-client",
                ClientSecret = "generic-secret",
                ClientScope = "admin-api",
                Authority = "http://localhost:5000",
                ResourceUri = "http://localhost:5005"
            };
            var identityBuyerClient = new Hubx.Net.Identity.Models.IdentityClient()
            {
                ClientId = "buyer-only-client",
                ClientSecret = "buyer-secret",
                ClientScope = "buyer-api",
                Authority = "http://localhost:5000",
                ResourceUri = "http://localhost:5015"
            };
            var identityVendorClient = new Hubx.Net.Identity.Models.IdentityClient()
            {
                ClientId = "vendor-only-client",
                ClientSecret = "vendor-secret",
                ClientScope = "vendor-api",
                Authority = "http://localhost:5000",
                ResourceUri = "http://localhost:5025"
            };
            await RunProcess(
                identityAdminClient);
            await RunProcess(
                identityBuyerClient);
            await RunProcess(
                identityVendorClient);            
        }
        static async Task<bool> RunProcess(
            IdentityClient identity, bool isAdminClient = false)
        {
            identity.TokenResponse = await RequestTokenAsync(identity);
            if (await RequestApiAsync(identity))
            {
                if (isAdminClient)
                {
                    await RequestData_SetApiAsync(identity);
                }
            }
            return true;
        }
        static async Task<TokenResponse> RequestTokenAsync(IdentityClient identity)
        {
            var disco = await DiscoveryClient.GetAsync(identity.Authority);           
            if (disco.IsError) throw new Exception(disco.Error);

            var client = new TokenClient(
                disco.TokenEndpoint,
                identity.ClientId,
                identity.ClientSecret);

            Console.Write(
                client.ClientId, 
                client.ClientSecret, 
                identity.ClientScope);

            return await client.RequestClientCredentialsAsync(
                identity.ClientScope);
        }
        static async Task<bool> RequestApiAsync(Hubx.Net.Identity.Models.IdentityClient identity)
        {
            var client = new HttpClient();
            client.SetBearerToken(identity.TokenResponse.AccessToken);
            var response = await client.GetAsync(identity.ResourceUri + "/identity");
            if (!response.IsSuccessStatusCode)
            {
                Console.WriteLine(
                    response.StatusCode);
            }
            else
            {
                identity.Message = response.Content.ReadAsStringAsync().Result;
                Console.WriteLine(
                    JArray.Parse(identity.Message));
            }
            return true;
        }
        static async Task<bool> RequestData_SetApiAsync(Hubx.Net.Identity.Models.IdentityClient identity)
        {
            var client = new HttpClient();            
            client.SetBearerToken(identity.TokenResponse.AccessToken);            
            var response = await client.GetAsync(identity.ResourceUri + "/dataset");
            if (!response.IsSuccessStatusCode)
            {
                Console.WriteLine(response.StatusCode);
            }
            else
            {
                identity.Message = response.Content.ReadAsStringAsync().Result;
                Console.WriteLine(JArray.Parse(identity.Message));
            }
            return true;
        }
        static async Task<bool> RequestDataSet_NotAuthenticated_ApiAsync(Hubx.Net.Identity.Models.IdentityClient identity)
        {
            var client = new HttpClient();           
            var response = await client.GetAsync(identity.ResourceUri + "/dataset");
            if (!response.IsSuccessStatusCode)
            {
                Console.WriteLine(response.StatusCode);
            }
            else
            {
                identity.Message = response.Content.ReadAsStringAsync().Result;
                Console.WriteLine(JArray.Parse(identity.Message));
            }
            return true;
        }

    }
}
