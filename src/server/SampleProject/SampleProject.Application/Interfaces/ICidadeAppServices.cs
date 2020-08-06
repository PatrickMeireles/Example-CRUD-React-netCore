using Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SampleProject.Application.Interfaces
{
    public interface ICidadeAppServices
    {
        Task<IEnumerable<Cidade>> GetAll(string descricao, int? take);
    }
}
