using Entities;
using SampleProject.Application.ViewModel;
using System.Threading.Tasks;

namespace SampleProject.Application.Interfaces
{
    public interface ILoginAppServices
    {
        Task<Usuario> Authenticate(LoginViewModel model);
    }
}
