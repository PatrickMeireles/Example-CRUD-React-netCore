using Entities;
using SampleProject.Application.Interfaces;
using SampleProject.Application.ViewModel;
using SampleProject.Domain.Interfaces;
using SampleProject.Infrastructure.Data.Repository;
using SampleProject.Util;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace SampleProject.Application.Services
{
    public class LoginAppServices : ILoginAppServices
    {
        private readonly IUsuario _usuario;

        public LoginAppServices(IUsuario usuario) => _usuario = usuario;

        public async Task<Usuario> Authenticate(LoginViewModel model)
        {
            var usuario = await _usuario.GetAll();

            return usuario.Where(x => x.Login == model.Login && x.Senha == HashMD5.getMD5(model.Senha))
                                .OrderByDescending(x => x.DataAtivacao)
                                .FirstOrDefault();
        }
    }
}
