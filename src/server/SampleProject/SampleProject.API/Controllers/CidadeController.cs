using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SampleProject.Application.Interfaces;

namespace SampleProject.API.Controllers
{
    [Route("v1/Cidade")]
    public class CidadeController : Controller
    {
        private readonly ICidadeAppServices _cidadeServices;
        public CidadeController(ICidadeAppServices cidadeServices) => _cidadeServices = cidadeServices;

        [HttpGet]
        [Route("GetAll")]
        public IActionResult GetAll(string descricao)
        {
            var cidades = _cidadeServices.GetAll(descricao, 10);

            return Ok(cidades);
        }
    }
}
