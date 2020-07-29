using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SampleProject.Application.Interfaces
{
    public interface ICidadeAppServices
    {
        public IEnumerable<Cidade> GetAll(string descricao, int? take);
    }
}
