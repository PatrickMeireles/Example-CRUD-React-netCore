using Entities;
using SampleProject.Domain.Interfaces;
using SampleProject.Infrastructure.Data.Context;
using SampleProject.Infrastructure.Data.Repository.Generic;

namespace SampleProject.Infrastructure.Data.Repository
{
    public class PessoaRepository : Repository<Pessoa>, IPessoa
    {
        public PessoaRepository(BaseContext context) : base(context) { }
    }
}
