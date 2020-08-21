using Microsoft.Extensions.DependencyInjection;
using SampleProject.Application.Interfaces;
using SampleProject.Application.Services;
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
            //APPLICATION
            services.AddScoped<IRegistrarAppServices, RegistrarAppServices>();
            services.AddScoped<ICidadeAppServices, CidadeAppServices>();
            services.AddScoped<ILoginAppServices, LoginAppServices>();

            //INFRA
            services.AddScoped<IPessoa, PessoaRepository>();
            services.AddScoped<ICidade, CidadeRepository>();
            services.AddScoped<IUsuario, UsuarioRepository>();

            services.AddScoped<BaseContext>();
        }
    }
}
