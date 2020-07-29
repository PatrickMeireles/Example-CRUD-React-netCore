using Entities;
using SampleProject.Application.Interfaces;
using SampleProject.Domain.Interfaces;
using System.Collections.Generic;

namespace SampleProject.Application.Services
{
    public class CidadeAppServices : ICidadeAppServices
    {
        private readonly ICidade _cidadeRepository;

        public CidadeAppServices(ICidade cidadeRepository) => _cidadeRepository = cidadeRepository;

        public IEnumerable<Cidade> GetAll(string descricao, int? take) =>  _cidadeRepository.GetAll(descricao, take);
    }
}
