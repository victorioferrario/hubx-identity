using System;
using IdentityModel.Client;
using Newtonsoft.Json.Linq;
using System.Net.Http;
using System.Threading.Tasks;
namespace ResourceOwnerClient
{
    class Program
    {

        public static void Main(string[] args) => MainAsync().GetAwaiter().GetResult();

        public static async Task MainAsync()
        {
            Console.Title = "Console Buyer Credentials Flow";

            var identityBuyerClient = new Hubx.Net.Identity.Models.IdentityClient()
            {
                ClientId = "ro.client",
                ClientSecret = "ro-secret",
                ClientScope = "buyer-api",
                Authority = "http://localhost:5000",
                ResourceUri = "http://localhost:5015",
                Username = "manny",
                Password = "password"
            };




            identityBuyerClient.TokenResponse = await RequestResourceOwnerPasswordAsync(identityBuyerClient);

            Console.WriteLine(identityBuyerClient.TokenResponse.Json);

            if (await RequestApiAsync(identityBuyerClient))
            {
                Console.WriteLine(identityBuyerClient.Message);
            }

            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            //var disco = await DiscoveryClient.GetAsync("http://localhost:5000");
            //if (disco.IsError)
            //{
            //    Console.WriteLine(disco.Error);
            //    return;
            //}

            //// request token
            //var tokenClient = new TokenClient(disco.TokenEndpoint, "ro.client", "secret");
            //var tokenResponse = await tokenClient.RequestResourceOwnerPasswordAsync("alice", "password", "api1");

            //if (tokenResponse.IsError)
            //{
            //    Console.WriteLine(tokenResponse.Error);
            //    return;
            //}

            //Console.WriteLine(tokenResponse.Json);

            Console.WriteLine("Hello World!");


            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        }
        static async Task<TokenResponse> RequestResourceOwnerPasswordAsync(Hubx.Net.Identity.Models.IdentityClient identity)
        {
            var disco = await DiscoveryClient.GetAsync(identity.Authority);
            if (disco.IsError) throw new Exception(disco.Error);

            var client = new TokenClient(
                disco.TokenEndpoint,
                identity.ClientId,
                identity.ClientSecret);

            return await client.RequestResourceOwnerPasswordAsync( 
                identity.Username, 
                identity.Password, 
                identity.ClientScope);
        }
        static async Task<bool> RequestApiAsync(Hubx.Net.Identity.Models.IdentityClient identity)
        {
            var client = new HttpClient();
            client.SetBearerToken(identity.TokenResponse.AccessToken);
            var response = await client.GetAsync(identity.ResourceUri + "/identity");
            if (!response.IsSuccessStatusCode)
            {
                Console.WriteLine(response.StatusCode);
            }
            else
            {
                identity.Message = response.Content.ReadAsStringAsync().Result;
                Console.WriteLine(JArray.Parse(identity.Message));
            }
            return true;//await client.RequestClientCredentialsAsync(identity.ResourceUri);
        }

    }
}
