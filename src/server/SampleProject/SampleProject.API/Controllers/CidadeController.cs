using Microsoft.AspNetCore.Mvc;
using SampleProject.Application.Interfaces;
using System.Threading.Tasks;

namespace SampleProject.API.Controllers
{
    [Route("v1/Cidade")]
    public class CidadeController : Controller
    {
        private readonly ICidadeAppServices _cidadeServices;
        public CidadeController(ICidadeAppServices cidadeServices) => _cidadeServices = cidadeServices;

        [HttpGet]
        [Route("GetAll")]
        public async Task<IActionResult> GetAll(string q)
        {
            var cidades = await _cidadeServices.GetAll(q, 10);

            return Ok(cidades);
        }
    }
}
