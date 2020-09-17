using FluentValidation;
using SampleProject.Application.ViewModel;
using SampleProject.Domain.Interfaces;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace SampleProject.Application.Validation
{
    public class RegistrarValidation : AbstractValidator<RegistrarViewModel>
    {
        private readonly IUsuario _usuario;
        private readonly IPessoa _pessoa;

        public RegistrarValidation(IUsuario usuario, IPessoa pessoa)
        {
            _usuario = usuario;
            _pessoa = pessoa;

            RuleFor(x => x.Email)
                .Must(x => !ValidaUnicidade(x))
                .WithMessage("Já possui uma pessoa cadastrada com esse email.");                        
        }

        private Boolean ValidaUnicidade(string email)
        {
            var result = _pessoa.GetAll()
                                .GetAwaiter()
                                .GetResult();

            return result.Where(x => x.Email == email).Any();
        }
    }
}
