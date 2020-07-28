using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SampleProject.Infrastructure.Data.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleProject.API.Configurations
{
    public static class DataBaseSetup
    {
        public static void AddDataBaseSetup(this IServiceCollection services, IConfiguration configuration)
        {
            if (services == null)
                throw new ArgumentException(nameof(services));

            services.AddDbContext<Context>(option =>
                option.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
        }
    }
}
