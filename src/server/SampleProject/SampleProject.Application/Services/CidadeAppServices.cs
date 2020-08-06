using Entities;
using SampleProject.Application.Interfaces;
using SampleProject.Domain.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SampleProject.Application.Services
{
    public class CidadeAppServices : ICidadeAppServices
    {
        private readonly ICidade _cidadeRepository;

        public CidadeAppServices(ICidade cidadeRepository) => _cidadeRepository = cidadeRepository;

        Task<IEnumerable<Cidade>> ICidadeAppServices.GetAll(string descricao, int? take) => _cidadeRepository.GetAll(descricao, take);
    }
}
