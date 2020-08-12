using FluentValidation;
using SampleProject.Application.ViewModel;
using SampleProject.Domain.Interfaces;
using System.Linq;

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
                .Must(x => 1 == 1).WithMessage("Message Here");

            RuleFor(x => x.Email)
                .Must(x =>  _pessoa.GetAll().Result.Any(z => z.Email == x)).WithMessage("Já possui uma pessoa cadastrada com esse email.");                        
        }
    }
}
