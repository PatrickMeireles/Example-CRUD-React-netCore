using Entities;
using Microsoft.EntityFrameworkCore;
using SampleProject.Domain.Interfaces;
using SampleProject.Infrastructure.Data.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SampleProject.Infrastructure.Data.Repository
{
    public class CidadeRepository : ICidade
    {
        protected readonly BaseContext _db;

        public CidadeRepository(BaseContext context) => _db = context;

        public IEnumerable<Cidade> GetAll(string descricao, int? take)
        {
            var cidades = _db.Set<Cidade>()
                             .AsNoTracking();

            if (!String.IsNullOrEmpty(descricao) && !String.IsNullOrWhiteSpace(descricao))
                cidades = cidades.Where(x => x.Nome.ToLower().Contains(descricao.ToLower()));

            if (take.HasValue)
                cidades = cidades.Take(take.Value);
            else
                cidades = cidades.Take(10);

            return cidades
                   .OrderBy(c => c.Nome);
        }
    }
}
