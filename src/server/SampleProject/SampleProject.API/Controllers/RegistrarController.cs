using Microsoft.AspNetCore.Mvc;
using SampleProject.Application.Interfaces;
using SampleProject.Application.Validation;
using SampleProject.Application.ViewModel;
using SampleProject.Domain.Interfaces;
using System.Linq;
using System.Threading.Tasks;

namespace SampleProject.API.Controllers
{
    [Route("v1/Registrar")]
    public class RegistrarController : Controller
    {
        private readonly IRegistrarAppServices _registrarServices;
        private readonly IUsuario _usuario;
        private readonly IPessoa _pessoa;

        public RegistrarController(IRegistrarAppServices registrarServices, IUsuario usuario, IPessoa pessoa)
        {
            _registrarServices = registrarServices;
            _usuario = usuario;
            _pessoa = pessoa;
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create([FromBody]RegistrarViewModel model)
        {
            if (model == null)
                return NotFound();

            var validation = new RegistrarValidation(_usuario, _pessoa).Validate(model);

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
            
            var retorno = await _registrarServices.Create(model);
                        
            if(retorno == null)
                return BadRequest(new { data = "Ocorreu um erro ao cadastrar."});
            else                
                return Ok(retorno);

        }
    }
}
