using Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SampleProject.Domain.Interfaces
{
    public interface ICidade
    {
        Task<IEnumerable<Cidade>> GetAll(string descricao, int? take);
    }
}
