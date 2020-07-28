using Microsoft.Extensions.DependencyInjection;
using SampleProject.Infrastructure.CrossCutting.IoC;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleProject.API.Configurations
{
    public static class DependencyInjectionSetup
    {
        public static void AddDependencyInjectionSetup(this IServiceCollection services)
        {
            if (services == null)
                throw new ArgumentException(nameof(services));

            NativeInjector.RegisterServices(services);
        }
    }
}
