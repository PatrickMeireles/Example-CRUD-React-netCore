using Entities;
using SampleProject.Application.Interfaces;
using SampleProject.Application.ViewModel;
using SampleProject.Domain.Interfaces;
using SampleProject.Util;
using System;
using System.Threading.Tasks;

namespace SampleProject.Application.Services
{
    public class RegistrarAppServices : IRegistrarAppServices
    {
        private readonly IPessoa _pessoa;
        private readonly IUsuario _usuario;

        public RegistrarAppServices(IPessoa pessoa, IUsuario usuario)
        {
            _pessoa = pessoa;
            _usuario = usuario;
        }

        public async Task<RegistrarViewModel> Create(RegistrarViewModel model)
        {
            var pessoa = new Pessoa();
            pessoa.Nome = model.Nome;
            pessoa.Email = model.Email;
            pessoa.IdCidade = model.IdCidade;

            await _pessoa.Add(pessoa);

            var usuario = new Usuario();
            usuario.Login = model.Email;
            usuario.Senha = HashMD5.getMD5(model.Senha);
            usuario.DataAtivacao = DateTime.Now;
            usuario.Pessoa = pessoa;

            await _usuario.Add(usuario);

            return model;
        }
    }
}
