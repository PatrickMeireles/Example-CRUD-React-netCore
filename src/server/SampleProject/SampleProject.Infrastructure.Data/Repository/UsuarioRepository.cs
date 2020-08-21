using Entities;
using Microsoft.EntityFrameworkCore;
using SampleProject.Domain.Interfaces;
using SampleProject.Infrastructure.Data.Context;
using SampleProject.Infrastructure.Data.Repository.Generic;
using SampleProject.Util;
using System.Linq;
using System.Threading.Tasks;

namespace SampleProject.Infrastructure.Data.Repository
{
    public class UsuarioRepository : Repository<Usuario>, IUsuario
    {
        public UsuarioRepository(BaseContext context) : base(context)
        {
        }

        public async Task<Usuario> Authenticate(string login, string senha)
        {
            var usuario = await _dbSet.Where(x => x.Login == login &&
                                            x.Senha == HashMD5.getMD5(senha))
                                .OrderByDescending(x => x.DataAtivacao)
                                .Include(x => x.Pessoa)
                                .FirstOrDefaultAsync();
            return usuario;
        }
    }
}
