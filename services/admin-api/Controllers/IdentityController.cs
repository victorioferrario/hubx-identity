using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
namespace admin_api.Controllers
{
    using System.Linq;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Authorization;

    namespace buyer_api.Controllers
    {
        [Route("identity")]
        [Authorize]
        public class IdentityController : Controller
        {
            [HttpGet]
            public IActionResult Get()
            {
                return new JsonResult(
                    from c in User.Claims select new { c.Type, c.Value });
            }

        }

        [Route("dataset")]
        [Authorize]
        public class DatasetController : Controller
        {
            [HttpGet]
            public IEnumerable<string> Get()
            {
                               
                return new string[] { "admin-api", "buyer-api", "vendor-api" };
            }

        }
    }


}
