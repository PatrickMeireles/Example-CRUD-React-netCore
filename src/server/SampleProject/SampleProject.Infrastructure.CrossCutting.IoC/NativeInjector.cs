using Microsoft.Extensions.DependencyInjection;
using SampleProject.Domain.Interfaces;
using SampleProject.Infrastructure.Data.Context;
using SampleProject.Infrastructure.Data.Repository;
using System;

namespace SampleProject.Infrastructure.CrossCutting.IoC
{
    public class NativeInjector
    {
        public static void RegisterServices(IServiceCollection services)
        {

            //INFRA
            services.AddScoped<IPessoa, PessoaRepository>();

            services.AddScoped<BaseContext>();
        }
    }
}
