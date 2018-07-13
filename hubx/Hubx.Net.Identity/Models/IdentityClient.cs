using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

namespace Hubx.Net.Identity.Models
{
    public class IdentityClient
    {
        public string Authority { get; set; }
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string ClientScope { get; set; }
        public string ResourceUri { get; set; }

        public string Username { get; set; }
        public string Password { get; set; }

        public IdentityModel.Client.TokenResponse TokenResponse { get; set; }     
        
        public string Message { get; set; }
    }
}
