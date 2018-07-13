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
}
