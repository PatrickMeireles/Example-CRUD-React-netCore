using Entities;
using SampleProject.Domain.Interfaces.Generic;
using System.Threading.Tasks;

namespace SampleProject.Domain.Interfaces
{
    public interface IUsuario : IGeneric<Usuario>
    {
        Task<Usuario> Authenticate(string login, string senha);
    }
}
