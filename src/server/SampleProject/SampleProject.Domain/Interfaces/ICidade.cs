using Entities;
using System.Collections.Generic;

namespace SampleProject.Domain.Interfaces
{
    public interface ICidade
    {
        IEnumerable<Cidade> GetAll(string descricao, int? take);
    }
}
