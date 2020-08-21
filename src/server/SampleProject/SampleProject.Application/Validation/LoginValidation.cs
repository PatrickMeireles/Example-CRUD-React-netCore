using Entities;
using FluentValidation;
using SampleProject.Application.Interfaces;
using SampleProject.Application.ViewModel;
using SampleProject.Domain.Interfaces;
using System;

namespace SampleProject.Application.Validation
{
    public class LoginValidation : AbstractValidator<LoginViewModel>
    {
        private readonly ILoginAppServices _login;

        public LoginValidation(ILoginAppServices login)
        {
            _login = login;

            RuleFor(x => x.Login)
                   .NotEmpty().WithMessage("Email não foi informado.");

            RuleFor(x => x.Senha)
                   .NotEmpty().WithMessage("Senha não foi informado.");

            RuleFor(x => x)
                   .Must(x => existeUsuario(x))
                   .WithMessage("Usuário ou Senha inválidos.");

            RuleFor(x => x)
                    .Must(x => usuarioValido(x))
                    .WithMessage("Usuário está inativo no sistema, entre em contato com o administrador do sistema.");
        }

        private Usuario usuario(LoginViewModel model)
        {
            return _login.Authenticate(model)
                         .GetAwaiter()
                         .GetResult();
        }

        private Boolean existeUsuario(LoginViewModel model)
        {
            var usuario = this.usuario(model);

            return usuario != null;
        }

        private Boolean usuarioValido(LoginViewModel model)
        {
            var usuario = this.usuario(model);

            if (usuario != null)
                return (usuario.DataAtivacao <= DateTime.Now && (usuario.DataInativacao == null || usuario.DataInativacao >= DateTime.Now));
            else return true;
        }

    }
}
