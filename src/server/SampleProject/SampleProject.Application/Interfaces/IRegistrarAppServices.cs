using SampleProject.Application.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SampleProject.Application.Interfaces
{
    public interface IRegistrarAppServices
    {
        Task<RegistrarViewModel> Create(RegistrarViewModel model);
    }
}
