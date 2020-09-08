using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SampleProject.API.Security;
using SampleProject.Application.Interfaces;
using SampleProject.Application.Validation;
using SampleProject.Application.ViewModel;

namespace SampleProject.API.Controllers
{
    [Route("v1/Login")]
    public class LoginController : Controller
    {
        private readonly ILoginAppServices _login;        
        private readonly IConfiguration _configuration;

        public LoginController(ILoginAppServices login, IConfiguration configuration)
        {
            _login = login;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("Authenticate")]
        public async Task<IActionResult> Authenticate([FromBody]LoginViewModel model)
        {
            if (model == null)
                return NotFound();

            var validation = new LoginValidation(_login).Validate(model);

            if (!validation.IsValid)
            {
                var returnValidate = new
                {
                    erros = validation.Errors.Select(x => new
                    {
                        field = x.PropertyName,
                        error = x.ErrorMessage
                    })
                };
                return BadRequest(returnValidate);
            }

            var usuario = await _login.Authenticate(model);
            
            var retorno = new
            {
                token = new Token(_configuration).Generate(usuario)
            };

            return Ok(retorno);

        }
    }
}
